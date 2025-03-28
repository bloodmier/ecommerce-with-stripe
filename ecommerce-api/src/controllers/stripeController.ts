import { Request, Response } from "express";
import { IcartItem } from "../models/ICartitem";
import { db } from "../config/db";
import { logError } from "../utilities/logger";
import { IOrder } from "../models/IOrder";
import { IOrderItem } from "../models/IOrderItem";
import { IProductStock } from "../models/IProductStock";
import { Stripe } from "stripe";


const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const CreatePayment = async (req: Request, res: Response) => {
  const { line_items, order_id } = req.body;
 
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: line_items.map((i: IcartItem) => {
        return {
          price_data: {
            currency: "sek",
            product_data: {
              name: i.name,
              images: [i.image],
            },
            unit_amount: i.price * 100,
          },
          quantity: i.quantity,
        };
      }),
      mode: "payment",
      ui_mode: "embedded",
      return_url:
        "http://localhost:5173/order-confirmation/{CHECKOUT_SESSION_ID}",
      client_reference_id: order_id,
    });
    res.send({ clientSecret: session.client_secret });
  } catch (error) {
    res.status(500).send({ error: "Payment creation failed" });
  }
};

export const getPaymentIdFromSessionId = async(req:Request,res:Response) => {
const {sessionId} = req.params;
try {
  const session = await stripe.checkout.sessions.retrieve(sessionId)
  if (!session.payment_intent) {
    res.status(404).json({ message: "Payment Intent not found" });
    return;
  }
  res.status(200).json({ paymentId: session.payment_intent });
} catch (error) {
  res.status(500).json({ error: logError(error) });
}


}


export const Handlehooks = async (req: Request, res: Response) => {
  let event: Stripe.Event  = req.body as Stripe.Event; 

  if (endpointSecret) {
    const signature = req.headers["stripe-signature"];
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature as string,
        endpointSecret
      );
    } catch (error) {
      console.error(`⚠️ Webhook signature verification failed.`, error.message);
      res.status(400).send('Webhook signature verification failed');
      return; 
    }
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      const orderId = session.client_reference_id;
      if (orderId) {
        const paymentId = session.payment_intent;
        const orderitemssql = `
                    SELECT 
                        *, 
                        orders.id AS order_id,
                        orders.created_at AS orders_created_at 
                    FROM orders 
                    LEFT JOIN order_items ON orders.id = order_items.order_id
                    WHERE orders.id = ?
                    `;
        const sql = `UPDATE orders SET payment_status = ?, payment_id = ?, order_status = ? WHERE id = ?`;
        try {
          await db.query(sql, ["paid", paymentId, "Received", orderId]);
          const orderdetails = await db.query<IOrder[]>(orderitemssql, orderId);

          if (orderdetails.length > 0) {
            const order = orderdetails[0];

            console.log(orderdetails);

            const orderItems: IOrderItem[] = order.map((item) => {
              return {
                id: item.id,
                order_id: item.order_id,
                product_id: item.product_id,
                product_name: item.product_name,
                quantity: item.quantity,
                unit_price: item.unit_price,
                created_at: item.created_at,
              };
            }) as IOrderItem[];

            await updateProductStock(orderItems);
          }
        } catch (error) {
          res.status(500).json({ error: logError(error) });
        }
      } else {
        console.error("Order ID saknas i session.");
      }
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
  res.status(200).send("Webhook received");
};

const updateProductStock = async (orderItems: IOrderItem[]) => {
  try {
    for (const item of orderItems) {
      const result = await db.query(
        "SELECT stock FROM products WHERE id = ?",
        [item.product_id]
      );

      const currentStock = result[0] as IProductStock[]


      if (currentStock.length === 0) {
        console.warn(`Produkt med ID ${item.product_id} är slut i lager.`);
      }

      const newStock = currentStock[0].stock - item.quantity;

      if (newStock < 0) {
        console.warn(
          `Ej tillräckligt lager för produkt med ID ${item.product_id}.`
        );
      }
      await db.query("UPDATE products SET stock = ? WHERE id = ?", [
        newStock,
        item.product_id,
      ]);

      console.log(
        `Uppdaterade lagersaldo för produkt ${item.product_id} till ${newStock}`
      );
    }
  } catch (error) {
    console.error("Ett fel inträffade vid uppdatering av lagersaldot!", error);
  }
};
