import * as soap from 'soap';
import * as path from 'path';
import fs from 'fs';
import axios, { AxiosResponse } from "axios";
import https from 'https';
// export const sendInvoice = async (signedXml: string) => {
//     try {
//         const wsdlPath = path.resolve(__dirname, 'TrasmissioneFatture_v1.1.wsdl');
//         console.log("wsdlPath", wsdlPath);
//         const soapClient  = await soap.createClientAsync(wsdlPath);

//         // console.log("WSDL object:", client.wsdl);

//         // // For debugging purposes, you can inspect the WSDL operations here
//         // // Check the service and port for available methods
//         // const services = client.describe();
//         // console.log("Available Services and Methods:", services);

//         // // Iterate over services and methods
//         // for (const serviceName in services) {
//         //     const service = services[serviceName];
//         //     console.log(`Operations for ${serviceName}:`, service);
//         // }
//         const args = {
//             file: Buffer.from(signedXml).toString('base64'),
//         };

//         soapClient .addHttpHeader('Authorization', `Bearer ${process.env.SDI_TOKEN}`);
//         // console.log("client", client);
//         // const response = await client.InviaFatturaAsync(args);
//         console.log("args", args);
//         const response = await soapClient.InvioFatturaElettronicaAsync(args);
//         console.log("response", response);

//         return response;

//     } catch (error: unknown) {
//         console.error("Error in Sending Invoice:", error);
//         const errorMessage = error instanceof Error ? error.message : String(error);
//         return {
//             success: false,
//             message: "Internal Server Error",
//             error: errorMessage
//         };
//     }
// };







// export const sendInvoice = async (signedXml: string) => {
//     try {
//         // Ensure SDI Token is available
//         if (!process.env.SDI_TOKEN) {
//             throw new Error("SDI_TOKEN environment variable is not set.");
//         }

//         const wsdlPath = path.resolve(__dirname, 'TrasmissioneFatture_v1.1.wsdl');
//         console.log("wsdlPath", wsdlPath);

//         const soapClient = await soap.createClientAsync(wsdlPath);

//         // Check available services and methods
//         const services = soapClient.describe();
//         console.log("Available Services and Methods:", services);

//         const args = {
//             file: Buffer.from(signedXml).toString('base64'),
//         };

//         soapClient.addHttpHeader('Authorization', `Bearer ${process.env.SDI_TOKEN}`);

//         console.log("args", args);
//         // const response = await soapClient.InvioFatturaElettronicaAsync(args);
//         const response = await soapClient.AttestazioneTrasmissioneFatturaAsync(signedXml);

//         console.log("response", response);
//         return response;

//     } catch (error: unknown) {
//         console.error("Error in Sending Invoice:", error);
//         const errorMessage = error instanceof Error ? error.message : String(error);
//         return {
//             success: false,
//             message: "Internal Server Error",
//             error: errorMessage,
//         };
//     }
// };






// export const sendInvoice = async (signedXml: string) => {
//     try {
//         // Ensure SDI Token is available
//         if (!process.env.SDI_TOKEN) {
//             throw new Error("SDI_TOKEN environment variable is not set.");
//         }

//         const wsdlPath = path.resolve(__dirname, 'TrasmissioneFatture_v1.1.wsdl');
//         console.log("wsdlPath", wsdlPath);

//         const soapClient = await soap.createClientAsync(wsdlPath);

//         // Check available services and methods
//         const services = soapClient.describe();
//         console.log("Available Services and Methods:", services);

//         const args = {
//             file: Buffer.from(signedXml).toString('base64'),
//         };

//         soapClient.addHttpHeader('Authorization', `Bearer ${process.env.SDI_TOKEN}`);

//         console.log("args", args);
//         // This line should be replaced with an appropriate client-side method,
//         // not AttestazioneTrasmissioneFatturaAsync
//         // Example: const response = await soapClient.someClientMethodAsync(args);

//         const response = await soapClient.AttestazioneTrasmissioneFatturaAsync(args); // example for sending the invoice

//         console.log("response", response);
//         return response;

//     } catch (error: unknown) {
//         console.error("Error in Sending Invoice:", error);
//         const errorMessage = error instanceof Error ? error.message : String(error);
//         return {
//             success: false,
//             message: "Internal Server Error",
//             error: errorMessage,
//         };
//     }
// };





// export const sendInvoice = async (signedXml: string) => {
//     try {
//         // Ensure SDI Token is available
//         const sdiToken = process.env.SDI_TOKEN;
//         if (!sdiToken) {
//             throw new Error("SDI_TOKEN environment variable is not set.");
//         }

//         // Load the WSDL file
//         const wsdlPath = path.resolve(__dirname, 'TrasmissioneFatture_v1.1.wsdl');
//         console.log("Resolved WSDL Path:", wsdlPath);

