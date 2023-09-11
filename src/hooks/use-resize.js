import { useState, useEffect } from "react";
import { SCREEN_DESKTOP } from "../utils/constants/const-breakpoints";

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
  };
};
export { useResize };
