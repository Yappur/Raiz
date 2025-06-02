import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LandingNavbar from "../components/Navigate/LandingNavbar.jsx";
import noise from "../assets/background/noise.png";
import bgBase64 from "../assets/background/bgImage.js";
import reverse from "../assets/icons/reverse.svg";
import success from "../assets/icons/success.svg";
import arrowLeft from "../assets/icons/arrowLeft.svg";
import BrotoBot from "../components/BrotoBot.jsx";

// Importaciones específicas para la landing
import BotBrotoImg from "../assets/background/BotBroto.png";
import corrugatedRightArrow from "../assets/background/corrugatedRightArrow.svg";

import {
  containerVariants,
  titleVariants,
  cardVariants,
  titleTextVariants,
  hoverAnimations,
  rightSectionVariants,
  arrowAnimation,
  transitionConfigs,
} from "../utils/homeAnimations.js";

export default function Home() {
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

  // Nuevo componente para el BrotoBot personalizado de la landing
  const LandingBrotoBot = () => (
    <motion.div
      className="fixed bottom-24 right-32 z-20 hidden lg:block"
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2.5 }}
    >
      {/* Flecha apuntando al botón del BrotoBot original */}
      <motion.img
        src={corrugatedRightArrow}
        alt="Flecha apuntando al botón"
        className="absolute bottom-6 -right-20 w-32 h-auto transform -rotate-[110dg]"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 3 }}
      />

      {/* Imagen del bot */}
      <motion.div
        className="relative cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          // Aquí puedes agregar la lógica para abrir el chat
          console.log("Broto Bot clickeado");
        }}
      >
        <img
          src={BotBrotoImg}
          alt="Broto Bot"
          className="size-48 object-contain drop-shadow-lg"
        />

        {/* Efecto de pulso */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-20"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );

  const MobileMain = () => (
    <main className="relative z-10 px-6 py-12 flex flex-col items-center justify-center min-h-[70vh] text-center">
      <motion.h2
        className="text-7xl font-medium text-black mb-12 leading-tight"
        initial={hasAnimated ? false : { opacity: 0, y: 30 }}
        animate={hasAnimated ? false : { opacity: 1, y: 0 }}
        transition={hasAnimated ? {} : { duration: 0.8, delay: 0.2 }}
      >
        Volvé al <br />
        origen
      </motion.h2>

      <motion.div
        className="flex flex-col space-y-8 gap-4 w-full max-w-sm"
        initial={hasAnimated ? false : { opacity: 0, y: 30 }}
        animate={hasAnimated ? false : { opacity: 1, y: 0 }}
        transition={hasAnimated ? {} : { duration: 0.8, delay: 0.5 }}
      >
        <motion.button
          className="bg-black text-white py-4 px-6 font-medium text-lg hover:bg-gray-800 transition-colors duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowQRScanner(true)}
        >
          Escanea tu producto
        </motion.button>

        <motion.button
          className="underline text-black py-4 px-8 font-medium text-lg transition-colors duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            console.log("Segundo botón clickeado");
          }}
        >
          Chatea con Broto
        </motion.button>
      </motion.div>
    </main>
  );

  return (
    <>
      <motion.div
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat overflow-hidden relative"
        style={{ backgroundImage: `url("${noise}"), url("${bgBase64}")` }}
        initial={hasAnimated ? false : "hidden"}
        animate={hasAnimated ? false : "visible"}
        variants={hasAnimated ? {} : containerVariants}
      >
        <motion.div {...(hasAnimated ? {} : transitionConfigs.navbar)}>
          <LandingNavbar
            showQRScanner={showQRScanner}
            setShowQRScanner={setShowQRScanner}
          />
        </motion.div>

        {/* Main de Desktop */}
        <main className="relative z-10 px-8 py-10 mx-12 hidden md:block">
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

          {/* BrotoBot original para otras funcionalidades */}
          <BrotoBot />
        </main>

        {/* Main de móvil */}
        <div className="block md:hidden">
          <MobileMain />
        </div>

        {/* BrotoBot personalizado solo para la landing */}
        <LandingBrotoBot />
      </motion.div>
    </>
  );
}
