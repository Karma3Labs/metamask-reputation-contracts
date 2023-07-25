const MasterRegistry = artifacts.require("MasterRegistry");
const ModulesRegistry = artifacts.require("ModulesRegistry");
const SchemasRegistry = artifacts.require("SchemasRegistry");
const AttestorsRegistry = artifacts.require("AttestorsRegistry");

const KarmaSnapsRegistryModule = artifacts.require("KarmaSnapsRegistryModule")
const KarmaAttestorV1 = artifacts.require("KarmaAttestorV1")
const ethers = require('ethers')
const web3 = require('web3');

const KarmaAuditAttestor = artifacts.require("KarmaAuditAttestor")
const KarmaAuditApprovalAttestor = artifacts.require("KarmaAuditApprovalAttestor")
const KarmaReviewApprovalAttestor = artifacts.require("KarmaReviewApprovalAttestor")
const KarmaReviewAttestor = artifacts.require("KarmaReviewAttestor")
const KarmaFollowersAttestor = artifacts.require("KarmaFollowersAttestor")

// example addr that delegates the attestation
const privateKey = '0xf307aaafa38c3215b98b205222c7d89e6d6e02588e798e9586c9c398d8120264';
const address = '0x9463C644E4eF331ebb715496e848d4F3cEc3F848'


module.exports = async function (deployer, network, accounts) {
    console.log('register schemas')

    const sc = await SchemasRegistry.deployed()

    await sc.setAttestorsRegistry(AttestorsRegistry.address)
    console.log('SchemasRegistry setAttestorsRegistry ok')

    const KarmaAuditAttestorSchema = ["snapChecksum", "attestationReport", "score", "isTrustworthy"]
        .map(e => ethers.hexlify(ethers.toUtf8Bytes(e)))

    const res = await sc.registerSchema(KarmaAuditAttestor.address, KarmaAuditAttestorSchema, true, "KarmaAuditAttestorSchema")
    const KarmaAuditAttestorSchemaId = res.logs[0].args[0][0]

    const KarmaAuditApprovalAttestorSchema = ["attestationId", "isApproved"]
        .map(e => ethers.hexlify(ethers.toUtf8Bytes(e)))

    const res2 = await sc.registerSchema(KarmaAuditApprovalAttestor.address, KarmaAuditApprovalAttestorSchema, true, "KarmaAuditApprovalAttestorSchema")
    const KarmaAuditApprovalAttestorSchemaId = res2.logs[0].args[0][0]

    const KarmaReviewApprovalAttestorSchema = ["attestationId", "isApproved"]
        .map(e => ethers.hexlify(ethers.toUtf8Bytes(e)))

    const res3 = await sc.registerSchema(KarmaReviewApprovalAttestor.address, KarmaReviewApprovalAttestorSchema, true, "KarmaReviewApprovalAttestorSchema")
    const KarmaReviewApprovalAttestorSchemaId = res3.logs[0].args[0][0]

    const KarmaReviewAttestorSchema = ["attestationId", "reviewText", "score"]
        .map(e => ethers.hexlify(ethers.toUtf8Bytes(e)))

    const res4 = await sc.registerSchema(KarmaReviewAttestor.address, KarmaReviewAttestorSchema, true, "KarmaReviewAttestorSchema")
    const KarmaReviewAttestorSchemaId = res4.logs[0].args[0][0]

    const KarmaFollowersAttestorSchema = ["weight"]
        .map(e => ethers.hexlify(ethers.toUtf8Bytes(e)))

    const res5 = await sc.registerSchema(KarmaFollowersAttestor.address, KarmaFollowersAttestorSchema, true, "KarmaFollowersAttestorSchema")
    const KarmaFollowersAttestorSchemaId = res5.logs[0].args[0][0]


    console.log({
        KarmaAuditApprovalAttestorSchemaId,
        KarmaReviewAttestorSchemaId,
        KarmaAuditAttestorSchemaId,
        KarmaReviewApprovalAttestorSchemaId,
        KarmaFollowersAttestorSchemaId
    })
    console.log('SchemasRegistry registerSchema ok')

    // deploy test attestation
    const a = await KarmaAuditAttestor.deployed()

    const extraData = web3.utils.asciiToHex("")

    // check schemaFields
    const attestationData = ["shasum", "", ""]
        .map(e => ethers.hexlify(ethers.toUtf8Bytes(e)))

    const attestation = {
        schemaId: KarmaAuditAttestorSchemaId,
        parentId: '0x0000000000000000000000000000000000000000000000000000000000000000',
        attestor: KarmaAuditAttestor.address,
        attestee: accounts[0],
        expirationDate: 0,
        attestationData
    }

    const hash = await a.getStructHash(attestation)
    const signature = await web3.eth.accounts.sign(hash, privateKey)
    const { r, s, v } = signature

    try {
        const attestationResult = await a.delagatedAttest
            (
                attestation,
                { r, s, v, signer: address },
                // arg array for each module accordingly 
                [extraData, extraData]
            )

        console.log(JSON.stringify(attestationResult, null, 2))


    } catch (e) {
        console.log(e)
    }

    /*
    try {
        // second arg array for each module accordingly 
        const attestationResult = await a.attest(attestation, [extraData, extraData])

        console.log(JSON.stringify(attestationResult, null, 2))
    } catch (e) {
        console.log(e)
    }*/
};
