import * as soap from 'soap';
import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';

// Load SSL certificates
const certPath = path.resolve(__dirname,"./SDI-04126420043.pem");
const keyPath = path.resolve(__dirname,"./SDI-PKCS8-04126420043.pem");
const caPath = path.resolve(__dirname,"./caentrate.pem");


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
    rejectUnauthorized: false,
    // secureProtocol: 'TLSv1_2_method,TLSv1_3_method'
}, (req, res) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end();
});

// ✅ FIX: Define proper service interface
interface NotificaScartoRequest {
    [key: string]: any; // Adapt to expected request structure
}

interface NotificaScartoResponse {
    success: boolean;
}

// ✅ FIX: Ensure function signature follows SOAP expectations
const serviceDefinition = {
    SDIPort: {
        NotificaScarto: async (args: NotificaScartoRequest): Promise<NotificaScartoResponse> => {
            console.log("Received NotificaScarto:", args);
            return { success: true }; // SOAP expects a direct return instead of a callback
        }
    }
};

// Load WSDL file
const wsdlPath = path.resolve(__dirname, 'notification.wsdl');
const wsdlXML = fs.readFileSync(wsdlPath, 'utf8');

const PORT = 5006;
httpsServer.listen(PORT, () => {
    console.log(`HTTPS server is running on port ${PORT}...`);
});
// ✅ FIX: Correct function signature for `soap.listen`
soap.listen(httpsServer, '/sdi', { SDIService: serviceDefinition }, wsdlXML, (err: any) => {
    if (err) {
        console.error('Error initializing SOAP server:', err);
    } else {
        console.log('SOAP server initialized and listening for SDI requests...');
    }
});


