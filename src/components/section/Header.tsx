import React from "react";
import Logo from "../ui/Logo";
import ButtonLink from "../ui/ButtonLinks";


const Header: React.FC = () => (
    <header className="header w-screen py-5 bg-white  border-b border-gray-200 ">

        <div className="custome-container">
            <div className="flex items-center justify-between text-sm">
                <Logo />
                <nav>
                    <ul className="flex justify-center space-x-18">
                        <li>
                            <a href="#home" className="text-gray-700 hover:text-blue-500">Home</a>
                        </li>
                        <li>
                            <a href="#about" className="text-gray-700 hover:text-blue-500">Dashboard</a>
                        </li>
                        <li>
                            <a href="#contact" className="text-gray-700 hover:text-blue-500">Contact</a>
                        </li>
                    </ul>
                </nav>
                <ButtonLink href="https://starbelly.com">Login</ButtonLink>
            </div>
        </div>
    </header>
);

export default Header;
