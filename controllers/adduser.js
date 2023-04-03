const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const { abi, address } = require('C:\Users\Bharath\OneDrive\Desktop\BEL\WTracker\Contract\build\contracts\WeaponTracking.json');
const HDWalletProvider = require('@truffle/hdwallet-provider');

// Replace with your own mnemonic
const mnemonic = process.env.SECRET_KEY;
const provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonic
  },
  providerOrUrl: 'https://goerli.infura.io/v3/bafb8eb0510942a2939896f13f58baa3'
});

const web3 = new Web3(provider);

const contract = new web3.eth.Contract(abi, address);

router.get('/', function(req, res) {
  res.render('adduser', { title: 'Add User' });
});

router.post('/', async function(req, res) {
  const { name, email } = req.body;
  try {
    const accounts = await web3.eth.getAccounts();
    const result = await contract.methods.addUser(name, email).send({ from: accounts[0] });
    console.log(result);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.render('adduser', { title: 'Add User', error: 'Error adding user. Please try again.' });
  }
});

module.exports = router;
