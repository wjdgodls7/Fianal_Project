import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
    Mutation: {
        confirmUser: async (_, arg) => {
            const { email, password } = arg;
            const filterUser = {
                AND: [
                    {
                        email: email
                    },
                    {
                        password: password
                    }
                ]
            };
            try {
                const existingUser = await prisma.$exists.user(filterUser);
                if (existingUser) {
                    return generateToken();
                } else {
                    return "츄라이 츄라이 어게인"
                }
            } catch (e) {
                console.log(e);
            }
        }
    }
}