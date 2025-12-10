import React, { useState } from 'react';
import { Product, Category } from '../types';
import ProductCard from '../components/ProductCard';
import { Filter } from 'lucide-react';

interface CatalogProps {
  onNavigate: (page: string) => void;
  onSelectProduct: (product: Product) => void;
  products: Product[];
}

const Catalog: React.FC<CatalogProps> = ({ onNavigate, onSelectProduct, products }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.ALL);

  const filteredProducts = selectedCategory === Category.ALL 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleInquire = (product: Product) => {
    onSelectProduct(product);
    onNavigate('wholesale');
  };

  const categories = Object.values(Category);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Product Catalog</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Browse our extensive collection of premium wholesale hankies, scarves, and accessories.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-3 justify-center items-center">
          <div className="flex items-center gap-2 text-slate-600">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filter by:</span>
          </div>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-lg'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onInquire={handleInquire} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;