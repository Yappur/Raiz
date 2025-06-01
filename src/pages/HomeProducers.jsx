import { Link } from "react-router-dom";
import arrowLeft from "../assets/icons/arrowLeft.svg";
import bgHomeProducers64 from "../assets/background/bgHomeImage";
import corrugatedRightArrow from "../assets/background/corrugatedRightArrow.svg";
import corrugatedLeftArrow from "../assets/background/corrugatedLeftArrow.svg";
import botBroto from "../assets/background/BotBroto.png";

export default function HomeProducers() {
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

      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-16 min-h-screen">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-center">
          Bienvenida Constanza.
        </h1>

        <p className="text-lg md:text-xl text-gray-600 max-w-2xl text-center mb-16 leading-relaxed">
          Registrá tus productos y contá su historia desde el origen, con un
          certificado digital que respalda su autenticidad, trazabilidad y
          compromiso con la sostenibilidad.
        </p>

        <div className="relative w-full max-w-2xl mb-12">
          {/* Flecha Izquierda */}
          <div className="absolute left-0 bottom-1/4 transform -translate-x-4 lg:translate-x-8">
            <img
              src={corrugatedLeftArrow || "/placeholder.svg"}
              alt="Flecha izquierda"
              className="w-16 h-16 lg:w-44 lg:h-44"
            />
          </div>

          {/* Mascota Central con efecto flotante */}
          <div className="flex justify-center">
            <div className="animate-float">
              <img
                src={botBroto || "/placeholder.svg"}
                alt="Bot Broto"
                className="w-32 h-32 lg:w-64 lg:h-64"
              />
            </div>
          </div>

          {/* Flecha Derecha */}
          <div className="absolute right-0 bottom-1/4 transform translate-x-4 lg:-translate-x-8">
            <img
              src={corrugatedRightArrow || "/placeholder.svg"}
              alt="Flecha derecha"
              className="w-16 h-16 lg:w-44 lg:h-44"
            />
          </div>
        </div>

        {/* Sección de tarjetas */}
        <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl gap-8 lg:gap-32">
          {/* Tarjeta Izquierda - Emitir Certificado */}
          <Link to="/producers/new-certificate" className="mb-8 lg:mb-0">
            <div className="bg-white border border-black p-8 lg:p-12 transform -rotate-3 hover:rotate-0 transition-transform duration-300 shadow-xl hover:shadow-2xl cursor-pointer group">
              <div className="flex items-center space-x-4">
                <span className="text-lg lg:text-xl font-semibold text-gray-800">
                  Emití tu certificado
                </span>
                <img
                  src={arrowLeft || "/placeholder.svg"}
                  alt="Flecha"
                  className="w-6 h-6 lg:w-7 lg:h-7 text-gray-600 group-hover:translate-x-2 transition-transform duration-300"
                />
              </div>
            </div>
          </Link>

          {/* Tarjeta Derecha - Ver Certificados */}
          <Link to="/producers/my-certificates">
            <div className="bg-white border border-black p-8 lg:p-12 transform rotate-3 hover:rotate-0 transition-transform duration-300 shadow-xl hover:shadow-2xl cursor-pointer group">
              <div className="flex items-center space-x-4">
                <span className="text-lg lg:text-xl font-semibold text-gray-800">
                  Ver tus certificados
                </span>
                <img
                  src={arrowLeft || "/placeholder.svg"}
                  alt="Flecha"
                  className="w-6 h-6 lg:w-7 lg:h-7 text-gray-600 group-hover:translate-x-2 transition-transform duration-300"
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
