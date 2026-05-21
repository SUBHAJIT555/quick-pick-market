const smartChoiceStore = require("./sites/smart-choice-store");
const trueBasket = require("./sites/true-basket");
const quickPickMarket = require("./sites/quick-pick-market");

const themes = {
  "smart-choice-store": smartChoiceStore,
  "true-basket": trueBasket,
  "daily-cart": smartChoiceStore,
  "quick-pick-market": quickPickMarket,
};

const themeId = process.env.NEXT_PUBLIC_SITE_THEME || "quick-pick-market";

module.exports = themes[themeId] || quickPickMarket;
