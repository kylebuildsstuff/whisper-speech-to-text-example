import { json } from '@sveltejs/kit';
import { OPENAI_API_SECRET_KEY } from '$env/static/private';

export const POST = async (event) => {
  const requestBody = await event.request.formData();
  const requestFile = requestBody.get('file');

  /**
   * Request config.
   */
  const file = new Blob([requestFile], { type: 'video/mp4' });

  const formData = new FormData();
  formData.append('file', file, 'test.wav');
  formData.append('model', 'whisper-1');
  formData.append('language', 'en');

  /**
   * https://platform.openai.com/docs/api-reference/audio/create
   */
  const transcriptionResponse = await fetch(
    `https://api.openai.com/v1/audio/transcriptions`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_API_SECRET_KEY}`,
        Accept: 'application/json'
      },
      body: formData
    }
  );

  const data = await transcriptionResponse.json();
  const transcribedText = data?.text || '';

  return json({ transcribedText });
};
