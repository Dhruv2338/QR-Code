let qr = null;

function clearQRCode() {
  const container = document.getElementById("qrcode");
  container.innerHTML = "";
  document.getElementById("meta").textContent = "No QR generated yet";
  document.getElementById("metaSize").textContent = "—";
  qr = null;
}

function generateQRCode() {
  const type = document.getElementById("type").value;
  const value = document.getElementById("inputValue").value.trim();
  const size = parseInt(document.getElementById("size").value, 10) || 320;
  const ec = document.getElementById("ec").value;

  if (!value) {
    alert("Please enter a URL or text to generate a QR code.");
    return;
  }

  clearQRCode();

  // Generate QR using QRCode.js
  qr = new QRCode(document.getElementById("qrcode"), {
    text: value,
    width: size,
    height: size,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel[ec],
  });

  document.getElementById("meta").textContent =
    (type === "url" ? "URL" : "Text") +
    " — " +
    (value.length > 80 ? value.slice(0, 77) + "..." : value);

  document.getElementById("metaSize").textContent = size + "×" + size + " px";
}

function downloadQRCode() {
  const container = document.getElementById("qrcode");
  const img = container.querySelector("img");
  const canvas = container.querySelector("canvas");

  if (img && img.src) {
    const link = document.createElement("a");
    link.href = img.src;
    link.download = "qr-code.png";
    link.click();
    return;
  }

  if (canvas) {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "qr-code.png";
    link.click();
    return;
  }

  alert("No QR code to download!");
}

document.getElementById("generateBtn").addEventListener("click", generateQRCode);
document.getElementById("clearBtn").addEventListener("click", clearQRCode);
document.getElementById("downloadBtn").addEventListener("click", downloadQRCode);

// Generate default example on page load
window.addEventListener("DOMContentLoaded", generateQRCode);
