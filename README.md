<h1 align="center" id="title">Dynamic UPI QR Code Generator</h1>

<p align="center"><img src="https://socialify.git.ci/devagn611/upi_qr_code/image?description=1&amp;descriptionEditable=I%27ve%20included%20features%20in%20this%20project%20that%20make%20it%20possible%20you%20to%20generate%20a%20limitless%20number%20of%20UPI%20payment%20QR%20codes%20to%20accept%20payments%20from%20customers.&amp;font=KoHo&amp;language=1&amp;name=1&amp;owner=1&amp;pattern=Circuit%20Board&amp;stargazers=1&amp;theme=Auto" alt="project-image"></p>

<p id="description">I've included features in this project that make it possible you to generate a limitless number of UPI payment QR codes to accept payments from customers.</p>

<p align="center"><img src="https://img.shields.io/badge/license-GPL-blue" alt="shields"></p>

<h2>🚀 Demo</h2>

[1.Click Here](https://upi-qr-code.onrender.com/)</br>

<h2>🧐 Features</h2>

Here're some of the project's best features:

*   Qr Generetor
*   Lightning Fast
*   User-Friendly UI

<h2>API Endpoints</h2>

Remember :
Host Name: 
1.https://upi-payment-qr.vercel.app/
2.https://upi-qr-code.onrender.com/


Payment Interface (PI) Documentation
build by Devagn Maniya
Introduction
The Payment Interface (PI) is a standardized protocol for initiating and processing payments using UPI QR codes. This documentation provides an overview of the PI structure and how to use it.

PI Structure
The PI consists of key-value pairs separated by '&' characters. The basic structure is:

          /api/qrgen?upiid=upiID&name=name

          /api/qrgen?ifsccode=ifscCode&accountnum=accountNo&name=name;
        
Key Parameters
upiid: Payee address (UPI ID)
name: Payee name
am: Amount (optional)
Example Usage
Here's an example of a complete PI string:

          /api/qrgen?upiid=devagnmaniya611@oksbi&name=dev&am=
        
Important Notes
Ensure all parameter values are properly URL-encoded.
The 'am' parameter is optional. If omitted, the user can enter the amount in their UPI app.
Additional parameters may be supported depending on the UPI implementation.
Disclaimer
We are not responsible for any damage caused or mistake by you or while generating qr.
you and only you are responsible for the loss of your money or Payment.
  
  
<h2>💻 Built with</h2>

Technologies used in the project:

*   Node
*   JAVASCRIPT
*   rawgitQRAPI

<h2>Author</h2> 

[@Devagn](https://github.com/devagn611)  
