function getRandomPart(folder, maxCount) {
  const randomIndex = Math.floor(Math.random() * maxCount) + 1;
  const path = `/assets/${folder}/${folder}${randomIndex}.png`;
  console.log(`[LOAD] ${folder}: ${path}`);
  return path;
}

function generatePixelArt() {
  const canvas = document.getElementById("pixelCanvas");
  const ctx = canvas.getContext("2d");

  const canvasSize = 1080;
  const margin = 100; // ✅ 四辺の余白
  const drawSize = canvasSize - margin * 2; // 880px

  canvas.width = canvasSize;
  canvas.height = canvasSize;

  // ✅ 背景色（すっきりグレー）
  ctx.fillStyle = "#f0f0f0";
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  const body = new Image();
  const head = new Image();
  const eye = new Image();

  body.src = getRandomPart("body", 110);
  head.src = getRandomPart("head", 47);
  eye.src = getRandomPart("eye", 18);

  let loaded = 0;

  const onLoad = () => {
    loaded++;
    if (loaded === 3) {
      // ✅ 中央にパーツ描画（880×880）
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
}
