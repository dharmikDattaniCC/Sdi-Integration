// import { SignedXml } from 'xml-crypto';
// import * as fs from 'fs';
// import * as crypto from 'crypto';

// // Extend the SignedXml class to include missing properties
// declare module 'xml-crypto' {
//     interface SignedXml {
//         keyInfoProvider: any;
//         signingKey: string | Buffer;
//     }
// }

// class MyKeyInfo {
//     private key: string;
//     private certificate: string;

//     constructor(key: string, certificate: string) {
//         this.key = key;
//         this.certificate = certificate;
//     }

//     getKeyInfo() {
//         return `<X509Data><X509Certificate>${this.certificate}</X509Certificate></X509Data>`;
//     }

//     getKey(keyInfo?: Node | Node[]): Buffer {
//         console.log("[DEBUG] Fetching Private Key...");
//         return Buffer.from(this.key.trim(), 'utf8'); // Ensure no extra whitespace
//     }
    
// }

// export const signInvoice = async (xml: string) => {
//     try {

//         console.log("xml file data", xml)
//         console.log('[INFO] Starting XML signing process...');

//         // Read private key file
//         console.log('[INFO] Reading private key file...');
//         const privateKey = await fs.promises.readFile('./src/services/SDI-PKCS8-04126420043.pem', 'utf8');
//         console.log('[SUCCESS] Private key file loaded.', privateKey);

//           // Validate private key format
//           if (!privateKey.includes('BEGIN PRIVATE KEY') && !privateKey.includes('BEGIN RSA PRIVATE KEY')) {
//             throw new Error('Invalid Private Key format');
//         }

//         console.log("correct")

//         // Read certificate file
//         console.log('[INFO] Reading certificate file...');
//         const certificate = await fs.promises.readFile('./src/services/SDI-04126420043.pem', 'utf8');
//         console.log('[SUCCESS] Certificate file loaded.', certificate);

//         // Initialize signature
//         console.log('[INFO] Initializing SignedXml...');
//         const sig = new SignedXml({
//             canonicalizationAlgorithm: 'http://www.w3.org/2001/10/xml-exc-c14n#', // Canonicalization algorithm
//             signatureAlgorithm: 'http://www.w3.org/2001/04/xmldsig-more#rsa-sha256', // Signature algorithm
//         });
        
//         sig.keyInfoProvider = new MyKeyInfo(privateKey, certificate);
//         sig.signingKey = privateKey.trim();

//         // Add reference to XML document
//         console.log('[INFO] Adding reference to the XML document...');
//         sig.addReference({
//             xpath: "/*",  // Sign the entire XML
//             transforms: ["http://www.w3.org/2000/09/xmldsig#enveloped-signature"], 
//             digestAlgorithm: "http://www.w3.org/2001/04/xmlenc#sha256"
//         });

//         // Compute signature
//         console.log('[INFO] Computing XML signature...');
//         sig.computeSignature(xml);
//         console.log('[SUCCESS] XML signature computed successfully.');

//         // Get signed XML
//         const signedXml = sig.getSignedXml();
//         console.log('[INFO] Signed XML generated successfully.');

//         return {
//             success: true,
//             signedXml,
//         };
//     } catch (error: unknown) {
//         console.error('[ERROR] Error in Signing Invoice:', error);
//         return {
//             success: false,
//             message: 'Internal Server Error',
//             error: error instanceof Error ? error.message : String(error),
//         };
//     }
// };








// import { SignedXml } from 'xml-crypto';
// import * as fs from 'fs';

// export const signInvoice = async (xml: string) => {
//     try {
//         console.log("xml file data", xml);
//         console.log('[INFO] Starting XML signing process...');

//         // Read private key file
//         console.log('[INFO] Reading private key file...');
//         const privateKey = await fs.promises.readFile('./src/services/SDI-PKCS8-04126420043.pem', 'utf8');
//         console.log('[SUCCESS] Private key file loaded.');

//         // Validate private key format
//         if (!privateKey.includes('BEGIN PRIVATE KEY')) {
//             throw new Error('Invalid Private Key format');
//         }

//         // Read certificate file
//         console.log('[INFO] Reading certificate file...');
//         const certificate = await fs.promises.readFile('./src/services/SDI-04126420043.pem', 'utf8');
//         console.log('[SUCCESS] Certificate file loaded.');

//         // Initialize signature
//         console.log('[INFO] Initializing SignedXml...');
//         const sig = new SignedXml({
//             canonicalizationAlgorithm: 'http://www.w3.org/2001/10/xml-exc-c14n#',
//             signatureAlgorithm: 'http://www.w3.org/2001/04/xmldsig-more#rsa-sha256',
//         });

