import React from "react";

// PUBLIC_INTERFACE
function UserProfile({ user }) {
  return (
    <div className="ose-userprofile">
      <div className="ose-title" style={{ marginBottom: 18 }}>User Account</div>
      <div>
        <strong>Name:</strong> {user.name || "N/A"}
      </div>
      <div>
        <strong>Email:</strong> {user.email || "N/A"}
      </div>
      <div className="ose-order-history">
        <div className="ose-subtitle" style={{ marginBottom: 8 }}>Order History</div>
        {user.orderHistory.length === 0 && (
          <div className="ose-no-orders">No completed orders yet.</div>
        )}
        {user.orderHistory.slice().reverse().map((order, oidx) => (
          <div className="ose-order-entry" key={order.orderId || oidx}>
            <div className="ose-order-entry-title">
              Order #{order.orderId || "NEW"} &mdash; ${order.total.toFixed(2)}
            </div>
            <div style={{ color: "#888" }}>
              Placed:{" "}
              {order.created instanceof Date
                ? order.created.toLocaleString()
                : new Date(order.created).toLocaleString()}
            </div>
            <div className="ose-cart-list">
              {order.cart &&
                order.cart.map((item) => (
                  <div
                    className="ose-cart-item"
                    key={item.id}
                    style={{ borderBottom: "none", padding: "2px 0" }}
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="ose-cart-img"
                      style={{ width: 38, height: 38 }}
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
      </div>
    </div>
  );
}

export default UserProfile;
