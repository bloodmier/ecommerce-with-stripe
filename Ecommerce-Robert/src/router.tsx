import { createBrowserRouter } from "react-router";
import { Privateroute } from "./components/Privateroute";
import { Adminproductspage } from "./pages/admin/product/Adminproductspage";
import { Adminpage } from "./pages/admin/Adminpage";
import { Admincustomerpage } from "./pages/admin/customer/Admincustomerpage";
import { Adminorderpage } from "./pages/admin/order/Adminorderpage";
import { Errorpage } from "./pages/Errorpage";
import { Homepage } from "./pages/Homepage";
import { Layout } from "./pages/Layout";
import { Loginpage } from "./pages/Loginpage";
import { Productpage } from "./pages/Productpage";
import { Productspage } from "./pages/Productspage";
import { Cartpage } from "./pages/Cartpage";
import { Orderconfirmation } from "./pages/Orderconfirmation";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Errorpage />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/products",
        element: <Productspage />,
      },
      {
        path: "/products/:id",
        element: <Productpage />,
      },
      {
        path: "/login",
        element: <Loginpage />,
      },
      {
        path: "/cart",
        element: <Cartpage />,
      },
      {
        path: "/order-confirmation/:sessionId",
        element: <Orderconfirmation />,
      }
    ],
  },
  {
    path: "/admin",
    element: (
      <Privateroute>
        <Adminpage />
      </Privateroute>
    ),
    errorElement: <Errorpage />,
    children: [
      {
        index: true,
        element: <Adminorderpage />
      }
      ,
      {
        path: "/admin/customers",
        element: <Admincustomerpage />,
      },
      {
        path: "/admin/products",
        element: <Adminproductspage></Adminproductspage>,
      },
      {
        path: "/admin/orders",
        element: <Adminorderpage />,
      },
    ],
  },
]);
