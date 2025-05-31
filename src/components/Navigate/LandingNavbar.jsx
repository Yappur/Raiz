import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/RaizLogo.svg";
import { useStore } from "zustand";
import useWalletStore from "../../store/useWalletStore";

const LandingNavbar = ({ onWalletClick, onQRScannerOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isLoading, address, isConnected } = useStore(useWalletStore);

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

  return (
    <>
      <header className="relative z-10 mx-8 px-6 py-6 md:border-none border-b-2 border-black">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <img src={logo || "/placeholder.svg"} alt="logo" />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-7">
            <button
              onClick={onQRScannerOpen}
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
                onQRScannerOpen();
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
    </>
  );
};

export default LandingNavbar;
