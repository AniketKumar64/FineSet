import React from 'react'

const FilterSidebar = ({onClose , toggleCategory , toggleSubcategory}) => {
  return (
     <div className="p-4 space-y-4">
      <h3 className="text-xl font-semibold mb-4">Filters</h3>

      {/* Category Filter */}
      <div>
        <p className="mb-2 font-semibold title text-lg">Categories</p>
      <div className="flex  gap-1 flex-col  md:gap-2 md:overflow-visible">
        {["Men", "Women", "Kids", "Electronics", "Watch", "Accessories"].map(
          (cat, idx) => (
            <label
              key={idx}
              className="flex items-center gap-2 px-2 py-1 bg-gray-100 rounded-md shrink-0 md:bg-transparent md:rounded-none"
            >
              <input
                value={cat}
                onChange={toggleCategory}
                type="checkbox"
                className="form-checkbox h-4 w-4 accent-gray-300"
              />
              <span>{cat}</span>
            </label>
          )
        )}
      </div>
      </div>

      {/* todo:  Price Filter */}
  

      {/* Sizes */}
      <div>
        <p className="mb-2 font-medium text-sm">Subcategories</p>
      <div className="flex  gap-1 flex-col md:gap-2 md:overflow-visible">
        {["Topwear", "Bottomwear", "Winter", "Summer", "Footwear", "Gadgets"].map(
          (sub) => (
            <label
              key={sub}
              className="flex items-center gap-2 px-2 py-1 bg-gray-100 rounded-md shrink-0 md:bg-transparent md:rounded-none"
            >
              <input
                value={sub}
                onChange={toggleSubcategory}
                type="checkbox"
                className="form-checkbox h-4 w-4 accent-gray-300"
              />
              <span>{sub}</span>
            </label>
          )
        )}
      </div>
      </div>

      {onClose && (
        <button
          className="w-full mt-4 bg-red-600 text-white py-2 rounded-lg"
          onClick={onClose}
        >
          Close
        </button>
      )}
    </div>
  )
}

export default FilterSidebar