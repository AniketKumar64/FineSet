import { ShieldCheck, Truck, Headphones, Tag } from "lucide-react";

export default function Features() {
  return (
    <section className="bg-white/90 py-8 border-b border-gray-100">
      <div className="px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Safe Transaction */}
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-7 h-7 text-gray-950" />
            <div>
              <h4 className="font-semibold text-black">Safe Transaction</h4>
              <p className="text-sm text-gray-500">Secure checkout process</p>
            </div>
          </div>

          {/* Secure Delivery */}
          <div className="flex items-center space-x-3">
            <Truck className="w-7 h-7 text-gray-950" />
            <div>
              <h4 className="font-semibold text-black">Secure Delivery</h4>
              <p className="text-sm text-gray-500">Fast and reliable shipping</p>
            </div>
          </div>

          {/* Exclusive Help */}
          <div className="flex items-center space-x-3">
            <Headphones className="w-7 h-7 text-gray-950" />
            <div>
              <h4 className="font-semibold text-black">Exclusive Help</h4>
              <p className="text-sm text-gray-500">24/7 customer support</p>
            </div>
          </div>

          {/* Affordable Price */}
          <div className="flex items-center space-x-3">
            <Tag className="w-7 h-7 text-gray-950" />
            <div>
              <h4 className="font-semibold text-black">Affordable Price</h4>
              <p className="text-sm text-gray-500">Best value for money</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
