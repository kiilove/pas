import React from "react";
import TvIcon from "../img/tv_icon.png";
import WasherIcon from "../img/washer_icon.png";
import DrierIcon from "../img/dryer_icon.png";
import AirconIcon from "../img/aircon_icon.png";
import RefrigeratorIcon from "../img/refregerator_icon.png";
import StylerIcon from "../img/styler_icon.png";
import BedIcon from "../img/bed_icon.png";

const categories = [
  { key: "1", orderIndex: 1, tip: "TV", icon: TvIcon },
  { key: "2", orderIndex: 2, tip: "냉장고", icon: RefrigeratorIcon },
  { key: "3", orderIndex: 3, tip: "세탁기", icon: WasherIcon },
  { key: "4", orderIndex: 4, tip: "건조기", icon: DrierIcon },
  { key: "5", orderIndex: 5, tip: "스타일러", icon: StylerIcon },
  { key: "6", orderIndex: 6, tip: "에어콘", icon: AirconIcon },
  { key: "7", orderIndex: 7, tip: "침대", icon: BedIcon },
];

const MainCategoryItems = () => {
  return (
    <div className="flex w-full justify-center items-center flex-wrap gap-4">
      {categories.map((category, cIdx) => {
        const { tip, icon } = category;

        return (
          <div className="flex flex-col justify-center items-center">
            <div
              className="flex rounded-full justify-center items-center"
              style={{
                backgroundColor: "#f3fffe",
                width: "75px",
                height: "75px",
                padding: "22px",
              }}
            >
              <img
                src={icon}
                alt=""
                style={{ width: "30px", height: "30px" }}
              />
            </div>
            <div className="flex w-full justify-center items-center">
              <span
                style={{
                  fontFamily: "Noto Sans KR",
                  color: "#1b9286",
                }}
              >
                {tip}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MainCategoryItems;
