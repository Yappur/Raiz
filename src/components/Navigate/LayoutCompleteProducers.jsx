import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Sidebar } from "./SideBar";
import { useStore } from "zustand";
import useWalletStore from "../../store/useWalletStore";
import useAppStore from "../../store/useAppStore";

const LayoutCompleteProducers = () => {
  const { isConnected } = useStore(useWalletStore);
  const { setToast } = useStore(useAppStore);

  useEffect(() => {
    if (!isConnected) {
      setToast(
        "Por favor, conecte su wallet de MetaMask para acceder",
        "error"
      );
    }
  }, [isConnected, setToast]);

  if (!isConnected) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className=" pb-[80px] md:pl-[100px] md:pb-0 min-h-screen flex justify-center">
        <div className="w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default LayoutCompleteProducers;
