import * as React from "react";

interface EmailTemplateProps {
    firstName: string;
    loginUrl: string;
}

export const Welcome: React.FC<Readonly<EmailTemplateProps>> = ({
                                                                    firstName,
                                                                    loginUrl,
                                                                }) => {
    return (
        <div className="bg-gray-100 py-10 px-6 font-sans">
            <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Welcome to Our Platform, {firstName}! 🎉
                </h1>

                <p className="text-gray-700 mb-4">
                    We&#39;re excited to have you on board. Your account has been created successfully.
                </p>

                <p className="text-gray-700 mb-6">
                    To get started, please log in to your account and verify your email address.
                </p>

                <a
                    href={loginUrl}
                    className="inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
                >
                    Verify My Account
                </a>

                <p className="text-sm text-gray-500 mt-6">
                    If you didn’t sign up for this account, you can safely ignore this email.
                </p>

                <p className="text-sm text-gray-500 mt-2">
                    Thank you, <br /> The Team
                </p>
            </div>
        </div>
    );
};
