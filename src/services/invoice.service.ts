import { generateInvoice } from './generateInvoice.service';
import { signInvoice } from './signInvoice.service';
import { sendInvoice } from './sendInvoice.service';

export const InvoiceService = async () => {
    try {
        console.log('Generating FatturaPA XML...');
        const invoiceXml = await generateInvoice();
        console.log("invoiceXml",invoiceXml);

        console.log('Signing XML...');
        const signedXml = await signInvoice(String(invoiceXml));

        console.log('Sending invoice to SDI...');
        const response = await sendInvoice(String(signedXml));
        console.log('Response from SDI:', response);

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