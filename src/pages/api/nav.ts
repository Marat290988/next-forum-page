import { UrlPath } from "@/enum/url-path.enum";
import { Prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

type NavReq = {
  type: UrlPath,
  id: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {

    if (req.method !== 'POST') {
      res.status(403).json({message: 'Only POST requests allowed.'});
      return;
    }

    const { type, id } = req.body as NavReq;
    const prisma = Prisma.getPrisma();
    const navData: {id: number, title: string}[] = [];

    if (type === UrlPath.TOPIC) {
      let topic;

      try {
        topic = await prisma.theme.findUnique({
          where: {
            id: +id
          }
        });
      } catch (e) {
        res.status(422).json({message: 'Problems with DB.'});
        prisma.$disconnect();
        return;
      }

      if (topic) {
        navData.unshift({id: +topic.id, title: topic.title})
      }

    }

  }

  const buildTreeForum = async (forumId: number, data: {id: number, title: string}[]) => {

  }

  // export const deleteForumTree = async (res: NextApiResponse, parentId: number): Promise<void> => {
  //   const prisma = Prisma.getPrisma();
  
  //   let forums;
  
  //   try {
  //     forums = await prisma.forum.findMany({
  //       where: {
  //         forumParentId: parentId
  //       }
  //     });
  //   } catch(e) {
  //     res.status(422).json({message: 'Problems with DB.'});
  //     prisma.$disconnect();
  //   }
  
  //   if (forums && forums.length > 0) {
  //     forums.forEach(async f => {
  //       await deleteForumTree(res, f.id);
  //     });
  //     await prisma.forum.delete({
  //       where: {
  //         id: parentId
  //       }
  //     });
  //   } else {
  //     try {
  //       await prisma.comment.deleteMany({
  //         where: {
  //           forumId: parentId
  //         }
  //       });
  //       await prisma.theme.deleteMany({
  //         where: {
  //           forumId: parentId
  //         }
  //       });
  //       await prisma.forum.delete({
  //         where: {
  //           id: parentId
  //         }
  //       });
  //     } catch(e) {
  //       res.status(422).json({message: 'Problems with DB.'});
  //       prisma.$disconnect();
  //     }
  //   }
    
  // }