const prefixes = [...Array(100)].map((_, i) => `Pre${i + 1}`);
const suffixes = [...Array(100)].map((_, i) => `Suf${i + 1}`);

function getRandomName() {
  const used = JSON.parse(localStorage.getItem("usedNames") || "[]");
  const max = prefixes.length * suffixes.length;

  if (used.length >= max) return "NoMoreNames";

  let name;
  let tries = 0;
  do {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    name = prefix + suffix;
    tries++;
    if (tries > 1000) break;
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

function getTypeFromBodyNumber(n) {
  if (n >= 1 && n <= 17) return "tomato";
  if (n >= 18 && n <= 34) return "eggplant";
  if (n >= 35 && n <= 56) return "green pepper";
  if (n >= 57 && n <= 76) return "kanpyo";
  if (n >= 77 && n <= 94) return "carrot";
  if (n >= 95 && n <= 110) return "pumpkin";
  return "unknown";
}

function getRandomPartNumber(maxCount) {
  return Math.floor(Math.random() * maxCount) + 1;
}

function getPartPath(folder, number) {
  return `/assets/${folder}/${folder}${number}.png`;
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

  const bodyNum = getRandomPartNumber(110);
  const headNum = getRandomPartNumber(36);
  const eyeNum = getRandomPartNumber(18);

  const body = new Image();
  const head = new Image();
  const eye = new Image();

  body.src = getPartPath("body", bodyNum);
  head.src = getPartPath("head", headNum);
  eye.src = getPartPath("eye", eyeNum);

  const name = getRandomName();
  const today = getTodayDateStr();
  const serial = getSerialNumber();
  const type = getTypeFromBodyNumber(bodyNum);

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

      // 図鑑に保存
      const zukan = JSON.parse(localStorage.getItem("pixelZukan") || "[]");
      zukan.push({
        name,
        date: today,
        serial,
        type,
        image: img.src,
      });
      localStorage.setItem("pixelZukan", JSON.stringify(zukan));
    }
  };

  body.onload = onLoad;
  head.onload = onLoad;
  eye.onload = onLoad;
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
