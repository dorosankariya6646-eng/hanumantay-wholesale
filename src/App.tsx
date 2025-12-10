import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Wholesale from './pages/Wholesale';
import About from './pages/About';
import Admin from './pages/Admin';
import { Product } from './types';
import { PRODUCTS as INITIAL_PRODUCTS } from './constants';

const DATA_VERSION = 'v1.2';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [products, setProducts] = useState<Product[]>(() => {
    const savedVersion = localStorage.getItem('hanumantay_data_version');
    const saved = localStorage.getItem('hanumantay_products');
    
    if (savedVersion !== DATA_VERSION || !saved) {
       return INITIAL_PRODUCTS;
    }
    
    return JSON.parse(saved);
  });

  useEffect(() => {
    localStorage.setItem('hanumantay_products', JSON.stringify(products));
    localStorage.setItem('hanumantay_data_version', DATA_VERSION);
  }, [products]);

  const handleNavigate = (page: string) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'catalog':
        return <Catalog onNavigate={handleNavigate} onSelectProduct={handleSelectProduct} products={products} />;
      case 'wholesale':
        return <Wholesale selectedProduct={selectedProduct} />;
      case 'about':
        return <About />;
      case 'admin':
        return <Admin products={products} setProducts={setProducts} onNavigate={handleNavigate} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;