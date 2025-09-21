import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import ProductCard from "../Shop/ProductCard";

const RelatedProduct = ({ category, subcategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setrelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productCopy = products.slice();

      productCopy = productCopy.filter((item) => category === item.category);
      productCopy = productCopy.filter(
        (item) => subcategory === item.subcategory
      );

      setrelated(productCopy.slice(0, 4));
    }
  }, []);

  return (
    <div className="flex flex-col px-6 w-full max-w-7xl mx-auto py-10">
      <div className="flex pb-12 ">
        <h2 className="text-3xl font-bold">Related Products...</h2>
      </div>{" "}
      <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="grid grid-cols-1  md:grid-cols-4 gap-6 mt-4 h-full scrollbar-hide px-1">
        {related.map((item) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
