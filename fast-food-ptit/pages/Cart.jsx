import React, { useState } from "react";


import { CiCircleMinus } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";

import { useNavigate } from "react-router-dom"; // Cập nhật import


const Cart = () => {
    const navigate = useNavigate();
    const [cart,setCart] = useState(JSON.parse(localStorage.getItem('cart') || '[]'));

    const getTongDonHang = () => {
        let totalAmount = 0
        cart.map((item) => totalAmount += (item.quantity*item.price) )
        return totalAmount
    }

    const HandleThanhToan = () => {
        navigate('/ordersuccess', { state: { orderId: '7187267562' } }); // Cập nhật với navigate()
    }
    

    const handleIncreaseQuantity = (id_item) => {
        setCart((prevCart) => {
            const updatedcart =  [...prevCart];

            const itemChange = updatedcart.find((item) => item.id == id_item);
            
            if(itemChange){
                itemChange.quantity += 1
            }

            return updatedcart;

            
        })
    }

    const handleDecreaseQuantity = (id_item) => {
        setCart((prevCart) => {
            const updatedcart =  [...prevCart];

            const itemChange = updatedcart.find((item) => item.id == id_item);

            
        })
    }



    return(

        <>  

            <div className="flex p-20 gap-10 items-center justify-center">
                <div className="flex flex-col gap-5">
                    <h1 className="mb-5 font-bold text-3xl">GIỎ HÀNG CỦA TÔI</h1>

                    {cart.length ? (cart.map((product) => (
                            <>
                                <div key={product.id} className="flex border justify-between p-3 rounded-2xl gap-40">

                                    {/* Display Image and name */}

                                    <div className="flex gap-5">

                                        <img className="w-30 h-30" src={product.imageUrl} alt={product.name} />
                                        {/* display name and button delete */}
                                        <div className="flex flex-col gap-5">
                                            <p className="text-md font-bold">{product.name}</p>
                                            <button className="flex underline font-bold text-sm hover:cursor-pointer">Xóa</button>
                                        </div>
                                       
                                    </div>

                                    {/* display price button add minus */}

                                    <div className="flex justify-between items-center gap-3">

                                        <button className="hover:cursor-pointer"><CiCircleMinus className="text-3xl"></CiCircleMinus></button>

                                        <p>{product.quantity}</p>

                                        <button onClick={() => handleIncreaseQuantity(product.id)} className="hover:cursor-pointer"><IoIosAddCircleOutline className="text-3xl"></IoIosAddCircleOutline></button>

                                        <p>{(product.price*product.quantity).toLocaleString("VN")}đ</p>
                                    </div>

                                </div>
                            </>

                        ))) : (
                            <>
                                <p>Bạn chưa thêm sản phẩm nào</p>
                            </>
                        )}
                </div>

                {/* display thanh toan */}

                <div className="bg-white shadow-lg rounded-lg p-5">
                    <div className="text-xl font-semibold mb-4">TỔNG SỐ MÓN: {cart.length}</div>
                    <div className="mb-4">
                        <label htmlFor="discount-code" className="block text-sm font-medium text-gray-700">Bạn có Mã giảm giá?</label>
                        <div className="flex items-center mt-2">
                            <input
                                type="text"
                                id="discount-code"
                                className="border border-gray-300 rounded-lg p-2 w-full"
                             
                                placeholder="Mã giảm giá"
                            />
                            <button
                              
                                className="ml-2 bg-blue-600 text-white rounded-lg px-4 py-2 text-sm w-30 hover:cursor-pointer"
                            >
                                Áp dụng
                            </button>
                        </div>
                    </div>
                    
                    <label className="text-sm font-medium" htmlFor="diachigiaohang">Địa Chỉ Giao Hàng</label>
                    
                    <input className="mb-4 border-b w-full p-3" type="text"
                        placeholder="Nhập địa chỉ giao hàng"
                        id="diachigiaohang"

                    />
                     <div className="flex justify-between text-sm mb-2">
                        <span className="font-bold">Phương thức thanh toán: Tiền mặt</span>
                      
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                        <span>Tổng đơn hàng</span>
                        <span>{getTongDonHang().toLocaleString("VN")}đ</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                        
                      
                    </div>
                    <div className="flex justify-between text-lg font-semibold mb-4">
                        <span>Tổng thanh toán</span>
                        <span>{getTongDonHang().toLocaleString("VN")}</span>
                    </div>

                    <button onClick={HandleThanhToan} className="w-full bg-red-600 text-white py-2 rounded-lg text-lg hover:cursor-pointer">
                        Đặt Hàng
                    </button>
                </div>
            </div>
        </>
    )
}


export default Cart;