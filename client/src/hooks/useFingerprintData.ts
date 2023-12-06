import { useState, useEffect } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

export const useFingerprintData = () => {
  const [fpHash, setFpHash] = useState<string | null>(null);

  const getFp = async () => {
    const fp = await FingerprintJS.load();
    const { visitorId } = await fp.get();
    return visitorId;
  };

  useEffect(() => {
    const hash: string | null = localStorage.getItem("fingerprint-data");
    if (hash) {
      setFpHash(hash);
      return;
    }

    getFp().then((hash) => {
      if (hash && hash.length > 0) {
        localStorage.setItem("fingerprint-data", hash);
        setFpHash(hash);
      }
    });

  }, []);

  return fpHash;
};
