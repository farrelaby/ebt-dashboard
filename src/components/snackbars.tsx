import { Snackbar, Alert } from "@mui/material";

export function ErrorSnackbar({
  toastOpen,
  toastHandler,
}: {
  toastOpen: boolean;
  toastHandler: { open: () => void; close: () => void };
}) {
  return (
    <Snackbar
      open={toastOpen}
      autoHideDuration={6000}
      onClose={toastHandler.close}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{ marginTop: "5rem", width: "20rem" }}
    >
      <Alert
        severity="error"
        sx={{
          width: "100%",
          border: "error.main",
          borderColor: "error.main",
          borderWidth: "1px",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
        }}
      >
        Tidak dapat tersambung ke server
      </Alert>
    </Snackbar>
  );
}
