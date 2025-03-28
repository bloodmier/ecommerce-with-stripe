import { Box, Button, Typography } from "@mui/material";

export const Errorpage = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f8d7da"
    >
      <Typography variant="h1" component="h1" color="#721c24" gutterBottom>
        Oops! Something went terribly wrong...
      </Typography>
      <Typography variant="body1" color="#721c24" >
        The internet gremlins are at it again. But don’t worry, we’ve sent for reinforcements.
      </Typography>
      <Button variant="contained" color="error" onClick={handleRefresh}>
        Give it another shot!
      </Button>
      <Typography variant="caption" color="#721c24" style={{ marginTop: '20px' }}>
        If this keeps happening, consider blaming the gremlins or your WiFi!
      </Typography>
    </Box>
  );
};