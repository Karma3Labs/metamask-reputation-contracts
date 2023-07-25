const web3 = require('web3');
// const web3 = new Web3();

// Replace with your own private key and the message you want to sign
const privateKey = '0xf307aaafa38c3215b98b205222c7d89e6d6e02588e798e9586c9c398d8120264';
const messageToSign = 'Hello, world!';

// Function to sign the message
async function signMessage() {
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  const messageHash = web3.utils.sha3(messageToSign);
  const signature = await web3.eth.accounts.sign(messageHash, privateKey);
  const { r, s, v } = signature;

  console.log('Signature:', signature);
  console.log('r:', r);
  console.log('s:', s);
  console.log('v:', v);
}

signMessage();