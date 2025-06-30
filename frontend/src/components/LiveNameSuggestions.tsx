import { useEffect, useState } from "react";

const useLiveSuggestions = (query: string) => {
  const [suggestions, setSuggestions] = useState<
    { name: string; id: string }[]
  >([]);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setSuggestions([]);
      return;
    }

    const timeout = setTimeout(() => {
      fetch(
        `http://localhost:3000/api/details?search=${encodeURIComponent(
          trimmed
        )}`
      )
        .then((res) => res.json())
        .then((data) => {
          const names = data.data.map((item: any) => ({
            name: item.name,
            id: item._id,
          }));
          setSuggestions(names);
        })
        .catch((err) => {
          console.error("Error fetching live suggestions:", err);
        });
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return suggestions;
};

export default useLiveSuggestions;
