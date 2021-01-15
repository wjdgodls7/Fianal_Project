import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        delComment: async (_, arg, { request }) => {
            isAuthenticated(request);
            const { id } = arg;
            const { user } = request;
            const filterOption = {
                AND: [
                    {
                        user: {
                            id: user.id
                        }
                    }
                ]
            };

            const existingComment = await prisma.$exists.comment(filterOption);
            try {
                if (existingComment) {
                    await prisma.deleteComment({ id });
                }
                return true;
            } catch {
                return false;
            }

        }

    }
}