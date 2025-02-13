// import { generateInvoice } from './generateInvoice.service';
import { signInvoice } from './signInvoice.service';
import { sendInvoice } from './sendInvoice.service';
import fs from 'fs'

export const InvoiceService = async () => {
    try {
        console.log('Generating FatturaPA XML...');
        // const invoiceXml = await generateInvoice();
        // console.log("invoiceXml",invoiceXml);

        var invoiceXml = "<library>" + "<book>" + "<name>Harry Potter</name>" + "</book>" + "</library>";
        console.log(invoiceXml)


        console.log('Signing XML...');
        const signedXml = await signInvoice(String(invoiceXml));

        if (!signedXml.success) {
            throw new Error(signedXml.error);
        }

        console.log('Sending invoice to SDI...');
        const response = await sendInvoice(signedXml.signedXml);
        // if(signedXml){
        //     const fileContent = fs.readFileSync(signedXml).toString('base64');
        // }
        // console.log('Response from SDI:', response);

        return response;

    } catch (error: unknown) {
        console.error("Error in Invoice Service:", error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
            success: false,
            message: "Internal Server Error",
            error: errorMessage
        };
    }
};