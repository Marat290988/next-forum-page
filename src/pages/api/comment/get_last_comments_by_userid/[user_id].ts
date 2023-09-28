import { Prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { Client } from 'pg';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method !== 'GET') {
    res.status(403).json({message: 'Only GET requests allowed.'});
    return;
  }

  const client = new Client({
    user: 'postgres',
    host: 'db.zxrpuiihquvulsbxnxhs.supabase.co',
    database: 'postgres',
    password: 'nSILrzaBVvGN24JH',
    port: 5432,
  });

  

  client.query('SELECT * FROM public.COMMENT', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
    client.end();
  });


// const client = new Client({
//   user: 'user',
//   host: 'localhost',
//   database: 'database',
//   password: 'password',
//   port: 5432,
// });

// client.connect();

// const name = 'John';
// const age = 30;

// client.query('SELECT * FROM table_name WHERE name = $1 AND age > $2', [name, age], (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });

  const user_id = Number.parseInt(req.query.user_id as string);
  const prisma = Prisma.getPrisma();

  let comments;

  try {
    comments = await prisma.comment.findMany({
      skip: 0,
      take: 10,
      where: {
        authorCommentId: user_id
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  } catch(e) {
    res.status(422).json({message: 'Problems with DB.'});
    prisma.$disconnect();
    return;
  }

  res.status(200).json({comments});

}