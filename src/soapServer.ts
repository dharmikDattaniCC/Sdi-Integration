import * as soap from 'soap';
import path from 'path';
import { logger } from './config/logger';
import { app } from './config/express'; // Express app for middleware support
import fs from 'fs'; // Import file system to load the WSDL

// SOAP Service Definition Interfaces
interface AttestazioneArgs {
    fatturaId: string;
    stato: string;
    signedXml: string;
}

interface AttestazioneResponse {
    success: boolean;
    message: string;
}

// SOAP Service Implementation
const soapService = {
    SDIService: {
        SDIPort: {
            AttestazioneTrasmissioneFattura: (
                args: AttestazioneArgs,
                callback: (error: any, result: { result: AttestazioneResponse }) => void // Corrected callback signature
            ): void => {
                logger.info('Received SDI callback:', args);
                console.log("herereere")
                try {
                    const { fatturaId, stato, signedXml } = args;

                    // Log the received details
                    logger.info(`Processing SDI Response - FatturaId: ${fatturaId}, Status: ${stato}`);
                    logger.info(`Partial Signed XML: ${signedXml.substring(0, 100)}...`);

                    // Acknowledge successful processing
                    callback(null, { result: { success: true, message: 'Acknowledgment received successfully' } });
                } catch (error) {
                    logger.error('Error processing SDI callback:', error);
                    callback(error, { result: { success: false, message: 'Error processing SDI callback' } });
                }
            },
        },
    },
};

// Resolve WSDL Path
const wsdlPath = path.resolve('./src/services/TrasmissioneFatture_v1.1.wsdl'
);
    console.log("wsdlPath", wsdlPath)
if (!fs.existsSync(wsdlPath)) {
    throw new Error(`WSDL file not found at path: ${wsdlPath}`);
}

// Start the SOAP Server
soap.listen(app, '/sdi', soapService as any, wsdlPath, () => {
    logger.info('SOAP service is running and ready for SDI callbacks at /sdi.');
});