//         // Correct keyInfoProvider
//         sig.keyInfoProvider = {
//             getKeyInfo() {
//                 return `<X509Data><X509Certificate>${certificate.trim()}</X509Certificate></X509Data>`;
//             },
//             getKey() {
//                 return privateKey.trim();
//             }
//         };

//         sig.signingKey = privateKey.trim(); // Ensure it's a string, not a Buffer

//         // Add reference to XML document
//         console.log('[INFO] Adding reference to the XML document...');
//         sig.addReference({
//             xpath: "/*",
//             transforms: ["http://www.w3.org/2000/09/xmldsig#enveloped-signature"],
//             digestAlgorithm: "http://www.w3.org/2001/04/xmlenc#sha256"
//         });

//         // Compute signature
//         console.log('[INFO] Computing XML signature...');
//         sig.computeSignature(xml);
//         console.log('[SUCCESS] XML signature computed successfully.');

//         // Get signed XML
//         const signedXml = sig.getSignedXml();
//         console.log('[INFO] Signed XML generated successfully.');

//         return {
//             success: true,
//             signedXml,
//         };
//     } catch (error: unknown) {
//         console.error('[ERROR] Error in Signing Invoice:', error);
//         return {
//             success: false,
//             message: 'Internal Server Error',
//             error: error instanceof Error ? error.message : String(error),
//         };
//     }
// };




// DEEP
import { SignedXml } from 'xml-crypto';
import * as fs from 'fs';
import * as crypto from 'crypto';

// Extend the SignedXml class to include missing properties
declare module 'xml-crypto' {
    interface SignedXml {
        keyInfoProvider: any;
        signingKey: string | Buffer;
    }
}

// KeyInfoProvider implementation
class MyKeyInfo {
    private key: string;
    private certificate: string;

    constructor(key: string, certificate: string) {
        this.key = key;
        this.certificate = certificate;
    }

    getKeyInfo() {
        return `<X509Data><X509Certificate>${this.certificate}</X509Certificate></X509Data>`;
    }

    getKey(keyInfo?: Node | Node[]): Buffer {
        console.log("[DEBUG] Fetching Private Key...");
        return Buffer.from(this.key.trim(), 'utf8'); // Ensure no extra whitespace
    }
}

export const signInvoice = async (xml: string) => {
    try {
        console.log("xml file data", xml);
        console.log('[INFO] Starting XML signing process...');

        // Read private key file
        console.log('[INFO] Reading private key file...');
        const privateKey = await fs.promises.readFile('./src/services/SDI-PKCS8-04126420043.pem', 'utf8');
        console.log('[SUCCESS] Private key file loaded.');

        // Validate private key format
        if (!privateKey.includes('BEGIN PRIVATE KEY') && !privateKey.includes('BEGIN RSA PRIVATE KEY')) {
            throw new Error('Invalid Private Key format');
        }

        // Read certificate file
        console.log('[INFO] Reading certificate file...');
        const certificate = await fs.promises.readFile('./src/services/SDI-04126420043.pem', 'utf8');
        console.log('[SUCCESS] Certificate file loaded.');

        // Initialize signature
        console.log('[INFO] Initializing SignedXml...');
        const sig = new SignedXml({
            canonicalizationAlgorithm: 'http://www.w3.org/2001/10/xml-exc-c14n#', // Canonicalization algorithm
            signatureAlgorithm: 'http://www.w3.org/2001/04/xmldsig-more#rsa-sha256', // Signature algorithm
        });

        // Assign keyInfoProvider and signingKey
        sig.keyInfoProvider = new MyKeyInfo(privateKey, certificate);
        sig.signingKey = Buffer.from(privateKey.trim(), 'utf8');

        // Add reference to XML document
        console.log('[INFO] Adding reference to the XML document...');
        sig.addReference({
            xpath: "/*",  // Sign the entire XML
            transforms: ["http://www.w3.org/2000/09/xmldsig#enveloped-signature"],
            digestAlgorithm: "http://www.w3.org/2001/04/xmlenc#sha256"
        });

        // Compute signature
        console.log('[INFO] Computing XML signature...');
        sig.computeSignature(xml);
        console.log('[SUCCESS] XML signature computed successfully.');

        // Get signed XML
        const signedXml = sig.getSignedXml();
        console.log('[INFO] Signed XML generated successfully.');

        return {
            success: true,
            signedXml,
        };
    } catch (error: unknown) {
        console.error('[ERROR] Error in Signing Invoice:', error);
        return {
            success: false,
            message: 'Internal Server Error',
            error: error instanceof Error ? error.message : String(error),
        };
    }
};