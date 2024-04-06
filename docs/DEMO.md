# DEMO

PLAYMINT started as a hackathon project, and it shows.

### Play a game

1. Get [Sepolia testnet eth from a faucet](\(https:/sepolia-faucet.pk910.de/\)/) in your wallet
2. [mint a free D7 NFT on Sepolia](https://sepolia.etherscan.io/token/0x43b7d111d966e482bff3b908fa1ffe6d2e78f37a?a=0x2273fFEd38ED040FBcd3e45Cd807594d27ebfAE3#writeContract#F2)
3. [Visit the Demo Game](http://localhost:3000/game/0xd362776F706b8E72525e3291e5433A695ECBefA7)
4. Scroll down to the bottom, and you'll see this information which shows three things.  The Games address is first, beneath that is the module contracts providing game functionality, and lastly is the entity contracts providing game data.\
   ![](<.gitbook/assets/Screenshot 2024-04-06 at 12.19.55 AM.png>)
5. Open Sepolia etherscan, and you can visit the contract for the module's functionality.  Here, you can call Write functions on the contract.  Note the function name in the screenshot, and call that function passing in your Game's address and the token ID of the D7 NFT you minted in your wallet.
6. Open Sepolia etherscan, and you can visit the contract for the entity's data storage.  Here, you can call Read  functions on the contract.  Find the `getNumber` function, and pass in the token ID of the D7 NFT you minted as well as the function name from this section.  


### Create a game

if you want to launch a game:

1. Get [Sepolia testnet eth from a faucet](\(https:/sepolia-faucet.pk910.de/\)/) in your wallet
2. go to [the create page](https://www.playmint.app/create), enter a name, and launch your game.
3. Once the transaction is confirmed, go to \[the discover page] (https://www.playmint.app/discover) and click on your Game's display name (and you are the Game Master (GM))
4. Register a Module - right now there is only one and it's hardcoded in the UI. Wait for this transaction to complete.
5. Register an Entity - right now it is hardcoded to use the D7 NFT. Wait for the transaction to complete.
6. Reload the Page, and scroll to the bottom, and you're ready to play in etherscan!
