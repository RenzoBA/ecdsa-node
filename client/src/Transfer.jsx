import { useState } from "react";
import server from "./server";
//
import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";
//

function Transfer({ address, setBalance, privateKey }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      //
      const message = {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
      };
      const messageHash = keccak256(utf8ToBytes(JSON.stringify(message)));
      const [sign, recoveryBit] = await secp.sign(messageHash, privateKey, {
        recovered: true,
      });
      console.log("message:", message);
      console.log("message hash:", messageHash);
      console.log("private key:", privateKey);
      console.log("sign:", sign);
      console.log("recoveryBit:", recoveryBit);
      //
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        sign,
        recoveryBit,
      });
      console.log("sender:", address);
      console.log("amount:", parseInt(sendAmount));
      console.log("recipient:", recipient);

      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address..."
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
