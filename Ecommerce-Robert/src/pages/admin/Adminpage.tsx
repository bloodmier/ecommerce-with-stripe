import { NavLink, Outlet } from "react-router";
export const Adminpage = () => {

    return <>
    <header  style={{
          display: "flex",
          backgroundColor: "var(--primary-color)",
          height: "4rem",
        }}>
      <nav style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            alignItems: "center",
            width: "100dvw",
          }}>
        <NavLink to={"/"}>home</NavLink>
        <NavLink to={"/admin/customers"}>customer</NavLink>
        <NavLink to={"/admin/products"}>products</NavLink>
        <NavLink to={"/admin/orders"} >orders</NavLink>
      </nav>
    </header>
    <main style={{
          flex: "1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100dvh - 4rem - 12rem)"
        }}>
      <Outlet />
    </main>
    <footer style={{
          textAlign: "center",
          
          height:"12rem",
          backgroundColor: "var(--primary-color)",
        }}></footer>
  </>
};