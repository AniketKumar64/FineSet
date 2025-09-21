import { ArrowRight, ShoppingCart } from "lucide-react";

export default function FeaturedProducts() {
  const products = [
    {
      id: 1,
      name: "Black Hoodie",
      image:
        "https://tse1.mm.bing.net/th/id/OIP.r3Ml7jn3nsCq0ni9swM-2gHaHa?rs=1&pid=ImgDetMain&o=7&rm=3", // replace with your hoodie img
      primary: true,
    },
    {
      id: 2,
      name: "Elite Backpack",
      image:
        "https://cdn.pixabay.com/photo/2016/11/29/03/15/adult-1866533_960_720.jpg", // replace
    },
    {
      id: 3,
      name: "Elite Polo T-Shirts",
      image:
        "https://cdn.pixabay.com/photo/2015/03/26/09/54/polo-shirt-690330_960_720.jpg", // replace
    },
    {
      id: 4,
      name: "Premium Belt",
      image:
        "https://cdn.pixabay.com/photo/2017/08/10/00/18/fashion-2618997_960_720.jpg", // replace
    },
    {
      id: 5,
      name: "Elite Cap",
      image:
        "https://cdn.pixabay.com/photo/2017/08/06/02/36/baseball-cap-2585679_960_720.jpg", // replace
    },
  ];

  return (
    <section className="bg-black text-white py-12 px-6 md:px-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-bold">Featured Products</h2>
        <a
          href="/shop"
          className="flex items-center space-x-2 rounded-full bg-white text-black px-5 py-2 font-medium hover:bg-gray-200 transition"
        >
          <span>Explore All</span>
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className={`relative rounded-2xl overflow-hidden bg-neutral-900 group ${
              product.primary ? "md:col-span-2 md:row-span-2" : ""
            }`}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-300"></div>

            {/* Product Name & CTA */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="text-lg font-semibold">{product.name}</span>
              {product.primary ? (
                <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition">
                  <ShoppingCart className="h-5 w-5 text-white" />
                </button>
              ) : (
                <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition">
                  <ArrowRight className="h-5 w-5 text-white" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
