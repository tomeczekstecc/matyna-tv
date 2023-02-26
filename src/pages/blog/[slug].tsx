import {useRouter} from "next/router";

const DetailBlogPage = () => {
  const router = useRouter();
  const {slug} = router.query;

  return (
    <div>
      <h1>Detail Blog Page</h1>
      <p>Slug: {slug}</p>
    </div>
  );
};

export default DetailBlogPage;
