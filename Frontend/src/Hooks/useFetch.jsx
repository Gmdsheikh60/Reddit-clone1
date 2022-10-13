import { useState, useEffect } from "react";

const useFetch = (url, optionsStr) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [responseStatus, setStatus] = useState(0);

  useEffect(() => {
    let success = true;

    const fetchData = async () => {
      try {
        console.log(`options ${optionsStr}`);
        const options = JSON.parse(optionsStr);

        const proxyOptions = {
          method: options.method,
        };
        const proxyParams = new URLSearchParams({
          apiURL: url,
          apiOptions: optionsStr,
        });
        const proxyUrl = `http://localhost:3000/?${proxyParams}`;
        const response = await fetch(proxyUrl, proxyOptions);
        // const content1 = await response.json();

        setStatus(response.status);
        if (!response.ok) {
          const content1 = await response.json();
          console.log(`content1: ${JSON.stringify(content1)}`);
          throw new Error(`${response.status} ${response.statusText}`);
        }
        const content = await response.json();

        // console.log(`content ${JSON.stringify(content)}`);

        if (success) {
          setData(content);
          setError(null);
        }
      } catch (err) {
        setError(err.message);
        console.log("Error", error);
      }
    };

    fetchData();

    return () => {
      success = false;
      setData(1)
      console.log("unmount");
    };
  }, [url, optionsStr, error]);

  return { data, responseStatus };
};

export default useFetch;