'use client'

import { signOut } from "next-auth/react";

const ButtonSignOut = () => {
    return (
        <button className="py-4 bg-red-800 px-7 cursor-pointer rounded-md" onClick={() => signOut()}>Logout</button>
    )
} 

export default ButtonSignOut;