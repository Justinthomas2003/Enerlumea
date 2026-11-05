import { useCallback, useEffect, useState } from "react";

export default function useApiCollection(loader) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const reload = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      setItems(await loader());
    } catch (loadError) {
      setError(loadError.message || "Could not load data.");
    } finally {
      setIsLoading(false);
    }
  }, [loader]);

  useEffect(() => {
    let active = true;

    loader().then(
      (data) => {
        if (!active) return;
        setItems(data);
        setError("");
        setIsLoading(false);
      },
      (loadError) => {
        if (!active) return;
        setError(loadError.message || "Could not load data.");
        setIsLoading(false);
      },
    );

    return () => {
      active = false;
    };
  }, [loader]);

  return { items, setItems, isLoading, error, setError, reload };
}
