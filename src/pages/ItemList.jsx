import { Button, Empty, Form, Layout, Select } from "antd";
import { LiaTimesSolid } from "react-icons/lia";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Content, Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useFirestoreGetDocument,
  useFirestoreQuery,
} from "../hooks/useFirestore";

import BestItem from "../components/BestItem";
import { groupByKey } from "../functions";
const titleInlineStyle = {
  fontFamily: "Noto Sans KR",
  fontSize: "12px",
};
const ItemList = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [filteredSangjoList, setFilteredSangjoList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [accountCountList, setAccountCountList] = useState([]);
  const [electronicTypeList, setElectronicTypeList] = useState([]);
  const [searchBars, setSearchBars] = useState([]);
  const [sangjoList, setSangjoList] = useState([]);
  const [searchParams, setSearchParams] = useState({
    brand: [],
    accountCount: [],
    category: [],
    searchKeyword: [],
  });
  const [searchParamsList, setSearchParamsList] = useState([]);
  const sangjoQuery = useFirestoreQuery();
  const electronicDocument = useFirestoreGetDocument();
  const navigate = useNavigate();
  const location = useLocation();

  const filterDatasBySearchParamsOld = (datas, searchParamsList) => {
    const filteredDatas = datas.filter((data) => {
      // accountCount 조건 확인
      const accountCountMatch = searchParamsList.includes(data.accountCount);

      // productInfo 배열 내 각 항목에 대해 productVendor 또는 productType 조건 확인
      const productInfoMatch = data.productInfo.some(
        (product) =>
          searchParamsList.includes(product.productVendor) ||
          searchParamsList.includes(product.productType)
      );

      // 조건 중 하나라도 true면 현재 data 항목을 결과 배열에 포함
      return accountCountMatch || productInfoMatch;
    });

    return filteredDatas;
  };

  const filterDatasBySearchParams = (datas, params) => {
    console.log(params.brand);
    const filteredBrand =
      params.brand.length <= 0
        ? datas
        : datas.filter((f) =>
            f.productInfo.some((s) => params.brand.includes(s.productVendor))
          );

    const filteredCategory =
      params.category.length <= 0
        ? filteredBrand
        : filteredBrand.filter((f) =>
            f.productInfo.some((s) => params.category.includes(s.productType))
          );

    const filteredAccountCount =
      params.accountCount.length <= 0
        ? filteredCategory
        : filteredCategory.filter((f) =>
            params.accountCount.includes(f.accountCount)
          );

    console.log(filteredAccountCount);

    return filteredAccountCount;
    // const filteredDatas = datas.filter((data) => {
    //   // accountCount 조건 확인
    //   const accountCountMatch = params.includes(data.accountCount);

    //   // productInfo 배열 내 각 항목에 대해 productVendor 또는 productType 조건 확인
    //   const productInfoMatch = data.productInfo.some(
    //     (product) =>
    //       params.includes(product.productVendor) ||
    //       params.includes(product.productType)
    //   );

    //   // 조건 중 하나라도 true면 현재 data 항목을 결과 배열에 포함
    //   return accountCountMatch || productInfoMatch;
    // });

    // return filteredDatas;
  };

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

  const fetchedAll = async () => {
    try {
      await sangjoQuery.getDocuments("sangjos", async (datas) => {
        if (datas.length > 0) {
          const sangjosData = await Promise.all(
            datas.map(async (data, dIdx) => {
              const { productIdList } = data;
              const electronics = await fetchElectronicsData(productIdList);
              return { ...data, productInfo: electronics };
            })
          );
          sangjosData.sort((a, b) => {
            // accountCount를 기준으로 내림차순 정렬
            const accountCompare = b.accountCount.localeCompare(a.accountCount);
            if (accountCompare !== 0) {
              return accountCompare;
            }
            // accountCount가 같으면 itemName으로 오름차순 정렬
            return a.itemName.localeCompare(b.itemName);
          });
          const flatProductInfo = sangjosData
            .map((sangjo) => {
              return sangjo.productInfo;
            })
            .flat();
          setSangjoList(sangjosData);
          setFilteredData(sangjosData);
          setBrandList(groupByKey(flatProductInfo, "productVendor"));
          setElectronicTypeList(groupByKey(flatProductInfo, "productType"));
          setAccountCountList(groupByKey(sangjosData, "accountCount"));
        }
      });
    } catch (error) {}
  };
  const fetchedByIds = async (ids = [], isAll = false) => {
    if (ids.length === 0) return;

    try {
      await sangjoQuery.getDocuments("sangjos", async (data) => {
        setBrandList(groupByKey(data, "productVendor"));
        const filteredByIds = data.filter((f) =>
          f.productIdList.some((s) => ids.includes(s))
        );
        if (filteredByIds.length > 0) {
          const sangjosData = await Promise.all(
            filteredByIds.map(async (data, dIdx) => {
              const { productIdList } = data;
              const electronics = await fetchElectronicsData(productIdList);
              return { ...data, productInfo: electronics };
            })
          );
          sangjosData.sort((a, b) => {
            // accountCount를 기준으로 내림차순 정렬
            const accountCompare = b.accountCount.localeCompare(a.accountCount);
            if (accountCompare !== 0) {
              return accountCompare;
            }
            // accountCount가 같으면 itemName으로 오름차순 정렬
            return a.itemName.localeCompare(b.itemName);
          });
          const flatProductInfo = sangjosData
            .map((sangjo) => {
              return sangjo.productInfo;
            })
            .flat();
          setFilteredData(sangjosData);
          setBrandList(groupByKey(flatProductInfo, "productVendor"));
          setElectronicTypeList(groupByKey(flatProductInfo, "productType"));
          setAccountCountList(groupByKey(sangjosData, "accountCount"));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleReduceParamArray = (array, value) => {
    const filtered = array.filter((f) => f === value);
    const notFiltered = array.filter((f) => f !== value);

    if (filtered.length === 0) {
      filtered.push(...notFiltered);
      filtered.push(value);
      return filtered;
    }
    if (filtered.length > 0) {
      return notFiltered;
    }
  };
  const handleSearchParams = (paramType, paramList, value) => {
    console.log(value);
    switch (paramType) {
      case "brand":
        setSearchParams(() => ({
          ...searchParams,
          brand: handleReduceParamArray(searchParams.brand, value),
        }));
        break;
      case "category":
        setSearchParams(() => ({
          ...searchParams,
          category: handleReduceParamArray(searchParams.category, value),
        }));
        break;

      case "accountCount":
        setSearchParams(() => ({
          ...searchParams,
          accountCount: handleReduceParamArray(
            searchParams.accountCount,
            value
          ),
        }));
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    console.log(searchParams);
    console.log(
      Object.values(searchParams)
        .map((param) => {
          return param;
        })
        .flat()
    );
    setSearchParamsList([
      ...Object.values(searchParams)
        .map((param) => {
          return param;
        })
        .flat(),
    ]);
  }, [searchParams]);

  useEffect(() => {
    filterDatasBySearchParams(sangjoList, searchParams);
    if (searchParamsList.length === 0) {
      setFilteredData([...sangjoList]);
      return;
    } else {
      const newFiltered = filterDatasBySearchParams(sangjoList, searchParams);
      setFilteredData([...newFiltered]);
    }
  }, [searchParamsList]);

  useEffect(() => {
    console.log(sangjoQuery.error);
  }, [sangjoQuery.error]);

  useEffect(() => {
    if (location?.state?.all) {
      fetchedAll();
    }
    if (location?.state?.ids?.length > 0) {
      fetchedByIds(location.state.ids);
    }
  }, [location]);

  const buttonUnCheckStyle = "bg-gray-100 text-sm p-2 cursor-pointer";
  const buttonCheckStyle =
    "flex justify-center items-center text-sm px-2 bg-green-500 rounded-2xl h-7 text-gray-100 cursor-pointer";

  return (
    <div
      style={{ maxWidth: "1000px", minHeight: "100vh", width: "100%" }}
      className=" overflow-x-hidden"
    >
      <Layout>
        <Header className="p-0 h-full">
          <div
            className="flex w-full h-full bg-gray-300 flex-col"
            style={{
              borderTop: "1px solid #c9c9c9",
            }}
          >
            <div className="flex w-full h-10 justify-start items-center bg-white px-5">
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
                    상품검색
                  </span>
                </div>
                <div className="flex w-1/3"></div>
              </div>
            </div>
            <div className="flex w-full">
              <div className="flex bg-gray-500 pl-4" style={{ width: "130px" }}>
                <span className="font-semibold text-gray-100">브랜드</span>
              </div>
              <div
                className="flex bg-gray-100 flex-wrap gap-1 px-4 justify-start items-center"
                style={{ width: "870px" }}
              >
                {brandList.length > 0 &&
                  brandList.map((type, tIdx) => {
                    return (
                      <div
                        className={
                          searchParams.brand.some((f) => f === type.label)
                            ? buttonCheckStyle
                            : buttonUnCheckStyle
                        }
                        onClick={() => {
                          handleSearchParams("brand", searchParams, type.label);
                        }}
                      >
                        {type.label}
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="flex w-full">
              <div className="flex bg-gray-500 pl-4" style={{ width: "130px" }}>
                <span className="font-semibold text-gray-100">카테고리</span>
              </div>
              <div
                className="flex bg-gray-100 flex-wrap gap-1 px-4 justify-start items-center"
                style={{ width: "870px" }}
              >
                {electronicTypeList.length > 0 &&
                  electronicTypeList.map((type, tIdx) => {
                    return (
                      <div
                        className={
                          searchParams.category.some((f) => f === type.label)
                            ? buttonCheckStyle
                            : buttonUnCheckStyle
                        }
                        onClick={() => {
                          handleSearchParams(
                            "category",
                            searchParams,
                            type.label
                          );
                        }}
                      >
                        {type.label}
                      </div>
                    );
                  })}
              </div>
            </div>
            <div
              className="flex w-full"
              style={{
                borderBottom: "1px solid #c9c9c9",
              }}
            >
              <div className="flex bg-gray-500 pl-4" style={{ width: "130px" }}>
                <span className="font-semibold text-gray-100">구좌</span>
              </div>
              <div
                className="flex bg-gray-100 flex-wrap gap-1 px-4 justify-start items-center"
                style={{ width: "870px" }}
              >
                {accountCountList.length > 0 &&
                  accountCountList.map((type, tIdx) => {
                    return (
                      <div
                        className={
                          searchParams.accountCount.some(
                            (f) => f === type.label
                          )
                            ? buttonCheckStyle
                            : buttonUnCheckStyle
                        }
                        onClick={() => {
                          handleSearchParams(
                            "accountCount",
                            searchParams,
                            type.label
                          );
                        }}
                      >
                        {type.label}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </Header>
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
