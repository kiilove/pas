import { Input } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { FaArrowLeftLong } from "react-icons/fa6";
import React from "react";
const iconStyle = "text-2xl font-bold text-gray-800";
const ItemViewHeader = ({ scrollPosition }) => {
  return (
    <div className="flex w-full h-10 justify-start items-center bg-white">
      <div className="flex justify-start items-center w-full h-full">
        <div className="flex w-1/3">
          <FaArrowLeftLong
            onClick={() => {
              window.history.back();
            }}
          />
        </div>
        <div className="flex w-1/3 justify-center items-center">
          <span
            className="text-gray-900 font-semibold"
            style={{ fontFamily: "Noto Sans KR", fontSize: "16px" }}
          >
            상품보기
          </span>
        </div>
        <div className="flex w-1/3"></div>
      </div>
    </div>
  );
};

export default ItemViewHeader;
