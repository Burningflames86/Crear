export default function Testimonials() {
  return (
    <div className="mt-40">
      <h1 className="text-5xl font-bold text-center">Testimonials</h1>
      <div className="flex  px-10 rounded-b-lg pb-10 justify-between mx-10">
        <div className="w-80 mt-10 shadow-white shadow-md  max-w-sm bg-[#48484848]  rounded-lg  ">
          <div className="flex justify-end px-4 pt-4"></div>
          <div className="flex flex-col items-center pb-10">
            <img
              className="w-24 h-24 mb-3 rounded-full"
              src="https://resources.tidal.com/images/58cb2c48/ea88/4ffe/9847/822e0e4017e4/750x750.jpg"
              alt="Bonnie image"
            />
            <h5 className="mb-1 text-2xl font-semibold text-slate-500">2PAC</h5>
            <p className="text-center text-md px-3 pt-4 text-white">
              Young producers, take flight, show me what you got, <br />
              <span className="">
                {" "}
                Unlock your potential, give it everything you&lsquo;ve sought,
              </span>
              <br />
              I&lsquo;ll guide you through the maze, help you find your voice,
              <br />
              Together we&lsquo;ll rejoice, in this musical choice.
              <br />
            </p>
          </div>
        </div>
        <div className="w-80 mt-10 shadow-white shadow-md  max-w-sm bg-[#484848b9]  rounded-lg ">
          <div className="flex justify-end px-4 pt-4"></div>
          <div className="flex flex-col items-center pb-10">
            <img
              alt="he"
              className="w-24 h-24 mb-3 rounded-full"
              src="https://compote.slate.com/images/d9a99820-5841-4b90-bc20-cb3b86af7f65.jpg"
            />
            <h5 className="mb-1 text-2xl font-semibold text-black">
              Kendrick Lamar
            </h5>
            <p className="text-center text-md px-3 pt-4 text-white">
              I stepped into the scene, with a vision so clear,
              <br />
              Found a platform called Crear, where legends appear,
              <br />
              From the corners of the globe, new producers emerge,
              <br />
              Talents untapped, ready to surge, with beats that converge.
              <br />
            </p>
          </div>
        </div>
        <div className="w-80 mt-10 shadow-white shadow-md  max-w-sm bg-[#48484848]  rounded-lg ">
          <div className="flex justify-end px-4 pt-4"></div>
          <div className="flex flex-col items-center pb-10">
            <img
              alt="he"
              className="w-24 h-24 mb-3 rounded-full"
              src="https://media.allure.com/photos/6425c66408fd6fd7e6b7c91e/1:1/w_1914,h_1914,c_limit/ice%20spice%20iheart%20music%20awards%202023.jpg"
            />
            <h5 className="mb-1 text-2xl font-semibold text-red-100">
              Ice Spice
            </h5>
            <p className="text-center px-4 pt-4 text-white">
            Ice Spice, the secret ingredient I&lsquo;ve found,
<br />
Their talents astound, breaking new ground,
              <br />
              We&lsquo;re a force to reckon, in this creative realm,
              <br />
              Ice Spice and Crear, a combination that overwhelms.
              <br />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
