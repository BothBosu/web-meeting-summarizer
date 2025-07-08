require('dotenv').config();
const OpenAI = require('openai');
const fs = require('fs');
const axios = require('axios');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function transcribeAudio(fileUrl) {
  try {
    const response = await axios({ method: 'get', url: fileUrl, responseType: 'stream' });
    const transcription = await openai.audio.transcriptions.create({
      file: response.data,
      model: 'whisper-1',
      language: 'th',
    });
    return transcription.text;
  } catch (error) {
    console.error('Error transcribing audio:', error);
    throw new Error('Error transcribing audio');
  }
}

module.exports = { transcribeAudio };
