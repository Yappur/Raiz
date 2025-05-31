import FormCertificate from "../components/FormCertificate";
import useWalletStore from "../store/useWalletStore";

const ViewProducers = () => {
  const { getDisplayName } = useWalletStore();

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 mt-10">
        <div className="text-center mb-8 ">
          <h1 className="md:text-4xl sm:text-xl font-medium mb-4  text-gray-900">
            Bienvenido/a {getDisplayName()}.
          </h1>
          <p className="text-gray-600 text-lg">
            Emití el certificado de autenticidad de tu producto sostenible en
            segundos.
          </p>
        </div>
        <div>
          <FormCertificate />
        </div>
      </div>
    </div>
  );
};

export default ViewProducers;
