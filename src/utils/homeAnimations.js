export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
    },
  },
};

export const titleVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export const rightSectionVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.3,
    },
  },
};

export const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  hover: {
    y: -5,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export const backgroundImageVariants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: "easeOut",
    },
  },
};

export const titleTextVariants = {
  firstSpan: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { delay: 0.4, duration: 0.6 },
  },
  secondSpan: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { delay: 0.6, duration: 0.6 },
  },
};

export const arrowAnimation = {
  animate: {
    x: [0, -18, 0],
  },
  transition: {
    duration: 1.7,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut",
  },
};

export const hoverAnimations = {
  cardText: {
    color: "#374151",
    transition: { duration: 0.2 },
  },
  cardDescription: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
};

export const transitionConfigs = {
  navbar: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  },
  mainTitle: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
  },
  scanSection: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut", delay: 0.7 },
  },
  description: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut", delay: 0.9 },
  },
  cardsContainer: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6, delay: 1.1 },
  },
  verticalLine: {
    initial: { height: 0 },
    animate: { height: "100%" },
    transition: { duration: 0.8, ease: "easeOut", delay: 0.5 },
  },
};
