import React from "react";

import Navbar from "../components/navbar";
import SideBar from "../components/Sidebar";
import { useState } from "react";
import CustomerManager from "../pages/CustomerManager";
const App = () => {


    return (


        <>
            <div className="flex h-screen relative">
                <SideBar></SideBar>
                <div className="flex-1 md:ml-72 ml-16">
                    <Navbar></Navbar>
                    <CustomerManager></CustomerManager>

                </div>

            </div>

            
        </>
    )
}


export default App;