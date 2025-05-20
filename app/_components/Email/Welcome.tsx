import * as React from "react";
import {
    Html,
    Head,
    Preview,
    Section,
    Container,
    Text,
    Button,
} from "@react-email/components";

interface EmailTemplateProps {
    firstName: string;
    loginUrl: string;
}

export const Welcome: React.FC<EmailTemplateProps> = ({firstName, loginUrl,}) => {
    return (
        <Html>
            <Head />
            <Preview>Welcome to Our Platform, {firstName}!</Preview>

            <Section style={{ backgroundColor: "#f3f4f6", padding: "40px 20px" }}>
                <Container style={styles.container}>
                    <Text style={styles.heading}>
                        Welcome to Our Platform, {firstName}! 🎉
                    </Text>

                    <Text style={styles.paragraph}>
                        We&#39;re excited to have you on board. Your account has been created
                        successfully.
                    </Text>

                    <Text style={styles.paragraph}>
                        To get started, please log in to your account and verify your email address.
                    </Text>

                    <Button href={loginUrl} style={styles.button}>
                        Verify My Account
                    </Button>

                    <Text style={styles.footer}>
                        If you didn’t sign up for this account, you can safely ignore this email.
                    </Text>

                    <Text style={styles.footer}>
                        Thank you, <br /> The Team
                    </Text>
                </Container>
            </Section>
        </Html>
    );
};

const styles = {
    container: {
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#ffffff",
        padding: "40px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        fontFamily: "Helvetica, Arial, sans-serif",
    },
    heading: {
        fontSize: "24px",
        fontWeight: "bold",
        color: "#1f2937",
        marginBottom: "20px",
    },
    paragraph: {
        fontSize: "16px",
        color: "#4b5563",
        marginBottom: "16px",
    },
    button: {
        display: "inline-block",
        backgroundColor: "#2563eb",
        color: "#ffffff",
        fontSize: "16px",
        fontWeight: "bold",
        padding: "12px 24px",
        borderRadius: "6px",
        textDecoration: "none",
        marginTop: "16px",
    },
    footer: {
        fontSize: "12px",
        color: "#6b7280",
        marginTop: "24px",
    },
};
