'use client'

import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";
import NavBarItem from "./navbarItem";
import MobileMenu from "./mobileMenu";
import { useCallback, useEffect, useState } from "react";
import AccountMenu from "./accountMenu";

const TOP_OFFSET = 66;

const NavBar = () => {

    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showBackground, setShowBackground] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > TOP_OFFSET) {
                setShowBackground(true)
            } else {
                setShowBackground(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current: boolean) => !current)
    }, [])


    const toggleAccountMenu = useCallback(() => {
        setShowAccountMenu((current: boolean) => !current)
    }, [])

    return (
        <nav className="w-full fixed z-40">
            <div className={`
                px-4
                md:px-16
                py-6
                flex
                flex-row
                items-center
                transition
                duration-500
                ${showBackground ? `bg-zinc-900/90` : ``}
            `}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="h-6 lg:h-8" src="/images/logo.png" alt="logo" />
                <div className="
                    flex-row ml-8 gap-7 hidden lg:flex
                ">

                    <NavBarItem label="Home" />
                    <NavBarItem label="Series" />
                    <NavBarItem label="Films" />
                    <NavBarItem label="New 6 Popular" />
                    <NavBarItem label="My List" />
                    <NavBarItem label="Browse by language" />
                </div>

                <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                    <p className="text-white text-sm">Browse</p>
                    <BsChevronDown className={`text-white transition ${showMobileMenu ? 'rotate-180' : ''}`} />
                    <MobileMenu visible={showMobileMenu} />
                </div>

                <div className="
                    flex
                    flex-row
                    ml-auto  
                    gap-7 
                    items-center
                ">
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsSearch />
                    </div>
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsBell />
                    </div>
                    <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
                        <div className="h-6 w-6 lg:h-10 lg:w-10 rounded-md overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/perfil.png" alt="" />
                        </div>
                        <BsChevronDown className={`text-white transition ${showAccountMenu ? 'rotate-180' : ''}`} />
                        <AccountMenu visible={showAccountMenu} />
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default NavBar;