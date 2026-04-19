import React, { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { ShopContext } from '../context/ShopContext.jsx';
import { ShieldCheck, Loader2 } from 'lucide-react';

const Verify = () => {
    const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
    const [searchParams] = useSearchParams();
    
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const verifyPayment = async () => {
        try {
            if (!token) return null;

            const response = await axios.post(
                `${backendUrl}/api/v1/orders/verifystripe`,
                { success, orderId },
                { headers: { token } }
            );

            if (response.data.success) {
                setCartItems({});
                toast.success("Transaction Secured. Welcome to the House.");
                navigate('/user-orders');
            } else {
                toast.error("Transaction declined. Redirecting to bag...");
                navigate('/cart');
            }
        } catch (error) {
            console.error(error);
            toast.error("Verification encountered an error.");
            navigate('/cart');
        }
    };

    useEffect(() => {
        verifyPayment();
    }, [token]);

    return (
        <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center px-6">
            {/* Cinematic Background Glow */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#D4AF37]/10 blur-[120px] rounded-full"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
                {/* Luxury Loader */}
                <div className="relative mb-8">
                    <Loader2 className="text-[#D4AF37] animate-spin w-12 h-12 stroke-[1px]" />
                    <ShieldCheck className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/20 w-4 h-4" />
                </div>

                <span className="text-[#D4AF37] text-[10px] tracking-[0.6em] uppercase mb-4 block animate-pulse">
                    Authenticating
                </span>
                
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white tracking-tighter mb-4">
                    SECURING YOUR <span className="text-zinc-500 italic font-light">ACQUISITION</span>
                </h2>
                
                <p className="text-zinc-500 text-xs tracking-widest uppercase max-w-xs leading-relaxed">
                    Please do not refresh. We are finalizing your placement in our heritage archives.
                </p>
            </div>

            {/* Bottom Branding */}
            <div className="absolute bottom-12 text-[10px] tracking-[0.4em] text-zinc-700 uppercase">
                Fineset 1994 — Global Security Protocol
            </div>
        </div>
    );
};

export default Verify;