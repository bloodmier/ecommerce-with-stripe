import { Box, Link, Typography } from "@mui/material"
import footerimg from "../assets/footer-styling.png"
import footerimgleft from "../assets/footer-styling-left.png"
export const Footercontent = () => {


    return(
      <Box sx={{
        display:"flex",
        position:"relative",
        width:"100%",
        height:"100%",
        justifyContent:"center",
        alignItems:"flex-start",
        color:"var(--text-color-blue)",
        gap:"5rem",
        overflow:"hidden",
      }}>
        <img src={footerimg} style={{
            position:"absolute",
            right:"0",
            bottom:"0",
            height:"10rem"
        }}></img>
        <img src={footerimgleft} style={{
            position:"absolute",
            left:"0",
            bottom:"0",
            height:"16rem"
        }}></img>
        <Box zIndex={"1"} paddingTop={"20px"}>
          <Typography variant="h6" gutterBottom color="var(--accent-color)">
          Company
          </Typography>
          <Box>
            <Link href="/" color="inherit" underline="hover">
            About us
            </Link>
          </Box>
          <Box>
            <Link href="/" color="inherit" underline="hover">
            Contact us
            </Link>
          </Box>
          <Box>
            <Link href="/" color="inherit" underline="hover">
            Terms of purchase
            </Link>
          </Box>
          <Box>
            <Link href="/admin" color="inherit" underline="hover">
            Login
            </Link>
          </Box>
        </Box>
        <Box sx={{ width:"2px",
                    height:"70%",
            backgroundColor:"#4a494b",
            marginTop:"20px"
        }}></Box>
        <Box zIndex={"1"} paddingTop={"20px"}>
          <Typography variant="h6" gutterBottom color="var(--accent-color)">
            Customerservice
          </Typography>
          <Box>
            <Link href="/" color="inherit" underline="hover">
              FAQ
            </Link>
          </Box>
          <Box>
            <Link href="/" color="inherit" underline="hover">
            Track order
            </Link>
          </Box>
          <Box>
            <Link href="/" color="inherit" underline="hover">
            Returns
            </Link>
          </Box>
          
        </Box>
        <Box sx={{ width:"2px",
                    height:"70%",
            backgroundColor:"#4a494b",
            marginTop:"20px"
        }}></Box>
        <Box zIndex={"1"} paddingTop={"20px"}>
          <Typography variant="h6" gutterBottom color="var(--accent-color)">
          Follow us
          </Typography>
          <Box>
            <Link href="https://facebook.com" color="inherit" underline="hover">
              Facebook
            </Link>
          </Box>
          <Box>
            <Link href="https://instagram.com" color="inherit" underline="hover">
              Instagram
            </Link>
          </Box>
          <Box>
            <Link href="https://twitter.com" color="inherit" underline="hover">
              Twitter
            </Link>
          </Box>
        </Box>
        
      <Box sx={{ marginTop: "2rem", position:"absolute", bottom:"0"}}>
        <Typography variant="body2">
          © {new Date().getFullYear()} Fast ab. All rights reserved.
        </Typography>
      </Box>
      </Box>
  );
}