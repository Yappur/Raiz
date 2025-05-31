import { useEffect, useState } from "react";
import ModalFormCertificate from "../components/Modals/ModalFormCertificate";
import { useStore } from "zustand";
import useWalletStore from "../store/useWalletStore";
import ModalCertificate from "../components/Modals/ModalCertificate";
import usePDFExport from "../hooks/usePDFExport";

const exampleProducts = [
  {
    name: "Camisa Origen",
    source: "Hilando al Sur",
    type: "Textil",
    date: "06-07-2027",
    location: "Córdoba, Argentina",
    certificationLink: "https://raiz.veri.link/tu-certificado",
    description:
      "Camisa confeccionada íntegramente con algodón orgánico certificado, proveniente de cultivos sostenibles que no utilizan pesticidas, fertilizantes sintéticos ni semillas genéticamente modificadas. El proceso de producción respeta tanto los ciclos naturales del suelo como a las personas involucradas en la cadena de valor. Cada prenda está hecha bajo condiciones laborales justas, promoviendo una economía circular y de comercio ético.",
  },
  {
    name: "Camisa Origen 2",
    source: "Hilando al Sur",
    type: "Textil",
    date: "06-07-2027",
    location: "Córdoba, Argentina",
    certificationLink: "https://raiz.veri.link/tu-certificado",
    description:
      "Camisa confeccionada íntegramente con algodón orgánico certificado, proveniente de cultivos sostenibles que no utilizan pesticidas, fertilizantes sintéticos ni semillas genéticamente modificadas. El proceso de producción respeta tanto los ciclos naturales del suelo como a las personas involucradas en la cadena de valor. Cada prenda está hecha bajo condiciones laborales justas, promoviendo una economía circular y de comercio ético.",
  },
  {
    name: "Camisa Origen 3",
    source: "Hilando al Sur",
    type: "Textil",
    date: "06-07-2027",
    location: "Córdoba, Argentina",
    certificationLink: "https://raiz.veri.link/tu-certificado",
    description:
      "Camisa confeccionada íntegramente con algodón orgánico certificado, proveniente de cultivos sostenibles que no utilizan pesticidas, fertilizantes sintéticos ni semillas genéticamente modificadas. El proceso de producción respeta tanto los ciclos naturales del suelo como a las personas involucradas en la cadena de valor. Cada prenda está hecha bajo condiciones laborales justas, promoviendo una economía circular y de comercio ético.",
  },
  {
    name: "Camisa Origen 4",
    source: "Hilando al Sur",
    type: "Textil",
    date: "06-07-2027",
    location: "Córdoba, Argentina",
    certificationLink: "https://raiz.veri.link/tu-certificado",
    description:
      "Camisa confeccionada íntegramente con algodón orgánico certificado, proveniente de cultivos sostenibles que no utilizan pesticidas, fertilizantes sintéticos ni semillas genéticamente modificadas. El proceso de producción respeta tanto los ciclos naturales del suelo como a las personas involucradas en la cadena de valor. Cada prenda está hecha bajo condiciones laborales justas, promoviendo una economía circular y de comercio ético.",
  },
];

