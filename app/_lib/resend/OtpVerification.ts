import OtpVerificationEmail from "@/app/_components/Email/Verification";
import {resend} from "@/app/_lib/resend/configure";

export const OtpVerificationHelper = async (fullName: string, otp: string, userEmail:string): Promise<{ flag: boolean }> => {
    const {error} = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [userEmail],
        subject: 'Verify that you are access your account',
        react: OtpVerificationEmail({fullName, otp}),
    });

    if (error) {
        return {flag: false}
    }

    return {flag: true};
}