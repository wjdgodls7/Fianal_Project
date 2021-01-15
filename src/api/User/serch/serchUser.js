import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        serchUser: async (_, args) => prisma.users({
            where: {
                OR: [
                    {
                        username_contains: args.term
                    },
                    {
                        firstName_contains: args.term
                    },
                    {
                        lastName_contains: args.term
                    }
                ]
            }
        })
    }
}