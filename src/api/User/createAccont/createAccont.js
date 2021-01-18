import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        createAccount: async (_, args) => {
            const { username, email, firstName = "", lastName = "", bio = "" } = args;
            const existsusername = await prisma.$exists.user({ username });
            const existemail = await prisma.$exists.user({ email });
            if (existsusername || existemail) {
                throw Error("이미 사용중인 아이디/email 입니다.");
                return;
            }
            await prisma.createUser({
                username,
                email,
                firstName,
                lastName,
                bio
            });
            return true;
        }
    }
}