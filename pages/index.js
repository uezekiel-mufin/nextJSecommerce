import Layout from "../components/Layout";
import data from "../utils/data";

export default function Home() {
  return (
    <div>
      <Layout title='Home Page'>{data}</Layout>
    </div>
  );
}
