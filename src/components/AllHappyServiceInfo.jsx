import React from "react";
import AllHappyInfo01 from "../img/all_happy_01_mobile.jpg";
const basicFontInlineStyle = { fontFamily: "Noto Sans KR" };
const AllHappyServiceInfo = () => {
  return (
    <div className="flex flex-col w-full bg-white">
      <div className="flex px-4 mb-4">
        <span
          style={{
            ...basicFontInlineStyle,
            fontSize: "22px",
            fontWeight: "bold",
          }}
        >
          '늘 행복' 상품설명
        </span>
      </div>
      <div className="flex w-full">
        <img
          src={AllHappyInfo01}
          alt=""
          style={{ maxWidth: "1000px", width: "100%" }}
        />
      </div>
    </div>
  );
};

export default AllHappyServiceInfo;
