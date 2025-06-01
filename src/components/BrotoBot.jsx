import React, { useState, useEffect } from "react";

// Opción 1: Usando CDN (Recomendado para tu caso)
const BrotoBot = () => {
  useEffect(() => {
    // Crear y cargar el primer script
    const script1 = document.createElement("script");
    script1.src = "https://cdn.botpress.cloud/webchat/v2.5/inject.js";
    script1.async = true;
    document.head.appendChild(script1);

    // Crear y cargar el segundo script después del primero
    script1.onload = () => {
      const script2 = document.createElement("script");
      script2.src =
        "https://files.bpcontent.cloud/2025/06/01/12/20250601120330-Q4AFO9ZI.js";
      script2.async = true;
      document.head.appendChild(script2);

      // Configurar el webchat una vez que se carguen los scripts
      script2.onload = () => {
        if (window.botpressWebChat) {
          window.botpressWebChat.init({
            clientId: "7456f321-b5e3-4cab-a62e-5b8f35eb8156",
            hostUrl: "https://cdn.botpress.cloud/webchat/v2.5",
            messagingUrl: "https://messaging.botpress.cloud",
            botName: "Mi Asistente Virtual",
            botAvatarUrl: undefined,
            botDescription: "Asistente virtual powered by Botpress",
            enableTranscriptDownload: false,
            className: "webchatIframe",
            containerWidth: "100%25",
            layoutWidth: "100%25",
          });
        }
      };
    };

    // Cleanup function
    return () => {
      // Remover scripts al desmontar el componente
      const scripts = document.querySelectorAll('script[src*="botpress"]');
      scripts.forEach((script) => script.remove());

      // Limpiar el webchat si existe
      if (window.botpressWebChat) {
        window.botpressWebChat.destroy?.();
      }
    };
  }, []);

  return <div></div>;
};

export default BrotoBot;
