function getRandomPart(folder, maxCount) {
  const randomIndex = Math.floor(Math.random() * maxCount) + 1;
  return `/assets/${folder}/${folder}${randomIndex}.png`;
}

const names = [
  "Sunny", "Blaze", "Leafy", "Sprout", "Moss", "Flare", "Berry",
  "Nugget", "Pickle", "Rye", "Zest", "Ash", "Vega", "Luna", "Clover",
  "Wisp", "Nova", "Juno", "Flick", "Pebble"
];

function getRandomName() {
  return names[Math.floor(Math.random() * names.length)];
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

      // 保存処理：図鑑に追加
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

function showZukan() {
  const container = document.getElementById("zukanContainer");
  container.innerHTML = "";

  const zukan = JSON.parse(localStorage.getItem("pixelZukan") || "[]");
  if (zukan.length === 0) {
    container.innerHTML = "<p>まだ保存されたピクセル野菜はありません。</p>";
    return;
  }

  zukan.forEach(entry => {
    const card = document.createElement("div");
    card.className = "zukan-card";

    const img = document.createElement("img");
    img.src = entry.image;
    img.alt = entry.name;

    const info = document.createElement("div");
    info.innerHTML = `<strong>${entry.name}</strong><br>${entry.date}<br>${entry.serial}`;

    card.appendChild(img);
    card.appendChild(info);
    container.appendChild(card);
  });

  container.style.display = "block";
}
