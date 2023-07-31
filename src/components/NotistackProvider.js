import { useRef } from "react";
import { SnackbarProvider } from "notistack";
import { Button } from "antd";

export default function NotistackProvider({ children }) {
  const notistackRef = useRef(null);

  const onClose = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <>
      <SnackbarProvider
        ref={notistackRef}
        dense
        maxSnack={5}
        persist
        preventDuplicate
        // autoHideDuration={15000}
        variant="success" // Set default variant
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        // With close as default
        action={(key) => (
          <Button size="small" onClick={onClose(key)} sx={{ p: 0.5 }}>
            X
          </Button>
        )}
      >
        {children}
      </SnackbarProvider>
    </>
  );
}
