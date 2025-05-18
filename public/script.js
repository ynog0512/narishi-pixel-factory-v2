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

function getSerialForToday() {
  // 日ごとに固定。現在は単純に「#0001」で統一。
  return "#0001";
}

function generatePixelArt() {
  const canvas = document.getElementById("pixelCanvas");
  const ctx = canvas.getContext("2d");

  const canvasSize = 1080;
  const margin = 135;
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
  const serial = getSerialForToday();

  // 表示要素に反映
  document.getElementById("characterName").textContent = `Name: ${name}`;
  document.getElementById("generatedDate").textContent = `Date: ${today}`;
  document.getElementById("serialNumber").textContent = `Serial: ${serial}`;
  document.getElementById("hashtagBlock").textContent = `#🍅今日のピクセル野菜🍅  #ちょこっと農業 #ちょこ農 #ピクセルファーム #しもつけ市の野菜 #ピクセル野菜 #NFT農園`;

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

function downloadImage() {
  const img = document.getElementById("previewImage");
  const link = document.createElement("a");

  const today = new Date();
  const filename = `${today.getFullYear()}_${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}_${today
    .getDate()
    .toString()
    .padStart(2, "0")}.jpg`;

  link.href = img.src;
  link.download = filename;
  link.click();

  const name = document.getElementById("characterName").textContent;
  const date = document.getElementById("generatedDate").textContent;
  const serial = document.getElementById("serialNumber").textContent;
  const tags = document.getElementById("hashtagBlock").textContent;

  const templateText = `${name}\n${date}\n${serial}\n${tags}`;
  navigator.clipboard.writeText(templateText).then(() => {
    alert("Instagram投稿用のテキストをコピーしました！\n\n画像を長押しして保存してください。");
  });
}
