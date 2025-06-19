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
      <section>
        <div className="ose-title" style={{ marginBottom: 14 }}>Checkout</div>
        <div style={{ color: "#888", fontSize: "1.07rem" }}>No items to checkout.</div>
        <button className="ose-btn" style={{ marginTop: 20, minWidth: 120 }} onClick={onCancel}>
          Back to Cart
        </button>
      </section>
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
        <div style={{ fontSize: "1.6rem", marginBottom: 12 }}>
          <span role="img" aria-label="Celebration">🎉</span> Payment successful!
        </div>
        <div>Your order has been placed.</div>
      </div>
    );
  }

  return (
    <section>
      <div className="ose-title" style={{ marginBottom: 12 }}>Checkout</div>
      <form className="ose-checkout-form" onSubmit={handlePayment} autoComplete="off">
        <div className="ose-checkout-row">
          <label className="ose-checkout-label" htmlFor="cus-name">
            Name on Card
          </label>
          <input
            id="cus-name"
            className="ose-checkout-input"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            disabled={processing}
            placeholder="Full name"
            autoFocus
            aria-required="true"
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
            onChange={e => setCard(e.target.value.replace(/\D/g, ""))}
            required
            maxLength={16}
            minLength={16}
            placeholder="1234 5678 1234 5678"
            inputMode="numeric"
            disabled={processing}
            aria-required="true"
          />
        </div>
        <div className="ose-checkout-row">
          <span className="ose-checkout-label" aria-live="polite">Total</span>
          <div style={{ fontWeight: 700, color: "var(--accent)", fontSize: "1.14rem" }}>
            ${total.toFixed(2)}
          </div>
        </div>
        {error && (
          <div style={{ color: "#c00", marginBottom: 10, fontWeight: 600 }} aria-live="assertive">
            {error}
          </div>
        )}
        <button
          className="ose-payment-btn"
          type="submit"
          disabled={processing}
          aria-busy={processing}
        >
          {processing ? "Processing..." : "Pay Now"}
        </button>
        <button
          className="ose-btn"
          style={{
            width: "100%",
            marginTop: 12,
            background: "#e0e0e0",
            color: "#333",
            fontWeight: 600
          }}
          type="button"
          disabled={processing}
          onClick={onCancel}
        >
          Cancel
        </button>
      </form>
    </section>
  );
}
export default Checkout;
