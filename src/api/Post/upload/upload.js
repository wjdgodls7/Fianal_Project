import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

export default {
    Mutation: {
        upload: async (_, args, { request }) => {
            isAuthenticated(request);

            const { location, caption, files } = args;
            const { user } = request;

            const post = await prisma.createPost({
                location,
                caption,
                user: {
                    connect: {
                        id: user.id
                    }
                }
            });
            files.forEach( async file => await prisma.createFile({
                url: file,
                post: {
                    connect: {
                        id:post.id
                    }
                }
            }));
            return post;
        }
    }
}
