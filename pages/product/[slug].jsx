/* eslint-disable @next/next/no-img-element */
import React from "react";
import Layout from "../../components/Layout";
import db from "../../utils/db";
import Product from "../../models/Product";

const ProductDetails = ({ product }) => {
  if (!product) {
    return <h1>This product is not available</h1>;
  }
  return <Layout title={product?.name}>{[product]}</Layout>;
};

export default ProductDetails;

export async function getServerSideProps(context) {
  const { slug } = context.params;
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}


