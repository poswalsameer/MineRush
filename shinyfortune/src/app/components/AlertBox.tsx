'use client'

import React from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function AlertBox(props:any) {
  return (

    <div className='h-full w-full flex justify-center items-center'>

    <Alert variant="destructive" className="h-28 w-72 absolute text-white bg-[#0F212E] border-2 border-[#557086] top-10 
    
    sm:h-32 sm:w-96 sm:absolute sm:text-white sm:bg-[#0F212E] sm:border-2 sm:border-[#557086] sm:top-10 ">
      {/* <ExclamationTriangleIcon className="h-4 w-4" /> */}

      <div className=" h-full w-full flex flex-col justify-center items-center">
        <AlertTitle className="font-bold text-lg
        
        sm:font-bold sm:text-xl">{props.alertTitle}</AlertTitle>

        <AlertDescription className="font-bold text-[#a4bcd3] text-xs
        
        sm:font-bold sm:text-[#a4bcd3] sm:text-base">
          {props.alertDescription}
        </AlertDescription>

        <button className="mt-3 h-4 w-12 text-[#0F212E] bg-white rounded-[2px] flex justify-center items-center text-[0.6rem] font-bold 
        
        sm:mt-3 sm:h-6 sm:w-16 sm:text-[#0F212E] sm:bg-white sm:rounded-sm sm:flex sm:justify-center sm:items-center sm:text-xs sm:font-bold" onClick={props.closeAlertBox} >Close</button>
      </div>
    </Alert>

    </div>
  )
}

export default AlertBox
