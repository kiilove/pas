import React, { useEffect, useState } from "react";
import { IoChevronForwardCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useFirestoreQuery } from "../hooks/useFirestore";
import { where } from "firebase/firestore";

const items = [
  {
    key: "1",
    title: "LG TROMM 세탁기(24kg/모던스테인리스)",
    shortTitle: "LG TROMM 세탁기",
    picUrl:
      "https://firebasestorage.googleapis.com/v0/b/preed-manager.appspot.com/o/productPic%2FLG%20WASHER_24_00.png?alt=media&token=5e66ada3-cb03-4355-af9b-fbae10e27fe6",
  },
  {
    key: "2",
    title: "LG TROMM 건조기(19kg/모던스테인리스)",
    shortTitle: "LG TROMM 건조기",
    picUrl:
      "https://firebasestorage.googleapis.com/v0/b/preed-manager.appspot.com/o/productPic%2FLG%20DRYER_19_00.png?alt=media&token=34007f7b-173d-48aa-b4ea-6ffe631edbd0",
  },
  {
    key: "3",
    title: "LG UHD TV AI ThinQ(75인치/189cm)",
    shortTitle: "LG 75인치",
    picUrl:
      "https://firebasestorage.googleapis.com/v0/b/preed-manager.appspot.com/o/productPic%2FLG%20ULTRAHD%2065_00.png?alt=media&token=45fed611-dce6-4d5c-ba7e-6e9341c1d9b6",
  },
  {
    key: "4",
    title: "LG 스타일러",
    shortTitle: "LG 스타일러",
    picUrl:
      "https://firebasestorage.googleapis.com/v0/b/preed-manager.appspot.com/o/productPic%2FLG%20STYLER_00.png?alt=media&token=2625fbb6-466b-4fb6-b750-bf407551b08b",
  },
];

const titleInlineStyle = {
  fontFamily: "Noto Sans KR",
  fontSize: "12px",
};

const BestItem = ({ data = [] }) => {
  const [bestItemIds, setBestItemIds] = useState([]);
  const [referrerIP, setReferrerIP] = useState("");
  const bestItemQuery = useFirestoreQuery();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full px-2">
      <div className="flex w-full justify-center flex-wrap gap-5 md:hidden">
        {data.length > 0 &&
          data.map((item, iIdx) => {
            const { itemName, productInfo, accountCount } = item;
            const productThumbnail = productInfo
              .map((product, pIdx) => {
                // 예시: 각 product의 productThumbnail 배열에서 thumbnail을 반환
                const thumbnails = product.productThumbnail.map(
                  (thumbnail) => thumbnail
                );
                return thumbnails;
              })
              .flat(); // 모든 썸네일을 하나의 평탄한 배열로 만듦

            return (
              <div
                className=" rounded-lg flex  hover:cursor-pointer "
                style={{
                  width: "100%",
                  height: "200px",
                  backgroundColor: "#ececec",
                }}
                onClick={() => navigate("/itemview", { state: { data: item } })}
              >
                <div
                  className="flex w-1/2 justify-center items-center "
                  style={{ height: "180px" }}
                >
                  {productThumbnail?.length === 0 && null}
                  {productThumbnail?.length === 1 && (
                    <img
                      src={productThumbnail[0]?.url}
                      alt=""
                      className=" object-center object-contain"
                      style={{ maxHeight: "150px", maxWidth: "130px" }}
                    />
                  )}
                  {productThumbnail?.length >= 2 &&
                    productThumbnail.map((thumb, tIdx) => {
                      const { url } = thumb;
                      return (
                        <div className="flex w-full h-full justify-center items-center">
                          <div className="flex w-1/2 justify-center items-center">
                            <img
                              src={url}
                              alt=""
                              className=" object-center object-contain"
                              style={{ maxHeight: "100px", width: "80px" }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div className="flex px-4 justify-between items-center w-1/2">
                  <div className="flex w-full flex-col justify-center h-full">
                    <span
                      className="text-base font-semibold"
                      style={titleInlineStyle}
                    >
                      {itemName}
                    </span>
                    <div className="flex my-2 w-full h-7 justify-center items-center bg-gray-300 rounded-lg">
                      <span
                        className="text-base font-semibold"
                        style={titleInlineStyle}
                      >
                        {accountCount}
                      </span>
                    </div>
                  </div>
                  <div className="flex h-full justify-end items-center "></div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="hidden w-full justify-center flex-wrap gap-5 md:flex">
        {data.length > 0 &&
          data.map((item, iIdx) => {
            const { itemName, productInfo, id, accountCount } = item;
            const productThumbnail = productInfo
              .map((product, pIdx) => {
                // 예시: 각 product의 productThumbnail 배열에서 thumbnail을 반환
                const thumbnails = product.productThumbnail.map(
                  (thumbnail) => thumbnail
                );
                return thumbnails;
              })
              .flat(); // 모든 썸네일을 하나의 평탄한 배열로 만듦

            return (
              <div
                className=" rounded-lg flex flex-col hover:cursor-pointer "
                style={{
                  width: "230px",
                  height: "260px",
                  backgroundColor: "#ececec",
                }}
                onClick={() => navigate("/itemview", { state: { data: item } })}
              >
                <div
                  className="flex w-full justify-center items-center pt-3"
                  style={{ height: "150px" }}
                >
                  {productThumbnail?.length === 0 && null}
                  {productThumbnail?.length === 1 && (
                    <img
                      src={productThumbnail[0]?.url}
                      alt=""
                      className=" object-center object-contain"
                      style={{ maxHeight: "100px", maxWidth: "130px" }}
                    />
                  )}
                  {productThumbnail?.length >= 2 &&
                    productThumbnail.map((thumb, tIdx) => {
                      const { url } = thumb;
                      return (
                        <div className="flex w-full h-full px-1 justify-center items-center ">
                          <img
                            src={url}
                            alt=""
                            className=" object-center object-contain"
                            style={{ maxHeight: "100px", width: "80px" }}
                          />
                        </div>
                      );
                    })}
                </div>
                <div className="flex w-full h-1/2 px-4 justify-between items-center">
                  <div className="flex w-full flex-col justify-between h-full">
                    <span
                      className="text-base font-semibold"
                      style={titleInlineStyle}
                    >
                      {itemName}
                    </span>
                    <div className="flex my-2 w-full h-7 justify-center items-center bg-gray-300 rounded-lg">
                      <span
                        className="text-base font-semibold"
                        style={titleInlineStyle}
                      >
                        {accountCount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default BestItem;
