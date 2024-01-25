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

const BestItem = ({ productType }) => {
  const [bestItemIds, setBestItemIds] = useState([]);
  const [referrerIP, setReferrerIP] = useState("");
  const bestItemQuery = useFirestoreQuery();
  const navigate = useNavigate();

  const fetchedBestItemByCommon = async (itemVendor = "프리드라이프") => {
    const commonQuery = [
      where("ownerGrade", "==", "admin"),
      where("itemVendor", "==", itemVendor),
    ];

    try {
      await bestItemQuery.getDocuments(
        "bestitems",
        (data) => {
          console.log(data);
          if (data?.length > 0) {
            setBestItemIds([...data[0].bestItemIds]);
          }
        },
        commonQuery
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchedBestItemByToken = async (
    sellerToken,
    itemVendor = "프리드라이프"
  ) => {
    const tokenQuery = [
      where("owner", "==", sellerToken),
      where("itemVendor", "==", itemVendor),
    ];

    try {
      await bestItemQuery.getDocuments(
        "bestitems",
        (data) => {
          console.log(data);
          if (data?.length > 0) {
            setBestItemIds([...data[0].bestItemIds]);
          }
        },
        tokenQuery
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(bestItemIds);
  }, [bestItemIds]);

  return (
    <div className="flex flex-col w-full px-2">
      <div className="flex w-full justify-center flex-wrap gap-5">
        {items.map((item, iIdx) => {
          const { shortTitle, picUrl } = item;

          return (
            <div
              className="bg-gray-200 rounded-lg flex flex-col hover:cursor-pointer"
              style={{ width: "180px", height: "200px" }}
              onClick={() => navigate("/itemview")}
            >
              <div
                className="flex w-full justify-center items-center"
                style={{ height: "150px" }}
              >
                <img
                  src={picUrl}
                  alt=""
                  className=" object-center object-contain"
                  style={{ maxHeight: "100px" }}
                />
              </div>
              <div className="flex px-4 justify-between items-center ">
                <div className="flex h-full justify-start items-center">
                  <span
                    className="text-base font-semibold"
                    style={titleInlineStyle}
                  >
                    {shortTitle}
                  </span>
                </div>
                <div className="flex h-full justify-end items-center ">
                  <IoChevronForwardCircle style={{ fontSize: "16px" }} />
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
