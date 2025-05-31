import { useState, useCallback } from "react";
import {
  web3Enable,
  web3Accounts,
  web3FromAddress,
} from "@polkadot/extension-dapp";
import { ApiPromise, WsProvider } from "@polkadot/api";

const useWalletConnection = () => {
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [api, setApi] = useState(null);

  const stringToHex = (str) => {
    return (
      "0x" +
      [...str]
        .map((c) => c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );
  };

  const connectWallet = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Habilitamos la extensión
      const extensions = await web3Enable("Mi dApp Web3");

      if (extensions.length === 0) {
        throw new Error("No se detectó la extensión Polkadot{.js} o Sporran");
      }

      // Filtrar solo Sporran
      const sporranExtension = extensions.find((ext) => ext.name === "Sporran");

      if (!sporranExtension) {
        throw new Error("Sporran no está instalada o no se detectó.");
      }

      // Obtener cuentas desde Sporran
      const accounts = await web3Accounts({
        extensions: [sporranExtension.name],
      });

      if (accounts.length === 0) {
        throw new Error("No hay cuentas en la extensión.");
      }

      const selectedAccount = accounts[0];
      console.log("Cuenta conectada:", selectedAccount);

      // Firmar mensaje (para autenticación)
      const message = "Estoy iniciando sesión en mi dApp";
      const injector = await web3FromAddress(selectedAccount.address);

      const signed = await injector.signer.signRaw({
        address: selectedAccount.address,
        data: stringToHex(message),
        type: "bytes",
      });

      console.log("Mensaje firmado:", signed.signature);

      // --- Conexión a la red Peregrine de KILT ---
      const wsProvider = new WsProvider("wss://peregrine.kilt.io");
      const apiInstance = await ApiPromise.create({ provider: wsProvider });

      console.log(
        "Conectado a la red Peregrine:",
        await apiInstance.rpc.system.chain()
      );

      // Actualizar estados
      setAccount(selectedAccount);
      setApi(apiInstance);
      setIsConnected(true);
    } catch (err) {
      console.error("Error conectando wallet:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const disconnectWallet = useCallback(async () => {
    try {
      if (api) {
        await api.disconnect();
      }
      setAccount(null);
      setApi(null);
      setIsConnected(false);
      setError(null);
    } catch (err) {
      console.error("Error desconectando:", err);
    }
  }, [api]);

  return {
    account,
    isConnected,
    isLoading,
    error,
    api,
    connectWallet,
    disconnectWallet,
  };
};

export default useWalletConnection;
