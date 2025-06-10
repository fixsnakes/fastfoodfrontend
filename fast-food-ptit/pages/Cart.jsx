import React, { useState, useEffect } from "react";
import { CiCircleMinus } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart") || "[]"));
    
    const [error, setError] = useState(""); 
    const [selectedPartner, setSelectedPartner] = useState(null); 
    const [shippingAddress, setShippingAddress] = useState(""); 
    const [voucher,setVoucher] = useState("")
    const [voucherdata,setvoucherdata] = useState("")
    const [tongthanhtoan,setTongthanhtoan]  = useState("")
    const [giamgia,setGiamgia] = useState("")
    const [voucherdetail,setvoucherdetail] = useState(false)

    

    const getTongDonHang = () => {
        let totalAmount = 0;
        cart.map((item) => (totalAmount += item.quantity * item.price));
        
        return totalAmount;
    };

    const getGiamgia = () =>{
        if(voucherdata != ""){
           return getTongDonHang() * (voucherdata.discount / 100);
        }

        return 0;

        
    }

    const getTongThanhToan = () => {
        return getTongDonHang() - getGiamgia()

    }

    const handleApplyVoucher = async () => {
        const response = await fetch(`http://localhost:8084/api/voucher`,{
            method : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"code": voucher}),
        });
        if (response.ok) {
            const data = await response.json();
           
            setvoucherdata(data)
            setvoucherdetail("Áp Dụng Thành Công " +  data.code)
           
        } else {
            setvoucherdata("")
            setvoucherdetail("Không tìm thấy mã giảm giá")
        }
    };


    const HandleThanhToan = async () => {
        const orderDetails = cart.map((item) => ({
            product_id: item.product_id,
            price: item.price * item.quantity,
            quantity: item.quantity,
        }));

        const orderData = {
            customer_id: user.customer_id, 
            order_type: "ONLINE",
            total_amount : getTongThanhToan(),
            voucher_id: voucherdata != "" ? voucherdata.voucher_id : null, 
            shipping_address: shippingAddress,
            orderDetails: orderDetails,
        };

        try {
            const response = await fetch("http://localhost:8083/api/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                const data = await response.json();

                const paymentData = {
                    order_id : data.order_id,
                    payment_method : "CASH",
                    amount : getTongThanhToan()
                }
                
                const processPayment = await fetch("http://localhost:8085/api/payment/process",{
                    method : "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(paymentData),
                })

                if (processPayment.ok){
                    navigate("/ordersuccess", { state: { orderId: data.order_id } });
                }

                else{
                    setError("Có lỗi xảy ra khi xử lý thanh toán.");
                }

                
            } else {
                setError("Có lỗi xảy ra khi tạo đơn hàng.");
            }
        } catch (error) {
            setError("Lỗi kết nối: " + error.message);
        }
    };

    // Tăng 
    const handleIncreaseQuantity = (id_item) => {
        setCart((prevCart) => {
            const updatedCart = [...prevCart];
            const itemChange = updatedCart.find((item) => item.product_id === id_item);
            if (itemChange) {
                itemChange.quantity += 1;
            }
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    // Giảm 
    const handleDecreaseQuantity = (id_item) => {
        setCart((prevCart) => {
            const updatedCart = [...prevCart];
            const itemChange = updatedCart.find((item) => item.product_id === id_item);
            if (itemChange && itemChange.quantity > 1) {
                itemChange.quantity -= 1;
            }
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart;
        });
    };


    // Xóa
    const handleDeleteItem = (id_item) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.filter((item) => id_item !== item.product_id);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart;
            
        })
    }

    return (
        <>
            <div className="flex p-20 gap-10 items-center justify-center">
                <div className="flex flex-col gap-5">
                    <h1 className="mb-5 font-bold text-3xl">GIỎ HÀNG CỦA TÔI</h1>

                    {cart.length ? (
                        cart.map((product) => (
                            <div key={product.product_id} className="flex border justify-between p-3 rounded-2xl gap-40">
                                {/* Display Image and name */}
                                <div className="flex gap-5">
                                    <img className="w-30 h-30" src={product.img_url} alt={product.name} />
                                    <div className="flex flex-col gap-5">
                                        <p className="text-md font-bold">{product.name}</p>
                                        <button onClick={() => handleDeleteItem(product.product_id)} className="flex underline font-bold text-sm hover:cursor-pointer">Xóa</button>
                                    </div>
                                </div>

                                {/* Display price button add minus */}
                                <div className="flex justify-between items-center gap-3">
                                    <button className="hover:cursor-pointer" onClick={() => handleDecreaseQuantity(product.product_id)}>
                                        <CiCircleMinus className="text-3xl" />
                                    </button>
                                    <p>{product.quantity}</p>
                                    <button
                                        className="hover:cursor-pointer"
                                        onClick={() => handleIncreaseQuantity(product.product_id)}
                                    >
                                        <IoIosAddCircleOutline className="text-3xl" />
                                    </button>
                                    <p>{(product.price * product.quantity).toLocaleString("VN")}đ</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Bạn chưa thêm sản phẩm nào</p>
                    )}
                </div>

                {/* Display thanh toan */}
                <div className="bg-white shadow-lg rounded-lg p-5">
                    <div className="text-xl font-semibold mb-4">TỔNG SỐ MÓN: {cart.length}</div>

                    <div className="mb-4">
                        <label htmlFor="discount-code" className="block text-sm font-medium text-gray-700">Bạn có Mã giảm giá?</label>
                        <div className="flex items-center mt-2">
                            <input
                                type="text"
                                id="discount-code"
                                className="border border-gray-300 rounded-lg p-2 w-full"
                                value={voucher}
                                onChange={(e) => setVoucher(e.target.value)}
                                placeholder="Mã giảm giá"
                            />
                            <button
                                className="ml-2 bg-blue-600 text-white rounded-lg px-4 py-2 text-sm w-30 hover:cursor-pointer"
                                onClick={handleApplyVoucher}
                            >
                                Áp dụng
                            </button>
                        </div>

                        {voucherdetail && (
                            <>
                                <p className=" mt-3 text-black text-sm font-semibold">{voucherdetail}</p>
                            </>
                        )}
                    </div>

                    

                    <label className="text-sm font-medium" htmlFor="diachigiaohang">Địa Chỉ Giao Hàng</label>
                    <input
                        className="mb-4 border border-gray-300 rounded-lg p-2 w-full"
                        type="text"
                        placeholder="Nhập địa chỉ giao hàng"
                        id="diachigiaohang"
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                    />

                    <div className="flex justify-between text-sm mb-2">
                        <span className="font-bold">Phương thức thanh toán: Tiền mặt</span>
                    </div>

                    <div className="flex justify-between text-sm mb-2">
                        <span>Tổng đơn hàng</span>
                        <span>{getTongDonHang().toLocaleString("VN")}đ</span>
                    </div>

                    <div className="flex justify-between text-sm mb-2">
                        <span>Giảm giá:</span>
                        <span>{getGiamgia().toLocaleString("VN")}đ</span>
                    </div>

                    <div className="flex justify-between text-lg font-semibold mb-4">
                        <span>Tổng thanh toán</span>
                        <span>{getTongThanhToan().toLocaleString("VN")}</span>
                    </div>


                    <button
                        onClick={HandleThanhToan}
                        className="w-full bg-red-600 text-white py-2 rounded-lg text-lg hover:cursor-pointer"
                    >
                        Đặt Hàng
                    </button>
                </div>
            </div>
        </>
    );
};

export default Cart;
