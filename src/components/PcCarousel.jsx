import React from "react";
import { Carousel } from "antd";

const carouselItems = [
  {
    id: 1,
    tip: "가전제품과 상조의 결합상품",
    source:
      "https://firebasestorage.googleapis.com/v0/b/preed-manager.appspot.com/o/eventCard%2FPC_55UQ9300KNA_01-1.avif?alt=media&token=050ba0a6-d521-412f-aa2b-907a18d77f66",
    type: "img",
    link: "",
  },
];

const PcCarousel = () => {
  return (
    <Carousel autoplay autoplaySpeed={5000}>
      {carouselItems.map((item, iIdx) => {
        return (
          <div key={item.id} style={{ width: "100%" }}>
            <img
              src={item.source}
              alt=""
              key={iIdx}
              style={{ width: "100%", height: "500px" }}
              className=" object-cover object-center"
            />
          </div>
        );
      })}
    </Carousel>
  );
};

export default PcCarousel;
