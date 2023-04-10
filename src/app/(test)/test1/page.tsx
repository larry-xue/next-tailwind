export default async function Test() {
  const message = await new Promise<string>((resolve) => {
    console.log("in executing sleep!");
    setTimeout(() => resolve("after 3000 ms!"), 3000);
  });
  return (
    <>
      <h1>{message}</h1>;
      <button
        className="bg-slate-600 hover:bg-white hover:transition-all border-spacing-3 border-yellow-300 rounded-md"
      >
        throw error
      </button>
    </>
  );
}

// export async function getServerSideProps() {
//   // This function is called at request time
//   // It can return props for the component
//   return {
//     props: {
//       handler: () => new Error('test error'),
//     },
//   };
// }
