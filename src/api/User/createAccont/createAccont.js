import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        createAccount: async (_, args) => {
            const { username,password, email, firstName = "", lastName = "", bio = "" } = args;
            const exitst = await prisma.$exists.user({ OR: [{ username }, { email }] });

            if (exitst) {
                throw Error("이메일이나 닉네임이 중복됩니다.")
            }
            await prisma.createUser({
                username,
                email,
                password,
                firstName,
                lastName,
                bio
            });
            return true;
        }
    }
}