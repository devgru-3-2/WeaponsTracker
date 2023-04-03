const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const contract = require('truffle-contract');
const DealerContract = require('../build/contracts/Dealer.json');
const providerUrl = "https://goerli.infura.io/v3/<YOUR_PROJECT_ID>";
const mnemonic = "<YOUR_METAMASK_MNEMONIC>";
const provider = new HDWalletProvider(mnemonic, providerUrl);
const web3 = new Web3(provider);

const dealerContract = contract(DealerContract);
dealerContract.setProvider(provider);

router.get('/', function(req, res) {
    res.render('adddealer');
});

router.post('/', async function(req, res) {
    const dealerName = req.body.dealername;
    const dealerAddress = req.body.dealeraddress;

    const dealerInstance = await dealerContract.deployed();
    await dealerInstance.addDealer(dealerName, dealerAddress, { from: await provider.getAddress() });

    res.redirect('/');
});

module.exports = router;
