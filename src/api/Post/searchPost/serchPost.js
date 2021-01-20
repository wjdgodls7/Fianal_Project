import { prisma } from "../../../../generated/prisma-client";
import { SEARCHPOST_FRAGMENT } from "../../../fragments";

export default {
    Query: {
        searchPost: (_, args) => prisma.posts({
            where: {
                OR: [{
                    location_starts_with: args.term
                },
                {
                    caption_contains: args.term
                }]
            }
        }).$fragment(SEARCHPOST_FRAGMENT)
    }
}