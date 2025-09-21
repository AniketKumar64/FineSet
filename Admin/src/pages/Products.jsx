import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App'
import { PencilIcon, Search, TrashIcon } from 'lucide-react'
import ProCards from '../components/Products/ProCards'
import SearchBar from '../components/Products/SearchBar'

const Products = ({token}) => {
  const [list , setList] = useState([])
    const [searchTerm, setSearchTerm] = useState("");


  const fetchProducts = async () => {
    try { 
      const response = await axios.get(backendUrl+"/api/v1/products/list-products" ,{headers:{token}})
      if (response.data.success) {
        setList(response.data.products);
      } else {
        console.error("Failed to fetch products:", response.data.message);
      }
    }
    catch (error) {
      console.error("Error fetching products:", error);
    } 
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl +"/api/v1/products/remove-product" , {id}, { headers: { token } });
      if (response.data.success) {
        await fetchProducts(); // Refresh the product list after deletion



      } else {
        console.error("Failed to delete product:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }


  useEffect(()=>{
    fetchProducts(),
    console.log(list)
    console.log(token)

  },[])

  const filteredList = list.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())||
      p.subCategory.toLowerCase().includes(searchTerm.toLowerCase())


  );



  return (
      <div className="bg-[#0A0A0A] min-h-screen text-white/80 p-6">
      
      {/* Header with Title and Search */}
      <div className="bg-[#171717] flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-3xl font-semibold mb-4 md:mb-0">All Products...</h2>
        <div className="w-full md:w-1/3">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 py-4 md:grid-cols-3 gap-3 overflow-hidden">
        {filteredList.length > 0 ? (
          filteredList.map((item, index) => <ProCards key={index} product={item} />)
        ) : (
          <div className="col-span-full text-center text-gray-400 py-10">
            No products found...
          </div>
        )}
      </div>
    </div>

  )
}

export default Products