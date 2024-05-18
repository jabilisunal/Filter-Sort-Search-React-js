import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Products.css";

function Products() {
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState([]);
  const [sortby, setSortby] = useState(null);
  useEffect(() => {
    axios
      .get("https://northwind.vercel.app/api/products")
      .then((res) => setProduct(res.data));
  }, []);
  return (
    <div className="product_area">
      <input
        type="text"
        placeholder="search data "
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <span>Sort By ASC:</span>
      <button onClick={() => setSortby({ field: "name", asc: true })}>
        A-Z
      </button>
      <button onClick={() => setSortby({ field: "name", asc: false })}>
        Z-A
      </button>
      <button onClick={() => setSortby({ field: "unitPrice", asc: false })}>
        Azalan price
      </button>
      <button onClick={() => setSortby({ field: "unitPrice", asc: true })}>
        Artan price
      </button>
      <button onClick={()=>setSortby(null)}>Default</button>
      <hr />
      <div className="card_parent">
        {product &&
          product
            .slice(0, 5)
            .filter((x) => x.name.toLowerCase().includes(search.toLowerCase()))
            .sort((a, b) => {
              if (!sortby) {
                return 0;
              } else if (sortby.asc == true) {
                return a[sortby.field] > b[sortby.field]
                  ? 1
                  : b[sortby.field] > a[sortby.field]
                  ? -1
                  : 0;
              } else if (sortby.asc == false) {
                return a[sortby.field] < b[sortby.field]
                  ? 1
                  : b[sortby.field] < a[sortby.field]
                  ? -1
                  : 0;
              }
            })
            .map((item) => (
              <div key={item.id} className="card">
                <h3>{item.unitPrice}</h3>
                <p>{item.name}</p>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Products;
