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

let content = [
    {
        text: "Hello SHIIPY",
        alignment: "center",
        fontSize: 25,
    }
]
// iterando sobre algo, para rellenar el contenido
for (let i=0; i<25 ; i++ ){
    content.push({
        text: `${i} shiipy product.. `
    })
}

let headerFooterDoc = {
    header:{
        margin: [72, 0, 72, 0],
        alignment: 'center',
        image: 'images/shiipy_logo.jpeg',
        height: 100
    },
    footer:{
        margin: [72, 0, 72, 0],
        fontsize: 10,
        columns: [{
            with: 'auto',
            alignment: 'left',
            text: '© SHIIPY BOGOTA DC 2022'
        }],
    },
    content: content,
    pageMargins: [72, 120, 72, 50]
}



pdfDoc = pdfmake.createPdfKitDocument(headerFooterDoc, {});
pdfDoc.pipe(fs.createWriteStream('pdfs/headerfooter.pdf'));
pdfDoc.end();