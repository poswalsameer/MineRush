"use client";

import { Jersey_25 } from "next/font/google";
import { useEffect, useState } from "react";
import AddMoney from "./components/AddMoney";
import Winning from "./components/Winning";
// import bombImage from './public/bomb.png';
// import gemImage from './public/gem.png';
import {
  oneBombArr,
  twoBombArr,
  threeBombArr,
  fourBombArr,
  fiveBombArr,
  sixBombArr,
  sevenBombArr,
  eightBombArr,
  nineBombArr,
  tenBombArr,
  elevenBombArr,
  twelveBombArr,
  thirteenBombArr,
  fourteenBombArr,
  fifteenBombArr,
  sixteenBombArr,
  seventeenBombArr,
  eighteenBombArr,
  nineteenBombArr,
  twentyBombArr,
  twentyOneBombArr,
  twentyTwoBombArr,
  twentyThreeBombArr,
  twentyFourBombArr,
} from "./utils/multiplier";

// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import AlertBox from "./components/AlertBox";

export default function Home() {
  const [addMoneyButton, setAddMoneyButton] = useState(false);
  const [winningPopUp, setWinningPopUp] = useState<boolean>(false);
  const [betAmountAlert, setBetAmountAlert] = useState<boolean>(false);
  const [bombClicked, setBombClicked] = useState<boolean>(false);
  const [activeBet, setActiveBet] = useState<boolean>(false);
  const [shuffleAllowed, setShuffleAllowed] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [isBombPresent, setIsBombPresent] = useState<boolean>(false);

  // const [amountInWallet, setAmountInWallet] = useState<number>(0);

  //STATE FOR AMOUNT SHOWING IN WALLET AND ALSO SAVING IT IN THE LOCAL STORAGE FOR FUTURE USE
  const [amountInWallet, setAmountInWallet] = useState<number | null>(null);

  const [addAmountField, setAddAmountField] = useState<number | null>(null);

  const [betAmount, setBetAmount] = useState<string>("");
  const [bomb, SetBomb] = useState<string>("3");
  const [bombCount, SetBombCount] = useState<number[]>([]);

  const [profit, setProfit] = useState<number>(0.0);

  const [clickedIndices, setClickedIndices] = useState<{
    [key: number]: "bomb" | "gem";
  }>({});

  //SETTING ISCLIENT TO TRUE WHEN THE COMPONENT LOADS ON CLIENT SIDE
  useEffect(() => {
    setIsClient(true);
  }, []);

  //USE EFFECT TO SET THE NEW AMOUNT IN LOCAL STORAGE WHENEVER THE AMOUNT IN WALLET CHANGES
  useEffect(() => {
    if (isClient) {
      const storedAmount = localStorage.getItem("walletAmount");
      if (storedAmount) {
        setAmountInWallet(JSON.parse(storedAmount));
      }
    }
  }, [isClient]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("walletAmount", JSON.stringify(amountInWallet));
    }
  }, [amountInWallet, isClient]);

  const addMoneyButtonClicked = () => {
    setAddMoneyButton(true);
  };

  //FUNCTION WHICH IS HANDLING THE ADD BUTTON ON ADD MONEY COMPONENT AND ADDING THE AMOUNT TO WALLET
  const addButtonClicked = () => {
    // setAmountInWallet( prev => prev! + Number(addAmountField) );

    // FUNCTION THAT SETS THE WALLET AMOUNT UPTO 2 DECIMAL PLACES AFTER ADDING MONEY IN THE WALLET
    setAmountInWallet((prevAmount) => {
      let updatedAmount;

      if (prevAmount !== null) {
        updatedAmount = prevAmount + Number(addAmountField);
      } else {
        updatedAmount = amountInWallet;
      }

      if (updatedAmount !== null) {
        return parseFloat(updatedAmount.toFixed(2));
      }
      return amountInWallet;
    });

    setAddMoneyButton(false);
    setAddAmountField(null);
  };

  //FUNCTION TO GENERATE A RANDOM NUMBER BETWEEN 0 AND 24
  const generateRandomNumber = (): number => {
    return Math.floor(Math.random() * 25);
  };

  //FUNCTION HANDLING THE BET BUTTON AND IT WILL SUBTRACT THE BET AMOUNT FROM THE AMOUNT IN WALLET ONLY IF AMOUNT IN WALLET IS GREATER THAN OR EQUAL TO THE BET AMOUNT
  const betButtonClicked = () => {
    if (betAmount === "") {
      setBetAmountAlert(true);
      console.log("bet amount is not entered");
    } else {
      if (amountInWallet !== null && amountInWallet >= Number(betAmount)) {
        // setAmountInWallet( prev => prev! - Number(betAmount) );

        //LOGIC TO IMPLEMENT THE WALLET BALANCE UPTO 2 DECIMAL PLACES AFTER SUBTRACTING THE AMOUNT IN WALLET WITH BET AMOUNT
        setAmountInWallet((prevAmount) => {
          let updatedAmountInWallet;
          if (prevAmount !== null) {
            updatedAmountInWallet = prevAmount - Number(betAmount);
          } else {
            updatedAmountInWallet = amountInWallet;
          }

          if (updatedAmountInWallet !== null) {
            return parseFloat(updatedAmountInWallet.toFixed(2));
          }
          return amountInWallet;
        });

        //ARRAY STORING THE INDEX WHERE BOMB WILL BE PLACED
        let bombArr: number[] = [];

        //GENERATING RANDOM NUMBERS AND THEN STORING THEM IN THE BOMBCOUNT ARRAY
        while (bombArr.length < Number(bomb)) {
          let randomNumber = generateRandomNumber();
          if (!bombArr.includes(randomNumber)) {
            bombArr.push(randomNumber);
          }
        }
        console.log("Generated bomb array:", bombArr);
        SetBombCount(bombArr);

        //SWITCHING OFF THE BET BUTTON WHEN THE USER STARTS A BET
        setActiveBet(true);
        setBombClicked(false);
        console.log("new bet started and active bet is ON");

        //SWITCHING ON THE SHUFFLING BUTTON WHEN THE USER STARTS A BET
        setShuffleAllowed(true);

        setWinningPopUp(false);

        setClickedIndices({});
      }
    }
  };

  //FUNCTION TO HANDLE THE LOGIC WHEN CASHOUT BUTTON IS CLICKED
  const cashoutClicked = () => {
    setActiveBet(false);
    setWinningPopUp(true);
  };

  const clickingMine = (index: any) => {
    // () => mineClicked(index)

    //mine is clickable only when a bet is active
    if (activeBet) {
      mineClicked(index);
    }
  };

  //FUNCTION WHICH WILL WORK WHEN A MINE IS CLICKED, LOGGING TO THE CONSOLE
  const mineClicked = (index: number) => {
    console.log("Clicked index:", index);
    console.log("Bomb count array:", bombCount);
    if (bombCount.includes(index)) {
      setClickedIndices((prev) => ({ ...prev, [index]: "bomb" }));
      console.log("Bomb Clicked");
    } else {
      setClickedIndices((prev) => ({ ...prev, [index]: "gem" }));
      console.log("Gem Clicked");
    }

    if (bombCount.includes(index)) {
      setBombClicked(true);
      setActiveBet(false);
      console.log("bet has been set to false again");
    }
  };

  //array of length 25 to display all div boxes through loop
  const divs = Array.from({ length: 25 });
  // localStorage.clear();

  console.log(bombCount);

  const closeAlertClicked = () => {
    setBetAmountAlert(false);
  };

  return (
    <>
      <div
        className={`h-screen w-full bg-black flex flex-col justify-center items-center ${
          addMoneyButton ? "blur-sm" : ""
        } ${betAmountAlert ? "blur-sm" : ""} `}
      >
        <h1 className="my-6 text-5xl text-white font-extrabold">
          {" "}
          SHINY FORTUNE{" "}
        </h1>

        {/* WALLET LAYOUT AND UI */}
        <div className="top-12 right-16 h-12 w-64 bg-blue-950 rounded-lg absolute flex justify-center items-center">
          <div className="flex justify-center items-center h-full w-[35%]">
            WALLET
          </div>

          <div className=" h-full w-[50%] bg-red-400 font-bold flex justify-center items-center overflow-hidden">
            <h1 className="px-10">{amountInWallet}</h1>
          </div>

          <div className=" h-full w-[16%] flex justify-center items-center bg-slate-800 rounded-r-lg">
            <button onClick={addMoneyButtonClicked}>+</button>
          </div>
        </div>

        <div className="my-4 h-[33rem] w-[80rem] bg-blue-950 rounded-xl flex flex-row justify-between items-center">
          {/* bet amount wala box */}
          <div className=" flex flex-col justify-center items-center ml-10 h-[26rem] w-[30rem] bg-green-800 rounded-2xl">
            {/* BET AMOUNT FIELD */}
            <div className="w-full flex flex-row justify-between items-center my-5 ">
              {/* <div className="w-1/2 "> */}
              <p className=" ml-20 text-lg font-bold">Bet Amount</p>
              {/* </div> */}

              {/* <div className="w-1/2"> */}
              <input
                type="number"
                className="mr-20 h-9 w-44 p-2 text-sm border border-white rounded-md text-white font-bold bg-black"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                disabled={activeBet}
              />
              {/* </div> */}
            </div>

            {/* NUMBER OF MINES FIELD */}
            <div className="w-full flex flex-row justify-between items-center my-5">
              {/* <div className="w-1/2"> */}
              <p className="ml-20 text-lg font-bold">Mines</p>
              {/* </div> */}

              {/* <div className="w-1/2"> */}
              <select
                name="mine"
                id="min"
                className="mr-20 h-9 w-44 p-2 text-sm border border-white rounded-md text-white font-bold bg-black"
                value={bomb}
                disabled={activeBet}
                onChange={(e) => SetBomb(e.target.value)}
              >
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

            {/* PROFIT BOX */}
            <div className="w-full flex flex-row justify-between items-center my-5 ">
              <p className=" ml-20 text-lg font-bold">Profit</p>

              <div className="mr-20 h-9 w-44 p-2 text-sm border border-white rounded-md text-white font-bold bg-black">
                {profit}x
              </div>
            </div>

            {/* BET BUTTON */}

            {activeBet ? (
              <button
                className="h-10 w-80 my-5 bg-green-950 text-white rounded-lg"
                onClick={cashoutClicked}
              >
                CASHOUT
              </button>
            ) : (
              <button
                className={`h-10 w-80 my-5 bg-green-950 text-white rounded-lg`}
                onClick={betButtonClicked}
                disabled={activeBet}
              >
                BET
              </button>
            )}

            {/* BUTTON FOR RE SHUFFLE THE BOARD */}
            <button
              className="h-10 w-80 my-2 bg-yellow-950 text-white rounded-lg"
              disabled={!shuffleAllowed}
            >
              Re-Shuffle Board
            </button>
          </div>

          {/* grid wala box */}
          <div
            className={`grid grid-rows-5 grid-cols-5 gap-y-4 justify-items-center items-center mr-20 h-[27rem] w-[31rem] rounded-2xl ${
              winningPopUp ? "blur-sm" : ""
            } ${bombClicked ? "blur-sm" : ""} `}
          >
            {/* LOOPING THROUGH THE DIV TO SHOW MINES */}
            { divs.map((_, index) => {
                  const isClicked = clickedIndices.hasOwnProperty(index);
                  return (
                    <div
                      key={index}
                      className="h-20 w-20 bg-slate-800 flex justify-center items-center rounded-lg hover:cursor-pointer hover:border-2 hover:border-slate-900"
                      onClick={() => clickingMine(index)}
                    >
                      {isClicked && (
                        // Showing image of gem or bomb according to the index clicked
                        <img
                          src={
                            clickedIndices[index] === "bomb"
                              ? "bomb.png"
                              : "gems.png"
                          }
                          alt={clickedIndices[index]}
                          className={`${
                            clickedIndices[index] === "bomb"
                              ? "mr-1 image-size"
                              : "ml-1"
                          }`}
                        />
                      )}
                    </div>
                  );
                }) }

            {/* {bombClicked
              ? divs.map((_, index) => {
                  const isClicked = clickedIndices.hasOwnProperty(index);
                  return (
                    <div
                      key={index}
                      className="h-20 w-20 bg-slate-800 flex justify-center items-center rounded-lg hover:cursor-pointer hover:border-2 hover:border-slate-900"
                      onClick={() => clickingMine(index)}
                    >
                      
                    </div>
                  );
                })
              : divs.map((_, index) => {
                  const isClicked = clickedIndices.hasOwnProperty(index);
                  return (
                    <div
                      key={index}
                      className="h-20 w-20 bg-slate-800 flex justify-center items-center rounded-lg hover:cursor-pointer hover:border-2 hover:border-slate-900"
                      onClick={() => clickingMine(index)}
                    >
                      {isClicked && (
                        // Showing image of gem or bomb according to the index clicked
                        <img
                          src={
                            clickedIndices[index] === "bomb"
                              ? "bomb.png"
                              : "gems.png"
                          }
                          alt={clickedIndices[index]}
                          className={`${
                            clickedIndices[index] === "bomb"
                              ? "mr-1 image-size"
                              : "ml-1"
                          }`}
                        />
                      )}
                    </div>
                  );
                })} */}

            {/* { bombClicked ? {divs.map((_, index) => {
              const isClicked = clickedIndices.hasOwnProperty(index);
              return (
                <div key={index} className="h-20 w-20 bg-slate-800 flex justify-center items-center rounded-lg hover:cursor-pointer hover:border-2 hover:border-slate-900" onClick={() => clickingMine(index)}>
                  
                </div>
              );
            })} : {divs.map((_, index) => {
              const isClicked = clickedIndices.hasOwnProperty(index);
              return (
                <div key={index} className="h-20 w-20 bg-slate-800 flex justify-center items-center rounded-lg hover:cursor-pointer hover:border-2 hover:border-slate-900" onClick={() => clickingMine(index)}>
                  {isClicked && (

                    //SHOWING IMAGE OF GEM OR BOMB ACCORDING TO THE INDEX CLICKED
                    <img src={clickedIndices[index] === 'bomb' ? 'bomb.png': 'gems.png'} alt={clickedIndices[index]} 
                    className={`${clickedIndices[index] === 'bomb' ? 'mr-1 image-size' : 'ml-1'}`}
                    />
                  )}
                </div>
              );
            })}  }  */}
          </div>
        </div>
      </div>

      {addMoneyButton && (
        <AddMoney
          addButton={addButtonClicked}
          addAmount={addAmountField}
          addAmountOnChange={(e: any) => setAddAmountField(e.target.value)}
        />
      )}

      {/* WINNING COMPONENT */}
      {winningPopUp && (
        <Winning winningMultiplier="0.00" winningAmount="0.00" />
      )}

      {/* WHEN A BOMB IS CLICKED */}
      {bombClicked && <Winning winningMultiplier="0.00" winningAmount="0.00" />}

      {betAmountAlert && <AlertBox closeAlertBox={closeAlertClicked} />}
    </>
  );
}
