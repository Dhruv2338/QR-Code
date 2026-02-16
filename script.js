const qrInput = document.getElementById('qr-input');
const qrButton = document.getElementById('generate-btn');
const qrDisplay = document.getElementById('qrcode');

// Initialize the QR instance
let qr = new QRCode(qrDisplay, {
    width: 200,
    height: 200,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
});

const qrInput = document.getElementById('qr-input');
const qrButton = document.getElementById('generate-btn');
const qrDisplay = document.getElementById('qrcode');
const downloadBtn = document.getElementById('download-btn');

// Initialize the QR instance
let qrcode = new QRCode(qrDisplay, {
    width: 256,
    height: 256,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
});

// Generate Button Logic
qrButton.addEventListener('click', () => {
    const text = qrInput.value.trim();
    
    if (text === "") {
        alert("Please enter a URL or text!");
        return;
    }

    qrcode.makeCode(text);
    
    // Show the download button after a tiny delay to let the library render
    setTimeout(() => {
        downloadBtn.style.display = "block";
    }, 100);
});

// Download Button Logic
downloadBtn.addEventListener('click', () => {
    // Find the image or canvas inside the qrcode div
    const qrCanvas = qrDisplay.querySelector('canvas');
    const qrImage = qrDisplay.querySelector('img');

    // Get the image source (either from canvas or the img tag)
    const qrDataUrl = qrCanvas ? qrCanvas.toDataURL("image/png") : qrImage.src;

    // Create a temporary link to trigger the download
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

qrButton.addEventListener('click', () => {
    const text = qrInput.value.trim();
    
    if (text === "") {
        alert("Please enter some text or a URL!");
        return;
    }

    // Clear and make a new code
    qrcode.clear(); 
    qrcode.makeCode(text);
});