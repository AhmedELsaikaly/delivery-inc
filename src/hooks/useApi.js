import { useEffect, useState } from 'react';

export const useApi = url => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const fetchApi = async () => {
    try {
      setLoading(true);

      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return { loading, data };
};
