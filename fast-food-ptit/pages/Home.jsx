import React, { useEffect, useState } from "react";

import { CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router-dom";




const Home = () => {

    const user = JSON.parse(localStorage.getItem("user"));

    
    const [productdata,setproductdata] = useState([])
    const getlistProduct = async() => {
        const response = await fetch("http://localhost:8082/api/products")

        const data = await response.json();
        setproductdata(data)
    }

    useEffect(() => {
        getlistProduct()
    },[])


    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart') || '[]'));
    
    const [message,setMessage] = useState('');

    
    
    const handleAddToCart = (product) => {
        setCart(preCart => {
            const udpatedcart = [...preCart];

            const existingproduct = udpatedcart.find((item) => item.product_id == product.product_id);
            if(existingproduct){

                existingproduct.quantity += 1;
            }
            else{
              udpatedcart.push({...product,quantity : 1});
            }
            setMessage(`${product.name} đã được thêm vào giỏ hàng!`);

            return udpatedcart;
        })
    };

    useEffect(() => {
      
      localStorage.setItem('cart',JSON.stringify(cart));
    },[cart])
    

   

    



    return (
        <>
            <div className="flex flex-col p-20 mt-5">
                <h1 className="mb-5 font-bold text-5xl">DANH SÁCH ĐỒ ĂN NHANH</h1>
                {message && (<>
                  <p className="text-green-500 text-md mb-5">{message}</p>

                  
                </>)}
               

               {/* display san pham */}

               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {productdata.map((product) => (
                        <>
                            <div key={product.product_id} className="flex flex-col p-4 shadow:md border gap-5 rounded-2xl">
                                <img src={product.img_url} alt="" />

                                {/* display name and price */}

                                <div className="flex justify-between items-center">
                                    <p className="text-sm font-bold">{product.name}</p>
                                    <p className="text-sm font-bold">{product.price.toLocaleString("VN")} VND</p>
                                </div>

                                {/* Display description */}

                                <p className="text-sm flex-grow">{product.description}</p> {/* Added flex-grow here */}

                                {/* Button thêm vào giỏ */}
                                <div className="flex justify-center items-center">
                                    <button onClick={() => handleAddToCart(product)} className="w-30 h-10 text-md text-white bg-red-500 rounded-md hover:cursor-pointer hover:scale-110 transition duration-300">
                                    Thêm vào giỏ
                                    </button>
                                </div>
                                
                            </div>
                        </>
                    ))}

               </div>
            </div>
        </>
    )
}   

export default Home;