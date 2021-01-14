import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
    Mutation: {
        confirmSecret: async (_, args, { request }) => {
            console.log(request.user);

            const { email, loginSecret } = args;
            const user = await prisma.user({ email });
            console.log(user.loginSecret);
            if (user.loginSecret === loginSecret) {
                return generateToken(user.id);
            } else {
                throw Error("츄라이 츄라이 어게인");
            }
        }
    }
}