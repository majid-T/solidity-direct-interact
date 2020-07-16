/// Task : Create a script to deploy the contract and test it

// Inject environemnt variable in this file
require("dotenv").config("./env");

// Import Web3
const Web3 = require("web3");

// Import BigNumber
const BigNumber = require("bignumber.js");

// Import abi
const abi = require("./abi.json");

const { bytecode } = require("./bytecode");

// create web3 instance
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.URI));

// get the account object from private key
const accountObj = web3.eth.accounts.privateKeyToAccount(
  process.env.PRIVATE_KEY
);

const _number = new BigNumber(10);
const simpleCounterContract = new web3.eth.Contract(abi);

const contractData = simpleCounterContract
  .deploy({
    data: `0x${bytecode}`,
    arguments: [_number],
  })
  .encodeABI();
web3.eth
  .estimateGas({ from: accountObj.address, data: contractData })
  .then((gas) => {
    const rawTx = {
      from: accountObj.address,
      gas,
      data: contractData,
    };
    web3.eth.accounts
      .signTransaction(rawTx, accountObj.privateKey)
      .then(({ rawTransaction, transactionHash }) => {
        web3.eth
          .sendSignedTransaction(rawTransaction)
          .on("receipt", console.log);

        waitForReceipt(transactionHash, (result) => {
          console.log("The contract is deployed at ", result.contractAddress);
        });
      });
  });

// function to poll until transaction gets mined
function waitForReceipt(hash, cb) {
  web3.eth.getTransactionReceipt(hash, function (err, receipt) {
    if (err) {
      console.error(err);
    }
    if (receipt) {
      // Transaction went through
      if (cb) {
        cb(receipt);
      }
    } else {
      // Try again in 1 second
      console.log("Waiting to get mined...");
      setTimeout(function () {
        waitForReceipt(hash, cb);
      }, 1000);
    }
  });
}
/*
Done with success , Reciept below
{
  blockHash: '0x133719c536a297a199ecbd6c88b435686d375caa9ba7c03f43fd86d2b9d8f257',
  blockNumber: 8305364,
  contractAddress: '0x30d489600F1DD4D2c56E328445f89d8e1a9b28F7',
  cumulativeGasUsed: 1244958,
  from: '0x90efb8aa0c822efe22bded1fefd49331a14114f4',
  gasUsed: 231862,
  logs: [],
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: null,
  transactionHash: '0x9641228908da649462dd1b23ae40cac5e38893087f9b521cb759e76e3c704205',
  transactionIndex: 3
}
 */
