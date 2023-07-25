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