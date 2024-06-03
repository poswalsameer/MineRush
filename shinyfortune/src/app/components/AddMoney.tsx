'use client'

import React, { useState } from 'react'

function AddMoney(props: any) {

  return (
    <>
      
      <div className=' absolute top-1/2 left-[39%] h-40 w-96 border-2 bg-green-800 flex flex-col justify-center items-center rounded-xl'>

        <div className="w-full flex flex-row justify-center items-center my-3 ">
  
            <p className="mx-2 text-base font-bold">Bet Amount</p>
            
            <input type="number" className="mx-2 h-9 w-36 p-2 text-sm border border-white rounded-md text-white font-bold bg-black" value={props.addAmount} onChange={ props.addAmountOnChange }/>
            
        </div>

        <div className='flex justify-center items-center'>
          <button className="h-10 w-24 m-3 bg-yellow-950 text-white rounded-lg" onClick={props.addButton}>
              Add
          </button>

          <button className="h-10 w-24 m-3 bg-yellow-950 text-white rounded-lg" onClick={props.addButton}>
            Close
          </button>
        </div>

      </div>

    </>
  )
}

export default AddMoney
