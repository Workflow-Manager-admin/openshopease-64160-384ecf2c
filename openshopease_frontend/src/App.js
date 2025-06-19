import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import ProductListing from "./components/ProductListing";
import ShoppingCart from "./components/ShoppingCart";
import Checkout from "./components/Checkout";
import UserProfile from "./components/UserProfile";

const VIEWS = {
  PRODUCTS: "PRODUCTS",
  CART: "CART",
  CHECKOUT: "CHECKOUT",
  PROFILE: "PROFILE",
};

function App() {
  const [view, setView] = useState(VIEWS.PRODUCTS);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [user, setUser] = useState({
    name: "Sample User",
    email: "user@email.com",
    orderHistory: [],
  });

  // PUBLIC_INTERFACE
  const addToCart = (product) => {
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.id === product.id);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx].qty += 1;
        return copy;
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });
  };

  // PUBLIC_INTERFACE
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  // PUBLIC_INTERFACE
  const changeQty = (productId, qty) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, qty: Math.max(1, qty) } : item
      )
    );
  };

  // PUBLIC_INTERFACE
  const handleCheckout = (order) => {
    // For demo: update user order history and clear cart
    setUser((u) => ({
      ...u,
      orderHistory: [...u.orderHistory, order],
    }));
    setCart([]);
    setView(VIEWS.PROFILE);
  };

  return (
    <div className="openshop-app light-theme">
      <nav className="ose-navbar">
        <div className="ose-logo">
          <span className="ose-logo-dot" />
          <span>OpenShopEase</span>
        </div>
        <div className="ose-nav-actions">
          <button
            className="ose-nav-btn"
            style={view === VIEWS.PROFILE ? { fontWeight: 600 } : {}}
            onClick={() => setView(VIEWS.PROFILE)}
          >
            Account
          </button>
          <button
            className="ose-nav-btn ose-cart-btn"
            style={view === VIEWS.CART ? { fontWeight: 600 } : {}}
            onClick={() => setView(VIEWS.CART)}
          >
            Cart ({cart.reduce((a, c) => a + c.qty, 0)})
          </button>
        </div>
      </nav>
      <div className="ose-container">
        <Sidebar
          selected={category}
          setCategory={setCategory}
          setView={setView}
        />
        <main className="ose-main">
          {view === VIEWS.PRODUCTS && (
            <ProductListing
              category={category}
              search={search}
              setSearch={setSearch}
              addToCart={addToCart}
            />
          )}
          {view === VIEWS.CART && (
            <ShoppingCart
              cart={cart}
              changeQty={changeQty}
              removeFromCart={removeFromCart}
              goToCheckout={() => setView(VIEWS.CHECKOUT)}
            />
          )}
          {view === VIEWS.CHECKOUT && (
            <Checkout
              cart={cart}
              onSuccess={handleCheckout}
              onCancel={() => setView(VIEWS.CART)}
            />
          )}
          {view === VIEWS.PROFILE && (
            <UserProfile user={user} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
