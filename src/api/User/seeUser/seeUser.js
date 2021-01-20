import { prisma } from "../../../../generated/prisma-client";
import { SEARCHPOST_FRAGMENT } from "../../../fragments";

export default {
    Query: {
        seeUser: async (_, args) => {
            const { username } = args;
            const userprofile = await prisma.user({ username });
            console.log(userprofile);
            const posts = await prisma.user({ username }).posts().$fragment(SEARCHPOST_FRAGMENT);
            return { user: userprofile, posts }
        }
    }
}