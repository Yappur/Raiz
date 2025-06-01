import usePDFExport from "../../hooks/usePDFExport";
import Button from "../common/Button";
import QRCode from "react-qr-code";

const ModalCertificate = ({ isOpen, onClose, certificate }) => {
  if (!isOpen) return null;
  const { exportToPDF, isExporting } = usePDFExport();

  const handleDownloadCertificate = async (product) => {
    await exportToPDF([product]);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50"></div>
      <div
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        onClick={handleOverlayClick}
      >
        <article className="bg-white rounded-lg shadow-xl max-w-[540px] pb-8 px-8 w-full overflow-y-auto relative">
          <section className="absolute flex items-center justify-end right-10">
            <div className="bg-black pt-16 pb-4 px-4 flex items-end">
              <QRCode value={certificate.link} size={100} style={{border: "4px solid white"}} />
            </div>
          </section>
          <section className="flex flex-col gap-y-4 mt-24">
            <h2 className="font-semibold text-2xl mb-1">{certificate.name}</h2>
            <p className="font-light">
              <span className="font-medium">Tipo de producto: </span>
              {certificate.productType}
            </p>
            <p className="font-light">
              <span className="font-medium">Emisor: </span>
              {certificate.company}
            </p>
            <p className="font-light">
              <span className="font-medium">Fecha de Emision: </span>
              {certificate.creationDate}
            </p>
            <p className="font-light">
              <span className="font-medium">Fecha de Producción: </span>
              {certificate.date}
            </p>
            <p className="font-light">
              <span className="font-medium">Lugar de Producción: </span>
              {certificate.location}
            </p>
            <p className="font-light">
              <span className="font-medium">Link: </span>
              <a href={certificate.link} className="text-black">
                {certificate.link}
              </a>
            </p>
            <p className="font-light text-justify">
              <span className="font-medium">Descripción: </span>
              {certificate.description}
            </p>
          </section>
          <footer className="flex flex-col gap-y-4 mt-6">
            <Button
              onClick={handleDownloadCertificate}
              onClickParams={[certificate]}
              disabled={isExporting}
              color="primary"
            >
              Descargar Certificado
            </Button>
            <Button onClick={onClose} disabled={isExporting} color="secondary">
              Cerrar
            </Button>
          </footer>
        </article>
      </div>
    </>
  );
};

export default ModalCertificate;
