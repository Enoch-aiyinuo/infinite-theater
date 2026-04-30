// Test TTS API availability via Forge API
import { readFileSync } from 'fs';

// Read env from .env file manually
let forgeApiUrl = '';
let forgeApiKey = '';

try {
  const envContent = readFileSync('/home/ubuntu/infinite-theater/.env', 'utf-8');
  for (const line of envContent.split('\n')) {
    if (line.startsWith('BUILT_IN_FORGE_API_URL=')) {
      forgeApiUrl = line.split('=').slice(1).join('=').trim().replace(/^"|"$/g, '');
    }
    if (line.startsWith('BUILT_IN_FORGE_API_KEY=')) {
      forgeApiKey = line.split('=').slice(1).join('=').trim().replace(/^"|"$/g, '');
    }
  }
} catch (e) {
  console.log('Could not read .env, trying process.env');
  forgeApiUrl = process.env.BUILT_IN_FORGE_API_URL || '';
  forgeApiKey = process.env.BUILT_IN_FORGE_API_KEY || '';
}

console.log('Forge API URL:', forgeApiUrl ? forgeApiUrl.substring(0, 50) + '...' : 'NOT SET');
console.log('Forge API Key:', forgeApiKey ? 'SET (length: ' + forgeApiKey.length + ')' : 'NOT SET');

if (!forgeApiUrl || !forgeApiKey) {
  console.log('API credentials not available in env file');
  process.exit(0);
}

// Test TTS endpoint
const baseUrl = forgeApiUrl.endsWith('/') ? forgeApiUrl : `${forgeApiUrl}/`;
const ttsUrl = new URL('v1/audio/speech', baseUrl).toString();

console.log('\nTesting TTS endpoint:', ttsUrl);

try {
  const response = await fetch(ttsUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${forgeApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'tts-1',
      input: '你好，这是一段测试语音。',
      voice: 'alloy',
      response_format: 'mp3',
    }),
  });

  console.log('TTS Response status:', response.status);
  console.log('TTS Response headers:', Object.fromEntries(response.headers.entries()));
  
  if (response.ok) {
    const buffer = await response.arrayBuffer();
    console.log('TTS audio size:', buffer.byteLength, 'bytes');
    console.log('TTS API is AVAILABLE!');
  } else {
    const text = await response.text();
    console.log('TTS Error:', text.substring(0, 500));
  }
} catch (e) {
  console.log('TTS request failed:', e.message);
}
