# Spearmint test 

## Test Description
TokenA is deployed on pancakeSwap, you need to write a script that *automatically buys that token whenever TokenA liquidity is added with the bnb*

Arguments
1. Token Address -> address of deployed token
2. private key -> The private key of the wallet from which you wish to buy the token
3. Amount to buy (i.e 0.001 bnb)
4. No of buys (i.e 2) -> Total no of purchases 

you can use pancakeswapV2 testnet to add liquidity 

*But make sure that it's not a manually buy option we need it to be automatic*

## Technologies Used
- Web3.js 

To run this project, we need to run following command in the root directory.

```bash
npm install
node lib/tokenACron.js
```