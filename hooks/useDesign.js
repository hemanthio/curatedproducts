
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const useDesign = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .filter("tags", "cs", '["design"]');

      if (error) {
        setError(error.message);
      } else {
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  return { products, error };
};

export default useDesign;