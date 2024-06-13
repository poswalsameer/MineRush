'use client'

import React, { useState } from 'react'

function AddMoney(props: any) {

  return (
    <>
      
      <div className=' absolute top-1/2 left-[39%] h-40 w-96 border-[3px] border-[#557086] bg-[#0f212e] flex flex-col justify-center items-center rounded-xl'>

        <div className="w-full flex flex-row justify-center items-center my-3 ">
  
            <p className="mx-2 text-base text-[#a4bcd3] font-bold">Bet Amount</p>
            
            <input type="number" className="mx-4 h-9 w-36 p-2 text-sm border-2 border-white rounded-md text-black font-bold bg-[#557086] focus:outline-none" value={props.addAmount} onChange={ props.addAmountOnChange }/>
            
        </div>

        <div className='flex justify-center items-center'>
          <button className="h-8 w-20 m-3 text-sm font-bold bg-[#00E701] hover:bg-[#1FFF20] text-black rounded-md" onClick={props.addButton}>
              Add
          </button>

          <button className="h-8 w-20 m-3 text-sm font-bold bg-[#1475E1] hover:bg-[#2885ef] text-black rounded-md" onClick={props.addButton}>
            Close
          </button>
        </div>

      </div>

    </>
  )
}

export default AddMoney
