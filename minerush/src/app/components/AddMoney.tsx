'use client'

import React, { useState } from 'react'

function AddMoney(props: any) {

  return (
    <>
      
      <div className='h-full w-full flex justify-center items-center'>

        <div className='absolute top-[50%] h-32 w-72 border-[3px] border-[#557086] bg-[#0f212e] flex flex-col justify-center items-center rounded-xl 
        
        sm:absolute sm:top-[50%] sm:h-40 sm:w-96 sm:border-[3px] sm:border-[#557086] sm:bg-[#0f212e] sm:flex sm:flex-col sm:justify-center sm:items-center sm:rounded-xl'>

          <div className="w-full flex flex-row justify-center items-center my-3 
          
          sm:w-full sm:flex sm:flex-row sm:justify-center sm:items-center sm:my-3 ">
    
              <p className="mx-2 text-sm text-[#a4bcd3] font-bold
              
              sm:mx-2 sm:text-base sm:text-[#a4bcd3] sm:font-bold">Amount</p>
              
              <input type="number" className="mx-4 h-8 w-28 p-2 text-sm border-2 border-white rounded-md text-black font-bold bg-[#557086] focus:outline-none
              
              sm:mx-4 sm:h-9 sm:w-36 sm:p-2 sm:text-sm sm:border-2 sm:border-white sm:rounded-md sm:text-black sm:font-bold sm:bg-[#557086] sm:focus:outline-none" value={props.addAmount} onChange={ props.addAmountOnChange }/>
              
          </div>

          <div className='flex justify-center items-center'>
            <button className="h-7 w-14 m-3 text-xs font-bold bg-[#00E701] hover:bg-[#1FFF20] text-black rounded-sm
            
            sm:h-8 sm:w-20 sm:m-3 sm:text-sm sm:font-bold sm:bg-[#00E701] sm:hover:bg-[#1FFF20] sm:text-black sm:rounded-md" onClick={props.addButton}>
                Add
            </button>

            <button className="h-7 w-14 m-3 text-xs font-bold bg-[#1475E1] hover:bg-[#2885ef] text-black rounded-sm
            
            sm:h-8 sm:w-20 sm:m-3 sm:text-sm sm:font-bold sm:bg-[#1475E1] sm:hover:bg-[#2885ef] sm:text-black sm:rounded-md" onClick={props.addButton}>
              Close
            </button>
          </div>

        </div>

      </div>

    </>
  )
}

export default AddMoney
