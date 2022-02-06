const fs = require('fs');
const Pdfmake = require('pdfmake');

var fonts = {
    Roboto: {
        normal:'fonts/roboto/Roboto-Regular.ttf',
        bold: 'fonts/roboto/Roboto-Medium.ttf',
        italics: 'fonts/roboto/Roboto-Italic.ttf',
        bolditalics: 'fonts/roboto/Roboto-BoldItalic.ttf'
    }
};


let pdfmake = new Pdfmake(fonts)

let docDefinition = {
    content: [
        'Hello sanetrox!'
    ],
}

let pdfDoc;

pdfDoc = pdfmake.createPdfKitDocument(docDefinition, {});
pdfDoc.pipe(fs.createWriteStream('pdfs/basics.pdf'))
pdfDoc.end();