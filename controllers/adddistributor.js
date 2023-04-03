const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { abi, networks } = require('../build/contracts/SupplyChain.json');

// Specify the HDWalletProvider for web3 to connect to the Goerli testnet
const provider = new HDWalletProvider(process.env.MNEMONIC, 'https://goerli.infura.io/v3/YOUR_PROJECT_ID');
const web3 = new Web3(provider);

// Set up a default account to use for contract interactions
web3.eth.defaultAccount = process.env.DISTRIBUTOR_ADDRESS;

// Create a new instance of the contract using the ABI and address for the deployed contract on Goerli
const contract = new web3.eth.Contract(abi, networks['5'].address);

// Render the add distributor form
router.get('/', (req, res) => {
  res.render('adddistributor', { title: 'Add Distributor' });
});

// Handle the submission of the add distributor form
router.post('/', async (req, res) => {
  const { name, address } = req.body;

  try {
    // Call the addDistributor function on the smart contract to add the new distributor
    await contract.methods.addDistributor(name, address).send({ from: process.env.DISTRIBUTOR_ADDRESS });

    res.redirect('/'); // Redirect back to the home page after the distributor is added
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding distributor');
  }
});

module.exports = router;
