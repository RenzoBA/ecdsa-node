const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
//
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");
//

app.use(cors());
app.use(express.json());

const balances = {
  "04d42be0cf4950e5e21e5b56f1eb55f6e3650549b536f04454c37cbb5bd0dfd1e786f7269857a8ed7804130587fa669c8368b5f10e9a96724d522ad53846c017ab": 100,
  "044ec1d2f8e4887d7339fa101d9591f99439447bfd4cb39b164fe2c1d5564c0d0e9b41dde790b0a9fc614d69110f1579ebfb89302e758923654bf8d2c248cb1ad1": 50,
  "048012cd4f5c74859c77df48361e84a306acc4460f519e955e73ffcf14f55c06f682583e9878a933f27de523c2418a730a52155de108ce93c38b486e8a69bc0017": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, sign, recoveryBit } = req.body;
  const signHash = Uint8Array.from(Object.values(sign));
  console.log("sign:", sign);
  console.log("sign hash:", signHash);
  console.log("recoveryBit:", recoveryBit);

  let message = {
    sender: sender,
    amount: amount,
    recipient: recipient,
  };

  const messageHash = keccak256(utf8ToBytes(JSON.stringify(message)));
  console.log("message hash:", messageHash);

  const recoverPublicKey = secp.recoverPublicKey(
    messageHash,
    signHash,
    recoveryBit
  );

  console.log("recover:", toHex(recoverPublicKey));

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (toHex(recoverPublicKey) == sender) {
    console.log("Access accepted :)");
    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  } else {
    console.log("Access denied :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
