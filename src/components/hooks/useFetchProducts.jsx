import { useEffect, useState } from "react";

const useFetchProducts = (url) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['all']);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();

        const filtered = data.products || data;
        setProducts(filtered);

        const uniqueCategories = ['all', ...new Set(filtered.map((p) => p.category))];
        setCategories(uniqueCategories);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProducts();
  }, [url]);

  return { products, categories, error };
};

export default useFetchProducts;
