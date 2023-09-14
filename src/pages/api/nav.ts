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
    const navData: {id: number, title: string, url: string}[] = [];

    if (type === UrlPath.TOPIC) {
      let topic;

      try {
        topic = await prisma.theme.findUnique({
          where: {
            id: +id
          }
        });
        prisma.$disconnect();
      } catch (e) {
        res.status(422).json({message: 'Problems with DB.'});
        prisma.$disconnect();
        return;
      }

      if (topic) {
        navData.push({id: +topic.id, title: topic.title, url: `topic?t=${topic.id}&p=0&c=10`});
        await buildTreeForum(topic.forumId, navData, res);
      }

    } else if (type === UrlPath.FORUM) {
      await buildTreeForum(+id, navData, res);
    }

    res.status(200).json({nav: navData});

  }

  const buildTreeForum = async (forumId: number, data: {id: number, title: string, url: string}[], res: NextApiResponse) => {
    const prisma = Prisma.getPrisma();
    let forum;
    try {
      forum = await prisma.forum.findUnique({
        where: {
          id: +forumId
        }
      });
    } catch (e) {
      res.status(422).json({message: 'Problems with DB.'});
      prisma.$disconnect();
      return;
    }

    if (forum) {
      data.push({id: forum.id, title: forum.name, url: `forum?f=${forum.id}&p=0&c=10`});
      if (forum.forumParentId) {
        await buildTreeForum(forum.forumParentId, data, res);
        prisma.$disconnect();
      } else if (forum.parent) {
        let section;
        try {
          section = await prisma.section.findUnique({
            where: {
              id: +forum.parent
            }
          });
        } catch (e) {
          res.status(422).json({message: 'Problems with DB.'});
          prisma.$disconnect();
          return;
        }
        if (section) {
          data.push({id: section.id, title: section.name, url: ''});
        }
        prisma.$disconnect();
      }
    }
  }
