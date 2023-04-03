const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const abi = require('../build/contracts/Weapon.json').abi;

const provider = new HDWalletProvider({
  mnemonic: 'YOUR MNEMONIC PHRASE HERE',
  providerOrUrl: 'https://goerli.infura.io/v3/YOUR-PROJECT-ID',
  addressIndex: 0,
});

const web3 = new Web3(provider);

const contractAddress = 'YOUR CONTRACT ADDRESS HERE';
const contract = new web3.eth.Contract(abi, contractAddress);

router.get('/', (req, res) => {
  res.render('verifyauthenticity');
});

router.post('/', async (req, res) => {
  const { tokenId } = req.body;

  try {
    const result = await contract.methods.isAuthentic(tokenId).call();
    res.render('verifyauthenticity', { result });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
