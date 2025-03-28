import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { GetPaymentIdFromSessionId } from "../service/paymentservice";
import { IgetpaymentIdResponse } from "../models/IpaymentIdResponse";
import { getOrderByPaymentId } from "../service/Orderservices";
import { IOrderWithCustomer } from "../models/Iorder";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { CartContext } from "../context/CartContext";
import { IActiontype } from "../reducers/cartreducer";
import {  useProducts } from "../hooks/useProducts";
import { Loading } from "../components/Loading";

export const Orderconfirmation = () => {
  const { sessionId } = useParams();
  const [paymentID, setPaymentId] = useState("");
  const [orderDetails, setOrderDetails] = useState<IOrderWithCustomer | null>(
    null
  );
  const [isloading, setIsloading] = useState<boolean>(false)
  const { dispatch } = useContext(CartContext);
  const { getallproducts } = useProducts();

  useEffect(() => {
    const fetchPaymentId = async () => {
      if (!sessionId) return;
      try {
        setIsloading(true);
        const { paymentId } = await GetPaymentIdFromSessionId<IgetpaymentIdResponse>(sessionId);
        setPaymentId(paymentId);
      } catch (error) {
        console.error(`Error fetching paymentId:`, error);
      } finally {
        setIsloading(false);
      }
    };
  
    fetchPaymentId();
  }, [sessionId]);

  useEffect(() => {
  const fetchOrderDetails = async () => {
    if (!paymentID) return;

    try {
      const orderdetails: IOrderWithCustomer = await getOrderByPaymentId(paymentID);
      console.log(orderdetails);
      setOrderDetails(orderdetails);
    } catch (error) {
      console.error(`Error fetching order details for paymentID: ${paymentID}`, error);
    }
  };

  const updateProduct = async () => {
    try {
      await getallproducts();
    } catch (error) {
      console.error('Error updating products:', error);
    }
  };

  fetchOrderDetails();
  updateProduct();

  localStorage.removeItem("Billingcustomer");
  dispatch({
    type: IActiontype.REMOVE_ALL_CARTITEM,
    payload: "",
  });
}, [paymentID]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "15px",
        maxWidth: "800px",
        width: "100%",
        backgroundColor: "white",
        margin: "25px",
        padding: "15px",
        gap: "1.4rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "25px",
          border: "1px solid black",
          borderRadius: "15px",
        }}
      >
        <Typography
          variant="h4"
          sx={{ marginBottom: "1.4rem", color: "var(--accent-color)" }}
        >
          Thank you for your order!
        </Typography>
        <Typography variant="body2" component="p">
          Your purchase has been successfully completed. A confirmation email
          with all the details of your order will be sent to
          {orderDetails?.customer_email} shortly. Please feel free to review it
          at your convenience.
        </Typography>
        <Typography variant="body2" component="p" sx={{ marginTop: 2 }}>
          We deeply appreciate your trust in us and are thrilled to have you as
          our customer. Your support means the world to us, and we are committed
          to providing you with the best service possible.
        </Typography>
        <Typography variant="body2" component="p" sx={{ marginTop: 2 }}>
          If you have any questions or need assistance, don’t hesitate to reach
          out to us. Thank you once again for choosing us!
        </Typography>
      </Box>
      {isloading ? (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "25px",
          border: "1px solid black",
          borderRadius: "15px",
        }}
      >
        <Loading></Loading>
      </Box>
    ) : orderDetails ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 4,
            gap: 4,
            border: "1px solid black",
            borderRadius: "15px",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Order details
          </Typography>
          <Divider sx={{ width: "100%", background: "var(--accent-color)" }} />
          <Card sx={{ width: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                CustomerInformation
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="body1">
                  {orderDetails.customer_firstname}{" "}
                  {orderDetails.customer_lastname}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {orderDetails.customer_email} | {orderDetails.customer_phone}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {orderDetails.customer_street_address},{" "}
                  {orderDetails.customer_postal_code}{" "}
                  {orderDetails.customer_city}, {orderDetails.customer_country}
                </Typography>
              </Box>
            </CardContent>
          </Card>
          <Box
            sx={{ display: "flex", flexWrap: "wrap", gap: 2, width: "100%" }}
          >
            <Box sx={{ flex: "1 1 50%" }}>
              <Typography variant="body1">
                <strong>Order-ID:</strong> {orderDetails.id}
              </Typography>
            </Box>
            <Box sx={{ flex: "1 1 50%" }}>
              <Typography variant="body1">
                <strong>Orderstatus:</strong> {orderDetails.order_status}
              </Typography>
            </Box>
            <Box sx={{ flex: "1 1 50%" }}>
              <Typography variant="body1">
                <strong>Paymentstatus:</strong> {orderDetails.payment_status}
              </Typography>
            </Box>
            <Box sx={{ flex: "1 1 50%" }}>
              <Typography variant="body1">
                <strong>Created:</strong>
                {orderDetails.created_at
                  ? new Date(orderDetails.created_at).toLocaleDateString()
                  : "Date missing"}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Typography variant="h6" gutterBottom>
              OrderItems
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {orderDetails.order_items.map((item: any, index: number) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 2,
                    borderBottom: "1px solid var(--accent-color)",
                  }}
                >
                  <Typography>{item.product_name}</Typography>
                  <Typography align="center">{item.quantity}</Typography>
                  <Typography align="right">
                    {item.unit_price.toFixed(2)} SEK
                  </Typography>
                  <Typography align="right">
                    {(item.quantity * item.unit_price).toFixed(2)} SEK
                  </Typography>
                </Box>
              ))}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                }}
              >
                <Typography>Totalt:</Typography>
                <Typography>
                  {orderDetails.total_price?.toFixed(2)} SEK
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Typography>
          Something went wrong, contact us for customer service!
        </Typography>
      )}
    </Box>
  );
};
