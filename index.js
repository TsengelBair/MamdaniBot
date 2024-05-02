const { Telegraf } = require("telegraf");
const dotenv = require("dotenv");
dotenv.config();

console.log("i work");

// База правил
const rules = require("./baseRules.js");

const {
  classifyQuality,
  classifyReviews,
  classifyDelivery,
} = require("./fazification.js");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  const userName = ctx.message.from.first_name || "дорогой пользователь";

  ctx.reply(`Привет, ${userName}! Для начала работы, отправь мне команду /go`);
});

let userRatings = {};
const ratingTypes = ["качество", "отзывы", "скорость доставки"];

const ratingsMap = {
  quality: { Low: "Низкое", Medium: "Среднее", High: "Высокое" },
  reviews: { Low: "Отрицательные", Medium: "Средние", High: "Положительные" },
  delivery: { Low: "Долгая", Medium: "Средняя", High: "Быстрая" },
};

async function askForRating(ctx, index) {
  await ctx.reply(`Пожалуйста, оцените ${ratingTypes[index]} от 1 до 10:`);
}

// Агрегация
function processObject(obj) {
  const processedValues = {};

  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      switch (key) {
        case "качество":
          processedValues.quality = classifyQuality(value);
          break;
        case "отзывы":
          processedValues.reviews = classifyReviews(value);
          break;
        case "скорость доставки":
          processedValues.delivery = classifyDelivery(value);
          break;
        default:
          break;
      }
    }
  }

  return processedValues;
}

async function handleRating(ctx, index) {
  const rating = parseInt(ctx.message.text);
  userRatings[ratingTypes[index]] = rating;

  const nextIndex = index + 1;

  if (nextIndex < ratingTypes.length) {
    await askForRating(ctx, nextIndex);
  } else {
    const data = processObject(userRatings);

    const result = {};

    for (const key in data) {
      const subObject = data[key];
      const max = Math.max(...Object.values(subObject));
      const maxKeys = Object.keys(subObject).filter(
        (subKey) => subObject[subKey] === max
      );
      const maxKey = maxKeys[0];
      result[key] = ratingsMap[key][maxKey];
    }

    console.log(result);

    let bestMatch = null;
    let bestMatchCount = 0;

    for (const rule of rules) {
      let matchCount = 0;
      for (const key in result) {
        if (result[key] === rule[key]) {
          matchCount++;
        }
      }
      if (matchCount > bestMatchCount) {
        bestMatchCount = matchCount;
        bestMatch = rule.decision;
      }
    }

    const finalDecision = bestMatch;
    ctx.reply(`Итоговое решение: ${finalDecision}`);
    userRatings = {};
  }
}

bot.command("go", async (ctx) => {
  await askForRating(ctx, 0);
});

bot.on("text", async (ctx) => {
  const index = Object.keys(userRatings).length;

  if (index < ratingTypes.length) {
    await handleRating(ctx, index);
  }
});

bot.launch();
