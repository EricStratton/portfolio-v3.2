/**
 * Takes a string and encodes it with the given key
 * @param {string} path The string to encode
 * @param {number} key An arbitrary integer between 0 and 255
 */
export function encodeString(string, key) {
   let encodedString = key.toString(16);
   for (let i = 0; i < string.length; i++) {
      const charCode = string.charCodeAt(i);
      const encoded = charCode ^ key;
      encodedString += encoded.toString(16);
   }
   return encodedString;
}

/**
 * Takes an ecoded string and decodes it
 * @param {string} encodedString The encoded string
 */
export function decodeString(encodedString) {
   let string = '';
   const keyInHex = encodedString.substring(0, 2);
   const key = parseInt(keyInHex, 16);
   for (let i = 2; i < encodedString.length; i += 2) {
      const charInHex = encodedString.substr(i, 2);
      const char = parseInt(charInHex, 16);
      const out = char ^ key;
      string += String.fromCharCode(out);
   }
   return string;
}
