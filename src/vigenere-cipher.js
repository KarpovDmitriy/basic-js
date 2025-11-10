const { NotImplementedError } = require('../lib');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect; // если false — значит reverse
  }

  encrypt(message, key) {
    if (!message || !key) {
      throw new Error('Incorrect arguments!');
    }

    return this.process(message, key, true);
  }

  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) {
      throw new Error('Incorrect arguments!');
    }

    return this.process(encryptedMessage, key, false);
  }

  process(message, key, isEncrypt) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const msg = message.toUpperCase();
    const k = key.toUpperCase();

    let result = '';
    let keyIndex = 0;

    for (let i = 0; i < msg.length; i++) {
      const letter = msg[i];

      if (alphabet.includes(letter)) {
        const messageIndex = alphabet.indexOf(letter);
        const keyChar = k[keyIndex % k.length];
        const keyShift = alphabet.indexOf(keyChar);

        let newIndex;
        if (isEncrypt) {
          newIndex = (messageIndex + keyShift) % 26;
        } else {
          newIndex = (messageIndex - keyShift + 26) % 26;
        }

        result += alphabet[newIndex];
        keyIndex++;
      } else {
        result += letter;
      }
    }

    return this.isDirect ? result : result.split('').reverse().join('');
  }
}

module.exports = {
  directMachine: new VigenereCipheringMachine(),
  reverseMachine: new VigenereCipheringMachine(false),
  VigenereCipheringMachine,
};
