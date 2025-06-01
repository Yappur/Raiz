import { ethers } from "ethers";
import Certification from "../artifacts/contracts/Certification.json";

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
const contractABI = Certification;

export const getCertificationById = async (provider, id) => {
  try {
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
    const certification = await contract.certificadosPorID(id);

    const details = {
      id: id,
      name: certification.name,
      productType: certification.productType,
      company: certification.company,
      description: certification.description,
      location: certification.location,
      productionDate: certification.productionDate,
      creationDate: certification.creationDate,
      link: `${import.meta.env.VITE_WEBSITE_URL}/certificates/${id}`,
    };

    return details;
  } catch (error) {
    console.log(error);
  }
};

export const getCertificationByAddress = async (provider, address) => {
  try {
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
    const certificationIdList = await contract.obtenerCertificadosDe(address);

    const idList = certificationIdList.map((id) => Number(id));

    if (idList.length >= 1) {
      const certificados = await Promise.all(
        idList.map((id) => getCertificationById(provider, id))
      );
      return certificados;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};

export const certificateProduct = async (signer, product) => {
  try {
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const tx = await contract.emitirCertificado(
      product.name,
      product.productType,
      product.company,
      product.description,
      product.location,
      product.productionDate,
      product.creationDate
    );

    const receipt = await tx.wait();

    // Buscar el evento "CertificadoEmitido"

    let certificadoId = null;

    for (const log of receipt.logs) {
      try {
        const parsedLog = contract.interface.parseLog(log);
        if (parsedLog.name === "CertificadoEmitido") {
          certificadoId = parsedLog.args.certificadoId.toString();
          break;
        }
      } catch (e) {
        console.log(e);
      }
    }

    if (!certificadoId) {
      console.warn("Evento CertificadoEmitido no encontrado.");
      return false;
    }

    return certificadoId;
  } catch (error) {
    console.error("Error en certificateProduct:", error);
    return false;
  }
};
