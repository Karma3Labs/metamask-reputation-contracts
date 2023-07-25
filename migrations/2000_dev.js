const web3 = require('web3');
const KarmaSnapsRegistryModule = artifacts.require("KarmaSnapsRegistryModule")
const KarmaAttestorV1 = artifacts.require("KarmaAttestorV1")
const ethers = require('ethers')

const KarmaAuditAttestor = artifacts.require("KarmaAuditAttestor")
const KarmaAuditApprovalAttestor = artifacts.require("KarmaAuditApprovalAttestor")
const KarmaReviewApprovalAttestor = artifacts.require("KarmaReviewApprovalAttestor")
const KarmaReviewAttestor = artifacts.require("KarmaReviewAttestor")
const KarmaFollowersAttestor = artifacts.require("KarmaFollowersAttestor")

// const KarmaAuditAttestorABI = require("../build/contracts/KarmaAuditAttestor.json").abi;
const MasterRegistryABI = require("../build/contracts/MasterRegistry.json").abi;
const MasterRegistry = artifacts.require("MasterRegistry");
// example addr that delegates the attestation
const privateKey = '0xf307aaafa38c3215b98b205222c7d89e6d6e02588e798e9586c9c398d8120264';
const address = '0x9463C644E4eF331ebb715496e848d4F3cEc3F848'

module.exports = async function (deployer, network, accounts) {
    const abi = [
        {
            "components": [
                {
                    "internalType": "bytes32",
                    "name": "attestationId",
                    "type": "bytes32"
                },
                {
                    "internalType": "bytes32",
                    "name": "schemaId",
                    "type": "bytes32"
                },
                {
                    "internalType": "bytes32",
                    "name": "parentId",
                    "type": "bytes32"
                },
                {
                    "internalType": "address",
                    "name": "attester",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "attestee",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "attestor",
                    "type": "address"
                },
                {
                    "internalType": "uint64",
                    "name": "attestedDate",
                    "type": "uint64"
                },
                {
                    "internalType": "uint64",
                    "name": "updatedDate",
                    "type": "uint64"
                },
                {
                    "internalType": "uint64",
                    "name": "expirationDate",
                    "type": "uint64"
                },
                {
                    "internalType": "bool",
                    "name": "isPrivate",
                    "type": "bool"
                },
                {
                    "internalType": "bool",
                    "name": "revoked",
                    "type": "bool"
                },
                {
                    "internalType": "bytes[]",
                    "name": "attestationData",
                    "type": "bytes[]"
                }
            ],
            "indexed": false,
            "internalType": "struct Attestation",
            "name": "attestation",
            "type": "tuple"
        }
    ]

    const decodedEvent = web3.eth.abi.decodeLog(
        abi,
        '0x0000000000000000000000000000000000000000000000000000000000000020635bf04c2a32519683f0e0b5224988c82e95216f9d58ab01c30af3ed203b7d1eab96aeea1bc6edf3c8ad84b97a34f778a3734e40b031a10ee371d555e4ef5df400000000000000000000000000000000000000000000000000000000000000000000000000000000000000009463c644e4ef331ebb715496e848d4f3cec3f848000000000000000000000000394c6e11c1dbd539bc79abbf708cb7413ab9a7a60000000000000000000000007a2e976fcec0f10c427968c63f5626166e18a1050000000000000000000000000000000000000000000000000000000064bf4384000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001800000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000000673686173756d000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        '0xe1cc3cb307ad8041a33006d57e7b9e07f595e14151a66439035b4a33243c5a78'
    )
    console.log(decodedEvent)

    /*
       const a = await KarmaAuditAttestor.deployed()
       const extraData = web3.utils.asciiToHex("")
       const attestationData = ["shasum", "", ""]
           .map(e => ethers.hexlify(ethers.toUtf8Bytes(e)))
    
       const attestation = {
           schemaId: '0xeb10c183f468ab719d864de80935dcefb3481c16469be2c9b9f3c802bb671864',
           parentId: '0x0000000000000000000000000000000000000000000000000000000000000000',
           attestor: KarmaAuditAttestor.address,
           attestee: accounts[0],
           expirationDate: 0,
           attestationData
       }
    
       const hash = await a.getStructHash(attestation)
    
       const signature = await web3.eth.accounts.sign(hash, privateKey)
       const { r, s, v } = signature;
       console.log({ signature })
    
       try {
           // second arg array for each module accordingly 
           const attestationResult = await a.delagatedAttest
               (
                   attestation,
                   { r, s, v, signer: address },
                   [extraData, extraData]
               )
    
           console.log(JSON.stringify(attestationResult, null, 2))
       } catch (e) {
           console.log(e)
       }
    */
}