import FormCertificate from "../FormCertificate";
const ModalFormCertificate = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleFormSubmit = (formData) => {
    onSubmit(formData);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50"></div>
      <div
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        onClick={handleOverlayClick}
      >
        <div className="bg-white rounded-lg shadow-xl max-w-3xl p-5 w-full overflow-y-auto">
          <div className="flex items-center justify-between p-5">
            <h2 className="text-3xl font-semibold text-black">
              Nuevo Certificado
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              X
            </button>
          </div>

          <div className="">
            <FormCertificate onSubmit={handleFormSubmit} onCancel={onClose} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalFormCertificate;
