import { NextApiRequest, NextApiResponse } from "next";

// const {OAuth2Client} = require('google-auth-library');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  console.log(req.query)
  console.log(req.url)

  // const client = new OAuth2Client();
  // async function verify() {
  //   const ticket = await client.verifyIdToken({
  //       idToken: 'token',
  //       audience: '683786685127-lbfh155lvus59p6omf23cbvq15cep823.apps.googleusercontent.com',  // Specify the CLIENT_ID of the app that accesses the backend
  //       // Or, if multiple clients access the backend:
  //       //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  //   });
  //   const payload = ticket.getPayload();
  //   const userid = payload['sub'];
  //   console.log(payload)
  //   // If request specified a G Suite domain:
  //   // const domain = payload['hd'];
  // }
  //verify().catch(console.error);
  res.status(200).json({message: 'OK'})
}