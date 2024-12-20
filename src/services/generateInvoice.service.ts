import * as xmlbuilder from 'xmlbuilder';

export const generateInvoice = async () => {
    try {
        const invoice = xmlbuilder.create('FatturaElettronica', { encoding: 'UTF-8' })
            .att('versione', 'FPR12')
            .att('xmlns', 'http://ivaservizi.agenziaentrate.gov.it/docs/xsd/fatture/v1.2')
            .ele('FatturaElettronicaHeader')
            .ele('DatiTrasmissione')
            .ele('IdTrasmittente')
            .ele('IdPaese', 'IT').up()
            .ele('IdCodice', '12345678901').up()
            .up()
            .ele('ProgressivoInvio', '00001').up()
            .ele('FormatoTrasmissione', 'FPR12').up()
            .ele('CodiceDestinatario', 'ABCDEF').up()
            .up()
            .up()
            .ele('FatturaElettronicaBody')
            .ele('DatiGenerali')
            .ele('DatiGeneraliDocumento')
            .ele('TipoDocumento', 'TD01').up()
            .ele('Divisa', 'EUR').up()
            .ele('Data', '2024-11-28').up()
            .ele('Numero', '123').up()
            .up()
            .up()
            .ele('DatiBeniServizi')
            .ele('DettaglioLinee')
            .ele('NumeroLinea', '1').up()
            .ele('Descrizione', 'Example Product').up()
            .ele('PrezzoUnitario', '100.00').up()
            .ele('Quantita', '1').up()
            .ele('PrezzoTotale', '100.00').up()
            .ele('AliquotaIVA', '22.00').up()
            .up()
            .up()
            .up();

        return invoice.end({ pretty: true });

    } catch (error: unknown) {
        console.error("Error in Generating Invoice:", error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
            success: false,
            message: "Internal Server Error",
            error: errorMessage
        };
    }
};