import { useState } from "react";
import arrowDown from "../assets/icons/arrowDown.svg";
import calendar from "../assets/icons/calendarIcon.svg";
import { useStore } from "zustand";
import useAppStore from "../store/useAppStore";

const FormCertificate = () => {
  const { setToast } = useStore(useAppStore);

  const [fecha, setFecha] = useState("");
  const [mostrarCalendar, setMostrarCalendar] = useState(false);
  const [tipoProducto, setTipoProducto] = useState("");
  const [lugarProduccion, setLugarProduccion] = useState("");
  const [mostrarTipoSelect, setMostrarTipoSelect] = useState(false);
  const [mostrarLugarSelect, setMostrarLugarSelect] = useState(false);

  // Estados para los campos del formulario
  const [nombre, setNombre] = useState("");
  const [emisor, setEmisor] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [errores, setErrores] = useState({});

  const formatearFecha = (fechaString) => {
    if (!fechaString) return "";
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const tiposProducto = [
    { value: "indumentaria", label: "Indumentaria" },
    { value: "alimento", label: "Alimento" },
    { value: "artesania", label: "Artesanía" },
    { value: "cosmetica", label: "Cosmética" },
    { value: "otro", label: "Otro" },
  ];

  const lugaresProduccion = [
    { value: "buenosaires", label: "Buenos Aires" },
    { value: "cordoba", label: "Córdoba" },
    { value: "mendoza", label: "Mendoza" },
    { value: "otro", label: "Otro" },
  ];

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!nombre.trim()) {
      nuevosErrores.nombre = "Este campo es obligatorio";
    }

    if (!tipoProducto) {
      nuevosErrores.tipoProducto = "Este campo es obligatorio";
    }

    if (!emisor.trim()) {
      nuevosErrores.emisor = "Este campo es obligatorio";
    }

    // Corregido: removido la "L" extra en el mensaje de error
    if (!cantidad || cantidad <= 0) {
      nuevosErrores.cantidad = "Este campo es obligatorio";
    }

    if (!descripcion.trim()) {
      nuevosErrores.descripcion = "Este campo es obligatorio";
    }

    if (!fecha) {
      nuevosErrores.fecha = "Este campo es obligatorio";
    }

    if (!lugarProduccion) {
      nuevosErrores.lugarProduccion = "Este campo es obligatorio";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      console.log("Formulario enviado con éxito");
      const datosFormulario = {
        nombre,
        tipoProducto,
        emisor,
        cantidad,
        descripcion,
        fecha,
        lugarProduccion,
      };
      console.log(datosFormulario);
      setToast("¡Certificado emitido con éxito!", "success");
    } else {
      console.log("Formulario con errores");
      setToast("Por favor, completa todos los campos requeridos.", "error");
    }
  };

  const limpiarFormulario = () => {
    setNombre("");
    setTipoProducto("");
    setEmisor("");
    setCantidad("");
    setDescripcion("");
    setFecha("");
    setLugarProduccion("");
    setErrores({});
    setMostrarCalendar(false);
    setMostrarTipoSelect(false);
    setMostrarLugarSelect(false);
  };

  return (
    <div className="w-full flex justify-center px-4 py-8">
      <div className="w-full max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-medium mb-1"
              >
                Nombre del producto
              </label>
              <input
                id="nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                  errores.nombre ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Ingrese el nombre del producto"
              />
              {errores.nombre && (
                <p className="text-red-500 text-sm mt-1">{errores.nombre}</p>
              )}
            </div>

            <div className="relative">
              <label htmlFor="tipo" className="block text-sm font-medium mb-1">
                Tipo de producto
              </label>
              <button
                type="button"
                className={`w-full px-3 py-2 border rounded-md shadow-sm text-left focus:outline-none focus:ring-2 focus:ring-orange-400 flex justify-between items-center ${
                  errores.tipoProducto ? "border-red-500" : "border-gray-300"
                }`}
                onClick={() => setMostrarTipoSelect(!mostrarTipoSelect)}
              >
                <span
                  className={tipoProducto ? "text-gray-900" : "text-gray-400"}
                >
                  {tipoProducto
                    ? tiposProducto.find((t) => t.value === tipoProducto)?.label
                    : "Ej: Indumentaria, Alimento..."}
                </span>
                <img src={arrowDown} alt="arrowDown" className="h-5 w-5" />
              </button>
              {mostrarTipoSelect && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  {tiposProducto.map((tipo) => (
                    <button
                      key={tipo.value}
                      type="button"
                      className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none first:rounded-t-md last:rounded-b-md"
                      onClick={() => {
                        setTipoProducto(tipo.value);
                        setMostrarTipoSelect(false);
                      }}
                    >
                      {tipo.label}
                    </button>
                  ))}
                </div>
              )}
              {errores.tipoProducto && (
                <p className="text-red-500 text-sm mt-1">
                  {errores.tipoProducto}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="emisor"
                className="block text-sm font-medium mb-1"
              >
                Emisor
              </label>
              <input
                id="emisor"
                type="text"
                value={emisor}
                onChange={(e) => setEmisor(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                  errores.emisor ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Ej. Fundación EcoRaíz"
              />
              {errores.emisor && (
                <p className="text-red-500 text-sm mt-1">{errores.emisor}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="cantidad"
                className="block text-sm font-medium mb-1"
              >
                Cantidad
              </label>
              <input
                id="cantidad"
                type="number"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                  errores.cantidad ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Ingrese la cantidad"
                min="1"
              />
              {errores.cantidad && (
                <p className="text-red-500 text-sm mt-1">{errores.cantidad}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="descripcion"
              className="block text-sm font-medium mb-1"
            >
              Descripción
            </label>
            <textarea
              id="descripcion"
              rows={3}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-vertical ${
                errores.descripcion ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Describe el producto, su origen o proceso."
            />
            {errores.descripcion && (
              <p className="text-red-500 text-sm mt-1">{errores.descripcion}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium mb-1">
                Fecha de producción
              </label>
              <button
                type="button"
                className={`w-full px-3 py-2 border rounded-md shadow-sm text-left focus:outline-none focus:ring-2 focus:ring-orange-400 flex justify-between items-center ${
                  errores.fecha ? "border-red-500" : "border-gray-300"
                }`}
                onClick={() => setMostrarCalendar(!mostrarCalendar)}
              >
                <span className={fecha ? "text-gray-900" : "text-gray-500"}>
                  {fecha ? formatearFecha(fecha) : "Elegí una fecha"}
                </span>
                <div>
                  <img src={calendar} alt="calendar" className="h-5 w-5" />
                </div>
              </button>
              {mostrarCalendar && (
                <div className="absolute z-10 mt-1 p-3 bg-white border border-gray-300 rounded-md shadow-lg">
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    value={fecha}
                    onChange={(e) => {
                      setFecha(e.target.value);
                      setMostrarCalendar(false);
                    }}
                  />
                </div>
              )}
              {errores.fecha && (
                <p className="text-red-500 text-sm mt-1">{errores.fecha}</p>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-medium mb-1">
                Lugar de producción
              </label>
              <button
                type="button"
                className={`w-full px-3 py-2 border rounded-md shadow-sm text-left focus:outline-none focus:ring-2 focus:ring-orange-400 flex justify-between items-center ${
                  errores.lugarProduccion ? "border-red-500" : "border-gray-300"
                }`}
                onClick={() => setMostrarLugarSelect(!mostrarLugarSelect)}
              >
                <span
                  className={
                    lugarProduccion ? "text-gray-900" : "text-gray-400"
                  }
                >
                  {lugarProduccion
                    ? lugaresProduccion.find((l) => l.value === lugarProduccion)
                        ?.label
                    : "Elegí un lugar desde el dropdown"}
                </span>

                <img src={arrowDown} alt="arrowDown" className="h-5 w-5" />
              </button>
              {mostrarLugarSelect && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  {lugaresProduccion.map((lugar) => (
                    <button
                      key={lugar.value}
                      type="button"
                      className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none first:rounded-t-md last:rounded-b-md"
                      onClick={() => {
                        setLugarProduccion(lugar.value);
                        setMostrarLugarSelect(false);
                      }}
                    >
                      {lugar.label}
                    </button>
                  ))}
                </div>
              )}
              {errores.lugarProduccion && (
                <p className="text-red-500 text-sm mt-1">
                  {errores.lugarProduccion}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={limpiarFormulario}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#202715] hover:bg-[#14180e] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
            >
              Emitir Certificado
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormCertificate;
