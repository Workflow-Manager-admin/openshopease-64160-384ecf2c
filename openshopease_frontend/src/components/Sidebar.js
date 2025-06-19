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
    <aside className="ose-sidebar">
      <div>
        <div className="ose-title" style={{ fontSize: "1.25rem" }}>Categories</div>
        <ul className="ose-category-list">
          {CATEGORIES.map((cat) => (
            <li key={cat}>
              <button
                className={
                  "ose-category-item" +
                  (selected === cat ? " selected" : "")
                }
                onClick={() => {
                  setCategory(cat);
                  setView("PRODUCTS");
                }}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
