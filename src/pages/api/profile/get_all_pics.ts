import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method !== 'GET') {
    res.status(403).json({message: 'Only GET requests allowed.'});
    return;
  }

  const path = require('path');
  const pathFolder = path.resolve('public', 'pics');
  const fs = require('fs');
  const fileNames = fs.readdirSync(pathFolder).map((fileName: string) => {
    return 'pics/' + fileName;
  });

  res.status(200).json({message: 'OK.', fileNames});
}