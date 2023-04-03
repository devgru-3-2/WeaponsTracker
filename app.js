const express = require('express');
const app = express();
const Web3 = require('web3');
const contractAbi = require('./abi.json'); // Replace with actual ABI file path
const contractAddress = '0xf5132Bc2F238A7499F8792A8713AF23040dd18f2'; // Replace with actual contract address

const web3 = new Web3('https://goerli.infura.io/v3/bafb8eb0510942a2939896f13f58baa3'); // Replace with actual Ethereum network URL
const contractInstance = new web3.eth.Contract(contractAbi, contractAddress);
app.set('view engine', 'ejs');
app.use(express.json());



// Base URL endpoint
app.get('/', (req, res) => {
    res.render('index');
  });

// Create weapon endpoint
app.post('/weapon', async (req, res) => {
  const { serialNumber, manufacturer } = req.body;
  const transaction = contractInstance.methods.createWeapon(serialNumber, manufacturer);
  const gas = await transaction.estimateGas({ from: web3.eth.defaultAccount });
  const options = {
    to: contractAddress,
    data: transaction.encodeABI(),
    gas
  };
  const signedTransaction = await web3.eth.accounts.signTransaction(options, '840e1fcf5b316c485b3785a360f601991ac08d8fcfc9f02fb314443419d3eb03'); // Replace with actual private key
  const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
  res.json({ receipt });
});

// Add distributor endpoint
app.post('/distributor', async (req, res) => {
  const { serialNumber, distributor } = req.body;
  const transaction = contractInstance.methods.addDistributor(serialNumber, distributor);
  const gas = await transaction.estimateGas({ from: web3.eth.defaultAccount });
  const options = {
    to: contractAddress,
    data: transaction.encodeABI(),
    gas
  };
  const signedTransaction = await web3.eth.accounts.signTransaction(options, '840e1fcf5b316c485b3785a360f601991ac08d8fcfc9f02fb314443419d3eb03'); // Replace with actual private key
  const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
  res.json({ receipt });
});

// Add dealer endpoint
app.post('/dealer', async (req, res) => {
  const { serialNumber, dealer } = req.body;
  const transaction = contractInstance.methods.addDealer(serialNumber, dealer);
  const gas = await transaction.estimateGas({ from: web3.eth.defaultAccount });
  const options = {
    to: contractAddress,
    data: transaction.encodeABI(),
    gas
  };
  const signedTransaction = await web3.eth.accounts.signTransaction(options, '840e1fcf5b316c485b3785a360f601991ac08d8fcfc9f02fb314443419d3eb03'); // Replace with actual private key
  const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
  res.json({ receipt });
});

// Get weapon details endpoint
app.get('/weapon/:serialNumber', async (req, res) => {
  const { serialNumber } = req.params;
  const weapon = await contractInstance.methods.getWeapon(serialNumber).call();
  res.json({ weapon });
});

// Verify authenticity endpoint
app.get('/verify/:serialNumber', async (req, res) => {
  const { serialNumber } = req.params;
  const isAuthentic = await contractInstance.methods.isAuthentic(serialNumber).call();
  res.json({ isAuthentic });
});

app.listen(3000, () => console.log('Server running on port 3000'));