import { Box, CircularProgress } from "@mui/material";

export const Loading = () => {





    return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <CircularProgress
            sx={{
              color: "var(--accent-color)", 
              width: "60px",
              height: "60px", 
            }}
          />
        </Box>
      );
    };
    
