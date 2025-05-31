const ModalCertificate = ({ isOpen, onClose, certificate }) => {
  if (!isOpen) return null;

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
          <section className="flex flex-col gap-y-4 mt-16">
            <h2 className="font-semibold text-2xl mb-1">{certificate.name}</h2>
            <p className="font-light">
              <span className="font-medium">Tipo de producto: </span>
              {certificate.type}
            </p>
            <p className="font-light">
              <span className="font-medium">Emisor: </span>
              {certificate.source}
            </p>
            <p className="font-light">
              <span className="font-medium">Fecha de Emision: </span>
              {certificate.date}
            </p>
            <p className="font-light">
              <span className="font-medium">Fecha de Producción: </span>
              {certificate.date}
            </p>
            <p className="font-light">
              <span className="font-medium">Lugar de Producción: </span>
              {certificate.location}
            </p>
            <p className="font-light text-justify">
              <span className="font-medium">Descripción: </span>
              {certificate.description}
            </p>
          </section>
          <footer className="flex flex-col gap-y-4 mt-6">
            <button className="py-2 px-4 text-center border border-black bg-black text-white text-sm cursor-pointer hover:bg-gray-800 transition-colors">
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

export default ModalCertificate;
