import { Button } from "@mui/material";
import Bgtool from "../assets/Digital-tools.jpg";

export const Homepage = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${Bgtool})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "calc(100dvh - 4rem - 12rem)",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "800px",
          color: "whitesmoke",
          position: "relative",
          marginBottom: "10rem",
        }}
      >
        <h1 style={{ margin: "0" }}>
          Get your <span style={{ color: "var(--accent-color)" }}>tools</span>{" "}
          here
        </h1>
        <h1 style={{ paddingLeft: "40px", margin: "0" }}>
          for lightning-fast delivery
        </h1>
        <h2 style={{ paddingLeft: "60px", margin: "0" }}>
          —because time waits for no one!
        </h2>
        <Button
          href="/products"
          variant="contained"
          size="large"
          sx={{ position: "absolute", right: "150px", bottom: "-50px" }}
        >
          Buy here
        </Button>
      </div>
    </div>
  );
};
