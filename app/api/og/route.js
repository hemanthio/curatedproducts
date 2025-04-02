import { ImageResponse } from 'next/og'

export const runtime = "edge"

export async function GET (request){
    try{

        const {searchParams} = new URL(request.url)

        const hasTitle = searchParams.has("title");
        const title = hasTitle? searchParams.get("title")?.slice(0,100) : "CuratedProducts"

        const fontData = await fetch(new URL("/app/fonts/GeistVF.woff",import.meta.url)).then((res)=>res.arrayBuffer())

        const imageData = await fetch(new URL("/public/curatedproducts.png",import.meta.url)).then((res)=>res.arrayBuffer())

    return new ImageResponse(
    <div tw='flex flex-col w-full h-full justify-center items-center bg-white'>
   
    <h1 tw='text-5xl font-bold tracking-tighter flex items-center  ' > 
    <img tw='mr-3 ' src={imageData} width={64} height={64} alt="" />
     {title}</h1>
   
   <h3>Discover the Essentials from collection 
   of curated websites for Your Next Big Idea</h3>
    </div>)
  
} catch(e){
    return new Response("Failed Generate og image",{status:500})
}
}