import {Welcome} from "@/app/_components/Email/Welcome";
import {resend} from "@/app/_lib/resend/configure";

export const welcomeMessageHelper = async (userEmail:string, userName: string): Promise<{flag: boolean}> => {
    const { error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [userEmail],
        subject: 'Welcome to  SENV',
        react: Welcome({ firstName: userName, loginUrl: "http://localhost:3000/auth/login"}),
    });

    if (error) {
       return {flag: false }
    }

    return {flag: true};
}