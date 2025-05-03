import React from 'react';

const FilterSidebar = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === 'checkbox') {
      setFilters((prev) => ({
        ...prev,
        categories: {
          ...prev.categories,
          [value]: checked,
        },
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="w-full sm:w-64 mb-6 sm:mb-0 sm:pr-6">
      <h3 className="text-lg font-semibold mb-3">Filters</h3>

      <div className="mb-4">
        <label className="block font-medium mb-1">Price (Max)</label>
        <input
          type="range"
          min="0"
          max="100"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleChange}
          className="w-full"
        />
        <span className="text-sm">Up to ₹{filters.maxPrice}</span>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Availability</label>
        <select
          name="availability"
          value={filters.availability}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">All</option>
          <option value="in">In Stock</option>
          <option value="out">Out of Stock</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">Category</label>
        <div className="space-y-1">
          {['Pain Relief', 'Cold & Flu', 'Skin Care', 'Supplements'].map((cat) => (
            <label key={cat} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={cat}
                checked={filters.categories[cat] || false}
                onChange={handleChange}
              />
              {cat}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
