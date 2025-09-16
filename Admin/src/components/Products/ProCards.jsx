import React, { useState } from "react";

const ProCards = ({ product }) => {
  const [mainImage, setMainImage] = useState(product.images[0]);

  return (
    <>
      <div className="border border-white/25 hover:border-white/50 flex flex-col justify-between  rounded-lg shadow-sm px-2 py-4  md:p-4 bg-[#171717] text-white/80">
        <div className="flex space-x-4">
          {/* Thumbnail */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-24 h-24 object-cover rounded"
          />

          {/* Product Details */}
          <div className="flex-1 ">
            <h3 className="text-lg font-semibold">{product.name}</h3>

            {product.bestseller && (
              <span className="text-sm text-white bg-blue-600 px-2 py-0.5 rounded">
                Bestseller
              </span>
            )}

            <p className="text-sm text-gray-700 mt-1">{product.description}</p>

            <div className="mt-2 gap-1 flex  flex-col  text-sm">
              <p>
                <strong>Price:</strong> ${product.price}
              </p>
              <p>
                <strong>stock:</strong> {product.stock}
              </p>
              <p>
                <strong>ratings:</strong> {product.ratings}
              </p>
              <p></p>

              <p>
                <strong>Category:</strong> {product.category} /{" "}
                {product.subCategory}
              </p>
              <div>
                <strong>Size:</strong>{" "}
                <div className="flex flex-wrap gap-2 mt-1">
                  {product.sizes.map((size, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>

              <p>
                <strong> Uploaded Date:</strong>{" "}
                {product.date ? product.date.split("T")[0] : "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Additional Images */}
        <div className="mt-4  flex gap-0.5 md:gap-0 md:space-x-2">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Image ${index + 1}`}
              className="w-16 h-16 object-cover rounded border border-white/25"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProCards;
