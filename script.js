const imageInput = document.getElementById('imageInput');
const previewContainer = document.getElementById('previewContainer');
const imagePreview = document.getElementById('imagePreview');
const convertBtn = document.getElementById('convertBtn');
const downloadLink = document.getElementById('downloadLink');
const targetFormatSpan = document.getElementById('targetFormat');

let originalImage = null;
let originalFileType = "";

imageInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    originalFileType = file.type;
    // UI Update: If it's a PNG, suggest converting to JPG and vice versa
    targetFormatSpan.textContent = originalFileType === 'image/png' ? 'JPG' : 'PNG';

    const reader = new FileReader();
    reader.onload = function(event) {
        imagePreview.src = event.target.result;
        previewContainer.classList.remove('hidden');
        downloadLink.classList.add('hidden'); // Hide download until converted
        
        originalImage = new Image();
        originalImage.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

convertBtn.addEventListener('click', function() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = originalImage.width;
    canvas.height = originalImage.height;

    // Draw the original image onto the canvas
    ctx.drawImage(originalImage, 0, 0);

    // Determine target format
    const format = originalFileType === 'image/png' ? 'image/jpeg' : 'image/png';
    const extension = originalFileType === 'image/png' ? '.jpg' : '.png';

    // Convert canvas to DataURL
    const convertedUrl = canvas.toDataURL(format, 0.9);

    // Setup download link
    downloadLink.href = convertedUrl;
    downloadLink.download = `converted-image${extension}`;
    downloadLink.classList.remove('hidden');
    downloadLink.textContent = `Download ${extension.toUpperCase()}`;
});