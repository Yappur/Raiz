import { useState } from "react";
import arrowDown from "../assets/icons/arrowDown.svg";
import calendar from "../assets/icons/calendarIcon.svg";
import { useStore } from "zustand";
import useAppStore from "../store/useAppStore";
import SelectLocation from "./common/SelectLocation";
import ModalCreatedCertificate from "./Modals/ModalCreatedCertificate";

import useWalletStore from "../store/useWalletStore";
import { certificateProduct } from "../utils/contractMethods";
import Button from "./common/Button";

const FormCertificate = () => {
  const { setToast } = useStore(useAppStore);
  const { signer, isConnected } = useWalletStore();

  const [fecha, setFecha] = useState("");
  const [mostrarCalendar, setMostrarCalendar] = useState(false);
  const [tipoProducto, setTipoProducto] = useState("");
  const [lugarProduccion, setLugarProduccion] = useState("");
  const [mostrarTipoSelect, setMostrarTipoSelect] = useState(false);

  const [nombre, setNombre] = useState("");
  const [emisor, setEmisor] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [errores, setErrores] = useState({});
  const [loading, setLoading] = useState(false);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [certificadoCreado, setCertificadoCreado] = useState(null);

  const formatearFecha = (fechaString) => {
    if (!fechaString) return "";
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString("es-AR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const tiposProducto = [
    { value: "Indumentaria", label: "Indumentaria" },
    { value: "Tecnologia", label: "Tecnología" },
    { value: "Alimentos", label: "Alimentos" },
    { value: "Bebidas", label: "Bebidas" },
    { value: "Calzado", label: "Calzado" },
    { value: "Artesaniía", label: "Artesanía" },
    { value: "Cosméticos", label: "Cosméticos" },
    { value: "Mobiliario", label: "Mobiliario" },
    { value: "Joyería", label: "Joyería" },
    { value: "Papelería", label: "Papelería" },
    { value: "Textiles", label: "Textiles" },
    { value: "Otro", label: "Otro." },
  ];

  const validarFormulario = () => {
    const nuevosErrores = {};
    let primerError = null;

    if (!nombre.trim()) {
      nuevosErrores.nombre = "Este campo es obligatorio";
      if (!primerError) primerError = "El nombre del producto es obligatorio";
    } else if (nombre.trim().length > 64) {
      nuevosErrores.nombre = "Máximo 64 caracteres";
      if (!primerError)
        primerError =
          "El nombre del producto no puede exceder los 64 caracteres";
    }

    if (!tipoProducto) {
      nuevosErrores.tipoProducto = "Este campo es obligatorio";
      if (!primerError) primerError = "Debes seleccionar un tipo de producto";
    }

    if (!emisor.trim()) {
      nuevosErrores.emisor = "Este campo es obligatorio";
      if (!primerError) primerError = "El emisor es obligatorio";
    } else if (emisor.trim().length > 100) {
      nuevosErrores.emisor = "Máximo 100 caracteres";
      if (!primerError)
        primerError = "El emisor no puede exceder los 100 caracteres";
    }

    // Validación descripción
    if (!descripcion.trim()) {
      nuevosErrores.descripcion = "Este campo es obligatorio";
      if (!primerError) primerError = "La descripción es obligatoria";
    } else if (descripcion.trim().length < 50) {
      nuevosErrores.descripcion = "Mínimo 50 caracteres";
      if (!primerError)
        primerError = "La descripción debe tener al menos 50 caracteres";
    } else if (descripcion.trim().length > 300) {
      nuevosErrores.descripcion = "Máximo 300 caracteres";
      if (!primerError)
        primerError = "La descripción no puede exceder los 300 caracteres";
    }

    if (!fecha) {
      nuevosErrores.fecha = "Este campo es obligatorio";
      if (!primerError) primerError = "La fecha de producción es obligatoria";
    }

    if (!lugarProduccion.trim()) {
      nuevosErrores.lugarProduccion = "Este campo es obligatorio";
      if (!primerError) primerError = "El lugar de producción es obligatorio";
    }

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0 && primerError) {
      setToast(primerError, "error");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isConnected || !signer) {
      setToast("Debes conectar tu wallet primero", "error");
      return;
    }

    if (validarFormulario()) {
      setLoading(true);

      try {
        const datosFormulario = {
          name: nombre,
          productType: tipoProducto,
          company: emisor,
          description: descripcion,
          location: lugarProduccion,
          productionDate: fecha,
          creationDate: new Date().toISOString().split("T")[0],
        };

        const certificationId = await certificateProduct(
          signer,
          datosFormulario
        );

        if (certificationId) {
          setCertificadoCreado({
            ...datosFormulario,
            id: certificationId,
            link: `${
              import.meta.env.VITE_WEBSITE_URL
            }/certificates/${certificationId}`,
          });
          setModalAbierto(true);
          setToast("¡Certificado emitido en blockchain con éxito!", "success");
        } else {
          setToast("Error al emitir el certificado", "error");
        }
      } catch (error) {
        console.error("Error al emitir certificado:", error);
        setToast("Error al emitir el certificado en blockchain", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setCertificadoCreado(null);
    limpiarFormulario();
  };

  const limpiarFormulario = () => {
    setNombre("");
    setTipoProducto("");
    setEmisor("");
    setDescripcion("");
    setFecha("");
    setLugarProduccion("");
    setErrores({});
    setMostrarCalendar(false);
    setMostrarTipoSelect(false);
  };

  return (
    <>
      <div className="w-full flex justify-center px-4 py-8">
        <div className="w-full max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium mb-1"
                >
                  Nombre del producto*{" "}
                </label>
                <input
                  id="nombre"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className={`w-full px-3 py-2 border shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                    errores.nombre ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Ingrese el nombre del producto"
                  maxLength="64"
                />
                <div className="flex justify-between items-center mt-1">
                  {errores.nombre ? (
                    <p className="text-red-500 text-sm">{errores.nombre}</p>
                  ) : (
                    <div></div>
                  )}
                  <span className="text-xs text-gray-400">
                    {nombre.length}/64
                  </span>
                </div>
              </div>

              <div className="relative">
                <label
                  htmlFor="tipo"
                  className="block text-sm font-medium mb-1"
                >
                  Tipo de producto*
                </label>
                <button
                  type="button"
                  className={`w-full px-3 py-2 border shadow-sm text-left focus:outline-none focus:ring-2 focus:ring-orange-400 flex justify-between items-center ${
                    errores.tipoProducto ? "border-red-500" : "border-gray-300"
                  }`}
                  onClick={() => setMostrarTipoSelect(!mostrarTipoSelect)}
                >
                  <span
                    className={tipoProducto ? "text-gray-900" : "text-gray-400"}
                  >
                    {tipoProducto
                      ? tiposProducto.find((t) => t.value === tipoProducto)
                          ?.label
                      : "Ej: Indumentaria, Alimento..."}
                  </span>
                  <img src={arrowDown} alt="arrowDown" className="h-5 w-5" />
                </button>
                {mostrarTipoSelect && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 shadow-lg max-h-40 overflow-y-auto">
                    {tiposProducto.map((tipo) => (
                      <button
                        key={tipo.value}
                        type="button"
                        className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
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

            <div>
              <label
                htmlFor="emisor"
                className="block text-sm font-medium mb-1"
              >
                Emisor*{" "}
              </label>
              <input
                id="emisor"
                type="text"
                value={emisor}
                onChange={(e) => setEmisor(e.target.value)}
                className={`w-full px-3 py-2 border shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                  errores.emisor ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Ej. Fundación EcoRaíz"
                maxLength="100"
              />
              <div className="flex justify-between items-center mt-1">
                {errores.emisor ? (
                  <p className="text-red-500 text-sm">{errores.emisor}</p>
                ) : (
                  <div></div>
                )}
                <span className="text-xs text-gray-400">
                  {emisor.length}/100
                </span>
              </div>
            </div>

            <div>
              <label
                htmlFor="descripcion"
                className="block text-sm font-medium mb-1"
              >
                Descripción*{" "}
                <span className="text-xs text-gray-500">
                  (mín. 50, máx. 300 caracteres)
                </span>
              </label>
              <textarea
                id="descripcion"
                rows={3}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className={`w-full px-3 py-2 border shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-vertical ${
                  errores.descripcion ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Describe el producto, su origen o proceso."
                maxLength="300"
              />
              <div className="flex justify-between items-center mt-1">
                {errores.descripcion ? (
                  <p className="text-red-500 text-sm">{errores.descripcion}</p>
                ) : (
                  <div></div>
                )}
                <span
                  className={`text-xs ${
                    descripcion.length < 50
                      ? "text-orange-500"
                      : "text-gray-400"
                  }`}
                >
                  {descripcion.length}/300{" "}
                  {descripcion.length < 50 &&
                    descripcion.length > 0 &&
                    `(faltan ${50 - descripcion.length})`}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-sm font-medium mb-1">
                  Fecha de producción*
                </label>
                <button
                  type="button"
                  className={`w-full px-3 py-2 border shadow-sm text-left focus:outline-none focus:ring-2 focus:ring-orange-400 flex justify-between items-center ${
                    errores.fecha ? "border-red-500" : "border-gray-300"
                  }`}
                  onClick={() => setMostrarCalendar(!mostrarCalendar)}
                >
                  <span className={fecha ? "text-gray-900" : "text-gray-500"}>
                    {fecha ? formatearFecha(fecha) : "Elegí una fecha"}
                  </span>
                  <img src={calendar} alt="calendar" className="h-5 w-5" />
                </button>
                {mostrarCalendar && (
                  <div className="absolute z-10 mt-1 p-3 bg-white border border-gray-300 shadow-lg">
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
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

              <div>
                <label className="block text-sm font-medium mb-1">
                  Lugar de producción*
                </label>
                <SelectLocation
                  value={lugarProduccion}
                  onChange={setLugarProduccion}
                  error={errores.lugarProduccion}
                  placeholder="Selecciona provincia y ciudad"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button color={"secondary"} onClick={limpiarFormulario}>
                Limpiar
              </Button>
              <Button
                type="submit"
                color={"primary"}
                disabled={loading || !isConnected}
              >
                {loading ? "Emitiendo..." : "Emitir Certificado"}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <ModalCreatedCertificate
        isOpen={modalAbierto}
        onClose={cerrarModal}
        certificate={certificadoCreado}
      />
    </>
  );
};

export default FormCertificate;
