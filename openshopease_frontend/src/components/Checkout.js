import React, { useState } from "react";

function fakeProcessPayment({ name, card, total }) {
  // Simulate API/payment gateway
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (card.toString().length === 16) res({ status: "success", orderId: Math.floor(Math.random() * 100000) });
      else rej(new Error("Invalid card number"));
    }, 1200);
  });
}

// PUBLIC_INTERFACE
function Checkout({ cart, onSuccess, onCancel }) {
  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cart.length === 0)
    return (
      <div>
        <div className="ose-title">Checkout</div>
        <div style={{ color: "#888" }}>No items to checkout.</div>
        <button className="ose-btn" style={{ marginTop: 18 }} onClick={onCancel}>
          Back to Cart
        </button>
      </div>
    );

  // PUBLIC_INTERFACE
  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError("");
    try {
      await fakeProcessPayment({ name, card, total });
      setDone(true);
      onSuccess({
        orderId: Math.floor(Math.random() * 20000000),
        created: new Date(),
        total,
        cart: [...cart],
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  if (done) {
    return (
      <div className="ose-checkout-success">
        <div style={{ fontSize: "1.5rem", marginBottom: 12 }}>
          🎉 Payment successful!
        </div>
        <div>Your order has been placed.</div>
      </div>
    );
  }

  return (
    <div>
      <div className="ose-title">Checkout</div>
      <form className="ose-checkout-form" onSubmit={handlePayment}>
        <div className="ose-checkout-row">
          <label className="ose-checkout-label" htmlFor="cus-name">
            Name on Card
          </label>
          <input
            id="cus-name"
            className="ose-checkout-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={processing}
          />
        </div>
        <div className="ose-checkout-row">
          <label className="ose-checkout-label" htmlFor="cus-card">
            Card Number
          </label>
          <input
            id="cus-card"
            className="ose-checkout-input"
            value={card}
            onChange={(e) => setCard(e.target.value.replace(/\D/g, ""))}
            required
            maxLength={16}
            minLength={16}
            placeholder="1234 5678 1234 5678"
            inputMode="numeric"
            disabled={processing}
          />
        </div>
        <div className="ose-checkout-row">
          <label className="ose-checkout-label">Total</label>
          <div style={{ fontWeight: 600, color: "var(--accent)" }}>
            ${total.toFixed(2)}
          </div>
        </div>
        {error && <div style={{ color: "#c00", marginBottom: 9 }}>{error}</div>}
        <button
          className="ose-payment-btn"
          type="submit"
          disabled={processing}
        >
          {processing ? "Processing..." : "Pay Now"}
        </button>
        <button
          className="ose-btn"
          style={{ width: "100%", marginTop: 12, background: "#e0e0e0", color: "#333" }}
          type="button"
          disabled={processing}
          onClick={onCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
export default Checkout;
