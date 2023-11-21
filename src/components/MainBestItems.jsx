import { Tabs } from "antd";
import React from "react";
import BestItem from "./BestItem";

const titleStyle = "text-gray-800 text-base font-extrabold";
const titleInlineStyle = {
  fontFamily: "Noto Sans KR",
  letterSpacing: "0.2rem",
  fontSize: "16px",
};
const tabItems = [
  {
    key: "1",
    label: "대형가전",
    children: <BestItem productType={"대형가전"} />,
  },
  { key: "2", label: "계절가전", children: "" },
];
const MainBestItems = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex">
        <span className={titleStyle} style={titleInlineStyle}>
          인기상품
        </span>
      </div>
      <div className="flex w-full">
        <Tabs defaultActiveKey="1" items={tabItems} className="w-full" />
      </div>
    </div>
  );
};

export default MainBestItems;
