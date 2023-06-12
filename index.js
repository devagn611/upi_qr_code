// refer the comments to understand the code 

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
  var qrCodeElement = document.getElementById("qrCode");
  qrCodeElement.innerHTML = ""; // Clear the contents of the QR code element

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
  document.getElementById("upilinkapp").setAttribute("href", upiLink);
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
  document.getElementById("upilinkapp").setAttribute("href", upiLink);
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

// function shareQRCode() {
//   var canvas = document.querySelector("#qrCode canvas");
//   var image = canvas.toDataURL("image/png");

//   // Create a temporary link element
//   var link = document.createElement("a");
//   link.href = image;
//   link.download = "qr_code.png";

//   // Trigger a click event on the link to start the download
//   link.click();
// }

function downloadQRCode() {
  var dataType = document.getElementById("dataType").value;
  var printContents = document.getElementsByClassName("qr-code-preview")[0].innerHTML;
  var originalContents = document.body.innerHTML;

  var Nameid = document.getElementById("upiName").value;
  var personName = document.getElementById("personName").value;
  var selectedName;

  if (dataType === "upiid") {
    selectedName = Nameid;
  } else if (dataType === "upi") {
    selectedName = personName;
  } else {
    selectedName = "Unknown";
  }

  // Create a new element to display the selected name
  var nameElement = document.createElement("h4");
  nameElement.textContent = "Name: " + selectedName;

  // Create a new div element to contain the name and QR code content
  var wrapperElement = document.createElement("div");
  wrapperElement.appendChild(nameElement);
  wrapperElement.innerHTML += printContents;

  // Apply styles to the wrapper element
  wrapperElement.style.maxWidth = "250px";
  wrapperElement.style.margin = "0 auto";
  wrapperElement.style.padding = "20px";
  wrapperElement.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
  wrapperElement.style.borderRadius = "5px";
  wrapperElement.style.border = "1px solid #000";
  wrapperElement.style.boxShadow = "0 0 4px rgba(0, 0, 0, 0.4)";

  // Append the wrapper element to the body
  document.body.appendChild(wrapperElement);

  // Use html2canvas to render the wrapper element as a canvas
  html2canvas(wrapperElement).then(function(canvas) {
    // Convert the canvas to a data URL
    var dataUrl = canvas.toDataURL("image/png");

    // Create a temporary link element
    var link = document.createElement("a");
    link.href = dataUrl;
    link.download = "qrcode.png";

    // Trigger a click event on the link to start the download
    link.click();
    location.reload();
  });
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

// function printQRCode() {
//   var dataType = document.getElementById("dataType").value;
//   var printContents =
//     document.getElementsByClassName("qr-code-preview")[0].innerHTML;
//   var originalContents = document.body.innerHTML;

//   var Nameid = document.getElementById("upiName").value;
//   var personName = document.getElementById("personName").value;
//   var selectedName;

//   if (dataType === "upiid") {
//     selectedName = Nameid;
//   } else if (dataType === "upi") {
//     selectedName = personName;
//   } else {
//     selectedName = "Unknown";
//   }

//   // Append the selected name to the print contents
//   printContents += "<h4>Name: " + selectedName + "</h4>";

//   document.body.innerHTML = printContents;
//   window.print();

//   location.reload();
// }

function printQRCode() {
  var dataType = document.getElementById("dataType").value;
  var printContents = document.getElementsByClassName("qr-code-preview")[0].innerHTML;
  var originalContents = document.body.innerHTML;

  var Nameid = document.getElementById("upiName").value;
  var personName = document.getElementById("personName").value;
  var selectedName;

  if (dataType === "upiid") {
    selectedName = Nameid;
  } else if (dataType === "upi") {
    selectedName = personName;
  } else {
    selectedName = "Unknown";
  }

  // Create a new element to display the selected name
  var nameElement = document.createElement("h4");
  nameElement.textContent = "Name: " + selectedName;

  // Create a new div element to contain the name and QR code content
  var wrapperElement = document.createElement("div");
  wrapperElement.appendChild(nameElement);
  wrapperElement.innerHTML += printContents;

  // Apply styles to the wrapper element
  wrapperElement.style.maxWidth = "250px";
  wrapperElement.style.margin = "0 auto";
  wrapperElement.style.padding = "20px";
  wrapperElement.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
  wrapperElement.style.borderRadius = "5px";
  wrapperElement.style.border = "1px solid #000";
  wrapperElement.style.boxShadow = "0 0 4px rgba(0, 0, 0, 0.4)";

  // Clear the existing body content
  document.body.innerHTML = "";

  // Append the wrapper element to the body
  document.body.appendChild(wrapperElement);

  // Print the page
  window.print();

  // Restore the original body content
  location.reload();
}
