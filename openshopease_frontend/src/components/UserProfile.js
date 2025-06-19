import React from "react";

/**
 * PUBLIC_INTERFACE
 * UserProfile - Displays user information and order history with professional accessible styling
 */
function UserProfile({ user }) {
  return (
    <section className="ose-userprofile" aria-label="User profile">
      <h1 className="ose-title" style={{ marginBottom: 18, fontSize: "1.33rem" }}>User Account</h1>
      <dl style={{ margin: 0, marginBottom: 16, fontSize: "1.09rem", color: "#24292f" }}>
        <dt style={{ display: "inline", fontWeight: 700 }}>Name: </dt>
        <dd style={{ display: "inline", margin: "0 12px 0 2px" }}>{user.name || "N/A"}</dd>
        <dt style={{ display: "inline", fontWeight: 700 }}>Email: </dt>
        <dd style={{ display: "inline", margin: "0 12px 0 2px" }}>{user.email || "N/A"}</dd>
      </dl>
      <section className="ose-order-history" aria-label="Order history">
        <div className="ose-subtitle" style={{ marginBottom: 8, fontSize: "1.1rem" }}>
          Order History
        </div>
        {user.orderHistory.length === 0 && (
          <div className="ose-no-orders" aria-live="polite">
            No completed orders yet.
          </div>
        )}
        {user.orderHistory.slice().reverse().map((order, oidx) => (
          <div className="ose-order-entry" key={order.orderId || oidx}>
            <div className="ose-order-entry-title">
              Order #{order.orderId || "NEW"} &mdash; ${order.total.toFixed(2)}
            </div>
            <div style={{ color: "#888", marginBottom: 7, fontSize: "0.97rem" }}>
              Placed:{" "}
              {order.created instanceof Date
                ? order.created.toLocaleString()
                : new Date(order.created).toLocaleString()}
            </div>
            <div className="ose-cart-list" style={{ gap: 7 }}>
              {order.cart &&
                order.cart.map((item) => (
                  <div
                    className="ose-cart-item"
                    key={item.id}
                    style={{
                      borderBottom: "none",
                      padding: "2px 0",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="ose-cart-img"
                      style={{ width: 38, height: 38, marginRight: 7 }}
                    />
                    <span>
                      <span style={{ fontWeight: 600 }}>{item.name}</span>
                      <span style={{ marginLeft: 4, color: "#666" }}>
                        &nbsp;({item.qty}x)
                      </span>
                    </span>
                    <span style={{ marginLeft: "auto", fontWeight: 600 }}>
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </section>
    </section>
  );
}

export default UserProfile;
