const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const captureButton = document.getElementById('capture');
const resultsDiv = document.getElementById('results');

async function setupCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 640, height: 480 },
  });
  video.srcObject = stream;
  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
}

async function loadModel() {
  const model = await cocoSsd.load();
  return model;
}

async function detectFruit(model) {
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const predictions = await model.detect(video);

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  predictions.forEach((prediction) => {
    if (['apple', 'banana', 'orange', 'carrot', 'broccoli', 'hot dog'].includes(prediction.class)) {
      context.beginPath();
      context.rect(...prediction.bbox);
      context.lineWidth = 2;
      context.strokeStyle = 'green';
      context.fillStyle = 'green';
      context.stroke();
      context.fillText(
        `${prediction.class} (${(prediction.score * 100).toFixed(2)}%)`,
        prediction.bbox[0],
        prediction.bbox[1] > 10 ? prediction.bbox[1] - 5 : 10
      );
    }
  });

  requestAnimationFrame(() => detectFruit(model));
}

function captureImage(model) {
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const dataURL = canvas.toDataURL();
  const img = new Image();
  img.src = dataURL;
  img.onload = async () => {
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
    const predictions = await model.detect(img);

    resultsDiv.innerHTML = '<h2>Detection Results:</h2>';
    predictions.forEach((prediction) => {
      if (['apple', 'banana', 'orange', 'carrot', 'broccoli', 'hot dog'].includes(prediction.class)) {
        resultsDiv.innerHTML += `<p>${prediction.class}: ${(prediction.score * 100).toFixed(2)}%</p>`;
      }
    });
  };
}

async function main() {
  await setupCamera();
  const model = await loadModel();
  detectFruit(model);

  captureButton.addEventListener('click', () => captureImage(model));
}

main();
