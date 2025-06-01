import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "zustand";
import useWalletStore from "../store/useWalletStore";
import LandingNavbar from "../components/Navigate/LandingNavbar.jsx";
import noise from "../assets/background/noise.png";
import raizBg from "../assets/background/raiz-bg.svg";
import bgBase64 from "../assets/background/bgImage.js";
import reverse from "../assets/icons/reverse.svg";
import success from "../assets/icons/success.svg";
import arrowLeft from "../assets/icons/arrowLeft.svg";

import {
  containerVariants,
  titleVariants,
  cardVariants,
  backgroundImageVariants,
  titleTextVariants,
  hoverAnimations,
  rightSectionVariants,
  arrowAnimation,
  transitionConfigs,
} from "../utils/homeAnimations.js";

export default function Home() {
  const { isConnected, shortAddress } = useStore(useWalletStore);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);

  useEffect(() => {
    if (!hasAnimated) {
      const timer = setTimeout(() => {
        setHasAnimated(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [hasAnimated]);

  const WalletStatus = () => (
    <AnimatePresence mode="wait">
      {isConnected && shortAddress && (
        <motion.div
          key="wallet-status"
          className="mb-8 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg p-4 max-w-md"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <div>
              <p className="text-sm font-medium text-gray-800">
                Wallet Conectada
              </p>
              <p className="text-xs text-gray-600 font-mono">{shortAddress}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const MainTitle = () => (
    <motion.div
      className="flex flex-col justify-center"
      variants={hasAnimated ? {} : titleVariants}
      initial={hasAnimated ? false : "hidden"}
      animate={hasAnimated ? false : "visible"}
    >
      <motion.h1
        className="text-4xl lg:text-7xl font-normal leading-tight text-black mb-8"
        {...(hasAnimated ? {} : transitionConfigs.mainTitle)}
      >
        <motion.span {...(hasAnimated ? {} : titleTextVariants.firstSpan)}>
          Autenticidad y sostenibilidad
        </motion.span>{" "}
        <motion.span {...(hasAnimated ? {} : titleTextVariants.secondSpan)}>
          para productos regionales.
        </motion.span>
      </motion.h1>
    </motion.div>
  );

  const ScanSection = () => (
    <motion.div
      className="flex flex-col justify-center relative"
      variants={hasAnimated ? {} : rightSectionVariants}
      initial={hasAnimated ? false : "hidden"}
      animate={hasAnimated ? false : "visible"}
    >
      <motion.div
        className="absolute left-0 top-0 bottom-0 bg-black border-1 hidden lg:block"
        {...(hasAnimated ? {} : transitionConfigs.verticalLine)}
      />
      <div className="lg:pl-40">
        <motion.div
          className="flex items-center gap-4 mb-7"
          {...(hasAnimated ? {} : transitionConfigs.scanSection)}
        >
          <motion.img src={arrowLeft} alt="flecha" {...arrowAnimation} />
          <h2
            className="text-4xl font-medium text-black cursor-pointer"
            onClick={() => setShowQRScanner(true)}
          >
            Escanea tu producto
          </h2>
        </motion.div>
        <motion.p
          className="text-2xl text-gray-800 leading-relaxed"
          {...(hasAnimated ? {} : transitionConfigs.description)}
        >
          Escaneá tu producto para acceder a <br /> información detallada sobre
          su <br /> origen.
        </motion.p>
      </div>
    </motion.div>
  );

  const InfoCards = () => {
    const cardsData = [
      {
        title: "Volvé al origen",
        description:
          "Conocé productos sostenibles con sus verdaderas historias.",
        image: reverse,
        imageAlt: "Reverse",
      },
      {
        title: "Verificá lo auténtico",
        description:
          "Cada artículo cuenta con una raíz: un origen verificable y transparente, registrado con tecnología descentralizada.",
        image: success,
        imageAlt: "Success",
      },
    ];

    return (
      <motion.div {...(hasAnimated ? {} : transitionConfigs.cardsContainer)}>
        <div className="lg:w-1/2 w-full">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            variants={hasAnimated ? {} : containerVariants}
            initial={hasAnimated ? false : "hidden"}
            animate={hasAnimated ? false : "visible"}
          >
            {cardsData.map((card, index) => (
              <motion.div
                key={index}
                variants={hasAnimated ? {} : cardVariants}
                whileHover="hover"
              >
                <motion.div className="mb-6 flex justify-center lg:ml-22 lg:justify-start">
                  <img
                    src={card.image}
                    alt={card.imageAlt}
                    className="w-16 h-16 object-contain filter hover:brightness-110 transition-all duration-300"
                  />
                </motion.div>
                <motion.h3
                  className="text-3xl font-medium text-black mb-4"
                  whileHover={hoverAnimations.cardText}
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  className="text-xl text-gray-800 leading-relaxed"
                  initial={{ opacity: 0.8 }}
                  whileHover={hoverAnimations.cardDescription}
                >
                  {card.description}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <motion.div
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: `url("${noise}"), url("${bgBase64}")` }}
        initial={hasAnimated ? false : "hidden"}
        animate={hasAnimated ? false : "visible"}
        variants={hasAnimated ? {} : containerVariants}
      >
        <motion.img
          src={raizBg || "/placeholder.svg"}
          alt="Raiz background"
          className="fixed bottom-0 right-0 w-auto h-auto max-w-full max-h-full object-contain z-0 pointer-events-none hidden lg:block"
          variants={hasAnimated ? {} : backgroundImageVariants}
          initial={hasAnimated ? false : "hidden"}
          animate={hasAnimated ? false : "visible"}
        />

        <motion.div {...(hasAnimated ? {} : transitionConfigs.navbar)}>
          <LandingNavbar
            showQRScanner={showQRScanner}
            setShowQRScanner={setShowQRScanner}
          />
        </motion.div>

        <main className="relative z-10 px-8 py-10 mx-12">
          <WalletStatus />

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
            variants={hasAnimated ? {} : containerVariants}
            initial={hasAnimated ? false : "hidden"}
            animate={hasAnimated ? false : "visible"}
          >
            <MainTitle />
          <ScanSection />
          </motion.div>

          <InfoCards />
        </main>
      </motion.div>
    </>
  );
}
