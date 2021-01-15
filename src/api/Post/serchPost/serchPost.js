import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        serchPost: (_, args) => prisma.posts({
            where: {
                OR: [{
                    location_starts_with: args.term
                },
                {
                    caption_contains: args.term
                }]
            }
        })
    }
}