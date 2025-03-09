import { ArrowUpIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 cursor-pointer">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="h-7 w-7 bg-blue-900 flex items-center justify-center text-center text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200"
        >
          <ArrowUpIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default BackToTop;
