import { SignedXml } from 'xml-crypto';
import * as fs from 'fs';

export const signInvoice = async (xml: string) => {
    try {
        const crypto = require('crypto');
        const fs = require('fs');
        
        const privateKey = fs.readFileSync('./src/services/SDI-04126420043.key', 'utf8');
        const signer = crypto.createSign('RSA-SHA256');
        
        const xmlData = fs.readFileSync('./src/services/invoice.xml', 'utf8');
        signer.update(xmlData);
        const signature = signer.sign(privateKey, 'base64');
        
        // console.log(signature);
        

        return {
            success: true,
            signedXml: signature,
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

