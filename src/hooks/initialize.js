import { useState, useEffect } from "react";
import { init } from "dc-extensions-sdk";

export function useExtension() {
  const [sdk, setSDK] = useState();

  async function initialize() {
    const sdk = await init();

    setSDK(sdk);
  }

  useEffect(() => {
    initialize();
  }, []);

  return [sdk]
}
