import React from "react";
import "../App.css";

/**
 * PUBLIC_INTERFACE
 * Footer - Minimalist footer for OpenShopEase branding and copyright
 */
function Footer() {
  return (
    <footer
      style={{
        background: "var(--secondary)",
        color: "#fff",
        padding: "18px 0 10px 0",
        textAlign: "center",
        fontSize: "1rem",
        letterSpacing: "0.02em",
        marginTop: "auto",
        boxShadow: "0 -2px 6px rgba(60,60,100,0.04)",
        borderTop: "1.5px solid var(--primary)",
      }}
    >
      <span style={{ color: "var(--accent)", fontWeight: 700, marginRight: 6 }}>●</span>
      <span style={{ fontWeight: 600 }}>OpenShopEase</span>
      <span style={{ opacity: 0.7, marginLeft: 10, fontSize: "0.97rem" }}>
        &copy; {new Date().getFullYear()} All rights reserved.
      </span>
    </footer>
  );
}

export default Footer;
