import React, { useEffect, useState } from "react";

import { CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router-dom";
const productsData = [
    {
      id: 'SP001',
      name: 'Burger Bò Phô Mai',
      description: 'Burger bò kết hợp với phô mai béo ngậy',
      price: 45000,
      category: 'burger',
      imageUrl: 'https://static.kfcvietnam.com.vn/images/items/lg/Burger-Zinger.jpg?v=L7DYr4',
    },
    {
      id: 'SP002',
      name: 'Gà Rán Giòn Cay',
      description: 'Miếng gà rán giòn tan, vị cay nồng',
      price: 52000,
      category: 'gà rán',
      imageUrl: 'https://static.kfcvietnam.com.vn/images/items/lg/1-Fried-Chicken.jpg?v=L7DYr4',
    },
    {
      id: 'SP003',
      name: 'Pepsi Lon 330ml',
      description: 'Nước ngọt Pepsi giải khát sảng khoái',
      price: 12000,
      category: 'nước ngọt',
      imageUrl: 'https://static.kfcvietnam.com.vn/images/items/lg/PEPSI_CAN.jpg?v=L7DYr4',
    },
    {
      id: 'SP004',
      name: 'Mì Ý Bò Bằm',
      description: 'Sợi mì Ý mềm mịn cùng sốt bò bằm đậm đà',
      price: 60000,
      category: 'mì',
      imageUrl: 'https://static.kfcvietnam.com.vn/images/items/lg/MI-Y-GA-VIEN.jpg?v=L7DYr4',
    },
    {
      id: 'SP005',
      name: 'Cơm Gà Sốt Teriyaki',
      description: 'Cơm trắng dẻo ăn kèm gà sốt teriyaki thơm ngon',
      price: 55000,
      category: 'cơm',
      imageUrl: 'https://static.kfcvietnam.com.vn/images/items/lg/Rice-Teriyaki.jpg?v=3wbw1g',
    },
    {
      id: 'SP006',
      name: 'Burger Gà Giòn',
      description: 'Burger kẹp gà rán giòn và rau tươi',
      price: 47000,
      category: 'burger',
      imageUrl: 'https://static.kfcvietnam.com.vn/images/items/lg/Burger-Flava.jpg?v=3wbw1g',
    },
    {
      id: 'SP007',
      name: 'Nước Cam Ép',
      description: 'Nước cam tươi mát không đường hóa học',
      price: 18000,
      category: 'nước ngọt',
      imageUrl: 'https://static.kfcvietnam.com.vn/images/items/lg/7UP_CAN.jpg?v=3wbw1g',
    },

    {
      id: 'SP008',
      name: 'Salad Hạt',
      description: 'Salad Hạt',
      price: 39000,
      category: 'salad',
      imageUrl: 'https://static.kfcvietnam.com.vn/images/items/lg/SALAD-HAT.jpg?v=3wbw1g',
    },

    {
      id: 'SP009',
      name: 'Khoai Tây Chiên',
      description: 'Khoai tây Chiên',
      price: 20000,
      category: 'Khoai Tây',
      imageUrl: 'https://static.kfcvietnam.com.vn/images/items/lg/FF-L.jpg?v=3wbw1g',
    },

    {
      id: 'SP0010',
      name: 'Súp Rong Biển',
      description: 'Súp Rong Biển',
      price: 20000,
      category: 'Súp',
      imageUrl: 'https://static.kfcvietnam.com.vn/images/items/lg/Soup-Rong-Bien.jpg?v=3wbw1g',
    },
   
  ];



const Home = () => {


    const [searchTerm,setSearchTerm] = useState('');
    const [sortAsc,setSortAsc] = useState(true);
    
    //State lưu giỏ hàng
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart') || '[]'));
    
    const [message,setMessage] = useState('');
    // Mỗi khi cart thay đổi, lưu lại localStorage và phát sự kiện

    
    
    const handleAddToCart = (product) => {
        setCart(preCart => {
            const udpatedcart = [...preCart];

            const existingproduct = udpatedcart.find((item) => item.id == product.id);
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
    

   

    

    const filterProducts = productsData
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a,b) => (sortAsc ? a.price - b.price : b.price - a.price))

    return (
        <>
            <div className="flex flex-col p-20 mt-5">
                <h1 className="mb-5 font-bold text-5xl">DANH SÁCH ĐỒ ĂN NHANH</h1>
                {message && (<>
                  <p className="text-green-500 text-md mb-5">{message}</p>

                  
                </>)}
                {/* Tim Kiem, Sap Xep */}

                <div className="flex items-center gap-10 mb-6">
                    {/* Tim Kiem */}
                    <input type="text" 
                    placeholder="Tìm kiếm sản phẩm...."
                    className="border p-2 rounded-md w-100"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {/* Sap xep san pham */}

                    <button onClick={() => setSortAsc(!sortAsc)} className="p-2 text-white text-md bg-black rounded-md"
                        
                        >Sắp Xếp Theo: {sortAsc ? 'Tăng Dần' : 'Giảm Dần'}</button>

                </div>
               

               {/* display san pham */}

               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {filterProducts.map((product) => (
                        <>
                            <div key={product.id} className="flex flex-col p-4 shadow:md border gap-5 rounded-2xl">
                                <img src={product.imageUrl} alt="" />

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