import { prisma } from "../../../../generated/prisma-client";
import { COMMENT_FRAGMENT, LIKE_FRAGMENT } from "../../../fragments";
import { isAuthenticated } from "../../../middlewares";

export default {
    Query: {
        seeFullPost: async (_, args) => {
            const { id } = args;
            const post = await prisma.post({ id });
            const comments = await prisma.post({ id }).comments().$fragment(COMMENT_FRAGMENT);
            const LikeCount = await prisma.likesConnection({ where: { post: { id } } }).aggregate().count();
            const LikeUsers = await prisma.post({ id }).likes().$fragment(LIKE_FRAGMENT);
            const files = await prisma.post({ id }).files();
            const user = await prisma.post({ id }).user();
            console.log(LikeUsers);
            return { post, comments, LikeCount, LikeUsers, files, user }

        }
    }
}