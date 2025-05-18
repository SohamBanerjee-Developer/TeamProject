export default function LoginLayout({

                                        admin,
                                        user,
                                    }: {
    children: React.ReactNode;
    admin: React.ReactNode;
    user: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-1 h-full max-h-[200vh] w-full overflow-y-scroll overflow-x-hidden md:flex-row">
            <div className="h-[100vh] w-full px-5 py-1 md:h-full md:w-1/2 flex-center ">
                {user}
            </div>
            <div className="h-[100vh] w-full px-5 py-1 md:h-full md:w-1/2">
                {admin}
            </div>
        </div>
    );
}
