
const PDFDocument = require('pdfkit-table');
const moment = require('moment');
moment.locale("es");

export async function generatePdf(stock: any) {

    const pdfBuffer: Buffer = await new Promise(resolve => {

        let document = generateDocument();
        generateHeader(document, 'Reporte');
        generatePropieties(document, stock)

        const buffer = []
        document.on('data', buffer.push.bind(buffer))
        document.on('end', () => {
            const data = Buffer.concat(buffer)
            resolve(data)
        })
        document.end()
    });

    return pdfBuffer;

}

function generateDocument() {
    const doc = new PDFDocument(
        {
            size: "A4",
            bufferPages: true,
        });

    return doc;
}

function generateHeader(doc, title) {
    doc
        .fontSize(25)
        .font('Courier-Bold')
        .text(title + ' \n ', { align: 'center' }) //, 75, 70, { align: 'center' }
}

function generatePropieties(doc, stock) {
    doc
      .fontSize(15)
      .font('Courier')
    
    for (const item of stock) {
      const text = `Nacionalidad: ${item._id}\nPromedio Edad: ${item.promedioEdad}\n\n`
      doc.text(text)
    }
  }