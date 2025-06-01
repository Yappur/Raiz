import { Link } from "react-router-dom";
import arrowLeft from "../assets/icons/arrowLeft.svg";
import bgHomeProducers64 from "../assets/background/bgHomeImage";
import corrugatedRightArrow from "../assets/background/corrugatedRightArrow.svg";
import corrugatedLeftArrow from "../assets/background/corrugatedLeftArrow.svg";
import botBroto from "../assets/background/BotBroto.png";
import useWalletStore from "../store/useWalletStore";

export default function HomeProducers() {
  const { getDisplayName } = useWalletStore();
  return (
    <>
      <div
        className="fixed bottom-0 right-0 w-auto h-auto max-w-full max-h-full z-0 pointer-events-none hidden lg:block"
        style={{
          backgroundImage: `url(${bgHomeProducers64})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom right",
          width: "100%",
          height: "100%",
          right: "20%",
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 min-h-screen">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 text-center leading-tight">
          Bienvenido/a {getDisplayName()}.
        </h1>

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl text-center mb-4 sm:mb-6 lg:mb-8 leading-relaxed px-2">
          Registrá tus productos y contá su historia desde el origen, con un
          certificado digital que respalda su autenticidad, trazabilidad y
          compromiso con la sostenibilidad.
        </p>

        <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl mb-8 sm:mb-8 lg:mb-11">
          {/* Flecha Izquierda */}
          <div className="absolute left-2 sm:left-4 md:left-8 lg:left-12 top-1/2 transform -translate-y-1/2 -translate-x-2 sm:-translate-x-4 lg:translate-x-0">
            <div>
              <img
                src={corrugatedLeftArrow || "/placeholder.svg"}
                alt="Flecha izquierda"
                className="hidden lg:block lg:w-32 lg:h-32 xl:w-44 xl:h-44 opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <div className="hover:animate-bounce drop-shadow-lg hover:drop-shadow-xl transition-all duration-300">
              <img
                src={botBroto || "/placeholder.svg"}
                alt="Bot Broto - Tu asistente digital"
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-56 lg:h-56 xl:w-64 xl:h-64 hover:scale-105 transition-transform duration-300"
                style={{
                  animation: "float 4s ease-in-out infinite",
                }}
              />
            </div>
          </div>

          {/* Flecha Derecha */}
          <div className="absolute right-2 sm:right-4 md:right-8 lg:right-12 top-1/2 transform -translate-y-1/2 translate-x-2 sm:translate-x-4 lg:-translate-x-0">
            <div className="">
              <img
                src={corrugatedRightArrow || "/placeholder.svg"}
                alt="Flecha derecha"
                className="hidden lg:block lg:w-32 lg:h-32 xl:w-44 xl:h-44 opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-col lg:flex-row items-center justify-center w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl gap-6 sm:gap-8 lg:gap-16 xl:gap-32">
          <Link
            to="/producers/new-certificate"
            className="w-full sm:w-auto group"
            aria-label="Emitir nuevo certificado"
          >
            <div className="bg-white border border-black p-6 sm:p-8 lg:p-10 xl:p-12 transform -rotate-1 sm:-rotate-2 lg:-rotate-3 hover:rotate-0 transition-all duration-500 shadow-lg hover:shadow-2xl cursor-pointer group-hover:scale-105">
              <div className="flex items-center justify-center sm:justify-start space-x-3 sm:space-x-4">
                <span className="text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold text-gray-800 text-center sm:text-left">
                  Emití tu certificado
                </span>
                <img
                  src={arrowLeft || "/placeholder.svg"}
                  alt="Ir a emitir certificado"
                  className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 text-gray-600 group-hover:translate-x-2 transition-transform duration-300 flex-shrink-0"
                />
              </div>
            </div>
          </Link>

          {/* Tarjeta Derecha - Ver Certificados */}
          <Link
            to="/producers/my-certificates"
            className="w-full sm:w-auto group"
            aria-label="Ver mis certificados"
          >
            <div className="bg-white border border-black p-6 sm:p-8 lg:p-10 xl:p-12 transform rotate-1 sm:rotate-2 lg:rotate-3 hover:rotate-0 transition-all duration-500 shadow-lg hover:shadow-2xl cursor-pointer group-hover:scale-105">
              <div className="flex items-center justify-center sm:justify-start space-x-3 sm:space-x-4">
                <span className="text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold text-gray-800 text-center sm:text-left">
                  Ver tus certificados
                </span>
                <img
                  src={arrowLeft || "/placeholder.svg"}
                  alt="Ir a mis certificados"
                  className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 text-gray-600 group-hover:translate-x-2 transition-transform duration-300 flex-shrink-0"
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
