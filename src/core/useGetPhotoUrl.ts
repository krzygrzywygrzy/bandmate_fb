import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../firebase";

export const useGetPhotoUrls = (urls: string[]) => {
  const [data, setData] = useState<string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handle = async () => {
      try {
        setLoading(true);
        let actualUrls: string[] = [];
        for (let url of urls) {
          var res = await getDownloadURL(ref(storage, url));
          actualUrls.push(res);
        }
        setData(actualUrls);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    handle();
  }, [urls]);

  return { data, loading, error };
};

export default useGetPhotoUrls;
