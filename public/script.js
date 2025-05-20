function getRandomPart(folder, maxCount) {
  const randomIndex = Math.floor(Math.random() * maxCount) + 1;
  return `/assets/${folder}/${folder}${randomIndex}.png`;
}

const prefixes = [
  "Pix", "Glo", "Zor", "Lun", "Nib", "Fla", "Veg", "To", "Yum", "Chi",
  "Wib", "Bri", "Dro", "Kra", "Plu", "Vee", "Twi", "Pum", "Fiz", "Jel",
  "Mop", "Zin", "Cly", "Grim", "Hob", "Nop", "Vib", "Roo", "Dus", "Shy",
  "Quo", "Blep", "Woz", "Gax", "Tru", "Kip", "Wug", "Xel", "Jom", "Frip",
  "Vaz", "Lom", "Cud", "Paz", "Bli", "Nom", "Skiv", "Yoz", "Flam", "Snor",
  "Brik", "Wub", "Kloo", "Zep", "Voop", "Crap", "Zil", "Hoz", "Daz", "Muz",
  "Ska", "Joop", "Thum", "Vro", "Wam", "Zog", "Taz", "Flep", "Norb", "Crim",
  "Ruk", "Snib", "Vlim", "Brum", "Zlex", "Krob", "Wag", "Plek", "Rib", "Jeb",
  "Zam", "Plib", "Mok", "Fro", "Dux", "Zreb", "Klem", "Jik", "Grep", "Trob",
  "Lurk", "Spaz", "Dop", "Frug", "Grix", "Narb", "Shib", "Wizz", "Morb", "Kluk"
];

const suffixes = [
  "bit", "boo", "zy", "leaf", "ella", "pop", "doon", "tchi", "ko", "sta",
  "nug", "meek", "droo", "za", "puff", "na", "quin", "zyx", "po", "loo",
  "ble", "nik", "bun", "tek", "zon", "trop", "waff", "moo", "gob", "rip",
  "zak", "jeb", "sket", "vub", "nok", "kib", "zum", "clop", "thud", "plop",
  "flip", "dunk", "rizz", "bam", "swoop", "muzz", "kip", "chub", "drax", "frup",
  "bazz", "snub", "whoo", "zunk", "yoop", "cham", "vish", "flok", "blin", "wuzz",
  "skid", "wham", "kran", "vex", "mip", "doodle", "groob", "plink", "tosh", "wog",
  "nib", "zimp", "zook", "chik", "morb", "shig", "gloop", "drit", "bip", "slub",
  "snok", "jum", "chonk", "grim", "poff", "glim", "brum", "twib", "spok", "frizz",
  "woof", "snap", "drim", "jop", "blik", "zrum", "thip", "krem", "crub", "shup"
];

function getRandomName() {
  const used = JSON.parse(localStorage.getItem("usedNames") || "[]");
  const maxCombinations = prefixes.length * suffixes.length;

  if (used.length >= maxCombinations) {
    return "NoMoreNames";
  }

  let name;
  let tries = 0;
  do {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    name = prefix + suffix;
    tries++;
    if (tries > 1000) {
      return "NoMoreNames";
    }
  } while (used.includes(name));

  used.push(name);
  localStorage.setItem("usedNames", JSON.stringify(used));
  return name;
}

function getTodayDateStr() {
  const today = new Date();
  return `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;
}

function getSerialNumber() {
  const key = "globalSerialCount";
  const current = parseInt(localStorage.getItem(key) || "0", 10) + 1;
  localStorage.setItem(key, current);
  return `#${current.toString().padStart(4, "0")}`;
}

function generatePixelArt() {
  const canvas = document.getElementById("pixelCanvas");
  const ctx = canvas.getContext("2d");

  const canvasSize = 1080;
  const margin = 200;
  const drawSize = canvasSize - margin * 2;

  canvas.width = canvasSize;
  canvas.height = canvasSize;

  ctx.fillStyle = "#f0f0f0";
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  const body = new Image();
  const head = new Image();
  const eye = new Image();

  body.src = getRandomPart("body", 110);
  head.src = getRandomPart("head", 47);
  eye.src = getRandomPart("eye", 18);

  const name = getRandomName();
  const today = getTodayDateStr();
  const serial = getSerialNumber();

  document.getElementById("characterName").textContent = `Name: ${name}`;
  document.getElementById("generatedDate").textContent = `Date: ${today}`;
  document.getElementById("serialNumber").textContent = `Serial: ${serial}`;
  document.getElementById("hashtagBlock").textContent =
    `#🍅今日のピクセル野菜🍅  #ちょこっと農業 #ちょこ農 #ピクセルファーム #しもつけ市の野菜 #ピクセル野菜 #NFT農園  #pixelart #8bit #cutepixelart #nftart #digitalcollectible #indiecreator`;

  let loaded = 0;

  const onLoad = () => {
    loaded++;
    if (loaded === 3) {
      ctx.drawImage(body, margin, margin, drawSize, drawSize);
      ctx.drawImage(head, margin, margin, drawSize, drawSize);
      ctx.drawImage(eye, margin, margin, drawSize, drawSize);

      const img = document.getElementById("previewImage");
      img.src = canvas.toDataURL("image/jpeg", 0.92);
      img.style.display = "block";

      const entry = {
        image: img.src,
        name: name,
        date: today,
        serial: serial
      };
      const zukan = JSON.parse(localStorage.getItem("pixelZukan") || "[]");
      zukan.unshift(entry);
      localStorage.setItem("pixelZukan", JSON.stringify(zukan));
    }
  };

  const onError = (type, path) => {
    console.error(`[ERROR] Failed to load ${type}: ${path}`);
  };

  body.onload = onLoad;
  head.onload = onLoad;
  eye.onload = onLoad;

  body.onerror = () => onError("body", body.src);
  head.onerror = () => onError("head", head.src);
  eye.onerror = () => onError("eye", eye.src);
}

function copyPostText() {
  const name = document.getElementById("characterName").textContent;
  const date = document.getElementById("generatedDate").textContent;
  const serial = document.getElementById("serialNumber").textContent;
  const tags = document.getElementById("hashtagBlock").textContent;

  const templateText = `${name}\n${date}\n${serial}\n${tags}`;
  navigator.clipboard.writeText(templateText).then(() => {
    alert("Instagram投稿用のテキストをコピーしました！\n\n画像を長押しして保存してください。");
  });
}
