import React from 'react'
import { useContext } from 'react'
import { useSearchParams } from 'react-router-dom';
import { use } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { ShopContext } from '../context/ShopContext.jsx';

const Verify = () => {

    const { navigate , token , setCartItems , backendUrl } = useContext(ShopContext);

    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');


    const verifyPayment = async() => {
        try{
            if(!token){
                return null;
            }
            const response = await axios.post(backendUrl+'/api/v1/orders/verifystripe',{success,orderId},{headers:{token}});
            if(response.data.success){  
                setCartItems({});
                navigate('/user-orders');
            }
            else{
                navigate('/cart');
            }   

            toast.success("Payment verified successfully!");

             
    }
    catch(error){
        console.error(error);
       toast.error("Payment verification failed: " + error.message);
       navigate('/cart');
    }
}



        useEffect(() => {
            verifyPayment();
        }, [token]);
  return (
    <div>Verify</div>
  )
}

export default Verify