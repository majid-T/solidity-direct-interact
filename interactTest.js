// Task: Create a script to interact with all public functions of deployed contract and test it

// Inject environemnt variable in this file
require("dotenv").config("./env");

// Import Web3
const Web3 = require("web3");

// Import abi
const abi = require("./abi.json");

// create web3 instance
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.URI));

// get the account object from private key
const accountObj = web3.eth.accounts.privateKeyToAccount(
  process.env.PRIVATE_KEY
);

// add account to wallet
web3.eth.accounts.wallet.add("0x" + process.env.PRIVATE_KEY);

// get contract instance
const simpleCounterContract = new web3.eth.Contract(
  abi,
  process.env.CONTRACT_ADDRESS
);

// read the value before any interaction
simpleCounterContract.methods
  .value()
  .call()
  .then((result) => {
    console.log("Counter value of counter is ", result);
  });

// Subtracting from counter .... Commented so only one tx is called in a block
// simpleCounterContract.methods
//   .subOne()
//   .estimateGas()
//   .then((gas) => {
//     simpleCounterContract.methods
//       .subOne()
//       .send({ from: web3.eth.accounts.wallet[0].address, gas });
//   });

// Adding to counter .... Comment when uncommenting other method calls
simpleCounterContract.methods
  .addOne()
  .estimateGas()
  .then((gas) => {
    simpleCounterContract.methods
      .addOne()
      .send({ from: web3.eth.accounts.wallet[0].address, gas });
  });

// simpleCounterContract.methods.... Commented so only one tx is called in a block
//   .echoMsg("Hello world!")
//   .estimateGas()
//   .then((gas) => {
//     simpleCounterContract.methods
//       .echoMsg("Hello world!")
//       .send({ from: web3.eth.accounts.wallet[0].address, gas })
//       .then((result) => {
//         console.log("Reply from echo msg ", result);
//       });
//   });
