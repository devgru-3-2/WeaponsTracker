const WeaponTracking = artifacts.require("WeaponTracking");

module.exports = function (deployer) {
  deployer.deploy(WeaponTracking);
};