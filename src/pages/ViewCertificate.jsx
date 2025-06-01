import { useEffect, useState } from "react";
import { getCertificationById } from "../utils/contractMethods";
import { JsonRpcProvider } from "ethers";
import { useParams } from "react-router-dom";
import LandingNavbar from "../components/Navigate/LandingNavbar";
import { useStore } from "zustand";
import useAppStore from "../store/useAppStore";
import usePDFExport from "../hooks/usePDFExport";
import Button from "../components/common/Button";

function ViewCertificate() {
  const { id } = useParams();
  const { setLoading, isLoading } = useStore(useAppStore);
  const { exportToPDF, isExporting } = usePDFExport();

  const [certificate, setCertificate] = useState();
  const [showQRScanner, setShowQRScanner] = useState(false);

  const handleDownloadCertificate = async (certificate) => {
    await exportToPDF([certificate]);
  };

  useEffect(() => {
    const handleCertification = async () => {
      setLoading(true);
      const provider = new JsonRpcProvider(
        "https://rpc.api.moonbase.moonbeam.network"
      );
      const certification = await getCertificationById(provider, id);
      console.log(certification);
      setCertificate(certification);
      setLoading(false);
    };
    handleCertification();
  }, [id, setLoading]);

  return (
    <main>
      <LandingNavbar
        showQRScanner={showQRScanner}
        setShowQRScanner={setShowQRScanner}
      />
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500">Obteniendo certificado...</div>
        </div>
      ) : (
        <article className="justify-center flex flex-col-reverse px-4 md:flex-row gap-4 mt-8">
          <section className="flex flex-col gap-y-6 md:gap-y-8 md:max-w-[50%]">
            <h2 className="font-semibold text-2xl mb-1">{certificate?.name}</h2>
            <p className="font-light">
              <span className="font-medium">Tipo de producto: </span>
              {certificate?.productType}
            </p>
            <p className="font-light">
              <span className="font-medium">Fecha de Emision: </span>
              {certificate?.creationDate}
            </p>
            <p className="font-light">
              <span className="font-medium">Fecha de Producción: </span>
              {certificate?.productionDate}
            </p>
            <p className="font-light">
              <span className="font-medium">Lugar de Producción: </span>
              {certificate?.location}
            </p>
            <p className="font-light">
              <span className="font-medium">Emisor: </span>
              {certificate?.company}
            </p>
            <p className="font-light">
              <span className="font-medium">Link: </span>
              {certificate?.link}
            </p>
            <p className="font-light text-justify">
              <span className="font-medium">Descripción: </span>
              {certificate?.description}
            </p>
            <footer className="flex gap-x-4 mt-6 w-full">
              <Button
                onClick={handleDownloadCertificate}
                onClickParams={[certificate]}
                disabled={isExporting}
                className="text-sm w-[320px]"
              >
                Descargar Certificado
              </Button>
            </footer>
          </section>
          <section className="flex items-center justify-center md:items-start">
            <div className="bg-black w-60 h-60"></div>
          </section>
        </article>
      )}
    </main>
  );
}

export default ViewCertificate;
