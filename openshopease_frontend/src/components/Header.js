import React from "react";
import "../App.css";

/**
 * PUBLIC_INTERFACE
 * Header - Displays the OpenShopEase header with brand, navigation and cart/account buttons
 */
function Header({ cartCount, currentView, onNav }) {
  return (
    <header>
      <nav className="ose-navbar" role="navigation" aria-label="Main Navigation">
        <div className="ose-logo">
          <span className="ose-logo-dot" aria-hidden="true" />
          <span>OpenShopEase</span>
        </div>
        <div className="ose-nav-actions">
          <button
            className="ose-nav-btn"
            style={currentView === "PROFILE" ? { fontWeight: 700 } : {}}
            onClick={() => onNav("PROFILE")}
            aria-label="Go to account profile"
          >
            Account
          </button>
          <button
            className="ose-nav-btn ose-cart-btn"
            style={currentView === "CART" ? { fontWeight: 700 } : {}}
            onClick={() => onNav("CART")}
            aria-label={`Cart (${cartCount})`}
          >
            Cart <span className="ose-cart-count">{cartCount}</span>
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
