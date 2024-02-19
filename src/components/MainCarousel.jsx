import { Carousel } from "antd";
import React from "react";
import Item1 from "../img/item_type1.png";
import Item2 from "../img/review_mp4.mp4";
import Item3 from "../img/review_gif.gif";

const contentStyle = {
  margin: 0,
  height: "80px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const MainCarousel = ({ data }) => {
  return (
    <Carousel autoplay autoplaySpeed={10000} effect="fade">
      {data.map((item, iIdx) => {
        return (
          <div key={item.id} style={{ width: "100%" }}>
            <img
              src={item.source}
              alt=""
              key={iIdx}
              style={{ width: "100%", height: "530px" }}
              className=" object-cover object-top"
            />
          </div>
        );
      })}
    </Carousel>
  );
};

export default MainCarousel;
