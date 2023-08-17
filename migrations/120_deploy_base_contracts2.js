const MasterRegistry = artifacts.require("MasterRegistry");
const ModulesRegistry = artifacts.require("ModulesRegistry");
const SchemasRegistry = artifacts.require("SchemasRegistry");
const AttestorsRegistry = artifacts.require("AttestorsRegistry");
const { retry } = require('../helpres/retry')

const pauseInterval = 0

module.exports = async function (deployer) {
    const s = await SchemasRegistry.deployed()

    await new Promise((r) => setTimeout(r, pauseInterval))
    await retry(() => deployer.deploy(MasterRegistry))
    await new Promise((r) => setTimeout(r, pauseInterval))
    await retry(() => deployer.deploy(AttestorsRegistry, s.address))
    await new Promise((r) => setTimeout(r, pauseInterval))
    await retry(() => deployer.deploy(ModulesRegistry))

}