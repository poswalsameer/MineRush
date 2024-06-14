'use client'

import React from 'react'

function Winning(props:any) {
  return (

    <>

    <div className='h-full w-full flex justify-center items-center'>

      <div className=' absolute top-[50%] h-24 w-44 bg-[#1A2C38] border-4 border-[#03CF08] rounded-lg'>

          <div className='w-full h-full flex flex-col justify-center items-center'>
              <h1 className='text-[#03CF08] text-2xl  font-bold '>{props.winningMultiplier}x</h1>
              <h1 className='text-xs text-[#03CF08] mt-2  font-bold'>₹{props.winningAmount}</h1>
          </div>
        
      </div>

    </div>

    </>
  )
}

export default Winning
