import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        updatePw: async (_, args) => {
            const { email, password } = args;
            console.log(password)
            return prisma.updateUser({ data: { password }, where: { email } });
        }
    }
}
