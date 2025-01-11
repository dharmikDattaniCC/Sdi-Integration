import { SignedXml } from 'xml-crypto';
import * as fs from 'fs';

// export const signInvoice = async (xml: string) => {
//     try {
//         const privateKey = fs.readFileSync(process.env.PRIVATE_KEY_PATH as string, 'utf8');
//         const signer = new SignedXml();

//         // Set the canonicalization algorithm
//         signer.canonicalizationAlgorithm = "http://www.w3.org/2001/10/xml-exc-c14n#"; // Exclusive XML Canonicalization

//         // Set the signature algorithm
//         signer.signatureAlgorithm = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"; // RSA with SHA256

//         signer.addReference({
//             xpath: "//*[local-name(.)='ElementToSign']", // XPath to the element you want to sign
//             transforms: [
//                 "http://www.w3.org/2000/09/xmldsig#enveloped-signature", // Exclude the signature element
//                 "http://www.w3.org/2001/10/xml-exc-c14n#" // Canonicalization
//             ],
//             digestAlgorithm: "http://www.w3.org/2001/04/xmlenc#sha256" // Digest algorithm
//         });

//         signer.privateKey = privateKey;
//         signer.computeSignature(xml);

//         return signer.getSignatureXml();
//     } catch (error: unknown) {
//         console.error("Error in Singning Invoice:", error);
//         const errorMessage = error instanceof Error ? error.message : String(error);
//         return {
//             success: false,
//             message: "Internal Server Error",
//             error: errorMessage
//         };
//     }
// };


// export const signInvoice = async (xml: string) => {
//     try {
//         const privateKey = fs.readFileSync(process.env.PRIVATE_KEY_PATH as string, 'utf8');
//         const signer = new SignedXml();

//         const xml = `
//         <?xml version="1.0" encoding="UTF-8"?>
//         <Invoice>
//             <Data>Sample Data</Data>
//         </Invoice>`;

//         // Set the canonicalization algorithm
//         signer.canonicalizationAlgorithm = "http://www.w3.org/2001/10/xml-exc-c14n#"; // Exclusive XML Canonicalization

//         // Set the signature algorithm
//         signer.signatureAlgorithm = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"; // RSA with SHA256

//         // Log the XML document to debug XPath issues
//         console.log("XML to be signed:", xml);



//         signer.addReference({
//             xpath: "//*[local-name(.)='Invoice']", // Update this to match your target element
//             transforms: [
//                 "http://www.w3.org/2000/09/xmldsig#enveloped-signature", // Exclude the signature element
//                 "http://www.w3.org/2001/10/xml-exc-c14n#" // Canonicalization
//             ],
//             digestAlgorithm: "http://www.w3.org/2001/04/xmlenc#sha256" // Digest algorithm
//         });

//         signer.privateKey = privateKey;
//         signer.computeSignature(xml);

//         return {
//             success: true,
//             signedXml: signer.getSignedXml(),
//         };
//     } catch (error: unknown) {
//         console.error("Error in Signing Invoice:", error);
//         const errorMessage = error instanceof Error ? error.message : String(error);
//         return {
//             success: false,
//             message: "Internal Server Error",
//             error: errorMessage
//         };
//     }
// };

export const signInvoice = async (xml: string) => {
    try {
        const privateKey = fs.readFileSync('E:\\Crest Coder\\Project-Be\\Sdi-Integration\\src\\services\\private_key.pem', 'utf8');
        const signer = new SignedXml();

        // Use the incoming `xml` variable directly instead of redefining it
        console.log("XML to be signed:", xml);

        signer.canonicalizationAlgorithm = "http://www.w3.org/2001/10/xml-exc-c14n#"; // Exclusive XML Canonicalization
        signer.signatureAlgorithm = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"; // RSA with SHA256

        signer.addReference({
            xpath: "//*[local-name(.)='FatturaElettronica']", // Adjust this to match your XML structure
            transforms: [
                "http://www.w3.org/2000/09/xmldsig#enveloped-signature", // Exclude the signature element
                "http://www.w3.org/2001/10/xml-exc-c14n#" // Canonicalization
            ],
            digestAlgorithm: "http://www.w3.org/2001/04/xmlenc#sha256" // Digest algorithm
        });

        signer.privateKey = privateKey;
        signer.computeSignature(xml);

        return {
            success: true,
            signedXml: signer.getSignedXml(),
        };
    } catch (error: unknown) {
        console.error("Error in Signing Invoice:", error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
            success: false,
            message: "Internal Server Error",
            error: errorMessage
        };
    }
};
