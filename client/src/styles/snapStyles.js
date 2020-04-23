const categoryColor = (category, creation) => {
  if (!category) return {};
  let color = "";

  let maxTime = 86400000; // This number is 24 hours in ms
  let fromMiliseconds = new Date().getTime();

  if (creation) {
    fromMiliseconds = new Date(creation).getTime();
  }

  let startMiliseconds = Date.now();

  let timeDifference = startMiliseconds - fromMiliseconds;
  if (timeDifference <= 0) timeDifference = 1;

  let colorNumber = 1 - (timeDifference / maxTime) * 0.6; // A number from 1-0.4

  switch (category) {
    case "promo":
      color = `rgba(238, 99, 82, ${colorNumber.toFixed(1)})`;
      break;
    case "happening":
      color = `rgba(45, 156, 219, ${colorNumber.toFixed(1)})`;
      break;
    case "crowd":
      color = `rgba(242, 201, 76, ${colorNumber.toFixed(1)})`;
      break;
    case "free":
      color = `rgba(39, 174, 96, ${colorNumber.toFixed(1)})`;
      break;

    default:
      color = `rgb(242, 242, 242)`;
  }

  return color;
};

export default categoryColor;