//         // Create SOAP client
//         const soapClient = await soap.createClientAsync(wsdlPath);

//         // Log available services and methods
//         const services = soapClient.describe();
//         console.log("Available SOAP Services and Methods:", services);

//         // Prepare request arguments
//         const args = {
//             fatturaId: '12345',  // Example invoice ID, replace with actual
//             stato: 'SUCCESS',    // Example status, replace with actual
//             signedXml: Buffer.from(signedXml).toString('base64'),  // Signed XML encoded as base64
//         };
//         console.log("SOAP Request Arguments:", args);

//         // Add authorization header
//         soapClient.addHttpHeader('Authorization', `Bearer ${sdiToken}`);

//         // Call the SOAP method
//         const [response] = await soapClient.AttestazioneTrasmissioneFatturaAsync(args);
//         console.log("SOAP Response:", response);

//         return {
//             success: true,
//             message: "Invoice successfully sent to SDI.",
//             data: response,
//         };
//     } catch (error: unknown) {
//         console.error("Error in Sending Invoice:", error);

//         const errorMessage = error instanceof Error ? error.message : String(error);
//         return {
//             success: false,
//             message: "Failed to send invoice to SDI.",
//             error: errorMessage,
//         };
//     }
// };



export const sendInvoice = async () => {
    try {
        // Load the WSDL file
        const wsdlPath = path.resolve(__dirname, 'SdIRiceviFile_v1.0.wsdl');
        console.log("Resolved WSDL Path:", wsdlPath);
        const cert = fs.readFileSync("./src/services/SDI-04126420043.pem");
        const key = fs.readFileSync("./src/services/SDI-04126420043.key");
        // Create SOAP client
        const soapClient = await soap.createClientAsync(wsdlPath, {
            wsdl_options: {
                cert: cert,
                key: key,
                rejectUnauthorized: false, // This is needed for self-signed certificates
            }
        });
         const filePath = path.resolve('./src/services/basic_structure.xml');
        const fileContent = fs.readFileSync(filePath).toString('base64');
        // console.log(fileContent)
        const params = {
            fileName: 'basic_structure.xml',
            file: fileContent,
        };
        const response = await soapClient.RiceviFile(params)
        console.log('response',response)
        // // Read and encode the file

        // // Read SSL certificates
        

        // const agent = new https.Agent({
        //     cert: cert,
        //     key: key,
        //     rejectUnauthorized: false, // This is needed for self-signed certificates
        // });

        // const options = {
        //     url: 'https://testservizi.fatturapa.it/ricevi_file',
        //     method: 'get',
        //     httpsAgent: agent,
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/xml' // Changed to XML content type
        //     },
        //     data: params,
        //     // validateStatus: (status: number) => true // Allow all status codes for debugging
        // };

        // // Make the request using axios
        // const response = await axios(options);
        // console.log('Response status:', response.status);
        // console.log('Response data:', response.data);
        if(response) {
            return {
                success: true,
                message: "Invoice successfully sent to SDI.",
                data: response,
            };
        }

    } catch (error: unknown) {
        console.error("Error in Sending Invoice:", error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
            success: false,
            message: "Failed to send invoice to SDI.",
            error: errorMessage,
        };
    }
};
// export const sendInvoice = async () => {
//     try {
//         // Load the WSDL file
//         const wsdlPath = path.resolve(__dirname, 'SdIRiceviFile_v1.0.wsdl');
//         console.log("Resolved WSDL Path:", wsdlPath);
        
//         // Read SSL certificates
//         const cert = fs.readFileSync("./src/services/SDI-04126420043.pem");
//         const key = fs.readFileSync("./src/services/SDI-04126420043.key");

//         // Create SOAP client with SSL options
//         const soapClient = await soap.createClientAsync(wsdlPath, {
//             wsdl_options: {
//                 cert: cert,
//                 key: key,
//                 rejectUnauthorized: false,
//             }
//         });

//         // Read the XML file
//         const filePath = path.resolve('./src/services/basic_structure.xml');
//         const fileContent = fs.readFileSync(filePath);
        
//         // Prepare the SOAP request parameters
//         const params = {
//             FileSdIBase: {
//                 NomeFile: 'basic_structure.xml',
//                 File: fileContent.toString('base64')
//             }
//         };

//         // Make the SOAP call
//         const [result] = await soapClient.RiceviFileAsync(params);
//         console.log('SOAP Response:', result);

//         return {
//             success: true,
//             message: "Invoice successfully sent to SDI.",
//             data: result,
//         };

//     } catch (error: unknown) {
//         console.error("Error in Sending Invoice:", error);
//         const errorMessage = error instanceof Error ? error.message : String(error);
//         return {
//             success: false,
//             message: "Failed to send invoice to SDI.",
//             error: errorMessage,
//         };
//     }
// };

