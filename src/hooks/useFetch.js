import { useCallback, useEffect, useState } from "react";

export const useFetch = (url, options = {}, dependencies = []) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [value, setValue] = useState();

  const memoizedCallback = useCallback(() => {
    setLoading(true);
    setError(undefined);
    setValue(undefined);

    fetch(url, options)
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(setValue)
      .catch(setError)
      .finally(() => setLoading(false));
  }, dependencies);

  useEffect(() => {
    memoizedCallback();
  }, [memoizedCallback]);

  return { loading, error, value };
};
