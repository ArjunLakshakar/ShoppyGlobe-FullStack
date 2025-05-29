import { useEffect, useState } from "react";

const useFetchProducts = (props) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(props); 
        const data = await res.json();
        const filtered = data.products.filter(p => p.category !== "groceries");
        setProducts(filtered);
        setCategories(['all', ...new Set(filtered.map(p => p.category))]);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchProducts();
  }, [props]);

  return { products, categories, error };
};

export default useFetchProducts;
