import React from "react";

// PUBLIC_INTERFACE
function ShoppingCart({ cart, changeQty, removeFromCart, goToCheckout }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div>
      <div className="ose-title">Shopping Cart</div>
      {cart.length === 0 ? (
        <div style={{ color: "#888", marginTop: "20px" }}>
          Your shopping cart is empty.
        </div>
      ) : (
        <>
          <div className="ose-cart-list">
            {cart.map((item) => (
              <div className="ose-cart-item" key={item.id}>
                <img className="ose-cart-img" src={item.img} alt={item.name} />
                <div className="ose-cart-info">
                  <div style={{ fontWeight: 600 }}>{item.name}</div>
                  <div style={{ color: "#666", fontSize: "0.99rem" }}>{item.desc}</div>
                  <div style={{ fontSize: "1.08rem", color: "var(--accent)", marginTop: 3 }}>
                    ${item.price.toFixed(2)}
                  </div>
                </div>
                <div className="ose-cart-actions">
                  <input
                    type="number"
                    className="ose-cart-qnty"
                    value={item.qty}
                    min={1}
                    onChange={(e) =>
                      changeQty(item.id, Number(e.target.value))
                    }
                    aria-label="Change quantity"
                  />
                  <button
                    className="ose-btn"
                    style={{ background: "var(--secondary)" }}
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: 25,
              fontWeight: 600,
              fontSize: "1.15rem",
              textAlign: "right",
            }}
          >
            Total: <span style={{ color: "var(--accent)" }}>${total.toFixed(2)}</span>
          </div>
          <div style={{ textAlign: "right", marginTop: 20 }}>
            <button
              className="ose-btn"
              onClick={goToCheckout}
              aria-label="Checkout"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
export default ShoppingCart;
