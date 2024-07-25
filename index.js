const express = require('express');
const path = require('path');
const { generateQRCodeFromData, showLoader, hideLoader } = require('./src/QrCode');
const QRCode = require('qrcode');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/api/genqr', (req, res) => {
  const { name, id } = req.query;

  if (!name || !id) {
    return res.status(400).json({ error: 'Name and ID are required' });
  }

  try {
    const qrCodeDataUrl = generateQRCodeFromData(`upi://pay?pa=${id}&pn=${name}`);
    res.json({ qrCodeDataUrl });
  } catch (error) {
    console.error('Error generating QR code:', error);
    res.status(500).json({ error: 'Error generating QR code' });
  }
});

app.get('/api/qrgen', async (req, res) => {
  const { upiid, name, amount,ifsccode, accountnum } = req.query;

  try {
    let qrData;
    if (upiid && name) {
      qrData = `upi://pay?pa=${upiid}&pn=${name}&am=${amount}`;
    } else if (ifsccode && accountnum && name) {
      qrData = `upi://pay?pa=${accountnum}@${ifsccode}.ifsc.npci&pn=${name}&am=${amount}`;
    } else {
      return res.status(400).send('?upiid=addupiidhere&name=g');
    }

    const qrCodeBuffer = await QRCode.toBuffer(qrData);
    res.type('png').send(qrCodeBuffer);
  } catch (error) {
    console.error('Error generating QR code:', error);
    res.status(500).send('Error generating QR code');
  }
});

app.get('/qrgen', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.get('/api', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/api.html'));
});

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
