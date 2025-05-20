import { Html, Head, Preview, Body, Container, Text, Heading, Hr } from "@react-email/components";

type OtpVerificationEmailProps = {
    fullName: string;
    otp: string;
};

const main = {
    backgroundColor: "#f6f9fc",
    padding: "20px",
    fontFamily: "Helvetica, Arial, sans-serif",
};

const container = {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "40px",
    maxWidth: "600px",
    margin: "0 auto",
};

const heading = {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333333",
};

const text = {
    fontSize: "16px",
    color: "#333333",
    lineHeight: "1.4",
};

const otpCode = {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#2F80ED",
    textAlign: "center" as const,
    margin: "20px 0",
};

const hr = {
    borderColor: "#e0e0e0",
    margin: "32px 0",
};

const footer = {
    fontSize: "14px",
    color: "#999999",
};

export const OtpVerificationEmail = ({ fullName, otp }: OtpVerificationEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>Your OTP code for verification</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={heading}>OTP Verification</Heading>
                    <Text style={text}>Hello {fullName},</Text>
                    <Text style={text}>
                        Your OTP code is:
                    </Text>
                    <Text style={otpCode}>{otp}</Text>
                    <Text style={text}>
                        This code will expire in 5 minutes. Please do not share this code with anyone.
                    </Text>
                    <Hr style={hr} />
                    <Text style={footer}>If you did not request this, please ignore this email.</Text>
                </Container>
            </Body>
        </Html>
    );
};

export default OtpVerificationEmail;
