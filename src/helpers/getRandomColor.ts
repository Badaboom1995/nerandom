const colors = [
  "red",
  "orange",
  "lime",
  "green",
  "teal",
  "cyan",
  "blue",
  "violet",
  "pink",
];

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

export default getRandomColor;
