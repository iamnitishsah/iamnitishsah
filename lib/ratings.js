// Platform tier names + colours (tuned for a dark background).

const CF_TIERS = [
  [3000, "legendary grandmaster", "#ff5a5a"],
  [2600, "international grandmaster", "#ff5a5a"],
  [2400, "grandmaster", "#ff5a5a"],
  [2300, "international master", "#ffa43a"],
  [2100, "master", "#ffa43a"],
  [1900, "candidate master", "#d07bff"],
  [1600, "expert", "#6f8cff"],
  [1400, "specialist", "#35c9bd"],
  [1200, "pupil", "#5fcf5f"],
  [-Infinity, "newbie", "#a3a8b4"],
];

export function cfTier(rating) {
  const [, name, color] = CF_TIERS.find(([min]) => rating >= min);
  return { name, color };
}

const CC_STARS = [
  [2500, 7, "#ff4d5e"],
  [2200, 6, "#ff9a3c"],
  [2000, 5, "#ffd04a"],
  [1800, 4, "#b48ad6"],
  [1600, 3, "#6b97ff"],
  [1400, 2, "#4fbf63"],
  [-Infinity, 1, "#a3a8b4"],
];

export function ccTier(rating) {
  const [, stars, color] = CC_STARS.find(([min]) => rating >= min);
  return { stars, color };
}
