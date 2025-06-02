import { useState } from "react";
import usePDFExport from "../../hooks/usePDFExport";

const ModalCreatedCertificate = ({ isOpen, onClose, certificate }) => {
  const [copied, setCopied] = useState(false);
  // Los hooks SIEMPRE deben estar al inicio, antes de cualquier early return
  const { exportToPDF, isExporting } = usePDFExport();

  // Early return DESPUÉS de todos los hooks
  if (!isOpen) return null;

  const handleDownloadCertificate = async (product) => {
    await exportToPDF([product]);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(certificate.link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error al copiar:", err);
      const textArea = document.createElement("textarea");
      textArea.value = certificate.link;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50"></div>
      <div
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        onClick={handleOverlayClick}
      >
        <article className="bg-white shadow-xl max-w-[540px] p-8 w-full overflow-y-auto">
          <section className="flex flex-col gap-y-4">
            <h2 className="text-xl flex justify-center items-center font-semibold text-gray-900">
              ¡Certificado emitido correctamente!
            </h2>
            <p className="text-black text-sm leading-relaxed">
              Tu producto ahora cuenta con una credencial verificable vinculada
              a su origen y autenticidad. <br /> Compartí el código QR generado
              para que cualquiera pueda consultar la información registrada de
              forma transparente y segura
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={certificate.link}
                disabled
                className="flex-1 px-3 py-2 border border-gray-300 bg-gray-50 text-gray-500 text-sm"
              />
              <button
                onClick={handleCopyUrl}
                className={`px-4 py-2 bordertext-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  copied
                    ? "bg-green-100 border-green-300 text-green-700"
                    : "bg-black hover:bg-gray-800 cursor-pointer text-white"
                }`}
              >
                {copied ? "Copiado!" : "Copiar"}
              </button>
            </div>
            {copied && (
              <p className="text-green-600 text-sm flex items-center gap-1">
                <span>✓</span> URL copiada al portapapeles
              </p>
            )}
          </section>
          <footer className="flex flex-col gap-y-4 mt-6">
            <button
              onClick={() => handleDownloadCertificate(certificate)}
              disabled={isExporting}
              className={`py-2 px-4 text-center border border-black text-white text-sm transition-colors ${
                isExporting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800 cursor-pointer"
              }`}
            >
              {isExporting ? "Descargando..." : "Descargar Certificado"}
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
