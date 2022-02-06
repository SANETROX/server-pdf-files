const AWS = require('aws-sdk');
const Pdfmake = require('pdfmake');
const dotenv = require('dotenv');

dotenv.config();


var fonts = {
    Roboto: {
        normal:'fonts/roboto/Roboto-Regular.ttf',
        bold: 'fonts/roboto/Roboto-Medium.ttf',
        italics: 'fonts/roboto/Roboto-Italic.ttf',
        bolditalics: 'fonts/roboto/Roboto-BoldItalic.ttf'
    }
};

let pdfmake = new Pdfmake(fonts)

let document = {
    content: [
		{	
			aligment: 'justify',
			columns: [
				{image:'images/shiipy_logo2.png',width: 150,height: 100},
				{
					style:'tableExample',
					table: {
						widths:['*'],
						body:[
							[{text:'SERVICE_ID : 123453dv', style:'tableHeader'}],
							[{text: 'NOMBRE CLIENTE : CRISTIAN SANCHEZ', style:'tableHeader'}]
						]
					},
					layout:{fillColor: '#CCCCCC', defaultBorder: false}
				}

			]
		},
		{
			style: 'tableExample',
			table: {
				widths: ['*', '*', '*'],
				body: [
					[{text:'PRODUCTO', style: 'tableHeader'},{text:"CANTIDAD", style: 'tableHeader'},{text:"PRECIO", style: 'tableHeader'}],
					[{text:'\n'},{text:'\n'},{text:'\n'}],
				]
			},
			layout:{fillColor: '#CCCCCC', defaultBorder: false}
		},
    ],
    styles: {
		header: {
			fontSize: 18,
			bold: true,
			margin: [0, 0, 0, 10]
		},
		subheader: {
			fontSize: 16,
			bold: true,
			margin: [0, 10, 0, 5]
		},
		tableExample: {
			margin: [0, 5, 0, 100]
		},
		tableHeader: {
			bold: true,
			fontSize: 16,
			color: 'black'
		},
		textHeader:{
			bold:false,
			fontSize: 16,
			color: 'black'
		}
	},
	defaultStyle: {
		columnGap: 50
	}
}

for (let i=1; i<10; i++){
	document.content[1].table.body.push([{text: 'hola', style:'textHeader'},{text: i+1, style: 'textHeader'},{text: `${i*1000}`, style: 'textHeader'}])
}

pdfDoc = pdfmake.createPdfKitDocument(document, {});
let chunks = [];
pdfDoc.on("data", chunk => {
	chunks.push(chunk);
});

pdfDoc.on("end", () => {
	const result = Buffer.concat(chunks);
	var s3 = new AWS.S3();
  
	s3.putObject(
	  {
		Bucket: 's-technoapes-dropshipping',
		Key: "guia-2.pdf",
		Body: result,
		ACL: 'public-read'
	  },
	  function(resp) {
		  console.log(resp)
	  }
	);
  });

pdfDoc.end();