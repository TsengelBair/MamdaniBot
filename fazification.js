const classifyQuality = (value) => {
  if (value >= 1 && value <= 5) {
    const low = value <= 3 ? 1 : Math.max(0, (5 - value) / 2);
    const medium = value >= 3 && value <= 5 ? Math.max(0, (value - 3) / 2) : 0;
    const high = 0;

    return {
      Low: low,
      Medium: medium,
      High: high,
    };
  } else if (value > 5 && value <= 7) {
    const low = 0;
    const medium = value <= 6 ? 1 : Math.max(0, (8 - value) / 2);
    const high = value >= 7 ? 0.5 : 0;

    return {
      Low: low,
      Medium: medium,
      High: high,
    };
  } else if (value > 7 && value <= 10) {
    const low = 0;
    const medium = 0;
    const high = 1;

    return {
      Low: low,
      Medium: medium,
      High: high,
    };
  } else {
    return "недопустимое значение";
  }
};

const classifyReviews = (value) => {
  if (value >= 1 && value <= 5) {
    const low = value <= 3 ? 1 : Math.max(0, (5 - value) / 2);
    const medium = value >= 3 && value <= 5 ? Math.max(0, (value - 3) / 2) : 0;
    const high = 0;

    return {
      Low: low,
      Medium: medium,
      High: high,
    };
  } else if (value > 5 && value <= 7) {
    const low = 0;
    const medium = value <= 6 ? 1 : Math.max(0, (8 - value) / 2);
    const high = value >= 7 ? 0.5 : 0;

    return {
      Low: low,
      Medium: medium,
      High: high,
    };
  } else if (value > 7 && value <= 10) {
    const low = 0;
    const medium = 0;
    const high = 1;

    return {
      Low: low,
      Medium: medium,
      High: high,
    };
  } else {
    return "недопустимое значение";
  }
};

const classifyDelivery = (value) => {
  if (value >= 1 && value <= 5) {
    const low = value <= 3 ? 1 : Math.max(0, (5 - value) / 2);
    const medium = value >= 3 && value <= 5 ? Math.max(0, (value - 3) / 2) : 0;
    const high = 0;

    return {
      Low: low,
      Medium: medium,
      High: high,
    };
  } else if (value > 5 && value <= 7) {
    const low = 0;
    const medium = value <= 6 ? 1 : Math.max(0, (8 - value) / 2);
    const high = Math.max(0, (value - 6) / 2);

    return {
      Low: low,
      Medium: medium,
      High: high,
    };
  } else if (value > 7 && value <= 10) {
    const low = 0;
    const medium = 0;
    const high = 1;

    return {
      Low: low,
      Medium: medium,
      High: high,
    };
  } else {
    return "недопустимое значение";
  }
};

module.exports = {
  classifyQuality,
  classifyReviews,
  classifyDelivery,
};
