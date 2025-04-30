function generatePixelArt() {
  const canvas = document.getElementById('pixelCanvas');
  const ctx = canvas.getContext('2d');

  const bodyIndex = Math.floor(Math.random() * 24) + 1;
  const headIndex = Math.floor(Math.random() * 12) + 1;
  const eyeIndex = Math.floor(Math.random() * 2) + 1;

  const bodyImg = new Image();
  const headImg = new Image();
  const eyeImg = new Image();

  bodyImg.src = `assets/body/body${bodyIndex}.png`;
  headImg.src = `assets/head/head${headIndex}.png`;
  eyeImg.src = `assets/eye/eye${eyeIndex}.png`;

  Promise.all([
    loadImage(bodyImg),
    loadImage(headImg),
    loadImage(eyeImg)
  ]).then(([body, head, eye]) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(body, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(head, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(eye, 0, 0, canvas.width, canvas.height);
  });
}

function loadImage(image) {
  return new Promise((resolve) => {
    image.onload = () => resolve(image);
  });
}

function downloadImage() {
  const canvas = document.getElementById('pixelCanvas');

  canvas.toBlob(function(blob) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'pixel_art.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }, 'image/png');
}
