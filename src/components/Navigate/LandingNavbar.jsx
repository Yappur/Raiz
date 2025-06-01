import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/RaizLogo.svg";
import { useStore } from "zustand";
import useWalletStore from "../../store/useWalletStore";
import useAppStore from "../../store/useAppStore";
import QRScannerModal from "../Modals/QRScannerModal.jsx";

import { AnimatePresence } from "framer-motion";

const LandingNavbar = ({ showQRScanner, setShowQRScanner }) => {
  const { address, isConnected, disconnectWallet, connectWallet } =
    useStore(useWalletStore);
  const { isLoading, setLoading, setToast } = useStore(useAppStore);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);

  const navigate = useNavigate();

  const getWalletButtonText = () => {
    if (isLoading) return "Conectando...";
    if (isConnected) return address?.meta?.name || "Wallet Conectada";
    return "Acceso Productores";
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const onWalletClick = async () => {
    setLoading(true);
    if (isConnected) {
      await disconnectWallet();
    } else {
      try {
        await connectWallet();
        navigate("/producers/new-certificate");
        setToast("¡Wallet conectada exitosamente!", "success");
      } catch (error) {
        if (error.message.includes("No se detectó ninguna wallet")) {
          setToast(error.message, "error");
        } else {
          setToast("Ha ocurrido un error al conectarse a la Wallet", "error");
        }
      }
    }
    setLoading(false);
  };

  const handleQRScan = (data) => {
    console.log("Código QR escaneado:", data);
    setScanSuccess(true);
    processQRData(data);
  };

  const processQRData = (qrData) => {
    try {
      if (qrData.startsWith("http://") || qrData.startsWith("https://")) {
        window.location.href = qrData;
        return;
      }
    } catch (error) {
      console.error("Error procesando QR:", error);
      setScanSuccess(true);
      setTimeout(() => setScanSuccess(false), 5000);
    }
  };

  return (
    <>
      <header className="relative z-10 mx-8 px-6 py-6 md:border-none border-b-2 border-black">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <img
                src={logo || "/placeholder.svg"}
                alt="logo"
                className="cursor-pointer"
                onClick={() => navigate("/")}
              />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-7">
            <button
              onClick={() => setShowQRScanner(true)}
              className="px-7 py-2 text-md font-medium border border-black transition-colors cursor-pointer relative hover:bg-black hover:text-white"
            >
              Escanear producto
            </button>
            <button
              onClick={onWalletClick}
              disabled={isLoading}
              className={`px-7 py-2 text-md font-medium border border-[#202715] transition-colors cursor-pointer relative ${
                isConnected
                  ? "bg-green-100 text-green-800 border-green-600 hover:bg-green-200"
                  : "bg-[#202715] hover:bg-[#14180e] transition-colors text-white "
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isConnected && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
              )}
              {getWalletButtonText()}
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1 focus:outline-none"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-black transition-all duration-300 ease-in-out ${
                isMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-black transition-all duration-300 ease-in-out ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-black transition-all duration-300 ease-in-out ${
                isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pt-6 pb-4 space-y-4 ">
            <button
              onClick={() => {
                setShowQRScanner(true);
                closeMenu();
              }}
              className="w-full px-7 py-3 text-md font-medium border border-black transition-colors cursor-pointer relative hover:bg-black hover:text-white text-center"
            >
              Escanear producto
            </button>

            <button
              onClick={() => {
                onWalletClick();
                closeMenu();
              }}
              disabled={isLoading}
              className={`w-full px-7 py-3 text-md font-medium border border-[#202715] transition-colors cursor-pointer relative ${
                isConnected
                  ? "bg-green-100 text-green-800 border-green-600 hover:bg-green-200"
                  : "bg-[#202715] hover:bg-[#14180e] transition-colors text-white"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isConnected && (
                <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full"></div>
              )}
              {getWalletButtonText()}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div
            className="md:hidden fixed inset-0 z-[-1]"
            onClick={closeMenu}
          ></div>
        )}
      </header>

      <AnimatePresence mode="wait">
        {showQRScanner && (
          <QRScannerModal
            key="qr-modal"
            isOpen={showQRScanner}
            onClose={() => setShowQRScanner(false)}
            onScan={handleQRScan}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default LandingNavbar;
