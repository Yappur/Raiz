import { Link } from "react-router-dom";
import arrowLeft from "../assets/icons/arrowLeft.svg";
import bgHomeProducers64 from "../assets/background/bgHomeImage";

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

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-16 min-h-screen">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-center">
          Bienvenida Constanza.
        </h1>

        <p className="text-lg md:text-xl text-gray-600 max-w-2xl text-center mb-16 leading-relaxed">
          Registrá tus productos y contá su historia desde el origen, con un
          certificado digital que respalda su autenticidad, trazabilidad y
          compromiso con la sostenibilidad.
        </p>

        <div className="relative flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl">
          {/* Tarjeta Izquierda - Emitir Certificado */}
          <Link
            to="/producers/new-certificate"
            className="lg:absolute lg:left-0 mb-8 lg:mb-0"
          >
            <div className="bg-white border border-black p-12 transform -rotate-3 hover:rotate-0 transition-transform duration-300 shadow-xl hover:shadow-2xl cursor-pointer group">
              <div className="flex items-center space-x-4">
                <span className="text-xl font-semibold text-gray-800">
                  Emití tu certificado
                </span>
                <img
                  src={arrowLeft}
                  alt="Flecha"
                  className="w-7 h-7 text-gray-600 group-hover:translate-x-2 transition-transform duration-300"
                />
              </div>
            </div>
          </Link>

          {/* Mascota Central */}
          <div className="flex-shrink-0 mb-8 lg:mb-0"></div>

          {/* Tarjeta Derecha - Ver Certificados */}
          <Link
            to="/producers/my-certificates"
            className="lg:absolute lg:right-0"
          >
            <div className="bg-white border border-black p-12 transform rotate-3 hover:rotate-0 transition-transform duration-300 shadow-xl hover:shadow-2xl cursor-pointer group">
              <div className="flex items-center space-x-4">
                <span className="text-xl font-semibold text-gray-800">
                  Ver tus certificados
                </span>
                <img
                  src={arrowLeft}
                  alt="Flecha"
                  className="w-7 h-7 text-gray-600 group-hover:translate-x-2 transition-transform duration-300"
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
