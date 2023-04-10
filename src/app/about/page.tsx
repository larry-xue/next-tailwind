import DogCeo from "./dogCeo";
export default function About() {
  return (
    <div>
      <h2>Dog CEO: </h2>
      {/* @ts-expect-error Server Component */} 
      <DogCeo url="https://pic.cnblogs.com/face/2419627/20230108230833.png"></DogCeo>
    </div>
  );
}
