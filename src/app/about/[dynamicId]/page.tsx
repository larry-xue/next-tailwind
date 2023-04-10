import Image from "next/image";

// TODO: it doesn't work
// export async function getServerSideProps() {
//   const res = await fetch("https://dog.ceo/api/breeds/image/random");
//   const { message: url } = await res.json();
//   console.log(getURL)
//   return {
//     props: {
//       url,
//     },
//   };
// }

export default async function DogCeo() {
  const res = await fetch("http://localhost:3001/api/hello");
  const data: {
    code: number;
    message: string;
    result: {
      done: boolean;
      content: string;
    }[];
  } = await res.json();
  console.log(data);

  return (
    <>
      <Image
        src={
          "https://i2.hdslb.com/bfs/archive/14064122b368741e3f1445b49ede184534881568.jpg@672w_378h_1c_!web-search-common-cover.avif"
        }
        alt="tet"
        width={300}
        height={300}
      />
      <div>message is: {data.result.length && data.result[0].content}</div>
    </>
  );
}
