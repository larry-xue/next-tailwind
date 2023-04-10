import { getURL } from "next/dist/shared/lib/utils";
import Image from "next/image";

// TODO: it doesn't work
export async function getServerSideProps() {
  const res = await fetch("https://dog.ceo/api/breeds/image/random");
  const { message: url } = await res.json();
  console.log(getURL)
  return {
    props: {
      url,
    },
  };
}

export default async function DogCeo(props: { url: string }) {
  return (
    <>
    <Image src={props.url} alt="tet" width={300} height={300} />
    current url is: {props.url}
    </>
  );
}
