// Task : Create a script that listens to the event emitted by deployed contract and test it.
// Inject environemnt variable in this file
require("dotenv").config("./env");

// Import Web3
const Web3 = require("web3");

// Import abi
const abi = require("./abi.json");

// create web3 instance
const web3 = new Web3(
  new Web3.providers.WebsocketProvider(process.env.WEBSOCKET_URI)
);

// add account to wallet
web3.eth.accounts.wallet.add("0x" + process.env.PRIVATE_KEY);

// get contract instance
const simpleCounterContract = new web3.eth.Contract(
  abi,
  process.env.CONTRACT_ADDRESS
);

// Addition Listener
simpleCounterContract.events
  .Addition((error, event) => {
    console.log(event);
  })
  .on("data", function (event) {
    console.log(event);
  })
  .on("changed", function (event) {})
  .on("error", console.error);

// Subtraction Listener
simpleCounterContract.events
  .Subtraction((error, event) => {
    console.log(event);
  })
  .on("data", function (event) {
    console.log(event); // same results as the optional callback above
  })
  .on("changed", function (event) {
    // remove event from local database
  })
  .on("error", console.error);

// Tested and worked with below output
// {
//   removed: false,
//     logIndex: 2,
//       transactionIndex: 14,
//         transactionHash: '0x36c671c198e2b2ab9e80cfa466c6be2ff076c0ebeab2b418f00e21edce23c35b',
//           blockHash: '0x13c81049972d1102fbec5fe91addbbd435268cdb9896321ec1ed75e941a3ba14',
//             blockNumber: 8336087,
//               address: '0x30d489600F1DD4D2c56E328445f89d8e1a9b28F7',
//                 id: 'log_0bb36c26',
//                   returnValues: Result {
//     '0': '11',
//       '1': '0x90eFb8AA0c822EFe22BDED1feFD49331A14114f4',
//         number: '11',
//           caller: '0x90eFb8AA0c822EFe22BDED1feFD49331A14114f4'
//   },
//   event: 'Addition',
//     signature: '0xdeaf507bc2efa0f5e653972b9a04466d9794840275920adbc78e2c49ffa61232',
//       raw: {
//     data: '0x',
//       topics: [
//         '0xdeaf507bc2efa0f5e653972b9a04466d9794840275920adbc78e2c49ffa61232',
//         '0x000000000000000000000000000000000000000000000000000000000000000b',
//         '0x00000000000000000000000090efb8aa0c822efe22bded1fefd49331a14114f4'
//       ]
//   }
// }
// {
//   removed: false,
//     logIndex: 2,
//       transactionIndex: 14,
//         transactionHash: '0x36c671c198e2b2ab9e80cfa466c6be2ff076c0ebeab2b418f00e21edce23c35b',
//           blockHash: '0x13c81049972d1102fbec5fe91addbbd435268cdb9896321ec1ed75e941a3ba14',
//             blockNumber: 8336087,
//               address: '0x30d489600F1DD4D2c56E328445f89d8e1a9b28F7',
//                 id: 'log_0bb36c26',
//                   returnValues: Result {
//     '0': '11',
//       '1': '0x90eFb8AA0c822EFe22BDED1feFD49331A14114f4',
//         number: '11',
//           caller: '0x90eFb8AA0c822EFe22BDED1feFD49331A14114f4'
//   },
//   event: 'Addition',
//     signature: '0xdeaf507bc2efa0f5e653972b9a04466d9794840275920adbc78e2c49ffa61232',
//       raw: {
//     data: '0x',
//       topics: [
//         '0xdeaf507bc2efa0f5e653972b9a04466d9794840275920adbc78e2c49ffa61232',
//         '0x000000000000000000000000000000000000000000000000000000000000000b',
//         '0x00000000000000000000000090efb8aa0c822efe22bded1fefd49331a14114f4'
//       ]
//   }
// }
// {
//   removed: false,
//     logIndex: 2,
//       transactionIndex: 14,
//         transactionHash: '0x36c671c198e2b2ab9e80cfa466c6be2ff076c0ebeab2b418f00e21edce23c35b',
//           blockHash: '0x13c81049972d1102fbec5fe91addbbd435268cdb9896321ec1ed75e941a3ba14',
//             blockNumber: 8336087,
//               address: '0x30d489600F1DD4D2c56E328445f89d8e1a9b28F7',
//                 id: 'log_0bb36c26',
//                   returnValues: Result {
//     '0': '11',
//       '1': '0x90eFb8AA0c822EFe22BDED1feFD49331A14114f4',
//         number: '11',
//           caller: '0x90eFb8AA0c822EFe22BDED1feFD49331A14114f4'
//   },
//   event: 'Addition',
//     signature: '0xdeaf507bc2efa0f5e653972b9a04466d9794840275920adbc78e2c49ffa61232',
//       raw: {
//     data: '0x',
//       topics: [
//         '0xdeaf507bc2efa0f5e653972b9a04466d9794840275920adbc78e2c49ffa61232',
//         '0x000000000000000000000000000000000000000000000000000000000000000b',
//         '0x00000000000000000000000090efb8aa0c822efe22bded1fefd49331a14114f4'
//       ]
//   }
// }
// {
//   removed: false,
//     logIndex: 2,
//       transactionIndex: 14,
//         transactionHash: '0x36c671c198e2b2ab9e80cfa466c6be2ff076c0ebeab2b418f00e21edce23c35b',
//           blockHash: '0x13c81049972d1102fbec5fe91addbbd435268cdb9896321ec1ed75e941a3ba14',
//             blockNumber: 8336087,
//               address: '0x30d489600F1DD4D2c56E328445f89d8e1a9b28F7',
//                 id: 'log_0bb36c26',
//                   returnValues: Result {
//     '0': '11',
//       '1': '0x90eFb8AA0c822EFe22BDED1feFD49331A14114f4',
//         number: '11',
//           caller: '0x90eFb8AA0c822EFe22BDED1feFD49331A14114f4'
//   },
//   event: 'Addition',
//     signature: '0xdeaf507bc2efa0f5e653972b9a04466d9794840275920adbc78e2c49ffa61232',
//       raw: {
//     data: '0x',
//       topics: [
//         '0xdeaf507bc2efa0f5e653972b9a04466d9794840275920adbc78e2c49ffa61232',
//         '0x000000000000000000000000000000000000000000000000000000000000000b',
//         '0x00000000000000000000000090efb8aa0c822efe22bded1fefd49331a14114f4'
//       ]
//   }
// }
