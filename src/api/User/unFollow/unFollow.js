import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

export default {
    Mutation: {
        unFollow: async (_, args, { request }) => {
            isAuthenticated(request);
            const { id } = args;
            const { user } = request;

            try {
                await prisma.updateUser({
                    where: { id }, data: {
                        followers: {
                            disconnect: {
                                id: user.id
                            }
                        }
                    }
                })
                return true;
            } catch {
                return false;
            }
        }
    }
}