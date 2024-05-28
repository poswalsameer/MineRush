export default function Home() {
  return (
    <>

      <div className="h-screen w-full bg-black flex flex-col justify-center items-center">

        <h1 className="my-6 text-5xl text-white font-extrabold" > SHINY FORTUNE </h1>

        <div className="my-4 h-[33rem] w-[80rem] bg-blue-950 rounded-xl flex flex-row justify-between items-center" >

          {/* bet amount wala box */}
          <div className=" flex flex-col justify-center items-center ml-10 h-[26rem] w-[30rem] bg-green-800 rounded-2xl">

            <div className="w-full flex flex-row justify-between items-center my-5 ">

              {/* <div className="w-1/2 "> */}
                <p className=" ml-20 text-lg font-bold">Bet Amount</p>
              {/* </div> */}

              {/* <div className="w-1/2"> */}
               <input type="number" className="mr-20 h-9 w-44 p-2 text-sm border border-white rounded-md text-white font-bold bg-black"/>
              {/* </div> */}

            </div>

            <div className="w-full flex flex-row justify-between items-center my-5">

              {/* <div className="w-1/2"> */}
                <p className="ml-20 text-lg font-bold">Mines</p>
              {/* </div> */}

              {/* <div className="w-1/2"> */}
                <select name="mine" id="min" className="mr-20 h-9 w-44 p-2 text-sm border border-white rounded-md text-white font-bold bg-black">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                </select>
              {/* </div> */}

            </div>

            <button className="h-10 w-80 my-5 bg-green-950 text-white rounded-lg" >BET</button>

            <button className="h-10 w-80 my-2 bg-yellow-950 text-white rounded-lg" >Re-Shuffle Board</button>


          </div>

          {/* grid wala box */}
          <div className=" grid grid-rows-5 grid-cols-5 gap-y-4 justify-items-center items-center mr-20 h-[27rem] w-[31rem] rounded-2xl">

            <div className="h-20 w-20 bg-red-500 rounded-lg " ></div>
            <div className="h-20 w-20 bg-red-500 rounded-lg " ></div>
            <div className="h-20 w-20 bg-red-500 rounded-lg " ></div>
            <div className="h-20 w-20 bg-red-500 rounded-lg " ></div>
            <div className="h-20 w-20 bg-red-500 rounded-lg " ></div>
            <div className="h-20 w-20 bg-red-500 rounded-lg " ></div>
            <div className="h-20 w-20 bg-red-500 rounded-lg " ></div>
            <div className="h-20 w-20 bg-red-500 rounded-lg " ></div>
            <div className="h-20 w-20 bg-red-500 rounded-lg " ></div>
            <div className="h-20 w-20 bg-red-500 rounded-lg " ></div>
            <div className="h-20 w-20 bg-red-500 rounded-lg " ></div>
            <div className="h-20 w-20 bg-red-500 rounded-lg " ></div>
            <div className="h-20 w-20 bg-red-500 rounded-lg " ></div>
            <div className="h-20 w-20 bg-red-500 rounded-lg " ></div>
            <div className="h-20 w-20 bg-red-500 rounded-lg " ></div>
            <div className="h-20 w-20 bg-red-500 rounded-lg " ></div>
            <div className="h-20 w-20 bg-red-500 rounded-lg " ></div>
            <div className="h-20 w-20 bg-red-500 rounded-lg " ></div>
            <div className="h-20 w-20 bg-red-500 rounded-lg " ></div>
            <div className="h-20 w-20 bg-red-500 rounded-lg " ></div>
            <div className="h-20 w-20 bg-red-500 rounded-lg " ></div>
            <div className="h-20 w-20 bg-red-500 rounded-lg " ></div>
            <div className="h-20 w-20 bg-red-500 rounded-lg " ></div>
            <div className="h-20 w-20 bg-red-500 rounded-lg " ></div>
            <div className="h-20 w-20 bg-red-500 rounded-lg " ></div>

          </div>

        </div>

        
      </div>

    </>
  );
}
