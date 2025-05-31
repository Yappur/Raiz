import { useState, useRef, useEffect } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

const QRScannerModal = ({ isOpen, onClose, onScan }) => {
  const [error, setError] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [flashSupported, setFlashSupported] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const videoRef = useRef(null);
  const codeReaderRef = useRef(null);
  const streamRef = useRef(null);

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) || window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      startScanner();
      // Prevenir scroll en móviles cuando el modal está abierto
      if (isMobile) {
        document.body.style.overflow = "hidden";
      }
    }

    return () => {
      stopScanner();
      document.body.style.overflow = "";
    };
  }, [isOpen, isMobile]);

  const checkFlashSupport = async (stream) => {
    try {
      const track = stream.getVideoTracks()[0];
      const capabilities = track.getCapabilities();

      if (capabilities.torch) {
        setFlashSupported(true);
      }
    } catch (error) {
      console.log("Flash no soportado:", error);
      setFlashSupported(false);
    }
  };

  const toggleFlash = async () => {
    try {
      if (streamRef.current) {
        const track = streamRef.current.getVideoTracks()[0];
        await track.applyConstraints({
          advanced: [{ torch: !flashOn }],
        });
        setFlashOn(!flashOn);
      }
    } catch (error) {
      console.error("Error al controlar el flash:", error);
    }
  };

  const startScanner = async () => {
    try {
      setError(null);
      setIsScanning(true);

      codeReaderRef.current = new BrowserMultiFormatReader();

      const videoInputDevices =
        await codeReaderRef.current.listVideoInputDevices();

      if (videoInputDevices.length === 0) {
        throw new Error("No se encontraron cámaras disponibles");
      }

      const backCamera = videoInputDevices.find(
        (device) =>
          device.label.toLowerCase().includes("back") ||
          device.label.toLowerCase().includes("trasera") ||
          device.label.toLowerCase().includes("environment")
      );

      const selectedDeviceId = backCamera
        ? backCamera.deviceId
        : videoInputDevices[0].deviceId;

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: selectedDeviceId,
          facingMode: "environment",
          width: { ideal: isMobile ? window.screen.width : 640 },
          height: { ideal: isMobile ? window.screen.height : 480 },
        },
      });

      streamRef.current = stream;

      await checkFlashSupport(stream);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      codeReaderRef.current.decodeFromVideoDevice(
        selectedDeviceId,
        videoRef.current,
        (result, error) => {
          if (result) {
            console.log("QR Code found:", result.getText());

            if (navigator.vibrate) {
              navigator.vibrate([200, 100, 200]);
            }

            onScan(result.getText());
            stopScanner();
          }

          if (error && error.name !== "NotFoundException") {
            console.warn("Error scanning:", error);
          }
        }
      );
    } catch (err) {
      console.error("Error starting scanner:", err);
      let errorMessage = "Error al iniciar el escáner";

      if (err.name === "NotAllowedError") {
        errorMessage =
          "Permisos de cámara denegados. Por favor, permite el acceso a la cámara.";
      } else if (err.name === "NotFoundError") {
        errorMessage = "No se encontró ninguna cámara en el dispositivo.";
      } else if (err.name === "NotSupportedError") {
        errorMessage = "El navegador no soporta el acceso a la cámara.";
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      setIsScanning(false);
    }
  };

  const stopScanner = () => {
    setIsScanning(false);
    setFlashOn(false);

    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
      codeReaderRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const toggleScanning = () => {
    if (isScanning) {
      stopScanner();
    } else {
      startScanner();
    }
  };

  const handleClose = () => {
    stopScanner();
    onClose();
  };

  if (!isOpen) return null;

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 bg-black">
        {/* Header con botón de cerrar */}
        <div className="absolute top-0 left-0 right-0 z-10 p-4 flex justify-end items-center">
          <button
            onClick={handleClose}
            className="text-white text-2xl font-bold bg-black/30 rounded-full w-10 h-10 flex items-center justify-center"
          >
            X
          </button>
        </div>

        {/* Cartel centrado */}
        <div className="absolute top-16 left-0 right-0 z-10 flex justify-center">
          <div className="bg-black/60 text-white px-6 py-3 rounded-lg">
            <h1 className="text-lg font-medium text-center">
              Escanea para ver la raíz
            </h1>
          </div>
        </div>

        {/* Video container */}
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: isScanning && !error ? "block" : "none",
            }}
            playsInline
            muted
          />

          {/* Overlay con marco de escaneo */}
          {isScanning && !error && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="280"
                  height="280"
                  viewBox="0 0 252 252"
                  fill="none"
                >
                  <path
                    d="M70.5455 4L7.32727 7.32727L4 70.5455M181.455 4L244.673 7.32727L248 70.5455M181.455 248L244.673 244.673L248 181.455M70.5455 248L7.32727 244.673L4 181.455"
                    stroke="white"
                    strokeWidth="7"
                  />
                </svg>
              </div>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <div className="text-center p-6">
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <p className="text-white text-lg mb-6">{error}</p>
                <button
                  onClick={() => {
                    setError(null);
                    startScanner();
                  }}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg text-lg font-medium"
                >
                  Reintentar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Controles inferiores - Flash centrado */}
        {isScanning && !error && flashSupported && (
          <div className="absolute bottom-8 left-0 right-0 flex justify-center">
            <button onClick={toggleFlash}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
              >
                <rect
                  width="60"
                  height="60"
                  rx="30"
                  fill="#333333"
                  fillOpacity="0.35"
                />
                <rect
                  width="60"
                  height="60"
                  rx="30"
                  fill="black"
                  fillOpacity="0.3"
                  style={{ mixBlendMode: "plus-darker" }}
                />
                <path
                  d="M21 32.75V33H28.974C28.0903 36.0193 26.7501 38.8858 25 41.5V42C26.32 42 28.184 41.456 30.089 40.727C35.133 38.796 38.001 33.651 38.004 28.25L38 28H32.414C33.4627 25.1842 33.9998 22.2037 34 19.199V19H25V19.08C24.9999 23.9252 23.6118 28.669 21 32.75Z"
                  fill="white"
                  stroke="white"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    );
  }

  // Renderizado para desktop (modal normal)
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50"></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Escanear Producto
            </h2>
            <p className="text-gray-600">
              Apunta la cámara hacia el código QR del producto
            </p>
          </div>

          {/* Contenedor del escáner */}
          <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4">
            <video
              ref={videoRef}
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                display: isScanning && !error ? "block" : "none",
              }}
              playsInline
              muted
            />

            {isScanning && !error && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="252"
                  height="252"
                  viewBox="0 0 252 252"
                  fill="none"
                >
                  <path
                    d="M70.5455 4L7.32727 7.32727L4 70.5455M181.455 4L244.673 7.32727L248 70.5455M181.455 248L244.673 244.673L248 181.455M70.5455 248L7.32727 244.673L4 181.455"
                    stroke="white"
                    strokeWidth="7"
                  />
                </svg>
              </div>
            )}

            {error && (
              <div className="flex items-center justify-center bg-gray-200 h-80">
                <div className="text-center p-4">
                  <div className="text-red-500 text-4xl mb-2">⚠️</div>
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              </div>
            )}

            {!isScanning && !error && (
              <div className="flex items-center justify-center bg-gray-200 h-80">
                <div className="text-center p-4">
                  <div className="text-gray-400 text-4xl mb-2">📷</div>
                  <p className="text-gray-600 text-sm">
                    Presiona "Iniciar" para comenzar el escaneo
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Controles */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={toggleScanning}
              disabled={!!error}
              className={`px-14 py-2 font-medium transition-colors ${
                error
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : isScanning
                  ? "bg-black text-white border border-black hover:bg-transparent hover:text-black"
                  : "bg-black text-white border border-black hover:bg-transparent hover:text-black"
              }`}
            >
              {isScanning ? "Detener" : "Comenzar"}
            </button>

            {error && (
              <button
                onClick={() => {
                  setError(null);
                  startScanner();
                }}
                className="px-14 py-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                Reintentar
              </button>
            )}

            <button
              onClick={handleClose}
              className="px-14 py-2 border border-black text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QRScannerModal;
