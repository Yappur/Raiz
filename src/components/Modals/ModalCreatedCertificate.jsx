import React from "react";
import usePDFExport from "../../hooks/usePDFExport";

const ModalCreatedCertificate = ({ isOpen, onClose, certificate }) => {
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
        <article className="bg-white rounded-lg shadow-xl max-w-[540px] p-8 w-full overflow-y-auto">
          <section className="flex flex-col gap-y-4">
            <h2>¡Certificado emitido correctamente!</h2>
            <p>
              Tu producto ahora cuenta con una credencial verificable vinculada
              a su origen y autenticidad. Compartí el código QR generado para
              que cualquiera pueda consultar la información registrada de forma
              transparente y segura
            </p>
            <div>
              <input type="text" disabled />
              <button>Copiar</button>
            </div>
          </section>
          <footer className="flex flex-col gap-y-4 mt-6">
            <button
              onClick={() => handleDownloadCertificate(certificate)}
              disabled={isExporting}
              className="py-2 px-4 text-center border border-black bg-black text-white text-sm cursor-pointer hover:bg-gray-800 transition-colors"
            >
              Descargar Certificado
            </button>
            <button
              onClick={onClose}
              className="py-2 px-4 text-center border border-black text-sm cursor-pointer hover:bg-gray-50 transition-colors"
            >
              Cerrar
            </button>
          </footer>
        </article>
      </div>
    </>
  );
};

export default ModalCreatedCertificate;
