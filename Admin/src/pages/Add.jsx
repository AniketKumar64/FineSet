import React from "react";
import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";

const Add = ({token}) => {




  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [bestSelling, setBestSelling] = useState(false);
  const [sku, setSku] = useState("");
    const [inventory, setInventory] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [size, setSize] = useState([]);
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
 try{
    const formData = new FormData();
    formData.append("name", name);
    formData.append("sku", sku);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("sizes", JSON.stringify(size));
    formData.append("description", description);
    formData.append("inventory", inventory);
    formData.append("discount", discount);
    formData.append("bestSelling", bestSelling);

    image1 && formData.append("image1", image1);
    image2 && formData.append("image2", image2);    
    image3 && formData.append("image3", image3);
    image4 && formData.append("image4", image4);

console.log({ image1, image2, image3, image4 });



    // Send the data to the server
    const response = await axios.post(backendUrl + "/api/v1/products/add-product", formData , { headers:{token}})
    if (response.data.success) {
      alert("Product added successfully");
      // Reset form fields
      setName("");
      setSku("");
      setPrice("");
      setCategory("");
      setSubCategory("");
      setSize([]);
      setDescription("");
      setImage1(false);
      setImage2(false);
      setImage3(false);
      setImage4(false);
    } else {
      alert("Failed to add product: " + response.data.message);
    }


  } catch (error) {
    console.error("Error submitting form:", error);
    console.log(error);
  }

  // todo add stock , rating discout and bestseller
  


  };
  return (
    <div className="min-h-screen  w-full bg-gray-100 ">
      <main className="md:container md:mx-auto md:p-6 p-2 pb-10 md:pb-20 pt-4 bg-white rounded-lg shadow-md">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-black">Add New Product</h1>
          <p className="text-gray-600 mt-2">
            Create and manage your product inventory
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-black mb-4">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                    value={name}
                  className="w-full px-4 py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter product name"
                />
              </div>


              {/* <div>
                <label className="block text-sm font-medium text-black mb-2">
                  SKU
                </label>
                <input
                  type="text"
                  name="sku"
                  onChange={(e) => {
                    setSku(e.target.value);
                  }}
                  value={sku}
                  className="w-full px-4 py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter SKU"
                />
              </div> */}



              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Price 
                </label>
                <input
                  type="text"
                  name="price"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  value={price}
                  className="w-full px-4 py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Category
                </label>
                <div className="relative">
                  <select
                    name="category"
                    onChange={(e) => {
                        setCategory(e.target.value);
                    }}
                    value={category}
                    className="w-full px-4 py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black appearance-none cursor-pointer"
                  >
                    <option value="">Select Category</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Men</option>
                    <option value="women">Women</option>
                    <option value="kids">Kids</option>
                    <option value="home">Home & Garden</option>
                    <option value="sports">Sports & Outdoors</option>
                  </select>
                  <i className="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Sub-Category
                </label>
                <div className="relative">
                  <select
                    name="subCategory"
                    onChange={(e) => {
                      setSubCategory(e.target.value);
                    }}
                    value={subCategory}
                    className="w-full px-4 py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black appearance-none cursor-pointer"
                  >
                    <option value="">Select Sub-Category</option>

                    <option value="topwear">Topwear</option>
                    <option value="bottomwear">Bottomwear</option>
                    <option value="winterwear">Winterwear</option>
                    <option value="phones">Phones</option>
                    <option value="laptops">Laptops</option>
                    <option value="accessories">Accessories</option>
                    <option value="home">Home & Garden</option>
                    <option value="sports">Sports & Outdoors</option>
                  </select>
                  <i className="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                </div>
              </div>
              {/*  product size  */}
              <div className="grid grid-cols-4  ">
               
                
<div className="flex gap-3">
<div 
onClick={()=>setSize(prev=>prev.includes("S")? prev.filter(item => item !== "S") : [...prev, "S"])}

className="bg-black text-white px-4 py-2  cursor-pointer rounded-lg">
    <p className={`text-sm ${size.includes("S") ?"font-bold text-green-500 uppercase ": ""}`}>S</p>
</div>
<div 
onClick={()=>setSize(prev=>prev.includes("m")? prev.filter(item => item !== "m") : [...prev, "m"])}
className="bg-black text-white px-4 py-2  cursor-pointer rounded-lg">
    <p className={`text-sm ${size.includes("m") ?"font-bold text-green-500 uppercase ": ""}`}>m</p>
</div>
<div 
onClick={()=>setSize(prev=>prev.includes("L")? prev.filter(item => item !== "L") : [...prev, "L"])}
className="bg-black text-white px-4 py-2  cursor-pointer rounded-lg">
    <p className={`text-sm ${size.includes("L") ?"font-bold text-green-500 uppercase ": ""}`}>L</p>
</div>
<div 

onClick={()=>setSize(prev=>prev.includes("xl")? prev.filter(item => item !== "xl") : [...prev, "xl"])}
className="bg-black text-white px-4 py-2  cursor-pointer rounded-lg">
    <p className={`text-sm ${size.includes("xl") ?"font-bold text-green-500 uppercase ": ""}`}>xl</p>
</div>

</div>
 
              </div>

              {/* best selling products checkbox */}
              <div className="flex items-center">
                <input onChange={()=>setBestSelling(!bestSelling)} type="checkbox" id="bestSelling" className="mr-3" />
                <label
                  htmlFor="bestSelling"
                  className="text-lg text-black cursor-pointer"
                >
                  Best Selling Product
                </label>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-black mb-4">
              Product Description
            </h2>
            <textarea
              name="description"
                onChange={(e) => {
                    setDescription(e.target.value);
                }}
                value={description}
              rows={6}
              className="w-full px-4 py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
              placeholder="Enter detailed product description..."
            />
          </div>
          {/* Image Upload */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-black mb-4">
              Product Images
            </h2>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <label
                htmlFor="image1"
                className="aspect-square border border-black rounded-lg overflow-hidden relative group"
              >
                {
                !image1 ? <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
                  <i className="fas fa-plus text-2xl"></i>
                </div>
                : <img src={URL.createObjectURL(image1)} alt="Product" className="w-full h-full object-cover" />
                  
                }
                <input
                onChange={(e) => {
                  setImage1(e.target.files[0]);
                }}
                    id="image1"
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </label>
              <label
                htmlFor="image2"
                className="aspect-square border border-black rounded-lg overflow-hidden relative group"
              >
                {
                !image2 ? <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
                  <i className="fas fa-plus text-2xl"></i>
                </div>
                : <img src={URL.createObjectURL(image2)} alt="Product" className="w-full h-full object-cover" />
                }
                
                <input
                onChange={ (e)=>{
                    setImage2(e.target.files[0]);
                }}
                    id="image2"
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </label>

              <label

                htmlFor="image3"
                className="aspect-square border border-black rounded-lg overflow-hidden relative group"
              >
              {
                !image3 ? <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
                  <i className="fas fa-plus text-2xl"></i>
                </div>
                : <img src={URL.createObjectURL(image3)} alt="Product" className
                    ="w-full h-full object-cover" />
              }
                <input
                onChange={(e) => {
                  setImage3(e.target.files[0]);
                }}
                    id="image3"
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </label>

              <label
                htmlFor="image4"
                className="aspect-square border border-black rounded-lg overflow-hidden relative group"
              >
                {
                !image4 ? <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
                  <i className="fas fa-plus text-2xl"></i>
                </div>
                : <img src={URL.createObjectURL(image4)} alt="Product" className
                    ="w-full h-full object-cover" />
                }
                <input
                onChange={(e) => {
                  setImage4(e.target.files[0]);
                }}
                    id="image4"
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </label>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                Upload up to 5 product images
              </p>
              <p className="text-xs text-gray-500">
                Supported formats: JPG, PNG. Max file size: 5MB
              </p>
            </div>
          </div>
          {/* Inventory & Pricing */}


          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-black mb-4">
                Inventory
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Stock Quantity
                  </label>
                  <input
                    type="text"
                    name="inventory"
                    onChange={(e) => {
                      setInventory(e.target.value);
                    }}
                    value={inventory}
                   
                    className="w-full px-4 py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="0"
                  />
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="trackInventory" className="mr-3" />
                  <label
                    htmlFor="trackInventory"
                    className="text-sm text-black cursor-pointer"
                  >
                    Track inventory for this product
                  </label>
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-black mb-4">Pricing</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Discount (%)
                  </label>
                  <input
                    type="text"
                    name="discount"
                    onChange={(e) => {
                      setDiscount(e.target.value);
                    }}
                    value={discount}

                    className="w-full px-4 py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="0"
                  />
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="taxable" className="mr-3" />
                  <label
                    htmlFor="taxable"
                    className="text-sm text-black cursor-pointer"
                  >
                    This product is taxable
                  </label>
                </div>
              </div>
            </div>
          </div> */}


          {/* SEO Settings */}
          {/* <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-black mb-4">
              SEO Settings
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter meta title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Meta Description
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
                  placeholder="Enter meta description"
                />
              </div>
            </div>
          </div> */}
          {/* Action Buttons */}
          <div className="flex  justify-end space-x-4 pt-6">
            {/* <button
              type="button"
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors !rounded-button whitespace-nowrap cursor-pointer"
            >
              Preview
            </button> */}
            <button
              type="submit"
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors !rounded-button whitespace-nowrap cursor-pointer"
            >
              Publish Product
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Add;
