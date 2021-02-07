import { prisma } from '../../../../generated/prisma-client';
import { generateSecret, sendSecretMail } from '../../../utils';

export default {
    Mutation: {
        findrequestSecret: async (_, args) => {
            const { email } = args;
            const loginSecret = generateSecret();
            const exitst = await prisma.$exists.userLogin({ email });
            console.log(loginSecret);
            if (exitst) {
                await prisma.updateUserLogin({ data: { loginSecret }, where: { email } })
                return true;
            } else {
                return false;
            }
        }
    }
}