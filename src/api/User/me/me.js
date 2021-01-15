import { prisma } from "../../../../generated/prisma-client";
// import { USER_FRAGMENT } from "../../../fragments";
import { isAuthenticated } from "../../../middlewares"

export default {
    Query: {
        me: async (_, __, { request }) => {
            isAuthenticated(request);
            const { user } = request;
            const userprofile = await prisma.user({ id: user.id });
            const posts = await prisma.user({ id: user.id }).posts();
            return { user: userprofile, posts }
        }
    }
}

// export default {
//     Query: {
//         me: async (_, __, { requet }) => {
//             isAuthenticated(request);
//             const { user } = request;
//             cosnt userpofile = await prisma.user({ id: user.id }).$fragment(USER_FRAGMENT);
//             return me;
//         }
//     }
// }