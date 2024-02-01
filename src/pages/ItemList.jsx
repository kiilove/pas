import { Empty, Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useFirestoreGetDocument,
  useFirestoreQuery,
} from "../hooks/useFirestore";
import { where } from "firebase/firestore";
import BestItem from "../components/BestItem";
const titleInlineStyle = {
  fontFamily: "Noto Sans KR",
  fontSize: "12px",
};
const ItemList = () => {
  const [filteredData, setFilteredData] = useState([]);
  const sangjoQuery = useFirestoreQuery();
  const electronicDocument = useFirestoreGetDocument();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchElectronicsData = async (productIdList) => {
    const electronicsData = await Promise.all(
      productIdList.map(
        (id) =>
          new Promise((resolve) => {
            electronicDocument.getDocument("electronics", id, (electronic) => {
              resolve(electronic || null); // electronic이 없는 경우 null 반환
            });
          })
      )
    );
    return electronicsData.filter((e) => e); // null 값 제거
  };
  const fetcheByIds = async (ids) => {
    const conditions = [where("productIdList", "array-contains-any", ids)];

    try {
      await sangjoQuery.getDocuments(
        "sangjos",
        async (datas) => {
          if (datas.length > 0) {
            const sangjosData = await Promise.all(
              datas.map(async (data, dIdx) => {
                const { productIdList } = data;
                const electronics = await fetchElectronicsData(productIdList);
                return { ...data, productInfo: electronics };
              })
            );
            setFilteredData(sangjosData);
          }
        },
        conditions,
        "accountCount",
        "desc"
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(sangjoQuery.error);
  }, [sangjoQuery.error]);

  useEffect(() => {
    console.log(location);
    if (location?.state?.ids?.length > 0) {
      fetcheByIds(location.state.ids);
    }
  }, [location]);

  return (
    <div
      style={{ maxWidth: "1000px", minHeight: "100vh", width: "100%" }}
      className=" overflow-x-hidden"
    >
      <Layout>
        <Header></Header>
        <Content>
          <div className="flex w-full flex-wrap gap-2 p-4">
            {filteredData.length > 0 ? (
              <BestItem data={filteredData} />
            ) : (
              <div className="flex w-full h-full justify-center items-center">
                <Empty description="데이터가 없습니다." />
              </div>
            )}
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default ItemList;
