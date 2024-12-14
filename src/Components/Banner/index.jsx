import React, { useState, useEffect } from "react";
import Slide1 from"../../assets/images/slide1.webp";
import Slide2 from "../../assets/images/slide2.webp";
import Slide4 from "../../assets/images/slide6.webp";
import Slide5 from "../../assets/images/slide5.webp";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
const ImageSlider = () => {
  const images = [
    Slide1,
    Slide2,
    Slide4,
    Slide5,
  ]
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    // Tự động thay đổi slide mỗi 1 giây
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-[100%] h-full overflow-hidden mx-auto">
      {/* Wrapper */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full flex-shrink-0"
          />
        ))}
      </div>
      <button className="top-[45%] absolute text-2xl hover:bg-test2 px-3 py-3 rounded-full hover:text-white transition-all duration-500 ease-in-out"
      onClick={()=>setCurrentIndex(currentIndex-1)}
      >
        <FaChevronLeft/>

      </button>
      <button className="top-[45%] left-[95%] absolute text-2xl hover:bg-test2 px-3 py-3 rounded-full hover:text-white transition-all duration-500 ease-in-out"
      onClick={()=>setCurrentIndex(currentIndex+1)}
     >
        <FaChevronRight/>

      </button>
    </div>
  );
};

export default ImageSlider;
