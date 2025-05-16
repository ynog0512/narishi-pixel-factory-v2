function getRandomPart(folder, maxCount) {
  const randomIndex = Math.floor(Math.random() * maxCount) + 1;
  const path = `/assets/${folder}/${folder}${randomIndex}.png`;
  console.log(`[LOAD] ${folder}: ${path}`);
  return path;
}

function generatePixelArt() {
  const canvas = document.getElementById("pixelCanvas");
  const ctx = canvas.getContext("2d");

  const imageSize = 1024;
  ctx.clearRect(0, 0, imageSize, imageSize);

  const body = new Image();
  const head = new Image();
  const eye = new Image();

  body.src = getRandomPart("body", 47);
  head.src = getRandomPart("head", 24);
  eye.src = getRandomPart("eye", 8);

  let loaded = 0;

  const onLoad = () => {
    loaded++;
    if (loaded === 3) {
      ctx.drawImage(body, 0, 0, imageSize, imageSize);
      ctx.drawImage(head, 0, 0, imageSize, imageSize);
      ctx.drawImage(eye, 0, 0, imageSize, imageSize);

      const img = document.getElementById("previewImage");
      img.src = canvas.toDataURL("image/png");
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
    .padStart(2, "0")}.png`;

  link.href = img.src;
  link.download = filename;
  link.click();
}
