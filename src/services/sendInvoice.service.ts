import * as soap from 'soap';
import * as path from 'path';
import fs from 'fs';
import axios, { AxiosInstance } from 'axios';
import * as https from 'https';

export const sendInvoice = async () => {
    try {
        // Ensure WSDL file path is resolved correctly
        const wsdlPath = path.resolve(__dirname, 'SdIRiceviFile_v1.0.wsdl');
        console.log("Resolved WSDL Path:", wsdlPath);

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

        // Create HTTPS agent for secure connections
        const agent = new https.Agent({
            key: key,
            cert: cert,
            ca: ca,
            rejectUnauthorized: false // Set to false for self-signed certificates
        });

        // Create an Axios instance with the HTTPS agent
        const axiosInstance: AxiosInstance = axios.create({
            httpsAgent: agent
        });

        // Create SOAP client with Axios instance as request handler
        const soapClient = await soap.createClientAsync(wsdlPath, {
            request: axiosInstance // ✅ Pass the entire AxiosInstance
        });
        //console.log("SOAP Client Created, Inspecting WSDL...");
        //console.log(soapClient.describe()); // Prints available SOAP methods
        
      /*   soapClient.on('request', (xml: string) => {
            console.log("SOAP Request XML:", xml); // Logs the actual SOAP request
        }); */
        // Load XML invoice file
        const filePath = path.resolve('./src/services/invoice.xml');

        if (!fs.existsSync(filePath)) {
            throw new Error("Invoice XML file is missing.");
        }

        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const base64FileContent = Buffer.from(fileContent).toString('base64');

        // SOAP request parameters
        const params = {
            NomeFile: 'IT04126420043_000001.xml',
            File: base64FileContent,
        };

        console.log("Sending SOAP request with parameters:", params);

        // Call the SOAP service method
        const response = await soapClient.RiceviFileAsync(params);

        console.log("SOAP Response:", response);

        return {
            success: true,
            message: "Invoice successfully sent to SDI.",
            data: response,
        };

    } catch (error) {
        console.error("Error in Sending Invoice:", error);

        return {
            success: false,
            message: "Failed to send invoice to SDI.",
            error: error instanceof Error ? error.message : String(error),
        };
    }
};
