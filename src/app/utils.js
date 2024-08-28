const public_token = process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN;

const replicatePrompts = [
  "A photograph of a technologist img in the 1920s.",
  "A photograph of a technologist img in the 1930s.",
  "A photograph of a technologist img in the 1940s.",
  "A photograph of a technologist img in the 1950s.",
  "A photograph of a technologist img in the 1960s.",
  "A photograph of a technologist img in the 1970s.",
  "A photograph of a technologist img in the 1980s.",
  "A photograph of a technologist img in the 1990s.",
  "A photograph of a technologist img outside.",
  "A photograph of a technologist img inside.",
  "A photograph of a technologist img at a desk.",
  "A photograph of a technologist img in a meeting.",
  "A photograph of a technologist img at a computer.",
  "A photograph of a technologist img in a kitchen.",
  "A photo of a ballet dancer img performing a pirouette with a grand stage",
  "A photo of a librarian img shelving books in a cozy, dimly-lit library",
  "A photo of a rock climber img scaling a steep cliff face",
  "A photo of a barista img crafting latte art in a trendy café",
  "A photo of a gardener img tending to a vibrant flower bed in a botanical garden",
  "A photo of a painter img working with a canvas in an art studio",
  "A photo of a yoga instructor img demonstrating a pose in a serene studio",
  "A photo of a pilot img preparing for takeoff in the cockpit of an airplane",
  "A photo of a beekeeper img tending to hives in a sunlit field",
  "A photo of a fashion designer img sketching new designs in a chic studio",
  "A photo of a scientist img conducting an experiment in a high-tech lab",
  "A photo of a construction worker img operating a bulldozer with a busy construction site",
  "A photo of a sailor img navigating a sailboat with a windy day",
  "A photo of a detective img examining clues at a crime scene",
  "A photo of a baker img icing a cake in a bustling bakery",
  "A photo of a medieval knight img posing with a sword in a historical reenactment",
  "A photo of a firefighter img rescuing a kitten from a tree",
  "A photo of a chef img preparing a gourmet dish in a Michelin-starred restaurant",
  "A photo of a marathon runner img crossing the finish line with a triumphant smile",
  "A photo of a soldier img reuniting with family after a long deployment",
  "A photo of a musician img performing on stage to a captivated audience",
  "A photo of a doctor img comforting a patient in a hospital room",
  "A photo of a teacher img leading a class discussion in a vibrant classroom",
  "A photo of a fashion model img strutting down the runway at a high-profile fashion show",
  "A photo of a couple img sharing a romantic moment under the Eiffel Tower in Paris",
  "A photo of a child img playing in a sunlit playground",
  "A photo of an astronaut img floating in space with Earth in the background",
  "A headshot of an employee img at Walmart wearing a nametag badge",
  "A close-up headshot of a person img exchanging vows at a beach wedding",
  "A photo of a mayor img riding a float down Main Street in a parade",
  "A photo of a hiker img smiling with the Grand Canyon in the background",
  "A photo of an artist img painting at their easel",
  "A photo of a gardener img planting a flower",
  "A photo of a jockey img riding their horse over the finish line",
  "A photo of someone img at the counter of a 1950s soda shop eating an ice cream sundae",
  "A photo of someone img tearfully accepting an Academy Award",
  "A photo of a student img in their graduation gown accepting their diploma",
  "A photo of a truck driver img waving from their truck",
  "A photo of a jet skier img about to fall over",
  "A photo of a trapeze artist img in mid-air, a look of great concentration on their face",
  "A photo of someone img singing karaoke with all their heart",
  "A photo of someone screaming img at the top of their lungs while riding in a roller coaster",
  "A photo of someone skydiving img out of a plane, a look of terror mixed with glee on their face",
];

function buildCollageUrl({ code }) {
  const ikFolder = `not-a-bot/${code}`;

  const h = 636;
  const w = 887;
  const b = 10;
  const topLeftImg = `i-${ikFolder}/image_0.png,lfo-top_left,r-50,lx-125,ly-50,w-${w},h-${h},b-${b}_FFFFFF,l-end`;
  const topRightImg = `l-image,i-${ikFolder}/image_1.png,lfo-top_right,r-50,lx-1050,ly-50,w-${w},h-${h},b-${b}_FFFFFF,l-end`;
  const botLeftImg = `l-image,i-${ikFolder}/input_image.jpg,lfo-bottom_left,r-50,lx-125,ly-725,w-${w},h-${h},b-${b}_FFFFFF,l-end`;
  const botRightImg = `l-image,i-${ikFolder}/image_2.png,lfo-bottom_right,r-50,lx-1050,ly-725,w-${w},h-${h},b-${b}_FFFFFF,l-end`;
  const notABot = `l-image,i-not-a-bot/not-a-bot-symbol.png,lx-850,ly-1175,l-end`;

  return encodeURI(
    `https://ik.imagekit.io/stytchdevrel/not-a-bot/5x7postcard-photos.jpg?tr=l-image,${topLeftImg}:${topRightImg}:${botLeftImg}:${botRightImg}:${notABot}`,
  );
}

function generateMessageSid() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let result = "MM";
  for (let i = 0; i < 32; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function getSlug(messageSid) {
  return messageSid.slice(0, 7);
}

function genImageKitFolder(slug) {
  return `not-a-bot/${slug}`;
}

function generatePrompt() {
  return replicatePrompts[Math.floor(Math.random() * replicatePrompts.length)];
}

function isMobileUserAgent(userAgent) {
  return /iPhone|iPad|iPod|Android/i.test(userAgent);
}

function updateUrlWithPhotoWidth(url, width) {
  const urlParts = url.split("/");
  const fileName = urlParts.pop();
  const newFileName = `tr:w-${width}/${fileName}`;
  urlParts.push(newFileName);
  return urlParts.join("/");
}

const getTelemetryId = async () => {
  const telemetry_id = await GetTelemetryID(public_token);
  return telemetry_id;
};

const redirectToProfileOrGetCode = async (isInitialized, user, router) => {
  if (isInitialized && user) {
    if (user.trusted_metadata?.hasAIImage) {
      router.replace("/profile");
    } else {
      router.replace("/get-code");
    }
  }
};

module.exports = {
  replicatePrompts,
  buildCollageUrl,
  generateMessageSid,
  getSlug,
  generatePrompt,
  genImageKitFolder,
  isMobileUserAgent,
  updateUrlWithPhotoWidth,
  getTelemetryId,
  redirectToProfileOrGetCode,
};
