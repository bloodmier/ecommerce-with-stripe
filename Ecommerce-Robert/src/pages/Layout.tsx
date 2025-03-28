import { Link, NavLink, Outlet, useLocation } from "react-router";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Badge, Box, Typography } from "@mui/material";
import logoimg from "../assets/logo.png";
import productsimg from "../assets/products-icon.png";
import productsimghover from "../assets/products-icon-hover.png";
import { Footercontent } from "../components/footercontent";

export const Layout = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [imgsource, setImgsource] = useState(productsimg);
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((a, i) => {
    return a + Number(i.quantity);
  }, 0);
  const [scrolling, setScrolling] = useState(false);
  const [active, setActive] = useState<boolean>(false);
  const location = useLocation(); 
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, []);

  const handleproductimgClick = () => {
    setImgsource(productsimghover); 
    setActive(true); 
  };

  const handleproductimgMouseOut = () => {
    if (!active) {
      setImgsource(productsimg); 
    }
  };

  useEffect(() => {
    if (location.pathname === "/products") {
      setImgsource(productsimghover);
      setActive(true);
    } else {
      setImgsource(productsimg);
      setActive(false); 
    }
  }, [location.pathname]); 


  return (
    <>
      <header
        style={{
          position: "fixed",
          zIndex: "1",
          display: "flex",
          justifyContent: "center",
          background: !scrolling
            ? "var(--primary-color)"
            : "linear-gradient(to bottom, var(--primary-color) 20%, rgba(34, 18, 69, 0) 150%)",
          transition: "background 0.3s ease",
          height: "4rem",
          boxShadow: !scrolling ? "0px 4px 6px rgba(0, 0, 0, 0.1)" : "none",
          width: "100dvw",
        }}
      ><nav
      style={{
        position: "relative",
        display: "flex",
        gap: "1rem",
        justifyContent: "center",
        alignItems: "center",
        width: "100dvw",
        maxWidth: "1800px",
      }}
    >
        <Box
          sx={{
            zIndex: "2",
            position: "absolute",
            left: "30px",
            top: "10px",
            height: "3rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <Link to={"/"}>
            <img
              src={logoimg}
              style={{
                height: "3rem",
              }}
            ></img>
          </Link>
          <Typography
            style={{
              color: "var(--accent-color)",
              fontSize: "3.4rem",
              fontFamily: "Red Rose, serif",
              fontWeight: 600,
            }}
          >
            Fast
          </Typography>
        </Box>

        
          <NavLink
            to={"/products"}
          >
            <img
               key={location.pathname}
              src={imgsource}
              alt="Products"
              style={{ height: "3rem" }}
              onMouseOver={() => setImgsource(productsimghover)}
              onMouseOut={handleproductimgMouseOut}
              onClick={handleproductimgClick}
            />
          </NavLink>
          <NavLink
            to={"/cart"}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              position: "absolute",
              right: "35px",
              color: "var(--text-color-blue)",
            }}
          >
            {!isHovered ? (
              <Badge badgeContent={totalItems} color="error">
                <ShoppingCartIcon sx={{ fontSize: "2rem" }} />
              </Badge>
            ) : (
              <ShoppingCartCheckoutIcon sx={{ fontSize: "2rem" }} />
            )}
          </NavLink>
        </nav>
      </header>
      <main
        style={{
          flex: "1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "4rem",
          minHeight: "calc(100dvh - 4rem - 12rem)",
        }}
      >
        <Outlet />
      </main>
      <footer
        style={{
          textAlign: "center",
          boxShadow: `
      -110px -20px 30px -25px rgba(0, 0, 0, 0.4), 
      110px -20px 30px -25px rgba(0, 0, 0, 0.4)
    `,
          height: "12rem",
          background: "var(--faded-color)",
        }}
      >
        <Footercontent></Footercontent>
      </footer>
    </>
  );
};
