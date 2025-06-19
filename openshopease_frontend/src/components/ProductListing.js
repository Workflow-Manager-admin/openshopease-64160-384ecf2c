import React, { useState, useMemo } from "react";

// Demo Product Data
const PRODUCTS = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 69.99,
    category: "Electronics",
    img: "https://cdn.iconscout.com/icon/free/png-256/headphone-3331656-2787452.png",
    desc: "Premium sound with wireless freedom and long battery life.",
  },
  {
    id: 2,
    name: "Yoga Pants",
    price: 34.99,
    category: "Clothing",
    img: "https://cdn.iconscout.com/icon/free/png-256/yoga-pants-4522552-3778802.png",
    desc: "Comfortable and breathable fabric, perfect for workouts.",
  },
  {
    id: 3,
    name: "Ceramic Mug",
    price: 11.95,
    category: "Home",
    img: "https://cdn.iconscout.com/icon/free/png-256/mug-coffee-cup-tea-glass-33269.png",
    desc: "Keep your drinks hot or cold. Eco-friendly ceramic.",
  },
  {
    id: 4,
    name: "Bestseller Novel",
    price: 21.5,
    category: "Books",
    img: "https://cdn.iconscout.com/icon/free/png-256/book-1754311-1499336.png",
    desc: "Thrilling story from famous author. Paperback edition.",
  },
  {
    id: 5,
    name: "Pull-up Bar",
    price: 44.25,
    category: "Fitness",
    img: "https://cdn.iconscout.com/icon/free/png-256/gym-bar-4448667-3706396.png",
    desc: "Easy to install. Home workout tool for upper body.",
  },
  {
    id: 6,
    name: "Organic Face Serum",
    price: 28.0,
    category: "Beauty",
    img: "https://cdn.iconscout.com/icon/free/png-256/cosmetics-1803073-1521636.png",
    desc: "Hydrating serum with all-natural ingredients.",
  },
  {
    id: 7,
    name: "Building Blocks Set",
    price: 19.99,
    category: "Toys",
    img: "https://cdn.iconscout.com/icon/free/png-256/lego-blocks-toy-593316.png",
    desc: "144-piece colorful set for creativity and fun.",
  },
  {
    id: 8,
    name: "Gourmet Coffee Beans",
    price: 16.0,
    category: "Groceries",
    img: "https://cdn.iconscout.com/icon/free/png-256/coffee-beans-3220148-2670131.png",
    desc: "Freshly roasted for the best flavor in each cup.",
  },
];

function ProductListing({ category, search, setSearch, addToCart }) {
  // PUBLIC_INTERFACE
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Filtering logic
  const products = useMemo(() => {
    let filtered = PRODUCTS;
    if (category && category !== "All") {
      filtered = filtered.filter((p) => p.category === category);
    }
    if (search && search.trim().length > 0) {
      const s = search.trim().toLowerCase();
      filtered = filtered.filter(
        (p) => p.name.toLowerCase().includes(s) || (p.desc && p.desc.toLowerCase().includes(s))
      );
    }
    return filtered;
  }, [category, search]);

  return (
    <div>
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div className="ose-title" style={{ margin: 0 }}>
          Products
        </div>
        <form
          className="ose-searchbar"
          onSubmit={(e) => e.preventDefault()}
          style={{ marginLeft: "auto", width: 270, maxWidth: "100%" }}
        >
          <input
            type="search"
            placeholder="Search"
            value={search}
            onChange={handleSearch}
            aria-label="Search products"
          />
        </form>
      </div>
      <div className="ose-product-list">
        {products.length === 0 && (
          <div style={{ color: "#888" }}>No products found for your search or filter.</div>
        )}
        {products.map((product) => (
          <div className="ose-product-item" key={product.id} data-testid={`product-${product.id}`}>
            <img
              className="ose-product-img"
              src={product.img}
              alt={product.name}
              loading="lazy"
            />
            <div className="ose-product-title">{product.name}</div>
            <div className="ose-product-price">${product.price.toFixed(2)}</div>
            <div className="ose-product-desc">{product.desc}</div>
            <button
              className="ose-btn ose-product-add"
              onClick={() => addToCart(product)}
              type="button"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductListing;
