import _ from "lodash";
import fs from "fs";
import path from "path";
import jsonwebtoken from "jsonwebtoken";

const __dirname = import.meta.dirname;

const pathToKey = path.join(__dirname, '/../../', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');


export function getInfoData({ fields = [], object = {} }) {
  return _.pick(object, fields);
}

export function issueJWT(user) {
  const _id = user._id;

  const expiresIn = '1d';

  const payload = {
    sub: _id,
    iat: Date.now()
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });

  return {
    token: signedToken,
    expires: expiresIn
  }
}


// export function generateKeyPair() {
//   const { publicKey, privateKey } = generateKeyPairSync("rsa", {
//     modulusLength: 2048,
//     publicKeyEncoding: {
//       type: "spki",
//       format: "pem",
//     },
//     privateKeyEncoding: {
//       type: "pkcs8",
//       format: "pem",
//     },
//   });

//  fs.writeFileSync("./id_rsa_pub.pem", publicKey, "utf8");
//  fs.writeFileSync("./id_rsa_priv.pem", privateKey, "utf8");


//   return true;
// }

// generateKeyPair();