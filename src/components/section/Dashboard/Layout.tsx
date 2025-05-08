import React from "react";
import { FaPlus, FaFolderOpen, FaUserCircle } from "react-icons/fa";
import Logo from "../../ui/Logo";
import useAuthStore from "../../../store/authStore";
import { Link } from "react-router-dom";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { user } = useAuthStore();
    return (
        <div className="flex p-3">
            {/* Sidebar */}

            <aside className="w-64 bg-white border-1 border-gray-200 h-[98vh] flex flex-col justify-between sticky top-3 bottom-0 rounded-lg ">
                {/* Top Section */}
                <div>
                    <div className="w-full h-16 flex items-center justify-center border-b-1 border-gray-200">
                        <Logo />
                    </div>
                    <nav className="px-4">
                        <ul className="space-y-4 mt-6 text-gray-700">
                            <li>
                                <Link
                                    to="/dashboard/new"
                                    className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md"
                                >
                                    <FaPlus />
                                    New Project
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/dashboard/all"
                                    className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md"
                                >
                                    <FaFolderOpen />
                                    All Projects
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                {/* Bottom Profile Section */}
                <div className="p-4 border-t-1 border-gray-200 flex items-center gap-3">
                    <FaUserCircle size={32} className="text-gray-200" />
                    <div>
                        <p className="text-sm font-medium">{user?.fullName}</p>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 px-6 overflow-scroll">
                {children}
            </main>
        </div>
    );
};

export default Layout;
