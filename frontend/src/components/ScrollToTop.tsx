import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // setTimeout ensures this runs after the new page component mounts
    const id = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);
    return () => clearTimeout(id);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
