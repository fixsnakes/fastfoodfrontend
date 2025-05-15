import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { IoFastFoodOutline } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    console.log(user)

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("cart")
        window.location.href = '/login'
    };


    return (
        <div className="flex justify-between p-10 items-center bg-white shadow-md h-20">
            {/* Title của website */}
            <div className="flex justify-between items-center gap-5">
                <IoFastFoodOutline className="w-15 h-15"></IoFastFoodOutline>
                <Link to="/home" className="text-2xl font-bold">ONLINE FAST FOOD</Link>
            </div>
           

            {/* Link đăng nhập, Đăng ký */}
            {!user ? (
                <div className="flex justify-between gap-2 items-center">
                    <Link to="/login" className="text-1xl hover:scale-110 transform transition-transform duration-300 ease-in-out">Đăng Nhập</Link>
                    <Link to="/register" className="text-1xl hover:scale-110 transform transition-transform duration-300 ease-in-out">Đăng Ký</Link>
                </div>
            ) : (
                <div className="flex justify-between gap-2 items-center">
                    <CiUser className="w-7 h-7" />
                    <Link to="/cart"><CiShoppingCart className="w-7 h-7"></CiShoppingCart></Link>
                   
                
                    <p>{user.phone}</p>
                    <button onClick={handleLogout} className="p-2 text-sm text-white bg-black rounded-md hover:scale-110 hover:cursor-pointer">Đăng Xuất</button>
                </div>
            )}
        </div>
    );
};

export default Navbar;
