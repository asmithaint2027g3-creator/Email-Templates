import fs from 'fs';

const buf = fs.readFileSync('C:/Users/DELL/.gemini/antigravity-ide/brain/d864c269-80ec-449a-9756-bb5dac34e0e5/.user_uploaded/media_1792753649903.png');
console.log('Dims:', buf.readUInt32BE(16), 'x', buf.readUInt32BE(20));
