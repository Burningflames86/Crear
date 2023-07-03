import Crear from "@/Components/Crear";
import Login from "@/Components/Login";
import Premium from "@/Components/Premium";
import Testimonials from "@/Components/Testimonials";

import { Livvic } from "next/font/google";

const livvic = Livvic({
  weight: ["100", "200", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className={livvic.className}>
      <Login />
      <div className="mt-24">
        <h1 className="font-black text-7xl text-center">ShoutOut To</h1>
        <div className="flex mt-20 items-baseline mx-4 justify-around">
          <div className="text-6xl flex flex-col items-center font-black text-orange-600">
            <img
              src="https://media.discordapp.net/attachments/1098638167827030016/1124728882138980463/Frame_3.png?width=586&height=586"
              alt=""
              className="w-36 h-3w-36 select-none"
            />
            <div>Beddit</div>
          </div>
          <div className="text-6xl flex flex-col items-center font-black text-green-600">
            <img
              src="https://media.discordapp.net/attachments/1098638167827030016/1124728882411606066/Frame_4.png?width=586&height=586"
              alt=""
              className="w-36 h-3w-36 select-none"
            />
            <div>Feverr</div>
          </div>
          <div className="text-6xl flex flex-col items-center font-black text-blue-900">
            <img
              src="https://media.discordapp.net/attachments/1098638167827030016/1124728882705215598/Frame_2.png?width=774&height=586"
              alt=""
              className="w-40 select-none"
            />
            <div>Deezcord</div>
          </div>
        </div>
        <h2 className="text-4xl mt-20 font-black text-center text-red-600">
          For Wasting Our Time And Killing Young Potentials
        </h2>
      </div>

      <div className="mt-40">
        <h1 className="font-bold text-5xl text-center">About Crear!</h1>
        <div className="flex mx-7 gap-10 mt-5 bg-[#48484848] text-2xl px-7 py-5 rounded-lg leading-9 shadow-xl shadow-slate-500">
          <p className="text-justify ">
            {" "}
            Experience the pinnacle of creativity on crear, the ultimate
            platform for creative professionals. Showcase your remarkable
            talent, gain unprecedented exposure, and unlock an abundance of
            limitless opportunities. Connect with industry giants, establish
            invaluable connections, and turn your dream job into reality. Become
            a trailblazer, shaping the future of creativity and leaving an
            indelible mark.
          </p>
          <img
            className="w-[36rem] rounded-lg"
            src="https://media.discordapp.net/attachments/1098638167827030016/1124946926727594015/matthieu-comoy-koo_vYrlU_U-unsplash.jpg?width=880&height=586"
            alt=""
          />
        </div>
      </div>

      <Premium />
      <Testimonials />
      <Crear />
      <Login />

      <footer className="bg-[#ffffff8f] opacity-80 text-black font-sans text-center mt-14">
        <h1 className="text-4xl pt-5 font-semibold leading-[3rem] text-[2.1rem]">
          Crear
        </h1>
        <p className="max-w-[500px] mx-auto">
          Empowering creatives to publish their work, connect, and land
          rewarding opportunities in the dynamic creative industry.
        </p>
        <p className="my-3">Join our #CREATE&SPREAD movement </p>
        <ul className="socials pb-6 flex justify-center gap-4 text-2xl">
          <li>
            <a href="https://www.instagram.com/kritikaghoshh/" target="_blank">
              <i className="text-black fa fa-instagram"></i>
            </a>
          </li>
          <li>
            <a href="https://twitter.com/KRITIKA71652416" target="_blank">
              <i className="text-black fa fa-twitter"></i>
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/channel/UCxaTdy81D-w9QS4dkl6IEIA"
              target="_blank"
            >
              <i className="text-black fa fa-youtube"></i>
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
