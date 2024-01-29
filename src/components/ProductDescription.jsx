import { Empty } from "antd";
import React from "react";
import "./ProductDescription.css"; // CSS 파일 import

const ProductDescription = ({ descriptionUrls = [] }) => {
  return (
    <div className="product-description-container bg-red-200">
      {descriptionUrls.length === 0 ? (
        <div className="product-description-empty">
          <Empty description="상품정보가 없습니다." />
        </div>
      ) : (
        descriptionUrls.map((description, uIdx) => (
          <div className="flex w-full h-full justify-center items-start bg-red-200">
            <img
              key={uIdx}
              src={description}
              alt={`description-${uIdx}`}
              className="product-description-image"
            />
          </div>
        ))
      )}
    </div>
  );
};

export default ProductDescription;
