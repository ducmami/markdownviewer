import pako from 'pako';

const PLANTUML_SERVER = 'https://www.plantuml.com/plantuml/svg/';

/**
 * Encode PlantUML diagram text for URL
 * PlantUML uses a custom encoding: deflate -> base64 with custom alphabet
 */
export function encodePlantUML(text: string): string {
  // Convert string to UTF-8 bytes
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  
  // Deflate the data with raw deflate (no zlib header)
  const compressed = pako.deflateRaw(data, { level: 9 });
  
  // Encode using PlantUML's custom base64 alphabet
  return encode64(compressed);
}

/**
 * PlantUML's custom base64 encoding
 */
function encode64(data: Uint8Array): string {
  let result = '';
  const len = data.length;
  
  for (let i = 0; i < len; i += 3) {
    const b1 = data[i] || 0;
    const b2 = data[i + 1] || 0;
    const b3 = data[i + 2] || 0;
    result += append3bytes(b1, b2, b3);
  }
  
  return result;
}

function append3bytes(b1: number, b2: number, b3: number): string {
  const c1 = b1 >> 2;
  const c2 = ((b1 & 0x3) << 4) | (b2 >> 4);
  const c3 = ((b2 & 0xF) << 2) | (b3 >> 6);
  const c4 = b3 & 0x3F;
  
  return encode6bit(c1 & 0x3F) + 
         encode6bit(c2 & 0x3F) + 
         encode6bit(c3 & 0x3F) + 
         encode6bit(c4 & 0x3F);
}

function encode6bit(b: number): string {
  if (b < 10) return String.fromCharCode(48 + b); // 0-9
  b -= 10;
  if (b < 26) return String.fromCharCode(65 + b); // A-Z
  b -= 26;
  if (b < 26) return String.fromCharCode(97 + b); // a-z
  b -= 26;
  if (b === 0) return '-';
  if (b === 1) return '_';
  return '?';
}

/**
 * Get PlantUML image URL
 */
export function getPlantUMLUrl(content: string): string {
  const encoded = encodePlantUML(content);
  return `${PLANTUML_SERVER}${encoded}`;
}
