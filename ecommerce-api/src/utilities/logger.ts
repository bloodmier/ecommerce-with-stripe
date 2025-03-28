export const logError = (error: unknown) => {
  if (error instanceof Error) {
    console.error("Fullt Error-objekt:", error); 
    return error.message;
  } else {
    console.error("Okänt fel:", error); 
    return "Unknown error";
  }
};