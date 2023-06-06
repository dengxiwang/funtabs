export default function rgbToHex(rgbValue) {
  const [r, g, b] = rgbValue.match(/\d+/g).map(Number);
  const hexR = r.toString(16).padStart(2, '0');
  const hexG = g.toString(16).padStart(2, '0');
  const hexB = b.toString(16).padStart(2, '0');
  return `#${hexR}${hexG}${hexB}`;
}