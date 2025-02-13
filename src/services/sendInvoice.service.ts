import * as soap from 'soap';
import * as path from 'path';
import fs from 'fs';
import axios, { AxiosInstance } from 'axios';
import * as https from 'https';
import { create } from 'xmlbuilder2';
const { XMLValidator } = require('fast-xml-parser');

export const sendInvoice = async (signedXml: string| undefined) => {
    try {
        // const xml = create({ version: '3.2', encoding: 'UTF-8' }).ele('FatturaElettronica').ele('FatturaElettronicaHeader').txt('Header Content').up().ele('FatturaElettronicaBody').txt('Body Content').up().end({ prettyPrint: true });

        // console.log(xml);

        // const xmlString = xml.trim();
        // if (!XMLValidator.validate(xmlString)) {
        //     console.error("Invalid XML format detected!");
        // }
        // Ensure WSDL file path is resolved correctly
        const wsdlPath = path.resolve(__dirname, 'SdIRiceviFile_v1.0.wsdl');
        console.log("Resolved WSDL Path:", wsdlPath);

        // Load SSL certificates
        const certPath = path.resolve("./src/services/SDI-04126420043.pem");
        const keyPath = path.resolve("./src/services/SDI-PKCS8-04126420043.pem");
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
            rejectUnauthorized: false
        });

        // Create an Axios instance with the HTTPS agent
        const axiosInstance: AxiosInstance = axios.create({
            httpsAgent: agent,
            timeout: 1000000
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
        // const filePath = path.resolve('./src/services/invoice.xml');

        // if (!fs.existsSync(filePath)) {
        //     throw new Error("Invoice XML file is missing.");
        // }

        // const fileContent = fs.readFileSync(filePath, 'utf-8');
        // console.log("Type", typeof fileContent);
        if(!signedXml){
            throw new Error("Invoice XML file is missing.");
        }
        // const base64FileContent = Buffer.from(fileContent.trim()).toString('base64');
        const base64FileContent = Buffer.from(signedXml.trim()).toString('base64');


        // SOAP request parameters
        const params = {
            NomeFile: 'IT04126420043_000001.xml',
            File: base64FileContent.trim(),
        };

        // console.log("Sending SOAP request with parameters:", params);

        // Call the SOAP service method
        const response = await soapClient.RiceviFileAsync(params);

        // console.log("SOAP Response:", response);



        return {
            success: true,
            message: "Invoice successfully sent to SDI.",
            data: response,
        };

    } catch (error) {
        // console.error("Error in Sending Invoice:", error);
        console.log('stringLog', String((error as any).response?.data?.error || error))

        return {
            success: false,
            message: "Failed to send invoice to SDI.",
            error: error instanceof Error ? error.message : String((error as any).response?.data?.error || error),
        };
    }
};
