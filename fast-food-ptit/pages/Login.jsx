import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [phonenumber, setPhonenumber] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Xử lý đăng nhập
    const HandleLogin = async (e) => {
        e.preventDefault();

        // Kiểm tra thông tin đăng nhập
        
        const response = await fetch("http://localhost:8081/api/customers/login", {
            method :"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "phone":phonenumber,
                "password" : password
            })
        })
        
        
        

        if (response.status == 200) {
            const data = await response.json()

            localStorage.setItem("user", JSON.stringify(data));

            window.location.href = "/home";
        } else {
            setError("Sai Tên Dăng Nhập Hoặc Mật Khẩu");
        }
    };

    return (
        <div className="h-screen flex justify-center mt-10">
            {/* Form đăng nhập */}
            <form onSubmit={HandleLogin}>
                <div className="flex flex-col w-100 shadow-2xl rounded-2xl p-5">
                    <h1 className="text-3xl font-bold mb-4 text-red-400">Đăng Nhập</h1>
                    {/* Phone number input */}
                    <div className="flex flex-col gap-2 mb-4">
                        <label htmlFor="phonenumber" className="text-md block font-medium">Số điện thoại</label>
                        <input
                            type="text"
                            id="phonenumber"
                            value={phonenumber}
                            onChange={(e) => setPhonenumber(e.target.value)}
                            className="border p-2 w-full rounded"
                            placeholder="Nhập số điện thoại"
                        />
                    </div>
                    {/* Password input */}
                    <div className="flex flex-col mb-4">
                        <label htmlFor="password" className="block text-md font-medium">Mật Khẩu</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border p-2 w-full rounded"
                            placeholder="Nhập mật khẩu"
                        />
                    </div>

                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <div className="flex justify-center">
                        <button
                            className="p-2 bg-green-500 w-50 rounded-md text-white hover:cursor-pointer hover:scale-110"
                            type="submit"
                        >
                            Đăng nhập
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
