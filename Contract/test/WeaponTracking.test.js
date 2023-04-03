const WeaponContract = artifacts.require("WeaponContract");

contract("WeaponContract", function(accounts) {
  const owner = accounts[0];
  const manufacturer = accounts[1];
  const distributor = accounts[2];
  const retailer = accounts[3];
  const customer = accounts[4];

  let weaponContract;

  before(async function() {
    weaponContract = await WeaponContract.deployed();
  });

  it("should allow the owner to register a new manufacturer", async function() {
    await weaponContract.registerManufacturer(manufacturer);
    const isManufacturer = await weaponContract.isManufacturer(manufacturer);
    assert.equal(isManufacturer, true);
  });

  it("should not allow a non-owner to register a new manufacturer", async function() {
    try {
      await weaponContract.registerManufacturer(distributor, {from: distributor});
    } catch (error) {
      assert.include(error.message, "Only the contract owner can call this function");
      return;
    }
    assert.fail("Expected an error but did not receive one");
  });

  it("should allow a registered manufacturer to add a new weapon", async function() {
    await weaponContract.addWeapon("AK-47", "123456", 100, {from: manufacturer});
    const weapon = await weaponContract.getWeaponBySerialNumber("123456");
    assert.equal(weapon[0], "AK-47");
    assert.equal(weapon[1], "123456");
    assert.equal(weapon[2], 100);
  });

  it("should not allow a non-registered manufacturer to add a new weapon", async function() {
    try {
      await weaponContract.addWeapon("M16", "654321", 200, {from: distributor});
    } catch (error) {
      assert.include(error.message, "Only registered manufacturers can call this function");
      return;
    }
    assert.fail("Expected an error but did not receive one");
  });

  it("should allow a registered manufacturer to transfer ownership of a weapon to a distributor", async function() {
    await weaponContract.transferWeaponOwnership("123456", distributor, {from: manufacturer});
    const weapon = await weaponContract.getWeaponBySerialNumber("123456");
    assert.equal(weapon[3], distributor);
  });

  it("should not allow a non-registered distributor to receive ownership of a weapon", async function() {
    try {
      await weaponContract.transferWeaponOwnership("123456", retailer, {from: distributor});
    } catch (error) {
      assert.include(error.message, "Only registered distributors can receive ownership of weapons");
      return;
    }
    assert.fail("Expected an error but did not receive one");
  });

  it("should allow a registered distributor to transfer ownership of a weapon to a retailer", async function() {
    await weaponContract.transferWeaponOwnership("123456", retailer, {from: distributor});
    const weapon = await weaponContract.getWeaponBySerialNumber("123456");
    assert.equal(weapon[3], retailer);
  });

  it("should not allow a non-registered retailer to receive ownership of a weapon", async function() {
    try {
      await weaponContract.transferWeaponOwnership("123456", customer, {from: retailer});
    } catch (error) {
      assert.include(error.message, "Only registered retailers can receive ownership of weapons");
      return;
    }
    assert.fail("Expected an error but did not receive one");
  });

  it("should allow a registered retailer to transfer ownership of a weapon to a customer", async function() {
    await weaponContract.transferWeaponOwnership("123456", customer, {from: retailer});
    const weapon = await weaponContract.getWeaponBySerialNumber("123456");
    assert.equal(weapon[3], customer);
    });
    
    it("should not allow a non-registered party to get the details of a weapon", async function() {
    try {
    await weaponContract.getWeaponBySerialNumber("123456", {from: accounts[9]});
    } catch (error) {
    assert.include(error.message, "Only registered parties can get the details of weapons");
    return;
    }
    assert.fail("Expected an error but did not receive one");
    });
    
    it("should allow a registered party to get the details of a weapon", async function() {
    const weapon = await weaponContract.getWeaponBySerialNumber("123456", {from: customer});
    assert.equal(weapon[0], "AK-47");
    assert.equal(weapon[1], "123456");
    assert.equal(weapon[2], 100);
    assert.equal(weapon[3], customer);
    });
    
    });
 //This script tests the `WeaponContract` smart contract by registering a manufacturer, adding a new weapon, transferring ownership of the weapon to a distributor, retailer, and customer, and verifying that only registered parties can access the details of the weapon. It uses the `assert` library to check the expected results of each test case. You can run this script using the `truffle test` command in the terminal.
