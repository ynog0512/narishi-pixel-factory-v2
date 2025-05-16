function generatePixelArt() {
  const canvas = document.getElementById('pixelCanvas');
  const ctx = canvas.getContext('2d');

  const bodyIndex = Math.floor(Math.random() * 24) + 1;
  const headIndex = Math.floor(Math.random() * 12) + 1;
  const eyeIndex = Math.floor(Math.random() * 2) + 1;

  const bodyImg = new Image();
  const headImg = new Image();
  const eyeImg = new Image();

  // ✅ ここがポイント：先頭に `/` をつける（public 直下と認識させる）
  bodyImg.src = `/assets/body/body${bodyIndex}.png`;
  headImg.src = `/assets/head/head${headIndex}.png`;
  eyeImg.src = `/assets/eye/eye${eyeIndex}.png`;

  Promise.all([
    loadImage(bodyImg),
    loadImage(headImg),
    loadImage(eyeImg)
  ]).then(([body, head, eye]) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(body, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(head, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(eye, 0, 0, canvas.width, canvas.height);

    const previewImage = document.getElementById('previewImage');
    previewImage.src = canvas.toDataURL('image/png');
    previewImage.style.display = 'block';
  });
}

function loadImage(image) {
  return new Promise((resolve) => {
    image.onload = () => resolve(image);
  });
}

function downloadImage() {
  const canvas = document.getElementById('pixelCanvas');

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const fileName = `${year}_${month}_${day}.png`;

  canvas.toBlob(function(blob) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

    const templateText = "🍅今日のピクセル野菜🍅\n#ちょい農 #ピクセルファーム #しもつけ市の野菜";
    navigator.clipboard.writeText(templateText).then(() => {
      alert("Instagram投稿用のテキストをコピーしました！\n\n画像を長押しして保存してください。");
    });
  }, 'image/png');
}
