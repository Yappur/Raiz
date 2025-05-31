import { ethers } from "ethers";

export const metamaskConnection = async () => {
  let provider, signer, address;
  if (window.ethereum == null) {
    provider = ethers.getDefaultProvider();
    throw new Error(
      "No se detectó ninguna wallet. Verificá que esté instalada."
    );
  } else {
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    address = await signer.getAddress();
  }
  return { provider, signer, address };
};
