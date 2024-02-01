import React from "react";
import SectorItems from "../components/SectorItems";
import BrandItems from "../components/BrandItems";
import { useParams } from "react-router-dom";
import MainBestItems from "../components/MainBestItems";
import ContactIcon from "../img/contact_icon.png";
import ReviewBanner from "../img/review_event.png";
import { useFirestoreQuery } from "../hooks/useFirestore";
import { where } from "firebase/firestore";
const titleStyle = "text-gray-800 text-base font-extrabold";
const titleInlineStyle = {
  fontFamily: "Noto Sans KR",
  letterSpacing: "0.2rem",
  fontSize: "16px",
};
const IntroV2 = () => {
  const params = useParams();

  return (
    <div className="flex flex-col w-full h-full gap-y-0 mb-5">
      <div
        style={{ height: "60px", width: "100%", backgroundColor: "#1e948e" }}
        className="flex justify-center items-center gap-x-5"
      >
        <span
          className="text-gray-200 lg:text-lg"
          style={{ fontFamily: "Nanum Myeongjo" }}
        >
          전문 상담사{" "}
          <span
            className="font-bold text-gray-100 lg:text-xl"
            style={{ fontFamily: "Noto Sans KR" }}
          >
            쥴리엣
          </span>
          에게 빠르게 상담받으시겠어요?
        </span>
        <img
          src={ContactIcon}
          alt=""
          style={{ width: "30px", height: "30px" }}
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-5 px-5">
        <MainBestItems sellerToken={params?.sellerToken} />
      </div>
      <div className="flex w-full h-auto flex-col gap-y-4 px-5">
        <div className="flex w-full flex-col">
          <div className="flex w-full justify-start items-center h-10 px-3">
            <span className={titleStyle} style={titleInlineStyle}>
              테마별 상품
            </span>
          </div>
          <SectorItems />
        </div>
        <div className="flex w-full flex-col">
          <div className="flex w-full justify-start items-center h-10 px-3">
            <span className={titleStyle} style={titleInlineStyle}>
              브랜드별 상품
            </span>
          </div>
          <BrandItems />
        </div>
      </div>
    </div>
  );
};

export default IntroV2;
