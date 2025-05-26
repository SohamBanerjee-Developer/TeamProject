"use client"

import { useState} from "react";
import Link from "next/link";
import {userLogout} from "@/app/_lib/actions/Authentication/action";
import {useAuthSeesion} from "@/app/_components/context/AuthSession";
import {useRouter} from "next/navigation";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const {isAuthenticated, dispatch} = useAuthSeesion();
    const router = useRouter();
    return (
        <nav className="bg-blue-900 text-white h-12 ">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-full relative">
                {/* Logo */}
                <Link href="/" className="text-lg font-bold">
                    StayFinder
                </Link>

                {/* Three Dots Button (Mobile) */}
                <button
                    id="menu-toggle"
                    className="md:hidden focus:outline-none"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                >
                    {/* Three vertical dots SVG */}
                    <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            d="M12 5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/>
                    </svg>
                </button>
                {
                    menuOpen && <div
                        id="menu"
                        className={`md:hidden md:items-center md:space-x-8 absolute md:static top-full left-0 w-full md:w-auto bg-blue-900 md:bg-transparent p-4 md:p-0 z-50 transition-all duration-300 ease-in-out transform md:translate-y-0  ${
                            menuOpen
                                ? "opacity-100 pointer-events-auto translate-y-0"
                                : "opacity-0 pointer-events-none -translate-y-2"
                        }`}
                    >
                        <Link
                            href="/"
                            className="block py-2 md:py-0 hover:text-blue-300 font-semibold"
                            onClick={() => setMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/home/about"
                            className="block py-2 md:py-0 hover:text-blue-300 font-semibold"
                            onClick={() => setMenuOpen(false)}
                        >
                            About
                        </Link>
                        <Link
                            href="/home/university"
                            className="block py-2 md:py-0 hover:text-blue-300 font-semibold"
                            onClick={() => setMenuOpen(false)}
                        >
                            Universities
                        </Link>
                        {
                            isAuthenticated ? <button className="font-bold" onClick={async () => {

                                const {flag} = await userLogout();
                                if (flag) {
                                    dispatch({type: "SET_AUTHENTICATED", payload: false});
                                    router.push("/");
                                }
                            }}>Log out</button> :  <Link
                                href="/auth/login"
                                className="block py-2 md:py-0 hover:text-blue-300 font-semibold"
                            >
                                Log in
                            </Link>
                        }
                    </div>
                }
                <div
                    id="menu"
                    className={`hidden md:flex md:items-center md:space-x-8 absolute md:static top-full left-0 w-full md:w-auto bg-blue-900 md:bg-transparent p-4 md:p-0 z-50 transition-all duration-300 ease-in-out transform md:translate-y-0`}
                >
                    <Link
                        href="/"
                        className="block py-2 md:py-0 hover:text-blue-300 font-semibold"
                        onClick={() => setMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        href="/home/about"
                        className="block py-2 md:py-0 hover:text-blue-300 font-semibold"
                        onClick={() => setMenuOpen(false)}
                    >
                        About
                    </Link>
                    <Link
                        href="/home/university"
                        className="block py-2 md:py-0 hover:text-blue-300 font-semibold"
                        onClick={() => setMenuOpen(false)}
                    >
                       Universities
                    </Link>
                    {
                        isAuthenticated ? <button className="font-bold" onClick={async () => {

                            const {flag} = await userLogout();
                            if (flag) {
                                dispatch({type: "SET_AUTHENTICATED", payload: false});
                                router.push("/");
                            }
                        }}>Log out</button> :  <Link
                            href="/auth/login"
                            className="block py-2 md:py-0 hover:text-blue-300 font-semibold"
                        >
                            Log in
                        </Link>
                    }
                </div>
            </div>
        </nav>
    );
}