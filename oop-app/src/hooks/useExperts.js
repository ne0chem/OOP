import { useEffect, useState } from "react";
import { fetchExperts } from "../api/experts.js";
import { expertsData as fallbackExperts } from "../expert.js";
import { mapExpertToCard } from "../utils/mapExpert.js";

export function useExperts({ fallbackOnError = true } = {}) {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        const items = await fetchExperts();
        if (cancelled) return;

        if (items.length > 0) {
          setExperts(items.map(mapExpertToCard));
        } else {
          setExperts([]);
        }
        setError(null);
      } catch (err) {
        if (cancelled) return;
        setError(err);
        if (fallbackOnError) {
          setExperts(fallbackExperts);
        } else {
          setExperts([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [fallbackOnError]);

  return { experts, loading, error };
}
