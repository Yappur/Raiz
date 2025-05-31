import { NavLink, useNavigate } from "react-router-dom";
import RaizFavicon from "../../assets/RaizFavicon.svg?react";
import HomeIcon from "../../assets/icons/homeIcon.svg?react";
import FolderIcon from "../../assets/icons/folderIcon.svg?react";
import ExitIcon from "../../assets/icons/exitIcon.svg?react";
import { useStore } from "zustand";
import useWalletStore from "../../store/useWalletStore";

export const Sidebar = () => {
  const { disconnectWallet } = useStore(useWalletStore);

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    disconnectWallet();
  };

  return (
    <aside className="bg-sidebar fixed bottom-0 left-0 w-full h-[80px] flex flex-row items-center justify-between px-4 py-2 md:max-w-[100px] md:h-screen md:w-[100px] md:flex-col md:justify-between md:px-8 md:py-8 md:top-0 md:bottom-auto">
      <div className="hidden md:block">
        <RaizFavicon />
      </div>

      <div className="flex flex-row gap-6 md:flex-col md:gap-8">
        <NavLink to="/Producers">
          {({ isActive }) => (
            <HomeIcon
              className="hover:stroke-icon-hover transition-colors w-6 h-6 md:w-auto md:h-auto"
              stroke={isActive ? "#FF7F40" : "black"}
            />
          )}
        </NavLink>

        <NavLink to={"/products"}>
          {({ isActive }) => (
            <FolderIcon
              className="hover:stroke-icon-hover transition-colors w-6 h-6 md:w-auto md:h-auto"
              stroke={isActive ? "#FF7F40" : "black"}
            />
          )}
        </NavLink>
      </div>

      <button onClick={handleLogout}>
        <ExitIcon
          className="hover:stroke-icon-hover transition-colors cursor-pointer w-6 h-6 md:w-auto md:h-auto"
          stroke="black"
        />
      </button>
    </aside>
  );
};
