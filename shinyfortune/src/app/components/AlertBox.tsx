'use client'

import React from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function AlertBox(props:any) {
  return (
    <Alert variant="destructive" className=" h-32 w-96 absolute text-white bg-[#0F212E] border-2 border-[#557086] top-10 left-[36%]">
      {/* <ExclamationTriangleIcon className="h-4 w-4" /> */}

      <div className=" h-full w-full flex flex-col justify-center items-center">
        <AlertTitle className="font-bold text-xl">{props.alertTitle}</AlertTitle>
        <AlertDescription className="font-bold text-[#a4bcd3]">
          {props.alertDescription}
        </AlertDescription>

        <button className=" mt-3 h-6 w-16 text-[#0F212E] bg-white rounded-sm flex justify-center items-center text-xs font-bold" onClick={props.closeAlertBox} >Close</button>
      </div>
    </Alert>
  )
}

export default AlertBox
