import { useState, useEffect } from "react";
import { SCREEN_DESKTOP, SCREEN_TABLET, SCREEN_MOBILE, } from "../utils/constants/const-breakpoints";

const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    width,
    isDesktop: width >= SCREEN_DESKTOP,
    isTablet: width >= SCREEN_TABLET,
    isMobile: width >= SCREEN_MOBILE,
  };
};
export { useResize };