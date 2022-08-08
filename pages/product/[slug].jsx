/* eslint-disable @next/next/no-img-element */
import React from "react";
import data from "../../utils/data";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

const ProductDetails = () => {
  const router = useRouter();
  const { slug } = router.query;

  const products = data.products.filter((product) => product.slug === slug);
  console.log(products);

  if (!products) {
    return <h1>There is no available product</h1>;
  }
  return <Layout title={products[0]?.name}>{products}</Layout>;
};

export default ProductDetails;

// export async function getStaticPaths() {
//   const paths = data.products.map((product) => ({
//     params: {
//       slug: product.slug,
//     },
//   }));
//   console.log(paths);

//   return {
//     paths,
//     fallback: false,
//   };
// }
