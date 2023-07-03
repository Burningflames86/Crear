import Link from "next/link";


export default function TagSelector(props: any) {
  return (
    <>
    <div className="flex flex-col justify-around shadow-md shadow-white h-[100vh] sticky top-0 left-0 ">
        <Link href={`/tags/videography`} className={`${props.ontag=="videography" ? "bg-[#48484870]": "bg-black"} pl-3 pr-12 py-5 mx-5 rounded-lg hover:bg-[#48484870] cursor-pointer`}><div > VideoGraphy </div></Link>
        <Link href={`/tags/illustrator`} className={`${props.ontag=="illustrator" ? "bg-[#48484870]": "bg-black"} pl-3 pr-12 py-5 mx-5 rounded-lg hover:bg-[#48484870] cursor-pointer`}><div > Illustrator </div></Link>
        <Link href={`/tags/painting`} className={`${props.ontag=="painting" ? "bg-[#48484870]": "bg-black"} pl-3 pr-12 py-5 mx-5 rounded-lg hover:bg-[#48484870] cursor-pointer`}><div> Painting </div></Link>
        <Link href={`/tags/photography`} className={`${props.ontag=="photography" ? "bg-[#48484870]": "bg-black"} pl-3 pr-12 py-5 mx-5 rounded-lg hover:bg-[#48484870] cursor-pointer`}><div> PhotoGraphy </div></Link>
        <Link href={`/tags/dancing`} className={`${props.ontag=="dancing" ? "bg-[#48484870]": "bg-black"} pl-3 pr-12 py-5 mx-5 rounded-lg hover:bg-[#48484870] cursor-pointer`}><div> Dancing </div></Link>
    </div>
    </>
  )
}
