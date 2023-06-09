var qrcode;
var darkMode = false;





function showInputFields() {
  var dataType = document.getElementById("dataType").value;

  // Hide all input groups
  var inputGroups = document.getElementsByClassName("input-group");
  for (var i = 0; i < inputGroups.length; i++) {
    inputGroups[i].style.display = "none";
  }

  // Show the selected input group
  if (dataType !== "") {
    document.getElementById(dataType + "Group").style.display = "block";
  }
}

function generateQRCode() {
  var dataType = document.getElementById("dataType").value;

  if (dataType === "upi") {
    generateUPIQRCode();
  } else if (dataType === "upiid") {
    generateUPIIDQRCode();
  }
}

function generateUPIIDQRCode() {
  var name = document.getElementById("upiName").value;
  var upiID = document.getElementById("upiID").value;

  var upiLink = "upi://pay?pa=" + upiID + "&pn=" + name;

  generateQRCodeFromData(upiLink);
  var printQRBtn = document.getElementById("printQRBtn");
  var downloadQRBtn = document.getElementById("downloadQRBtn");
  printQRBtn.style.display = "block";
  downloadQRBtn.style.display = "block";
}

function generateUPIQRCode() {
  var accountNo = document.getElementById("accountNo").value;
  var ifscCode = document.getElementById("ifscCode").value;
  var personName = document.getElementById("personName").value;

  var upiLink =
    "upi://pay?pa=" + accountNo + "@" + ifscCode + "&pn=" + personName + "&am=";

  generateQRCodeFromData(upiLink);
  var printQRBtn = document.getElementById("printQRBtn");
  var downloadQRBtn = document.getElementById("downloadQRBtn");
  printQRBtn.style.display = "block";
  downloadQRBtn.style.display = "block";
}

function generateQRCodeFromData(data) {
  showLoader();

  if (qrcode) {
    qrcode.clear(); // Clear any existing QR code
  }

  qrcode = new QRCode(document.getElementById("qrCode"), {
    width: 200,
    height: 200,
  });

  qrcode.makeCode(data);

  hideLoader();
}

function shareQRCode() {
  var canvas = document.querySelector("#qrCode canvas");
  var image = canvas.toDataURL("image/png");

  // Create a temporary link element
  var link = document.createElement("a");
  link.href = image;
  link.download = "qr_code.png";

  // Trigger a click event on the link to start the download
  link.click();
}

function downloadQRCode() {
  var canvas = document.querySelector("#qrCode canvas");
  var image = canvas.toDataURL("image/png");

  // Create a temporary link element
  var link = document.createElement("a");
  link.href = image;
  link.download = "qr_code.png";

  // Trigger a click event on the link to start the download
  link.click();
}

function toggleDarkMode() {
  var body = document.body;
  // var container = document.querySelector('.container');

  darkMode = !darkMode;

  if (darkMode) {
    body.classList.add("dark-mode");
    container.style.backgroundColor = "#444";
    container.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.3)";
  } else {
    body.classList.remove("dark-mode");
    container.style.backgroundColor = "#fff";
    container.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.1)";
  }
}

function showLoader() {
  var loader = document.getElementById("loader");
  loader.style.display = "block";
}

function hideLoader() {
  var loader = document.getElementById("loader");
  loader.style.display = "none";
}


function printQRCode() {
  var dataType = document.getElementById("dataType").value;
  var qrCode = document.getElementById("qrCode");
  var Name = document.getElementById("upiName").value;
  var UPIID = document.getElementById("upiID").value;
  var PersonName = document.getElementById("personName").value;

  var printWindow = window.open("", "_blank");
  printWindow.document.open();
  printWindow.document.write(
    '<html><head><title>Print QR Code</title></head><body style="text-align:center">'
  );
  printWindow.document.write("<h2>QR Code Details</h2>");
  if (dataType === "upiid") {
    printWindow.document.write("<p>Payee Name:</p>" + Name);
    printWindow.document.write("<p>Payee UPI ID:</p>" + UPIID);
  } else {
    printWindow.document.write("<p>Name:</p>" + PersonName);
  }
  printWindow.document.write('<div style="margin: 0 0 0 36%;" > ');
  printWindow.document.write(qrCode.innerHTML);
  printWindow.document.write('<div>');

  printWindow.document.write("</body></html>");
  printWindow.document.close();
  printWindow.print();
}
