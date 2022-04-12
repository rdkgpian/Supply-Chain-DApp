const SupplyChain = artifacts.require('SupplyChain');
 
module.exports = function(deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(SupplyChain);
};