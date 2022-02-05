import { useState, useEffect } from "react";

const useFetch = async <T extends any>(url: string) => {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    //TODO: fetch data
  }, []);
};
