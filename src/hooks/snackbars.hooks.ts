import { useState } from "react";

export const useErrorSnackbar = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const snackbarHandler = {
    open: () => setSnackbarOpen(true),
    close: () => setSnackbarOpen(false),
  };
  return { snackbarOpen, snackbarHandler };
};
