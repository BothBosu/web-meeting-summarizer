const docx = require('docx');
const fs = require('fs');
const path = require('path');

const { Document, Packer, Paragraph, TextRun } = docx;

async function createDocx(text, fileName) {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [new TextRun(text)],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const filePath = path.join('/tmp', `${fileName}.docx`);
  fs.writeFileSync(filePath, buffer);
  return filePath;
}

module.exports = { createDocx };
