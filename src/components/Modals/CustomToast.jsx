import { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useStore } from "zustand";
import useAppStore from "../../store/useAppStore.js";

const CustomToast = () => {
  const { toastMessage, toastType, closeToast } = useStore(useAppStore);

  useEffect(() => {
    const showToast = (message, type) => {
      const config = {
        style: {
          background: "#1a1a1a",
          color: "#fff",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#1a1a1a",
        },
      };

      if (type === "success") toast.success(message, config);
      if (type === "error") toast.error(message, config);
    };

    if (toastMessage) {
      showToast(toastMessage, toastType);
      setTimeout(() => {
        closeToast();
      }, 100);
    }
  }, [toastMessage, toastType, closeToast]);

  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        className: "",
        duration: 4000,
        style: {
          background: "#1a1a1a",
          color: "#ffffff",
          fontSize: "14px",
          fontWeight: "400",
          padding: "12px 18px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          borderRadius: "0px",
          maxWidth: "300px",
          width: "auto",
          whiteSpace: "normal",
        },
        success: {
          duration: 3000,
          style: {
            background: "#1a1a1a",
            color: "#fff",
            borderRadius: "0px",
            maxWidth: "700px",
            whiteSpace: "normal",
          },
        },
        error: {
          duration: 5000,
          style: {
            background: "#1a1a1a",
            color: "#fff",
            borderRadius: "0px",
            maxWidth: "700px",
            whiteSpace: "normal",
          },
        },
      }}
    />
  );
};

export default CustomToast;
