import { useState, useEffect } from "react";

export const useDeviceType = () => {
  const isClientSide = typeof window !== "undefined";

  const [isMobile, setIsMobile] = useState(
    isClientSide &&
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        navigator.userAgent
      )
  );

  useEffect(() => {
    function resize() {
      setIsMobile(
        /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
          navigator.userAgent
        )
      );
    }

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return isMobile;
};
