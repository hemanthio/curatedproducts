import React from 'react'

const Hero = () => {
  return (
    <div className='w-full  h-[450px] rounded-xl  top-[68px] bg-black p-4'>
        <div className='flex items-center px-2 justify-between'>
            <div className='heading and email w-[380px] flex flex-col gap-12 tracking-[-0.7px] leading-[120%] text-white/70'>
                <h1 className=' text-3xl font-bold'>
                Discover the Essentials for Your <span className='text-white'>Next Big Idea
                </span> 
                </h1>
                <div className='w-full flex items-between'>
                    <input type="text" 
                    placeholder='Enter your email '
                    className='bg-white/30 pl-2 rounded-md  w-[250px] h-[42px]' 
                    name="email" />
                    <button  className='bg-white text-black font-medium  px-2 rounded-md ml-2  py-3'>Get notified</button>
                </div>
            </div>
            <div className='heroimage pt-12'>
                <img src="/hero-image.svg"
                 alt="heroimage" 
                 width={500}
                 height={300}

                 />
            </div>
        </div>
    </div>
  )
}

export default Hero