const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const WeaponContract = require('./contracts/WeaponContract.json');

const providerUrl = 'https://goerli.infura.io/v3/<your_project_id>'; // Replace with your Infura project ID
const provider = new HDWalletProvider({
  mnemonic: {
    phrase: '<your_mnemonic>'
  },
  providerOrUrl: providerUrl
});

const web3 = new Web3(provider);
const contractAddress = '<your_contract_address>'; // Replace with the deployed contract address
const weaponContract = new web3.eth.Contract(WeaponContract.abi, contractAddress);

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const result = await weaponContract.methods.getWeaponDetails(id).call();

    res.render('weapon-details', { weapon: result });
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred while fetching the weapon details');
  }
});

module.exports = router;
