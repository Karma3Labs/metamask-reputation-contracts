

// 
(async function () {
    const ethers = require('ethers')
    const web3 = require('web3');
    const karmaAttestorABI = require('../build/contracts/KarmaAuditAttestor.json').abi;
    const dotenv = require('dotenv')
    dotenv.config()

    const privateKey = '0xf307aaafa38c3215b98b205222c7d89e6d6e02588e798e9586c9c398d8120264';
    const address = '0x9463C644E4eF331ebb715496e848d4F3cEc3F848'

    const extraData = web3.utils.asciiToHex("")

    // check schemaFields
    const attestationData = ["shasum", "", ""]
        .map(e => ethers.hexlify(ethers.toUtf8Bytes(e)))

    const provider = new ethers.JsonRpcProvider('https://api.s0.b.hmny.io');
    const wallet = new ethers.Wallet(privateKey, provider);
    const a = new ethers.Contract('0x3b982C0D9823c83A36CE4A4F56FD99bf4eD52f74', karmaAttestorABI, wallet);

    const attestation = {
        schemaId: '0xe5a7770338a054cbaebd58544d9ec3c7417f65f00715c5b43e505d8bd0526659',
        parentId: '0x0000000000000000000000000000000000000000000000000000000000000000',
        attestor: '0x3b982C0D9823c83A36CE4A4F56FD99bf4eD52f74',
        attestee: '0x9463C644E4eF331ebb715496e848d4F3cEc3F848',
        expirationDate: 0,
        attestationData
    }

    const hash = await a.getStructHash(attestation)

    const signature = await web3.eth.accounts.sign(hash, privateKey)
    const { r, s, v } = signature

    console.log({signer: address, ...signature}, attestation)
}())