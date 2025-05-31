import { useState } from "react";

const usePDFExport = () => {
  const [isExporting, setIsExporting] = useState(false);

  const exportToPDF = async (certificates) => {
    const certArray = Array.isArray(certificates)
      ? certificates
      : [certificates];

    if (certArray.length === 0) {
      alert("No hay certificados para exportar.");
      return;
    }

    setIsExporting(true);

    try {
      // Crear una nueva ventana para la impresión
      const printWindow = window.open(
        "",
        "_blank",
        "width=800,height=600,scrollbars=yes"
      );

      if (!printWindow) {
        throw new Error(
          "No se pudo abrir la ventana de impresión. Verifica que no esté bloqueada por el navegador."
        );
      }

      // Generar el contenido HTML para múltiples certificados
      const generateCertificateHTML = (certificate, index) => `
        <div class="certificate-page" ${
          index > 0 ? 'style="page-break-before: always;"' : ""
        }>
          <div class="certificate-container">
            <div class="certificate-content">
              <h2>${certificate.name}</h2>
              <p><span class="label">Tipo de producto: </span>${
                certificate.type
              }</p>
              <p><span class="label">Emisor: </span>${certificate.source}</p>
              <p><span class="label">Fecha de Emisión: </span>${
                certificate.date
              }</p>
              <p><span class="label">Fecha de Producción: </span>${
                certificate.date
              }</p>
              <p><span class="label">Lugar de Producción: </span>${
                certificate.location
              }</p>
              <p class="description"><span class="label">Descripción: </span>${
                certificate.description
              }</p>
            </div>
          </div>
        </div>
      `;

      const allCertificatesHTML = certArray
        .map((cert, index) => generateCertificateHTML(cert, index))
        .join("");

      const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Certificados - ${certArray.length} documento${
        certArray.length > 1 ? "s" : ""
      }</title>
          <meta charset="UTF-8">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: system-ui, -apple-system, sans-serif;
              background: white;
              color: #111827;
              line-height: 1.4;
            }
            
            .certificate-page {
              min-height: 100vh;
              padding: 32px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            
            .certificate-container {
              max-width: 540px;
              width: 100%;
              padding: 32px;
              background-color: white;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            }
            
            .certificate-content {
              display: flex;
              flex-direction: column;
              gap: 16px;
            }
            
            h2 {
              font-weight: 600;
              font-size: 24px;
              margin-bottom: 16px;
              color: #111827;
              text-align: center;
              border-bottom: 2px solid #f3f4f6;
              padding-bottom: 12px;
            }
            
            p {
              font-weight: 300;
              color: #374151;
              margin-bottom: 8px;
            }
            
            .label {
              font-weight: 500;
              color: #111827;
            }
            
            .description {
              text-align: justify;
              line-height: 1.6;
              margin-top: 8px;
              padding-top: 16px;
              border-top: 1px solid #f3f4f6;
            }
            
            @media print {
              body {
                margin: 0;
                padding: 0;
                background: white !important;
              }
              
              * {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
              }
              
              .certificate-page {
                padding: 20px;
                min-height: auto;
              }
              
              .certificate-container {
                box-shadow: none;
                border: 1px solid #ccc;
                margin-bottom: 0;
              }
              
              .certificate-page:not(:first-child) {
                page-break-before: always !important;
              }
            }
            
            @page {
              margin: 1cm;
              size: A4;
            }
            
            @media screen {
              body {
                background: #f3f4f6;
                padding: 20px;
              }
              
              .certificate-page:not(:last-child) {
                margin-bottom: 40px;
              }
            }
          </style>
        </head>
        <body>
          ${allCertificatesHTML}
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 500);
            };
            
            window.onafterprint = function() {
              window.close();
            };
          </script>
        </body>
        </html>
      `;

      printWindow.document.write(printContent);
      printWindow.document.close();

      printWindow.focus();
    } catch (error) {
      console.error("Error al exportar PDF:", error);

      if (error.message.includes("ventana de impresión")) {
        alert(
          "No se pudo abrir la ventana de impresión. Por favor:\n\n1. Permite ventanas emergentes para este sitio\n2. Verifica que no tengas bloqueadores de popup activos\n3. Intenta de nuevo"
        );
      } else {
        alert(
          `Error al generar el PDF: ${error.message}\n\nPor favor, inténtalo de nuevo.`
        );
      }
    } finally {
      setIsExporting(false);
    }
  };

  return { exportToPDF, isExporting };
};

export default usePDFExport;
