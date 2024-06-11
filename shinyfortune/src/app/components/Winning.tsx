'use client'

import React from 'react'

function Winning(props:any) {
  return (
    <div className=' absolute top-[50%] left-[65%] h-32 w-44 bg-slate-950 border-2 border-green-400 rounded-lg'>

        <div className='w-full h-full flex flex-col justify-center items-center'>
            <h1 className='text-green-400 text-3xl font-bold my-2'>{props.winningMultiplier}x</h1>
            <h1 className='text-md text-green-400 my-2 font-bold'>₹{props.winningAmount}</h1>
        </div>
      
    </div>
  )
}

export default Winning
