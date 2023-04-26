
const PDFDocument = require('pdfkit-table');
const moment = require('moment');
moment.locale("es");

export async function generateLabelPdf(stock: any) {

    const pdfBuffer: Buffer = await new Promise(resolve => {

        let document = generateDocument();
        generateHeader(document, stock.productionImput.name);
        generateQR(document, stock.codeQr)
        generatePropieties(document, stock.productionImput.properties)

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

function generateQR(doc, image) {

    const buffer = Buffer.from(image.split(',')[1], 'base64');

    // doc.image(image, { width: 150, height: 150, align: 'center' })

    const x = (doc.page.width - 150) / 2; 
    doc.image(buffer, { width: 150, height: 150, align: 'center', x: x });
    

}

function generatePropieties(doc, properties) {
    const attributes = properties
      .filter(prop => typeof prop[0] === 'string' && typeof prop[1] === 'string')
      .map(prop => `${prop[0]}: ${prop[1]}`)
      .join('\n');
    
    doc.fontSize(15)
    .text(" \n "+attributes, { align: 'center' });
  }