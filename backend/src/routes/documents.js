const express = require('express');
const router = express.Router();
const { createDocx } = require('../services/documentService');

router.post('/generate-docx', async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).send('No text provided.');
  }

  try {
    const fileName = `transcription-${Date.now()}`;
    const filePath = await createDocx(text, fileName);
    res.download(filePath);
  } catch (error) {
    console.error('Error generating DOCX:', error);
    res.status(500).send('Error generating DOCX');
  }
});

module.exports = router;
