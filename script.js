// CAMERA BUTTON FUNCTION
document.getElementById('camera-btn').addEventListener('click', async () => {
  const video = document.getElementById('camera-feed');
  const image = document.getElementById('selected-image');
  image.classList.add('hidden'); // Hide image if shown before

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    video.classList.remove('hidden');
  } catch (err) {
    alert('Camera access denied or not available.');
    console.error(err);
  }
});

// GALLERY BUTTON FUNCTION
document.getElementById('gallery-btn').addEventListener('click', () => {
  document.getElementById('file-input').click();
});

// DISPLAY SELECTED IMAGE
document.getElementById('file-input').addEventListener('change', (event) => {
  const video = document.getElementById('camera-feed');
  video.classList.add('hidden'); // Hide video if shown before

  const file = event.target.files[0];
  if (file) {
    const image = document.getElementById('selected-image');
    image.src = URL.createObjectURL(file);
    image.classList.remove('hidden');
  }
});
