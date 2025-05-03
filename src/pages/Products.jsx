import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import { addToCart } from "../redux/slices/cartSlice";
import SearchBar from "../components/SearchBar";
import FilterSidebar from "../components/FilterSidebar";
import RecommendedProducts from "../components/RecommendedProducts";
import Pagination from "../components/Pagination";
import { sampleProducts } from "../data/sampleProducts";
import { toast } from "react-toastify";

const Products = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    maxPrice: 100,
    availability: "",
    categories: {},
  });
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  const filteredProducts = sampleProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = product.price <= filters.maxPrice;
    const matchesAvailability =
      !filters.availability || product.availability === filters.availability;
    const matchesCategory =
      Object.keys(filters.categories).length === 0 || filters.categories[product.category];

    return matchesSearch && matchesPrice && matchesAvailability && matchesCategory;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);
  const currentProduct = filteredProducts.length > 0 ? filteredProducts[0] : null;

  return (
    <div className="container mx-auto px-4 pt-24 pb-8">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">All Medicines</h1>
      <SearchBar onSearch={setSearchTerm} />
      <div className="flex flex-col sm:flex-row gap-6">
        <FilterSidebar filters={filters} setFilters={setFilters} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 flex-1">
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      {currentProduct && (
        <div className="mt-12">
          <RecommendedProducts currentProduct={currentProduct} />
        </div>
      )}
    </div>
  );
};

export default Products;
