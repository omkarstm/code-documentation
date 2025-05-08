import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../ui/Logo";
import ButtonLink from "../ui/ButtonLinks";
import useAuthStore from "../../store/authStore";

const Header: React.FC = () => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { user, logout } = useAuthStore();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="w-screen py-5 bg-white border-b border-gray-200">
            <div className="custome-container">
                <div className="flex items-center justify-between text-sm">
                    <Logo />
                    <nav>
                        <ul className="flex justify-center space-x-8">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        isActive ? "text-blue-500 " : "text-gray-700 hover:text-blue-500"
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard"
                                    className={({ isActive }) =>
                                        isActive ? "text-blue-500 " : "text-gray-700 hover:text-blue-500"
                                    }
                                >
                                    Dashboard
                                </NavLink>
                            </li>
                            <li>
                            <NavLink
                                    to="/contact"
                                    className={({ isActive }) =>
                                        isActive ? "text-blue-500 " : "text-gray-700 hover:text-blue-500"
                                    }
                                >
                                    Contact
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                    {user ? (
                        <div className="relative" ref={dropdownRef}>
                            <div
                                className="h-[50px] w-[50px] rounded-full bg-gray-200 flex items-center justify-center text-[20px] cursor-pointer"
                                onClick={() => setOpen((prev) => !prev)}
                            >
                                {user.fullName.charAt(0)}
                            </div>
                            {open && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 py-2">
                                    <a
                                        href="/#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {user.fullName}
                                    </a>
                                    <NavLink
                                        to="/dashboard"
                                        className={({ isActive }) =>
                                            isActive ? "block px-4 py-2 text-sm text-blue-500 font-bold" : "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        }
                                    >
                                        Dashboard
                                    </NavLink>
                                    <button
                                        onClick={logout}
                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <ButtonLink href="/login">Login</ButtonLink>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
