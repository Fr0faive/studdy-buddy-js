import Image from "next/image";
import Header from "./_components/shared/Header";
import Search from "./_components/shared/Search";

export default function Home() {
  const dataWatch = [
    {
      title: "UI/UX Design Essentials",
      image: "https://picsum.photos/300/200",
      description: "Tech Innovation University",
      rating: "4.5",
      progress: "50%",
    },
    {
      title: "Graphic Design Fundamentals",
      image: "https://picsum.photos/300/200",
      description: "Tech Innovation University",
      rating: "4.8",
      progress: "70%",
    },
  ];

  const categories = [
    {
      name: "User Interface",
    },
    {
      name: "User Experience",
    },
    {
      name: "Graphic Design",
    },
  ];

  return (
    <main className="flex flex-col gap-4 min-h-screen max-w-96 p-5">
      <Header />
      <Search />
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Continue Watching</h2>
        <div className="flex flex-col gap-3">
          {dataWatch.map((data) => (
            <div
              className="w-full h-fit flex flex-row gap-5 border backdrop-shadow-2xl rounded-lg p-2 items-center"
              key={data.title}
            >
              <Image
                src={data.image}
                alt={data.title}
                width={300}
                height={200}
                className="h-14 w-20 rounded-2xl"
              />
              <div className="flex flex-col w-full py-2">
                <h3 className="text-md font-semibold">{data.title}</h3>
                <p className="text-xs">{data.description}</p>
                <div className="flex items-center ">
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 9 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.9" clip-path="url(#clip0_4_1107)">
                      <path
                        d="M4.50023 6.8475L1.85518 8.32807L2.44593 5.35496L0.220459 3.29692L3.2306 2.94002L4.50023 0.1875L5.76982 2.94002L8.77995 3.29692L6.55451 5.35496L7.14525 8.32807L4.50023 6.8475Z"
                        fill="#00707E"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_4_1107">
                        <rect width="9" height="9" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="text-[10px]">{data.rating}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                  <div
                    className="bg-[#00707E] text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                    style={{ width: data.progress }}
                  ></div>
                </div>
                <div className="flex justify-end">
                  <span className="text-xs font-medium text-gray-500">
                    {data.progress} Completed
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-3 justify-between items-end">
          <h2 className="text-xl font-semibold">Categories</h2>
          <a href="" className="text-gray-500 text-xs underline">
            See All
          </a>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {categories.map((data) => (
            <button
              className="w-full p-2 border border-[#00707E] bg-white text-[#00707E] text-[11.35px] rounded-full"
              key={data.name}
            >
              {data.name}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
