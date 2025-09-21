import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductDetailsTabs from "../components/ProductDetail/ProductDetailsTabs";
import ProductMaindetail from "../components/ProductDetail/ProductMaindetail";
import RelatedProduct from "../components/ProductDetail/RelatedProduct";
import Footer from "../components/Common/Footer";
import { ShopContext } from "../context/ShopContext.jsx";

const ProductDetail = () => {
  const { productId } = useParams();
  const { products, currency, deliverytime, cartitems, addTOCart } = useContext(ShopContext);
  const [productdata, setproductdata] = useState(false);
  const [image, setimage] = useState("");
  const [size, setsize] = useState("");
  const navigate = useNavigate();

  const discountPercentage = 20;
  const price = productdata.price;

  const originalPrice = Math.round(price * (1 + discountPercentage / 100));

  const fetchProductsData = async () => {
    products.map((item) => {
      if (item._id == productId) {
        setproductdata(item);
        setimage(item.images[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductsData();
  }, [productId, products]);

  console.log(productdata);

  return productdata ? (
    <div className=" pt-10  md:px-8   min-h-screen">
      <div className=" max-w-7xl mx-auto  p-6  grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* left side product images */}
        <div className=" items-center flex flex-col md:flex-row gap-4">
          <div className=" h-full  hidden md:flex items-center justify-center flex-col gap-4">
            {productdata.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${productdata.name}-${index}`}
                className={`w-24 h-24 object-cover rounded-lg cursor-pointer border-2 transition-all duration-200 
      ${
        image === img
          ? " transition-all ease-in duration-200 border-white border-"
          : "opacity-100 border-transparent hover:border-gray-100"
      }`}
                onClick={() => setimage(img)}
              />
            ))}
          </div>
          <div className="w-full max-w-md h-[500px] flex items-center justify-center bg-white/5 rounded-xl overflow-hidden">
            <img
              src={image}
              alt={productdata.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* mobile view */}
          <div className=" md:hidden items-center justify-center flex-wrap  flex gap-1">
            {productdata.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${productdata.name}-${index}`}
                className=" w-16 h-20 object-cover rounded-lg cursor-pointer border-2 border-transparent hover:border-gray-500"
                onClick={() => setimage(img)}
              />
            ))}
          </div>
        </div>

        {/* right side product details */}
        <div className=" flex flex-col gap-4">
          <span className="capitalize text-xl text-white/50 font-semibold">
            {productdata.category}
          </span>
          <h2 className=" text-3xl font-bold font-[font1]">
            {productdata.name}
          </h2>
          <div className=" mt-5 flex items-center gap-2">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-[font1] font-semibold">
                {currency} {price}
              </span>

              <span className="text-gray-500 line-through">
                {currency} {originalPrice}
              </span>

              <span className="text-red-600 text-xs font-semibold uppercase px-2 py-1 border border-red-600 rounded-full tracking-wide">
                {discountPercentage}% OFF
              </span>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-md font-[font2] mb-2">Available Sizes</p>

            {productdata.sizes && productdata.sizes.length > 0 ? (
              <div className="flex gap-3">
                {productdata.sizes.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setsize(item)}
                    className={`px-4 py-2 border rounded-lg cursor-pointer transition ${
                      item === size
                        ? "bg-white text-black border-black"
                        : "bg-transparent text-white border-white hover:bg-white hover:text-black"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 opacity-0 text-sm">
                No sizes available
              </p>
            )}
          </div>
          <span>
            {productdata.stock > 0 ? (
              <span className="px-3 py-1 text-xs font-semibold text-green-600 border border-green-600 rounded">
                In Stock
              </span>
            ) : (
              <span className="px-3 py-1 text-xs font-semibold text-red-600 border border-red-600 rounded">
                Out of Stock
              </span>
            )}
          </span>

          <ProductDetailsTabs productdata={productdata} />

          <div className="flex flex-col md:flex-row pt-4 gap-4">
            <button
              onClick={() => addTOCart(productdata._id, size)}
              className="flex-1 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => addTOCart(productdata._id, size)}
              className="flex-1 px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

{/* some info and related products */}
<div className="mt-8">
<ProductMaindetail productdata={productdata} />


  </div>
  <RelatedProduct category={productdata.category} subcategory={productdata.subcategory} />
  
<Footer/>

    </div>
  ) : (
    <div className=" flex items-center justify-center h-screen text-2xl font-semibold font-[font1]">
      Loading...
    </div>
  );
};

export default ProductDetail;
