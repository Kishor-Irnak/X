
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
