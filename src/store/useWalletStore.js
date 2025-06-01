import { create } from "zustand";
import { metamaskConnection } from "../utils/metamaskConnection";
import {
  getCertificationByAddress,
  getCertificationById,
} from "../utils/contractMethods";

// El ABI está en la propiedad 'abi' del objeto importado

const useWalletStore = create((set, get) => ({
  provider: undefined,
  signer: undefined,
  address: undefined,
  shortAddress: undefined,
  ensName: null,
  isConnected: false,

  connectWallet: async () => {
    const { provider, signer, address, ensName } = await metamaskConnection();
    set({
      provider,
      signer,
      address,
      ensName,
      isConnected: true,
      shortAddress: `${address?.slice(0, 8)}...${address?.slice(-8)}`,
    });
  },
  disconnectWallet: () => {
    setTimeout(
      () =>
        set({
          provider: undefined,
          signer: undefined,
          address: undefined,
          shortAddress: undefined,
          ensName: undefined,
          isConnected: false,
        }),
      100
    );
  },
  connectToContract: async () => {
    const { provider, address } = get();
    const certificationList = await getCertificationByAddress(
      provider,
      address
    );

    console.log(certificationList);
  },

  handleCertificationsByAddress: async () => {
    const { provider, address } = get();
    const certificationList = await getCertificationByAddress(
      provider,
      address
    );
    return certificationList;
  },

  handleCertificationById: async (id = 1) => {
    const { provider } = get();

    const certification = await getCertificationById(provider, id);
    console.log(certification);

    return certification;
  },

  getDisplayName: () => {
    const { ensName, shortAddress, address } = get();
    return ensName || shortAddress || address || "Sin conectar";
  },
}));

export default useWalletStore;
