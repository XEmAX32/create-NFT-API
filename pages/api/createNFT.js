import { uploadFile, uploadJSON, deployContract } from "../../utilities/file-system";
import nextConnect from 'next-connect';
import middleware from '../../middleware/middleware'

const handler = nextConnect();

handler.use(middleware);

handler.post(async(req, res) => {
	try {
    const pinataGatewayLink = "https://gateway.pinata.cloud/ipfs/";
		const files = req.files
		const body = req.body
    const image = await uploadFile();

    const pinataBody = {
      name: "test", 
      description: "test",
      image: pinataGatewayLink + image.IpfsHash
    }
    const json = await uploadJSON(pinataBody);

    deployContract(body.name, body.symbol, body.cost, "ipfs://"+json.IpfsHash, body.maxQuantity, body.maxMintingQuantity);
    res.status(HttpStatus.OK).json({});
	} catch (err) {
		res.status(HttpStatus.BAD_REQUEST).json({error: err.message});
	}
});

// export default async function handler(req, res) {
//   

//   const pinataGatewayLink = "https://gateway.pinata.cloud/ipfs/";

//   const image = await uploadFile();
  
//   const body = {
//     name: "test", 
//     description: "test",
//     image: pinataGatewayLink + image.IpfsHash
//   }

//   const json = await uploadJSON(body);

//   deployContract("provaNFT", "pNFT", 0.01, "ipfs://"+json.IpfsHash, 10, 1);

//   res.status(200).json({ name: 'working' })
// }

export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler;
