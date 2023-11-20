import { Carousel } from "antd";
import React from "react";
import Item1 from "../img/item_type1.png";
import Item2 from "../img/review_mp4.mp4";
import Item3 from "../img/review_gif.gif";

const carouselItems = [
  {
    id: 1,
    tip: "가전제품과 상조의 결합상품",
    source:
      "https://firebasestorage.googleapis.com/v0/b/preed-manager.appspot.com/o/eventCard%2Fitem_type1.png?alt=media&token=dad32099-a83b-4248-8e13-fcac8e69ca48",
    type: "img",
    link: "",
  },
  {
    id: 2,
    tip: "리뷰이벤트",
    source:
      "https://firebasestorage.googleapis.com/v0/b/preed-manager.appspot.com/o/eventCard%2Freview_gif.gif?alt=media&token=2c678f83-32b7-4caa-bfc3-38cc1385edc1",
    type: "img",
    link: "",
  },
  {
    id: 3,
    tip: "인쿠르트이벤트",
    source:
      "https://firebasestorage.googleapis.com/v0/b/preed-manager.appspot.com/o/eventCard%2Fhr_type1.png?alt=media&token=6fd76a2a-cb7b-4199-b523-6b84b5d8c0df",
    type: "img",
    link: "",
  },
];

const contentStyle = {
  margin: 0,
  height: "80px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const MainCarousel = () => {
  return (
    <Carousel autoplay autoplaySpeed={5000}>
      {carouselItems.map((item, iIdx) => {
        return (
          <div key={item.id} style={{ width: "100%" }}>
            <img
              src={item.source}
              alt=""
              key={iIdx}
              style={{ width: "100%", height: "250px" }}
              className=" object-cover object-center rounded-lg"
            />
          </div>
        );
      })}
    </Carousel>
  );
};

export default MainCarousel;
