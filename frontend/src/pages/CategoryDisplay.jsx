import React, { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CategoryDisplay = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/Admin/getcategories`);
        console.log("Data:", response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const convertImageBufferToBase64 = (imageBuffer) => {
    if (!imageBuffer) {
      return null;
    }
    const base64String = Buffer.from(imageBuffer.data).toString("base64");
    return `data:image/jpeg;base64,${base64String}`;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  const renderZigZagCarousel = () => {
    return data.map((category, index) => (
      <div key={index}>
        <div
          className={`carousel-item ${index % 4 === 0 || (index - 1) % 4 === 0 ? "up" : "down"}`}
        >
          <img
            src={convertImageBufferToBase64(category.image.data)}
            alt={`Category ${index}`}
            className="img-fluid product-image"
            style={{margin:"auto", textAlign:"center"}}
          />
          <h6>{category.category_name}</h6>
        </div>
      </div>
    ));
  };

  return (
    <div style={{margin:"auto", textAlign:"center"}}>
      <h4 className="mx-auto" style={{ textAlign: "center" }}>
        Categories
      </h4>
      <span className="underline"></span>
      <Slider {...settings} className="zigzag-carousel">
        {renderZigZagCarousel()}
      </Slider>
      <span>
        
      </span>
    </div>
  );
};

export default CategoryDisplay;
