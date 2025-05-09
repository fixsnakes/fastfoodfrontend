import React, { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { FaHouseUser } from "react-icons/fa";






const randomNumber = () => {
    // Random number from 10-50
    return Math.round(Math.random()*(50-10)) + 10
}


const Navbar = () => {

    const [usersignin,setUsersignin] = useState("")
    const [buttonText,setButtontext] = useState("Sign Out")


    useEffect(() => {

            setUsersignin("Đào Tùng Lâm")
            setButtontext("Sign Out")
    
    },[])
    return (

        <>
            <div className="flex bg-[#F9FAFB] items-center justify-between border-b border-gray-300 px-4 py-4">
                <div className="flex gap-3 items-center justify-between">
                    <FaHouseUser className="h-7 w-7 text-color hover:scale-110 hover:cursor-pointer"></FaHouseUser>
                    <p>DashBoard</p>
                </div>
                <div className="flex items-center gap-2">
                    <CiUser className="h-5 w-5 text-black hover:scale-120 hover:cursor-pointer"></CiUser>
                    <p className="text-1xl text-black">{usersignin}</p>
                    <button className="w-25 border rounded-lg p-1 bg-black text-white shadow-md cursor-pointer hover:scale-110">{buttonText}</button>
                </div>
                
            </div>        
        </>
    )

    
}


export default Navbar;