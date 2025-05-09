import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CustomerManager = () => {
    
    const [customerdata,setcustomerdata] = useState([]);
    const [isaddpopup, setisaddpopupopen] = useState(false);
    const [iseditpopup, setiseditpopupopen] = useState(false);


    const [customerid, setcustomerid] = useState("");
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    //getlistCustomer
    const getlistCustomer = async () => {
        const response = await fetch("http://localhost:8080/api/customers");
        const data = await response.json()
        setcustomerdata(data)   
    }
    useEffect(() =>{
        getlistCustomer()
        console.log(customerdata)
    },[])


    //addcustomer
    const addCustomer = async () => {

        const data = {
            "fullname":fullname,
            "email" :email,
            "phone":phone,
            "address":address,
            "password":password
        }

        const response = await fetch("http://localhost:8080/api/customers",{
            method :"POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(data)
        })


        setisaddpopupopen(false);

        if(response.status == 201){
            toast.success('Thêm khách hàng thành công', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              });
        }

        else{
            toast.error('Thêm khách hàng không thành công', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              });
        }
        
        setAddress("");
        setEmail("");
        setFullname("");
        setPassword("")
        setPhone("")        
        
    }

    const handleedit = (customerdataedit) =>{
        setcustomerid(customerdataedit.customer_id)
        setAddress(customerdataedit.address);
        setEmail(customerdataedit.email);
        setFullname(customerdataedit.fullname);
        setPassword(customerdataedit.password)
        setPhone(customerdataedit.phone)
        setiseditpopupopen(true)
    }

    //editCustomer

    const editCustomer = async () => {
        const data = {
            "fullname":fullname,
            "email" :email,
            "phone":phone,
            "address":address,
            "password":password
        }

        const response = await fetch(`http://localhost:8080/api/customers/${customerid}`,{
            method :"PUT",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(data)
        })


        setiseditpopupopen(false);

        if(response.status == 200){
            toast.success('Cập nhật thành công', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              });
        }

        else{
            toast.error('Cập nhật không thành công', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              });
        }
        setcustomerid("")
        setAddress("");
        setEmail("");
        setFullname("");
        setPassword("")
        setPhone("")   
    }

    

    //deleteCustomer
    const deleteCustomer  =async(idcustomer) => {
        const response = await fetch(`http://localhost:8080/api/customers/${idcustomer}`,{
            method :"DELETE",
        })



        if(response.status == 200){
            toast.success(`Xóa thành công ID Khách hàng ${idcustomer}`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              });
        }

        else{
            toast.error('Xóa không thành công', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              });
        }

        getlistCustomer()
    }
    

    return (
        <>  


            <div className="p-15 flex flex-col gap-3">
                <div className="flex justify-between gap-3">
                    <button onClick={() => setisaddpopupopen(true)} className="p-2 bg-green-500 text-sm  text-white rounded-md hover:cursor-pointer">Thêm Khách Hàng</button>
                    <button className="p-2 bg-blue-500 text-sm  text-white rounded-md hover:cursor-pointer">Cập nhật dữ liệu bảng</button>
                </div>
                
                <div className="overflow-x-auto max-h-[700px]">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center sticky top-0 z-10">
                            <tr>
                                <th scope="col" className="px-6 py-3">ID</th>
                                <th scope="col" className="px-6 py-3">Tên khách hàng</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Số điện thoại</th>
                                <th scope="col" className="px-6 py-3">Địa chỉ</th>
                                <th scope="col" className="px-6 py-3">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customerdata.map((customer) => (
                                <tr key={customer.customer_id} className="bg-white border-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center text-sm">
                                    <td className="px-6 py-4">{customer.customer_id}</td>
                                    <td className="px-6 py-4">{customer.fullname}</td>
                                    <td className="px-6 py-4">{customer.email}</td>
                                    <td className="px-6 py-4">{customer.phone}</td>
                                    <td className="px-6 py-4">{customer.address}</td>
                                    <td>
                                        <div className="flex justify-center gap-1">
                                            <button onClick={() => handleedit(customer)} className="p-2 bg-blue-500 text-white rounded-md hover:cursor-pointer">Edit</button>
                                            <button onClick={() => deleteCustomer(customer.customer_id)} className="p-2 bg-red-500 text-white rounded-md hover:cursor-pointer">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>

            {isaddpopup && (
                <div className="fixed inset-0  bg-gray-50/60  z-99 flex justify-center items-center" >
                    <div className="w-100 h-fit bg-white rounded-md border-1 flex flex-col p-10 gap-1">
                            <p className="text-2xl mb-3">Thêm Khách Hàng</p>
                            <label htmlFor="fullname">Họ và Tên</label>
                            <input id="fullname" type="text" placeholder="" className="w-full p-2 border-black border-2 rounded-md" value={fullname} onChange={(e) => setFullname(e.target.value)} />
                            <label htmlFor="email">Email</label>
                            <input id="email" type="text" placeholder="" className="w-full p-2 border-black border-2 rounded-md" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <label htmlFor="address">Địa Chỉ</label>
                            <input id="address" type="text" placeholder="" className="w-full p-2 border-black border-2 rounded-md" value={address} onChange={(e) => setAddress(e.target.value)} />
                            <label htmlFor="phone">Số điện thoại</label>
                            <input id="phone" type="text" placeholder="" className="w-full p-2 border-black border-2 rounded-md" value={phone} onChange={(e) => setPhone(e.target.value)} /> 
                            <label htmlFor="passworduser">Mật Khẩu</label>
                            <input id="passworduser" type="text" placeholder="" className="w-full p-2 border-black border-2 rounded-md" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <div className="flex justify-end gap-3 mt-3">
                                <button onClick={() => setisaddpopupopen(false)} className="p-2 text-white bg-red-500 rounded-md hover:cursor-pointer">Hủy</button>
                                <button onClick={() => addCustomer()} className="p-2 text-white bg-green-500 rounded-md hover:cursor-pointer">Thêm</button>
                            </div>
                    </div>
                </div>
            )}

            {iseditpopup && (
                <div className="fixed inset-0  bg-gray-50/60  z-99 flex justify-center items-center" >
                    <div className="w-100 h-fit bg-white rounded-md border-1 flex flex-col p-10 gap-1">
                            <p className="text-2xl mb-3">Chỉnh sửa Khách Hàng</p>
                            <label htmlFor="fullname">ID Khách hàng</label>
                            <input id="fullname" type="text" placeholder="" className="w-full p-2 border-black border-2 rounded-md bg-gray-200" value={customerid} disabled />
                            <label htmlFor="fullname">Họ và Tên</label>
                            <input id="fullname" type="text" placeholder="" className="w-full p-2 border-black border-2 rounded-md" value={fullname} onChange={(e) => setFullname(e.target.value)} />
                            <label htmlFor="email">Email</label>
                            <input id="email" type="text" placeholder="" className="w-full p-2 border-black border-2 rounded-md" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <label htmlFor="address">Địa Chỉ</label>
                            <input id="address" type="text" placeholder="" className="w-full p-2 border-black border-2 rounded-md" value={address} onChange={(e) => setAddress(e.target.value)} />
                            <label htmlFor="phone">Số điện thoại</label>
                            <input id="phone" type="text" placeholder="" className="w-full p-2 border-black border-2 rounded-md" value={phone} onChange={(e) => setPhone(e.target.value)} /> 
                            <label htmlFor="passworduser">Mật Khẩu</label>
                            <input id="passworduser" type="text" placeholder="" className="w-full p-2 border-black border-2 rounded-md" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <div className="flex justify-end gap-3 mt-3">
                                <button onClick={() => setiseditpopupopen(false)} className="p-2 text-white bg-red-500 rounded-md hover:cursor-pointer">Hủy</button>
                                <button onClick={() => editCustomer()} className="p-2 text-white bg-green-500 rounded-md hover:cursor-pointer">Lưu</button>
                            </div>
                    </div>
                </div>
            )}
            <ToastContainer />
            </>
    );
};

export default CustomerManager;
