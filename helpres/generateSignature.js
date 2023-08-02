(async function () {
    const ethers = require('ethers')
    const web3 = require('web3');
    const karmaAttestorABI = require('../build/contracts/KarmaAuditAttestor.json').abi;
    const dotenv = require('dotenv')
    dotenv.config()

    const privateKey = '0x171fa7477b1a93c8fff36d819ea71083fb4b96fa60a11e7137659617f9870d93';
    const address = '0x2A491dbF285865EF48657C61D5984EB65bFb36E9'

    const extraData = web3.utils.asciiToHex("")

    // check schemaFields
    const attestationData = ["shasum", "", ""]
        .map(e => ethers.hexlify(ethers.toUtf8Bytes(e)))

    const provider = new ethers.JsonRpcProvider('https://api.s0.b.hmny.io');
    const wallet = new ethers.Wallet(privateKey, provider);
    const a = new ethers.Contract('0x3b982C0D9823c83A36CE4A4F56FD99bf4eD52f74', karmaAttestorABI, wallet);

    const attestation = {
        schemaId: '0x773236b8187b160b8c47b5af2f5c4b7c647208386782aa7c9805e85b711ca9c9',
        parentId: '0x0000000000000000000000000000000000000000000000000000000000000000',
        attestor: '0xBfa9dc7c9b9B0fabE32Bb120FB3C309b9e7E300e',
        attestee: '0x1377bB115fA26FF9aCBE81d5b827d4f4eb8097dF',
        expirationDate: 0,
        attestationData
    }

    const hash = await a.getStructHash(attestation)

    const signature = await web3.eth.accounts.sign(hash, privateKey)
    const { r, s, v } = signature

    console.log({attestation, signature: { signer: address, r, s, v }, extra: [extraData]})
}())