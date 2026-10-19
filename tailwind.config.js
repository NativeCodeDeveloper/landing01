module.exports = {
  theme: {
    extend: {
      keyframes: {
        carrusel: {
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        carrusel: "carrusel 36s linear infinite",
      },
    },
  },
};
