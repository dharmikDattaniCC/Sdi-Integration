import { Request, Response } from 'express';
import httpStatusCodes from "http-status-codes";
import { IController } from "../types/IController";
import { formatError } from "../utils/formatError";
import { InvoiceService } from "../services/invoice.service";

const SendInvoice: IController = async (req: Request, res: Response): Promise<void> => {
    try {
        // Call the service directly, passing required parameters if necessary
        const response = await InvoiceService();

        // Send success response
        res.status(httpStatusCodes.OK).json({
            message: 'Invoice sent successfully',
            response: response,
        });
    } catch (error) {
        // Format and send error response
        const formattedError = formatError(error);
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Error sending invoice',
            error: formattedError,
        });
    }
};


export { SendInvoice };