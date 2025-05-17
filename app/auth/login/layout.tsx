export default function LoginLayout({

                                        admin,
                                        user,
                                    }: {
    children: React.ReactNode;
    admin: React.ReactNode;
    user: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-1 h-full w-full ">
            <div className="h-[50vh] w-full bg-red px-5 py-1">
                {user}
            </div>
            <div className="h-[50vh] w-full bg-blue-500 px-5 py-1">
                {admin}
            </div>

        </div>
    );
}
