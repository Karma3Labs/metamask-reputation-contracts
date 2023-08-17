const SnapsRegistry = artifacts.require("./metamask/SnapsRegistry");
const EthereumDIDRegistry = artifacts.require("./did/EthereumDIDRegistry");


module.exports = async function (deployer, network, accounts) {
    await deployer.deploy(SnapsRegistry, "snapsRegistryMock", "snaps")
    
    const s = await SnapsRegistry.deployed()
    const res = await s.addSnap("testSnap2", "description", "Jenya", 0, "")
    const snapId = res.logs[0].args[0].toString()
    
    const res2 = await s.addSnapVersion(snapId, "shasum2", "location", "1.1", "changelog")
    console.log(res2)
};