export function ProductListPage() {
  const { getDisplayName } = useStore(useWalletStore);
  const { exportToPDF, isExporting } = usePDFExport();

  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: Math.ceil(exampleProducts.length / 10),
    total: exampleProducts.length,
  });
  const [rowsSelected, setRowsSelected] = useState([]);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [certificateOpened, setCertificateOpened] = useState();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    const minRange = pagination.page * 10 - 10;
    const maxRange = pagination.page * 10;
    const paginatedProducts = exampleProducts.slice(minRange, maxRange);
    setProducts(paginatedProducts);
  }, [pagination]);

  const handlePageChange = (page) => {
    setPagination((pagination) => ({ ...pagination, page }));
  };

  const handleDownloadCertificate = async (product) => {
    await exportToPDF([product]);
  };

  const handleViewCertificate = (product) => {
    setCertificateOpened(product);
    setIsCertificateModalOpen(true);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = isMobile ? 5 : 10;

    let startPage = Math.max(
      1,
      pagination.page - Math.floor(maxVisibleButtons / 2)
    );
    let endPage = Math.min(
      pagination.totalPages,
      startPage + maxVisibleButtons - 1
    );

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(pagination.page - 1)}
        disabled={pagination.page === 1}
        className="cursor-pointer hover:text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed p-1"
      >
        <svg
          width="9"
          height="15"
          viewBox="0 0 9 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.5 14.5C8.5 13.759 7.767 12.65 7.025 11.72C6.071 10.52 4.931 9.473 3.624 8.674C2.644 8.075 1.456 7.5 0.5 7.5C1.456 7.5 2.645 6.925 3.624 6.326C4.931 5.526 6.071 4.479 7.025 3.281C7.767 2.35 8.5 1.24 8.5 0.5"
            stroke="currentColor"
          />
        </svg>
      </button>
    );

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`cursor-pointer hover:text-slate-600 px-2 py-1 min-w-[32px] ${
            pagination.page === page ? "font-bold text-orange-600" : ""
          }`}
        >
          {page}
        </button>
      );
    }

    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(pagination.page + 1)}
        disabled={pagination.page === pagination.totalPages}
        className="cursor-pointer hover:text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed p-1"
      >
        <svg
          width="9"
          height="15"
          viewBox="0 0 9 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.5 14.5C0.5 13.759 1.233 12.65 1.975 11.72C2.929 10.52 4.069 9.473 5.376 8.674C6.356 8.075 7.544 7.5 8.5 7.5C7.544 7.5 6.355 6.925 5.376 6.326C4.069 5.526 2.929 4.479 1.975 3.281C1.233 2.35 0.5 1.24 0.5 0.5"
            stroke="currentColor"
          />
        </svg>
      </button>
    );

    return buttons;
  };

  const renderMobileCards = () => {
    return (
      <div className="space-y-4">
        {products.map((product, id) => (
          <div
            key={id}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-medium text-lg text-gray-900">
                {product.name}
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Emisor:</span>
                <span className="font-medium">{product.source}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tipo:</span>
                <span className="font-medium">{product.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Fecha:</span>
                <span className="font-medium">{product.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Ubicación:</span>
                <span className="font-medium">{product.location}</span>
              </div>

              {/* Acciones para móvil */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => handleViewCertificate(product)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                    title="Ver certificado"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                        fill="currentColor"
                      />
                    </svg>
                    Ver
                  </button>

                  <button
                    onClick={() => handleDownloadCertificate(product)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-green-600 hover:text-green-800 hover:bg-green-50 rounded-md transition-colors"
                    title="Descargar certificado"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"
                        fill="currentColor"
                      />
                    </svg>
                    Descargar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const handleExportSelected = async () => {
    if (rowsSelected.length === 0) {
      alert("Por favor, selecciona al menos un certificado para exportar.");
      return;
    }

    const selectedProducts = exampleProducts.filter((product) =>
      rowsSelected.includes(product.name)
    );

    await exportToPDF(selectedProducts);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="px-4 sm:px-6 lg:px-8 py-6 w-full max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 mb-8 sm:mb-20 gap-4">
          <h5 className="font-normal text-lg">Certificados</h5>
          <div className="flex justify-end items-center gap-4">
            <span className="font-normal text-lg">{getDisplayName()}</span>
          </div>
        </header>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="font-medium text-2xl sm:text-3xl">
            Productos Certificados
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => setIsFormModalOpen(true)}
              className="py-2 px-4 text-center border border-black bg-black text-white text-sm cursor-pointer hover:bg-gray-800 transition-colors"
            >
              Nuevo Certificado
            </button>
          </div>
        </div>

        {isMobile ? (
          // Vista móvil - Tarjetas
          renderMobileCards()
        ) : (
          // Vista desktop - Tabla con scroll horizontal
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-gray-50">
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Nombre
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Emisor
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Tipo
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Fecha
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Ubicación
                    </th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product, id) => (
                    <tr
                      key={id}
                      className={`${
                        rowsSelected.includes(product.name)
                          ? "bg-table-body-selected"
                          : "bg-white"
                      }`}
                    >
                      <td className="py-3 px-4 font-medium text-gray-900 transition-colors">
                        {product.name}
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        {product.source}
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        {product.type}
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        {product.date}
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        {product.location}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-center gap-2">
                          {/* Botón Ver */}
                          <button
                            onClick={() => handleViewCertificate(product)}
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                            title="Ver certificado"
                          >
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                                fill="currentColor"
                              />
                            </svg>
                          </button>

                          {/* Botón Descargar */}
                          <button
                            onClick={() => handleDownloadCertificate(product)}
                            className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-md transition-colors"
                            title="Descargar certificado"
                            disabled={isExporting}
                          >
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"
                                fill="currentColor"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <footer className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <span className="text-sm text-gray-600">Filas por página: 10</span>

          <div className="flex gap-2 items-center overflow-x-auto">
            {renderPaginationButtons()}
          </div>

          <span className="text-sm text-gray-600 whitespace-nowrap">
            Pág {pagination.page} de {pagination.totalPages}
          </span>
        </footer>
      </section>

      <ModalFormCertificate
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
      />

      <ModalCertificate
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
        certificate={certificateOpened}
      />
    </main>
  );
}

export default ProductListPage;
