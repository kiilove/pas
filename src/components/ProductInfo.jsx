import React from "react";

const productPics = [
  {
    key: 1,
    type: "image",
    url: "https://firebasestorage.googleapis.com/v0/b/preed-manager.appspot.com/o/productPic%2FLG%ED%8A%B8%EB%A1%AC%2FMO_01.avif?alt=media&token=6e4fc6c1-25fe-48cb-814b-054ef63b5903",
  },
  {
    key: 2,
    type: "mp4",
    url: "https://firebasestorage.googleapis.com/v0/b/preed-manager.appspot.com/o/productPic%2FLG%ED%8A%B8%EB%A1%AC%2Fimg_scene02_mo.mp4?alt=media&token=11e98251-3d9e-433f-90d6-614a320b4370",
  },
  {
    key: 3,
    type: "image",
    url: "https://firebasestorage.googleapis.com/v0/b/preed-manager.appspot.com/o/productPic%2FLG%ED%8A%B8%EB%A1%AC%2Finfo02.jpg?alt=media&token=f105b9af-3d03-4fde-bd85-25cc5cb05d14",
  },
];
const ProductInfo = () => {
  return (
    <div className="w-full flex flex-col h-full p-0 m-0">
      {productPics.map((product, pIdx) => {
        const { key, url, type } = product;
        let render = "";
        type === "image"
          ? (render = <img src={url} alt="" style={{ maxWidth: "100%" }} />)
          : (render = (
              <video
                src={url}
                autoPlay
                muted
                alt=""
                style={{ maxWidth: "100%" }}
              />
            ));
        return render;
      })}
    </div>
  );
};

export default ProductInfo;
