import { create } from "zustand";
import { metamaskConnection } from "../utils/metamaskConnection";

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
  getDisplayName: () => {
    const { ensName, shortAddress, address } = get();
    return ensName || shortAddress || address || "Sin conectar";
  },
}));

export default useWalletStore;
