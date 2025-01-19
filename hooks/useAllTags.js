
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const useAllTags = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const shuffleArray = (array) => {
    // Create a copy of the array to avoid mutating the original data
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      // Generate random index
      const j = Math.floor(Math.random() * (i + 1));
      // Swap elements
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
       

      if (error) {
        setError(error.message);
      } else {
        setProducts(shuffleArray(data));
      }
    };

    fetchProducts();
  }, []);

  return { products, error };
};

export default useAllTags;