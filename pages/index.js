import Layout from "../components/Layout";
import Product from "../models/Product";
import db from "../utils/db";

export default function Home({ data }) {
  return (
    <div>
      <Layout title='Home Page'>{data}</Layout>
    </div>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const data = await Product.find().lean();

  return {
    props: {
      data: data.map(db.convertDocToObj),
    },
  };
}
