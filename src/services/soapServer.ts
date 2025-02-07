import * as soap from 'soap';
import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';

// Load SSL certificates
const certPath = path.resolve("./src/services/SDI-04126420043.pem");
const keyPath = path.resolve("./src/services/SDI-04126420043.key");
const caPath = path.resolve("./src/services/caentrate.pem");

if (!fs.existsSync(certPath) || !fs.existsSync(keyPath)) {
    throw new Error("SSL certificate or key file is missing.");
}

const cert = fs.readFileSync(certPath);
const key = fs.readFileSync(keyPath);
const ca = fs.readFileSync(caPath);

// Create HTTPS server
const httpsServer = https.createServer({
    key: key,
    cert: cert,
    ca: ca,
    rejectUnauthorized: true,
    secureProtocol: 'TLSv1_2_method,TLSv1_3_method'
}, (req, res) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end();
});

// Define the NotificaScarto operation with proper types
const notificaScarto = (args: { [key: string]: any }, callback: (err: any, result: any) => void) => {
    console.log("Received NotificaScarto:", args);
    // Process the notification as needed
    callback(null, { success: true });
};

// Create SOAP service
const soapService = {
    NotificaScarto: notificaScarto
};

// Create SOAP server
const soapServer = soap.listen(httpsServer, '/sdi', soapService, () => {
    console.log('SOAP server initialized and listening for SDI requests...');
}, function(err, result) {
    if (err) {
        console.error('Error initializing SOAP server:', err);
    } else {
        console.log('SOAP server started successfully:', result);
    }
});

const PORT = 5008;
httpsServer.listen(PORT, () => {
    console.log(`HTTPS server is running on port ${PORT}...`);
});
