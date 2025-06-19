import React from "react";

const CATEGORIES = [
  "All",
  "Electronics",
  "Clothing",
  "Home",
  "Books",
  "Fitness",
  "Beauty",
  "Toys",
  "Groceries",
];

function Sidebar({ selected, setCategory, setView }) {
  return (
    <aside className="ose-sidebar" aria-label="Product categories">
      <nav>
        <div className="ose-title" style={{ fontSize: "1.21rem", marginBottom: 9 }}>Categories</div>
        <ul className="ose-category-list">
          {CATEGORIES.map((cat) => (
            <li key={cat}>
              <button
                className={
                  "ose-category-item" + (selected === cat ? " selected" : "")
                }
                aria-current={selected === cat ? "page" : undefined}
                tabIndex={0}
                onClick={() => {
                  setCategory(cat);
                  setView("PRODUCTS");
                }}
                onKeyDown={e => {
                  if (e.key === "Enter" || e.key === " ") {
                    setCategory(cat);
                    setView("PRODUCTS");
                  }
                }}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
