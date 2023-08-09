(async function () {
    const ethers = require('ethers')
    const web3 = require('web3');
    const karmaAttestorABI = require('../build/contracts/KarmaAuditAttestor.json').abi;
    const dotenv = require('dotenv')
    dotenv.config()

    const privateKey = '0xf24ddb77be5714bb53802e0551607a77f7d42b09e7d8860d7a417f4d3a396977';
    const address = '0x202ed290B63cD30Fa2eB656eEe505a0DD138FB09'

    const extraData = web3.utils.asciiToHex("")

    // check schemaFields
    const attestationData = ["1"]
        .map(e => ethers.hexlify(ethers.toUtf8Bytes(e)))

    const provider = new ethers.JsonRpcProvider('https://api.s0.b.hmny.io');
    const wallet = new ethers.Wallet(privateKey, provider);
    const a = new ethers.Contract('0x3b982C0D9823c83A36CE4A4F56FD99bf4eD52f74', karmaAttestorABI, wallet)

    const attestation = {
        schemaId: '0x773236b8187b160b8c47b5af2f5c4b7c647208386782aa7c9805e85b711ca9c9',
        parentId: '0x0000000000000000000000000000000000000000000000000000000000000000',
        attestor: '0xBfa9dc7c9b9B0fabE32Bb120FB3C309b9e7E300e',
        attestee: '0x3f6A4B6F53E03f137108d3be252A2d2916abb197',
        expirationDate: 0,
        attestationData
    }

    const hash = await a.getStructHash(attestation)
    console.log({ hash })
    const signature = await web3.eth.accounts.sign(hash, privateKey)
    const { r, s, v } = signature

    
    const sig = ethers.Signature.from({
        r: "0xdfb23fec0e1398c9ee904acd467b143b536c010ebe1de97b3be45e6eb368bbb7",
        s: "0x15786208243cbbe51a2e8a7878847af480f5aa1edf556f9a85f02e835a93cd3b",
        v: "0x1b"
    })

    const recoveredAddress = ethers.verifyMessage('0x1949deb1de53b973a0a1dfd9f0c9ecc6b1c1d6c759250c68d7252b651213be87', sig)
    console.log({ recoveredAddress })


    console.log({ attestation, signature: { signer: address, r, s, v }, extra: [extraData] })
}())