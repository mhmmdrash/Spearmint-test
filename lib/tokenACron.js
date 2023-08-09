const Web3 = require('web3');
const { abi: exchangeABI } = require('./ExchangeABI.json'); // Replace with actual ABI
require('dotenv').config();

const NODE_URL = process.env.NODE_URL;

const web3 = new Web3(NODE_URL); // Update with your blockchain node URL

const privateKey = process.env.PRIVATE_KEY; // Replace with your private key
const account = web3.eth.accounts.privateKeyToAccount(privateKey);

const tokenABNBPairAddress = process.env.PAIR_ADDRESS// Address of token B's BNB pool
const bnbAddress = process.env.BNB_ADDRESS;
const tokenAAddress = process.env.TOKENA_ADDRESS; // Address of token A
const amountToSell = web3.utils.toWei('.001', 'ether'); // Amount of token B to sell
const minAmountA = web3.utils.toWei('0.5', 'ether'); // Minimum amount of token A to receive

const exchangeContract = new web3.eth.Contract(exchangeABI, tokenABNBPairAddress);

async function buyTokenA() {
  const liquidityAddedEvent = await exchangeContract.getPastEvents('Mint', {
    fromBlock: 'latest',
    toBlock: 'latest',
  });

  if (liquidityAddedEvent.length > 0) {
    // Liquidity added to the pool, execute buy
    const tx = exchangeContract.methods.swapExactTokensForTokens(
        amountToSell,
        minAmountA,
        [bnbAddress, tokenAAddress], // token B to token A
        account.address,
        Date.now() + 1000 * 60, // deadline 1 minute from now
      );

    const txData = tx.encodeABI();
    const gasPrice = await web3.eth.getGasPrice();

    const signedTx = await account.signTransaction({
      to: bnbAddress,
      value: amountToBuy,
      data: txData,
      gasPrice,
      gas: await tx.estimateGas({ from: account.address }),
    });

    await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log('Bought Token A');
  }
}

// Run the function at regular intervals
setInterval(buyTokenA, 60000); // Check every 60 seconds
