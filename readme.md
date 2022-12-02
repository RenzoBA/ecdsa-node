## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

## Private & Public keys

private key: ada6c514ce53e63a81ec4a2fd7a8fc95ef4410e08e5ec2b4a837d839438d1aee
public key: 04d42be0cf4950e5e21e5b56f1eb55f6e3650549b536f04454c37cbb5bd0dfd1e786f7269857a8ed7804130587fa669c8368b5f10e9a96724d522ad53846c017ab

private key: 69c594205f9b863937589bfc6894941c0dfc5ce391f4529f191d16416d0b2d81
public key: 044ec1d2f8e4887d7339fa101d9591f99439447bfd4cb39b164fe2c1d5564c0d0e9b41dde790b0a9fc614d69110f1579ebfb89302e758923654bf8d2c248cb1ad1

private key: 0f78d3eb9a831085d0ed2d647311437cd7b105661b0efc4750b2fc2b817f992f
public key: 048012cd4f5c74859c77df48361e84a306acc4460f519e955e73ffcf14f55c06f682583e9878a933f27de523c2418a730a52155de108ce93c38b486e8a69bc0017

### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder
2. Run `npm install` to install all the depedencies
3. Run `node index` to start the server

The application should connect to the default server port (3042) automatically!

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.
