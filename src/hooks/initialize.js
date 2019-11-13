import { useState, useEffect } from "react";
import { init } from "dc-extensions-sdk";

export function useExtension() {
  const [sdk, setSDK] = useState();
  const [fetched, setFetched] = useState(false);
  const [initalData, setData] = useState(false);

  async function initialize() {
    const sdk = await init();

    setSDK(sdk);
  }

  useEffect(() => {
    if (!sdk) return;

    async function fetchInitalData() {
      try {
        const data = await sdk.field.getValue();
  
        setData(data);
      }
      catch(e) {}
      finally {
        setFetched(true)
      }
    }

    fetchInitalData()
  }, [sdk])

  useEffect(() => {
    initialize();
  }, []);

  return [sdk, initalData, fetched]
}
