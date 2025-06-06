import { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import ModalFormCertificate from "../components/Modals/ModalFormCertificate";
import { useStore } from "zustand";
import useWalletStore from "../store/useWalletStore";
import ModalCertificate from "../components/Modals/ModalCertificate";
import usePDFExport from "../hooks/usePDFExport";
import { getCertificationByAddress } from "../utils/contractMethods";
import { toPng } from "html-to-image"; // npm install html-to-image

//icons
import eyeIcon from "../assets/icons/eye-icon.svg";
import fileIcon from "../assets/icons/file-icon.svg";
import QRIcon from "../assets/icons/QR-icon.svg";
import paginationLeft from "../assets/icons/pagination-left.svg";
import paginationRight from "../assets/icons/pagination-right.svg";
import Button from "../components/common/Button";

export function ProductListPage() {
  const { getDisplayName, isConnected, address, provider } =
    useStore(useWalletStore);
  const { exportToPDF, isExporting } = usePDFExport();

  const [allCertificates, setAllCertificates] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
  });
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

  const loadCertificates = async () => {
    if (!isConnected || !address || !provider) {
      console.log("Wallet no conectada o provider no disponible");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const certificates = await getCertificationByAddress(provider, address);

      if (certificates && certificates.length > 0) {
        const mappedCertificates = certificates.map((cert) => ({
          id: cert.id,
          name: cert.name,
          company: cert.company,
          productType: cert.productType,
          productionDate: cert.productionDate,
          location: cert.location,
          description: cert.description,
          creationDate: cert.creationDate,
          link: cert.link,
        }));

        setAllCertificates(mappedCertificates);

        const totalPages = Math.ceil(mappedCertificates.length / 10);
        setPagination((prev) => ({
          ...prev,
          totalPages,
          total: mappedCertificates.length,
          page: 1,
        }));
      } else {
        setAllCertificates([]);
        setPagination({
          page: 1,
          totalPages: 1,
          total: 0,
        });
      }
    } catch (err) {
      console.error("Error cargando certificados:", err);
      setError("Error al cargar los certificados");
      setAllCertificates([]);
    } finally {
      setLoading(false);
    }
  };

  // Cargar certificados cuando se conecta la wallet o cambia la dirección
  useEffect(() => {
    loadCertificates();
  }, [isConnected, address, provider]);

  useEffect(() => {
    const minRange = pagination.page * 10 - 10;
    const maxRange = pagination.page * 10;
    const paginatedProducts = allCertificates.slice(minRange, maxRange);
    setProducts(paginatedProducts);
  }, [allCertificates, pagination.page]);

  const handlePageChange = (page) => {
    setPagination((pagination) => ({ ...pagination, page }));
  };

  const handleDownloadCertificate = async (product) => {
    const hiddenQR = document.getElementById(`qr-id-${product.id}`);
    hiddenQR.style.visibility = "visible";
    const node = qrRefs.current[product.id];
    if (!node) return;
    const image = await toPng(node);

    product.image = image;

    await exportToPDF([product]);
  };

  const handleViewCertificate = (product) => {
    setCertificateOpened(product);
    setIsCertificateModalOpen(true);
  };

  const handleRefreshCertificates = () => {
    loadCertificates();
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
        <img src={paginationLeft} alt="Ir izquierda" />
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
        <img src={paginationRight} alt="Ir Derecha" />
      </button>
    );

    return buttons;
  };

  const renderMobileCards = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500">Cargando certificados...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-8">
          <div className="text-red-500 mb-4">{error}</div>
          <button
            onClick={handleRefreshCertificates}
            className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600"
          >
            Reintentar
          </button>
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <div className="text-center py-8">
          <div className="text-gray-500 mb-4">No tienes certificados aún</div>
          <Button
            onClick={setIsFormModalOpen}
            color="primary"
            onClickParams={[true]}
            className="text-base"
          >
            Crear tu primer certificado
          </Button>
        </div>
      );
    }
    return (
      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-medium text-lg text-gray-900">
                {product.name}
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Emisor:</span>
                <span className="font-medium">{product.company}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tipo:</span>
                <span className="font-medium">{product.productType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Fecha:</span>
                <span className="font-medium">{product.productionDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Ubicación:</span>
                <span className="font-medium">{product.location}</span>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => handleViewCertificate(product)}
                    className="flex items-center gap-2 px-3 py-2 text-sm transition-colors"
                    title="Ver certificado"
                  >
                    <img
                      src={eyeIcon}
                      alt="Ver"
                      className="cursor-pointer w-[24px] h-[15px] transition-transform duration-400 ease-in-out hover:scale-140"
                    />
                  </button>

                  <button
                    onClick={() => handleDownloadCertificate(product)}
                    className="flex items-center gap-2 px-3 py-2 text-sm transition-colors"
                    title="Descargar certificado"
                    disabled={isExporting}
                  >
                    <img
                      src={fileIcon}
                      alt="download File"
                      className="cursor-pointer w-[24px] h-[15px] transition-transform duration-400 ease-in-out hover:scale-140"
                    />
                  </button>

                  <button
                    onClick={() => downloadQRCode(product.id)}
                    className="flex items-center gap-2 px-3 py-2 text-sm transition-colors"
                    title="Descargar QR"
                    disabled={isExporting}
                  >
                    <img
                      src={QRIcon}
                      alt="download QR"
                      className="cursor-pointer w-[24px] h-[15px] transition-transform duration-400 ease-in-out hover:scale-140"
                    />
                  </button>
                  <div
                    id={`qr-id-${product.id}`}
                    style={{
                      visibility: "hidden",
                      position: "absolute",
                      bottom: "4000px",
                    }}
                  >
                    <div
                      ref={(el) => (qrRefs.current[product.id] = el)}
                      style={{
                        background: "white",
                        padding: 8, // Más padding ayuda a los lectores
                        display: "inline-block",
                        borderRadius: 4,
                      }}
                    >
                      <QRCode
                        value={product.link}
                        bgColor="#FFFFFF"
                        fgColor="#000000"
                        level="Q"
                        size={128}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const handleFormModalClose = () => {
    setIsFormModalOpen(false);
  };

  const qrRefs = useRef({});

  const downloadQRCode = async (productId) => {
    const hiddenQR = document.getElementById(`qr-id-${productId}`);
    hiddenQR.style.visibility = "visible";
    const node = qrRefs.current[productId];
    if (!node) return;
    const dataUrl = await toPng(node);
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `QRCode-${productId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    hiddenQR.style.visibility = "hidden";
  };

  return (
    <main className="min-h-screen bg-white">
      <section className="px-4 sm:px-6 lg:px-8 py-6 w-full max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 mb-8 sm:mb-20 gap-4">
          <h5 className="font-normal text-lg">Certificados</h5>
          <div className="flex justify-end items-center gap-4">
            <span className="font-normal text-lg">{getDisplayName()}</span>
            {!isConnected && (
              <span className="text-red-500 text-sm">Wallet no conectada</span>
            )}
          </div>
        </header>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <h2 className="font-medium text-2xl sm:text-3xl">
              Productos Certificados
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button
              onClick={setIsFormModalOpen}
              onClickParams={[true]}
              disabled={!isConnected}
              color={"primary"}
            >
              Nuevo Certificado
            </Button>
          </div>
        </div>

        {isMobile ? (
          // Vista móvil - Tarjetas
          renderMobileCards()
        ) : (
          // Vista desktop - Tabla
          <div className="overflow-hidden">
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="text-gray-500">Cargando certificados...</div>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <div className="text-red-500 mb-4">{error}</div>
                <button
                  onClick={handleRefreshCertificates}
                  className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600"
                >
                  Reintentar
                </button>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-500 mb-4">
                  No tienes certificados aún
                </div>
                <button
                  onClick={() => setIsFormModalOpen(true)}
                  className="px-4 py-2 bg-black text-white hover:bg-gray-800"
                >
                  Crear tu primer certificado
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead>
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
                      <tr key={product.id || id}>
                        <td className="py-3 px-4 font-medium text-gray-900 transition-colors">
                          {product.name}
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {product.company}
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {product.productType}
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {product.productionDate}
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {product.location}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex justify-center gap-4">
                            <button
                              onClick={() => handleViewCertificate(product)}
                              className="p-2"
                              title="Ver certificado"
                            >
                              <img
                                src={eyeIcon}
                                alt="Ver"
                                className="cursor-pointer w-[24px] h-[15px] transition-transform duration-400 ease-in-out hover:scale-140"
                              />
                            </button>

                            <button
                              onClick={() => handleDownloadCertificate(product)}
                              className="p-2"
                              title="Descargar certificado"
                              disabled={isExporting}
                            >
                              <img
                                src={fileIcon}
                                alt="Descargar Certificate"
                                className="cursor-pointer w-[24px] h-[15px] transition-transform duration-400 ease-in-out hover:scale-140"
                              />
                            </button>

                            <button
                              onClick={() => downloadQRCode(product.id)}
                              className="p-2"
                              title="Descargar QR"
                              disabled={isExporting}
                            >
                              <img
                                src={QRIcon}
                                alt="Descargar QR"
                                className="cursor-pointer w-[24px] h-[15px] transition-transform duration-400 ease-in-out hover:scale-140"
                              />
                            </button>
                          </div>
                          <div
                            id={`qr-id-${product.id}`}
                            style={{
                              visibility: "hidden",
                              position: "absolute",
                              bottom: "4000px",
                            }}
                          >
                            <div
                              ref={(el) => (qrRefs.current[product.id] = el)}
                              style={{
                                background: "white",
                                padding: 8, // Más padding ayuda a los lectores
                                display: "inline-block",
                                borderRadius: 4,
                              }}
                            >
                              <QRCode
                                value={product.link}
                                bgColor="#FFFFFF"
                                fgColor="#000000"
                                level="Q"
                                size={256}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Footer de paginación*/}
        {products.length > 0 && (
          <footer className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 p-4">
            <span className="text-sm text-gray-600">Filas por página: 10</span>

            <div className="flex gap-2 items-center overflow-x-auto">
              {renderPaginationButtons()}
            </div>

            <span className="text-sm text-gray-600 whitespace-nowrap">
              Pág {pagination.page} de {pagination.totalPages}
            </span>
          </footer>
        )}
      </section>

      <ModalFormCertificate
        isOpen={isFormModalOpen}
        onClose={handleFormModalClose}
        refreshCertificates={handleRefreshCertificates}
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
