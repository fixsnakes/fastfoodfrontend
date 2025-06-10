import React from "react";
import { useLocation } from "react-router-dom";

const OrderSuccess = () => {
    const location = useLocation();
    const { orderId } = location.state || {}; // Nhận mã đơn hàng từ state

    return (
        

        <div className="flex mt-8 justify-center items-center">
             <div className="max-w-lg mx-auto p-5 text-center ">
                <h1 className="text-3xl font-bold mb-4">Đặt hàng thành công!</h1>
                <p className="text-lg mb-4">Mã đơn hàng của bạn là: <span className="font-bold">#{orderId}</span></p>
                <p>Cảm ơn bạn đã mua sắm tại cửa hàng chúng tôi. Đơn hàng của bạn sẽ được xử lý trong thời gian sớm nhất.</p>
            </div>
        </div>
        
       
    );
};

export default OrderSuccess;
