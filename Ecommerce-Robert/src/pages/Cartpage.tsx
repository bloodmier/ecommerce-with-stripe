import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Box, Typography, Link, Collapse } from "@mui/material";
import { CartContext } from "../context/CartContext";
import { IActiontype } from "../reducers/cartreducer";
import { Icustomer } from "../models/Icustomer";
import { CustomerForm } from "../components/CustomerForm";
import { Cartitemlist } from "../components/CartItemlist";
import { useCustomer } from "../hooks/useCustomer";
import { postOrder } from "../service/Orderservices";
import { IOrder, IOrderitem } from "../models/Iorder";
import { GetPaymentFromStripe } from "../service/paymentservice";
import { Istripeobject } from "../models/Istripeobject";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51R4Mn5QWSzFKPi7P3kZTuCBBSm91b4Zd41257XT4FP0S6Zv2w8qSLR7WA0UObFFBOQXTnu8RMVmuM2vaJeDLK76X00fNqA6Mrx"
);

export const Cartpage = () => {
  const { checkCustomerbymail } = useCustomer();
  const { cart, dispatch } = useContext(CartContext);
  const [showBillinginfo, setShowbillinginfo] = useState<boolean>(false);
  const [clientSecret, setClientSecret] = useState<string>("");

  const handleQuantityChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number
  ) => {
    dispatch({
      type: IActiontype.UPDATE_CARTITEMS,
      payload: JSON.stringify({ newquantity: e.target.value, Id: id }),
    });
  };

  const handleDelete = (id: number) => {
    dispatch({
      type: IActiontype.REMOVE_CARTITEM,
      payload: JSON.stringify(id),
    });
  };

  const handleProcedtoBillinginfo = () => {
    setShowbillinginfo(true);
  };

  const handleprocesstoPayment = async (e: FormEvent, customer: Icustomer) => {
    e.preventDefault();
    try {
      const customerid = await checkCustomerbymail(customer);

      const orderItems: IOrderitem[] = cart.map((c) => ({
        id: c.id,
        product_id: c.id,
        product_name: c.name,
        quantity: c.quantity,
        unit_price: c.price,
      }));
      const neworder: IOrder = {
        id: 0,
        customer_id: Number(customerid),
        payment_status: "unpaid",
        payment_id: "",
        order_status: "Pending",
        order_items: orderItems,
      };
      const orderres = await postOrder<IOrder>(neworder);
      const Stripeobject: Istripeobject = {
        line_items: cart,
        order_id: orderres.id,
        clientSecret: "",
      };
      const paymentresponse = await GetPaymentFromStripe(Stripeobject);
      console.log(paymentresponse);

      if (!paymentresponse.clientSecret) {
        throw new Error("Failed to fetch client secret");
      }
      setClientSecret(paymentresponse.clientSecret);
      console.log(paymentresponse.clientSecret);
    } catch (error) {
      console.error("Error fetching client secret:", error);
    }
  };

  if (cart.length === 0) {
    return (
      <Box
        sx={{
          textAlign: "center",
          backgroundColor: "white",
          width: "800px",
          height: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          borderRadius: "15px",
        }}
      >
        <Box
          sx={{
            border: "1px solid #626262",
            width: "95%",
            height: "90%",
            borderRadius: "15px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Your cart is empty, and you can't proceed to payment yet. To move
            forward, you'll need to add products to your cart. Take a moment to
            browse our selection and find the items you need. Once you've added
            them, you'll be able to review your cart and proceed to checkout
            seamlessly. Happy shopping!
          </Typography>
          <Link
            href="/products"
            variant="body1"
            color="primary"
            underline="hover"
          >
            Go back to products
          </Link>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: "20px",
        maxWidth: "800px",
        margin: "auto",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
        marginTop: "25px",
        width: "100%",
        transition: "all 1s ease-in-out",
      }}
    >
      {clientSecret.length > 0 ? (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      ) : (
        <>
          <Cartitemlist
            onsubmit={handleProcedtoBillinginfo}
            cart={cart}
            handleDelete={handleDelete}
            handleQuantityChange={handleQuantityChange}
          ></Cartitemlist>
          <Collapse in={showBillinginfo} timeout={800}>
            <CustomerForm onsubmit={handleprocesstoPayment}></CustomerForm>
          </Collapse>
        </>
      )}
    </Box>
  );
};
