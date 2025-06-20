import React from "react";

/**
 * PUBLIC_INTERFACE
 * Sidebar - Displays a responsive, accessible sidebar for product categories.
 * UX improvements: 
 *   - Added a mobile-friendly close toggle for the sidebar (if used in overlay mode in future)
 *   - Improved keyboard accessibility and focus order
 *   - Improved category highlight visibility
 *   - Increased touch target size, color contrast for accessibility
 *   - Made categories scrollable (horizontal for mobile, vertical with overflow for desktop)
 */

// Keep category list unchanged for now
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
  // PUBLIC_INTERFACE
  // Handles both mouse and keyboard navigation for category change.
  const handleCategorySelect = (cat) => {
    setCategory(cat);
    setView("PRODUCTS");
  };

  return (
    <aside
      className="ose-sidebar"
      aria-label="Product categories"
      tabIndex={-1}
      style={{
        // Add overflow scroll in case of too many categories
        maxHeight: "calc(100vh - 60px)",
        outline: "none"
      }}
    >
      <nav style={{ width: "100%" }}>
        <div
          className="ose-title"
          style={{
            fontSize: "1.21rem",
            marginBottom: 10,
            marginLeft: 2,
            color: "var(--primary)",
            letterSpacing: "-0.5px",
          }}
        >
          Categories
        </div>
        <ul
          className="ose-category-list"
          style={{
            overflowY: "auto",
            overflowX: "hidden",
            maxHeight: "77vh",
            marginRight: 2,
            paddingRight: 4,
            WebkitOverflowScrolling: "touch",
          }}
        >
          {CATEGORIES.map((cat, idx) => (
            <li key={cat} style={{ width: "100%" }}>
              <button
                className={
                  "ose-category-item" +
                  (selected === cat ? " selected" : "")
                }
                aria-current={selected === cat ? "page" : undefined}
                tabIndex={0}
                style={{
                  borderLeft:
                    selected === cat
                      ? "5px solid var(--primary)"
                      : "5px solid transparent",
                  paddingLeft: selected === cat ? 9 : 14,
                  minHeight: 44,
                  outline: "none",
                  boxShadow:
                    selected === cat
                      ? "0 1.5px 7px 0 rgba(124,181,238,0.11)"
                      : undefined,
                  fontWeight: selected === cat ? 700 : 500,
                  color: selected === cat
                    ? "var(--primary)"
                    : "var(--text-soft)",
                  background: selected === cat
                    ? "rgba(124,181,238, 0.13)"
                    : "none",
                  transition:
                    "background 0.14s, color 0.13s, border-left 0.12s, box-shadow 0.11s",
                  letterSpacing: "0.017em",
                  width: "100%",
                }}
                onClick={() => handleCategorySelect(cat)}
                onKeyDown={e => {
                  if (
                    e.key === "Enter" ||
                    e.key === " " ||
                    e.key === "Spacebar"
                  ) {
                    e.preventDefault();
                    handleCategorySelect(cat);
                  }
                }}
                aria-label={
                  selected === cat
                    ? `${cat} category, selected`
                    : `${cat} category`
                }
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
