import React, { useEffect, useState } from "react";
import { where } from "firebase/firestore";
import { notification } from "antd";
import BestItem from "./BestItem";
import {
  useFirestoreGetDocument,
  useFirestoreQuery,
} from "../hooks/useFirestore";

const titleStyle = "text-gray-800 text-base font-extrabold";
const titleInlineStyle = {
  fontFamily: "Noto Sans KR",
  letterSpacing: "0.2rem",
  fontSize: "16px",
};

const MainBestItems = ({ sellerToken }) => {
  const [filteredItems, setFilteredItems] = useState([]);
  const getBestItems = useFirestoreQuery();
  const getSangjo = useFirestoreGetDocument();
  const getElectronic = useFirestoreGetDocument();

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
      placement: "bottomLeft",
      duration: 3,
    });
  };

  const fetchElectronicsData = async (productIdList) => {
    const electronicsData = await Promise.all(
      productIdList.map(
        (id) =>
          new Promise((resolve) => {
            getElectronic.getDocument("electronics", id, (electronic) => {
              resolve(electronic || null); // electronic이 없는 경우 null 반환
            });
          })
      )
    );
    return electronicsData.filter((e) => e); // null 값 제거
  };

  const fetchSangjos = async (bestItemIds) => {
    const sangjosData = await Promise.all(
      bestItemIds.map(
        (id) =>
          new Promise((resolve) => {
            getSangjo.getDocument("sangjos", id, async (sangjo) => {
              if (sangjo) {
                const electronics = await fetchElectronicsData(
                  sangjo.productIdList
                );
                resolve({ ...sangjo, productInfo: electronics });
              } else {
                resolve(null);
              }
            });
          })
      )
    );

    return sangjosData.filter((s) => s); // null 값 제거
  };

  const fetchBestItems = () => {
    const publicQuery = [
      where("ownerGrade", "==", "public"),
      where("itemVendor", "==", "프리드라이프"),
    ];

    const sellerQuery = sellerToken
      ? [
          where("owner", "==", sellerToken),
          where("itemVendor", "==", "프리드라이프"),
        ]
      : null;

    const query = sellerToken ? sellerQuery : publicQuery;

    const handleQueryResult = async (data) => {
      console.log(data);
      if (data?.length > 0) {
        const bestItemIds = data[0].bestItemIds;
        const sangjosData = await fetchSangjos(bestItemIds);
        setFilteredItems(sangjosData); // 여기에서 상태 업데이트
      } else if (sellerToken) {
        // sellerToken이 있었지만 일치하는 항목이 없을 경우 대체 쿼리 사용
        getBestItems.getDocuments("bestitems", handleQueryResult, publicQuery);
      } else {
        openNotification(
          "error",
          "에러경고",
          "상품 정보를 불러오는데 실패했습니다."
        );
      }
    };

    getBestItems.getDocuments("bestitems", handleQueryResult, query);
  };

  useEffect(() => {
    fetchBestItems();
  }, [sellerToken]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full px-5 justify-start items-center h-10">
        <span className={titleStyle} style={titleInlineStyle}>
          인기상품
        </span>
      </div>
      <div className="flex w-full">
        <BestItem data={filteredItems} />
      </div>
    </div>
  );
};

export default MainBestItems;
