// Theme toggle functionality
const themeToggleBtn = document.getElementById("themeToggle");
const html = document.documentElement;

themeToggleBtn.addEventListener("click", function () {
  html.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    html.classList.contains("dark") ? "dark" : "light"
  );
});

// Check for saved theme preference or prefer-color-scheme
if (
  localStorage.getItem("theme") === "dark" ||
  (!localStorage.getItem("theme") &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  html.classList.add("dark");
} else {
  html.classList.remove("dark");
}

function showInputFields() {
  const dataType = document.getElementById("dataType").value;
  document.getElementById("upiidGroup").style.display =
    dataType === "upiid" ? "block" : "none";
  document.getElementById("upiGroup").style.display =
    dataType === "upi" ? "block" : "none";
}

document.getElementById("qrForm").addEventListener("submit", function (e) {
  e.preventDefault();
  generateQRCode();
});

function generateQRCode() {
  const dataType = document.getElementById("dataType").value;
  let apiUrl;
  let name;

  if (dataType === "upiid") {
    name = document.getElementById("upiName").value;
    const upiID = document.getElementById("upiID").value;
    const amount = document.getElementById("amount").value;
    apiUrl = `/api/qrgen?upiid=${encodeURIComponent(
      upiID
    )}&name=${encodeURIComponent(name)}&tn=undefined&am=${(amount)}`;
  } else if (dataType === "upi") {
    const accountNo = document.getElementById("accountNo").value;
    const ifscCode = document.getElementById("ifscCode").value;
    name = document.getElementById("personName").value;
    apiUrl = `/api/qrgen?ifsccode=${encodeURIComponent(
      ifscCode
    )}&accountnum=${encodeURIComponent(accountNo)}&name=${encodeURIComponent(
      name
    )}&tn=undefined&am=${encodeURIComponent(amount)}`;
  } else {
    alert("Please select a data type");
    return;
  }

  fetch(apiUrl)
    .then((response) => response.blob())
    .then((blob) => {
      const qrCodeImg = document.getElementById("qrCode");
      qrCodeImg.src = URL.createObjectURL(blob);
      document.getElementById("printArea").style.display = "block";

      const showNameDiv = document.querySelector(".show-name");
      showNameDiv.textContent = `Name: ${name}`;

      document.getElementById("upilinkapp").href = apiUrl.replace(
        "/api/qrgen",
        "upi://pay"
      );
      document.getElementById("upilinkapp").style.display = "block";
      document.getElementById("printQRBtn").style.display = "block";

      const downloadBtn = document.getElementById("downloadQRBtn");
      downloadBtn.href = URL.createObjectURL(blob);
      downloadBtn.download = "qrcode.png";
      downloadBtn.style.display = "block";

      const shareBtn = document.getElementById("shareQRBtn");
      shareBtn.onclick = function () {
        const shareData = {
          title: "QR Code",
          text: `Scan this QR code for ${name}`,
          url: `http://localhost:3000${apiUrl}`,
        };

        if (navigator.share) {
          navigator
            .share(shareData)
            .catch((error) => console.error("Error sharing:", error));
        } else {
          alert("Sharing is not supported in this browser.");
        }
      };
    })
    .catch((error) => {
      console.error("Error generating QR code:", error);
      alert("Error generating QR code. Please try again.");
    });
}

function printQRCode() {
  const printArea = document.getElementById("qrcode-output").innerHTML;
  const originalContent = document.body.innerHTML;
  const darkClass = document.documentElement.classList.contains("dark")
    ? "dark"
    : "";

  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
<html lang="en">
<head>
  <title>Print QR Code</title>
  <style>
    @media print {
      body {
        display: block;
      }
    }
    body {
      transition: none;
    }
  </style>
</head>
<body class="${darkClass}">
  ${printArea}
</body>
</html>
`);
  printWindow.document.close();
  printWindow.print();
  printWindow.close();
}

document
  .querySelector('[data-collapse-toggle="navbar-cta"]')
  .addEventListener("click", function () {
    const navbar = document.getElementById("navbar-cta");
    navbar.classList.toggle("hidden");
  });
