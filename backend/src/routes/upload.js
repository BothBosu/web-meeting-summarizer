const express = require('express');
const multer = require('multer');
const path = require('path');
const { transcribeAudio } = require('../services/transcriptionService');
const supabase = require('../utils/supabase');

const router = express.Router();

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.single('audio'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    const fileName = `${Date.now()}-${req.file.originalname}`;
    const { data, error: uploadError } = await supabase.storage
      .from('audio-files') // You'll need to create this bucket in Supabase
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
      });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      return res.status(500).send('Error uploading file to storage.');
    }

    const publicUrl = supabase.storage.from('audio-files').getPublicUrl(fileName).data.publicUrl;

    const transcription = await transcribeAudio(publicUrl);
    res.send({ transcription });
  } catch (error) {
    console.error('Error processing audio:', error);
    res.status(500).send('Error processing audio');
  }
});

module.exports = router;
