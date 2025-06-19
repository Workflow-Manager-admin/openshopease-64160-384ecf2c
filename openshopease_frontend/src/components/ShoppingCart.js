import React from "react";

// PUBLIC_INTERFACE
function ShoppingCart({ cart, changeQty, removeFromCart, goToCheckout }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <section>
      <div className="ose-title" style={{ marginBottom: 15 }}>Shopping Cart</div>
      {cart.length === 0 ? (
        <div style={{ color: "#888", marginTop: 20, fontSize: "1.05rem" }}>
          Your shopping cart is empty.
        </div>
      ) : (
        <>
          <div className="ose-cart-list" aria-live="polite">
            {cart.map((item) => (
              <div className="ose-cart-item" key={item.id}>
                <img className="ose-cart-img" src={item.img} alt={item.name} />
                <div className="ose-cart-info">
                  <div style={{ fontWeight: 600 }}>{item.name}</div>
                  <div style={{ color: "#666", fontSize: "0.99rem" }}>{item.desc}</div>
                  <div style={{
                    fontSize: "1.09rem",
                    color: "var(--accent)",
                    marginTop: 3,
                    fontWeight: 600
                  }}>
                    ${item.price.toFixed(2)}
                  </div>
                </div>
                <div className="ose-cart-actions">
                  <label style={{ display: "none" }} htmlFor={`cart-qty-${item.id}`}>Quantity for {item.name}</label>
                  <input
                    type="number"
                    className="ose-cart-qnty"
                    id={`cart-qty-${item.id}`}
                    value={item.qty}
                    min={1}
                    inputMode="numeric"
                    onChange={e => changeQty(item.id, Number(e.target.value))}
                    aria-label={`Quantity for ${item.name}`}
                  />
                  <button
                    className="ose-btn"
                    style={{ background: "var(--secondary)" }}
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: 26,
              fontWeight: 700,
              fontSize: "1.18rem",
              textAlign: "right",
              letterSpacing: "0.01em",
            }}
          >
            Total: <span style={{ color: "var(--accent)", fontWeight: 800 }}>${total.toFixed(2)}</span>
          </div>
          <div style={{ textAlign: "right", marginTop: 18 }}>
            <button
              className="ose-btn"
              onClick={goToCheckout}
              aria-label="Proceed to checkout"
              style={{ minWidth: 130, fontWeight: 700 }}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </section>
  );
}
export default ShoppingCart;
