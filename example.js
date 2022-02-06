
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

    let listTableDocs = {
        content: [{
            text: "FACTURACION SHIIPY PRODUCTOS",
            style: 'subheader'
        }, {
            ul: [{
                    text: 'Web site : www.shiipy.com',
                    link: 'https://www.shiipy.com'
                },
                'Service Id: 123123',
                'Nombre Cliente: Cristian Camilo Sanchez Ardila'
            ]
        }, {
            text: '\n\n'
        }],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                alignment: 'center',
                margin: [0, 30, 0, 20],
                image: 'images/shiipy_logo.jpeg',
            },
            subheader: {
                fontSize: 24,
                margin: [0, 15, 0, 10],
                color: '#003893'
            },
            text: {
                alignment: 'justify'
            },
            link: {
                decoration: 'underline',
                color: '#0074c1',
            }
        }


    }


    let table = {
        // headers are automatically repeated if the table spans over multiple pages
        // you can declare how many rows should be treated as headers
        headerRows: 3,
        widths: ['*', 'auto', 100, 60, 50, 60, 50],

        body: [
            [{
                text: 'Nombre producto',
                rowSpan: 3
            }, {
                text: 'Cantidad',
                rowSpan: 3
            }, {
                text: 'Gender',
                rowSpan: 3
            }],
            

            // now data and values
            ['Ram', '32', 'Tecnologia'],
            ['Sita', '30', 'Tecnologia'],
            ['Audifinos', '12', 'Tecnologia'],
        ]
    }

    listTableDocs['content'].push({
        text: "Listado de Productos",
        style: 'subheader'
    }, {
        table: table
    })

    pdfDoc = pdfmake.createPdfKitDocument(listTableDocs, {});
    pdfDoc.pipe(fs.createWriteStream('pdfs/listtable.pdf'));
    pdfDoc.end();