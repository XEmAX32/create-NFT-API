const fs = require('fs');
const pinataSDK = require('@pinata/sdk');
const ethers = require('ethers');

const pinata = pinataSDK(process.env.PINATA_KEY, process.env.PINATA_SECRET);

function testConnection() {
  pinata.testAuthentication().then((result) => {
    //handle successful authentication here
    console.log(result);
  }).catch((err) => {
    //handle error here
    console.log(err);
  });
}

function uploadJSON(body) {
  return new Promise(async (resolve, reject) => {
    const options = {
      pinataOptions: {
          cidVersion: 0
      }
  };
    pinata.pinJSONToIPFS(body, options).then((result) => {
        //handle results here
        resolve(result);
    }).catch((err) => {
        //handle error here
        reject(err);
    });
  });
}

async function uploadFile() {
  return new Promise(async (resolve, reject) => {
    const readableStreamForFile = fs.createReadStream('test.JPG');

    const options = {
      pinataOptions: {
          cidVersion: 0
      }
    };

    pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
      //handle results here
      resolve(result);
    }).catch((err) => {
        //handle error here
        reject(err);
    });
  });
}

async function deployContract(name, symbol, cost, tokenURI, maxQuantity, maxMintingQuantity) {
  const price_unit = "gwei";
  const contractFile = await fs.readFileSync('artifacts/contracts/Midly.sol/NFTCollectible.json');
  const contract = JSON.parse(contractFile.toString());

  const provider = new ethers.providers.AlchemyProvider("maticmum", process.env.ALCHEMY_API_KEY);
  const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);
  const price = ethers.utils.formatUnits(await provider.getGasPrice(), price_unit);

  const factory = new ethers.ContractFactory(contract.abi, contract.bytecode, wallet);

  const deployedContract = await factory.deploy(
  tokenURI,
  maxQuantity,
  ethers.utils.parseUnits(String(cost), 'ether'),
  maxMintingQuantity,
  {
    gasLimit: 7500000,
    gasPrice: ethers.utils.parseUnits(price, price_unit),
  })

  return deployedContract;
}

export { testConnection, uploadFile, uploadJSON, deployContract }