"use client";

import { Jersey_25 } from "next/font/google";
import { useEffect, useState } from "react";
import AddMoney from "./components/AddMoney";
import Winning from "./components/Winning";
import { Wallet } from 'lucide-react';
// import betSound from '../../public/betSound.mp3';
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
import ReShuffle from "./components/ReShuffle";

export default function Home() {
  const [addMoneyButton, setAddMoneyButton] = useState(false);
  const [winningPopUp, setWinningPopUp] = useState<boolean>(false);
  const [betAmountAlert, setBetAmountAlert] = useState<boolean>(false);
  const [bombClicked, setBombClicked] = useState<boolean>(false);
  const [activeBet, setActiveBet] = useState<boolean>(false);
  const [shuffleAllowed, setShuffleAllowed] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [isBombPresent, setIsBombPresent] = useState<boolean>(false);
  const [maxWin, setMaxWin] = useState<boolean>(false);
  const [reshuffling, setReshuffling] = useState<boolean>(false);
  const [greaterBet, setGreaterBet] = useState<boolean>(false);

  // const [amountInWallet, setAmountInWallet] = useState<number>(0);

  //STATE FOR AMOUNT SHOWING IN WALLET AND ALSO SAVING IT IN THE LOCAL STORAGE FOR FUTURE USE
  const [amountInWallet, setAmountInWallet] = useState<number | null>(null);

  const [addAmountField, setAddAmountField] = useState<number | null>(null);

  const [betAmount, setBetAmount] = useState<string>("");
  const [bomb, SetBomb] = useState<string>("3");
  const [gemCount, setGemCount] = useState<number>(0);
  const [winAmount, setWinAmount] = useState<number>(0);
  const [bombCount, SetBombCount] = useState<number[]>([]);
  const [maxWinAmount, setMaxWinAmount] = useState<number>(0);

  const [profit, setProfit] = useState<number>(0.0);

  const [clickedIndices, setClickedIndices] = useState<{
    [key: number]: "bomb" | "gem";
  }>({});

  // let winAmount;
  let betSound = new Audio('betButtonSound.mp3');
  let bombSound = new Audio('bombSound.mp3');
  let gemSound = new Audio('gemSound.mp3');
  let cashoutSound = new Audio('cashoutSound.mp3');

  const gems = 25 - Number(bomb);
  // let maxWinAmount;

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

        setProfit(1);

        setGemCount(0);

        setMaxWin(false);
        console.log("Number of gems:", gems);

        setWinAmount(0);

        betSound.play();        
      }
      else{
        setGreaterBet(true);
      }
    }
  };

  //FUNCTION TO HANDLE THE LOGIC WHEN CASHOUT BUTTON IS CLICKED
  const cashoutClicked = () => {
    setActiveBet(false);
    setWinningPopUp(true);
    const calculatedWinAmount = (profit * Number(betAmount)).toFixed(2);
    setAmountInWallet( (prev) => (prev! + Number(calculatedWinAmount)) )
    setWinAmount(Number(calculatedWinAmount));

    cashoutSound.play();
    // setProfit(0);
    // setWinAmount( profit * Number(betAmount) );
  };

  const clickingMine = (index: any) => {
    // () => mineClicked(index)

    //mine is clickable only when a bet is active
    if (activeBet) {
      mineClicked(index);
    }
  };

  //FUNCTION TO UPDATE MULTIPLIER ON EVERY MINE CLICK
  const profitMultiplier = () => {

    if( bomb === '1' ){
      setProfit( oneBombArr[gemCount] );
      // setWinAmount( profit * Number(betAmount) );
    }
    else if( bomb === '2' ){
      setProfit( twoBombArr[gemCount] );
      // setWinAmount( profit * Number(betAmount) );
    }
    else if( bomb === '3' ){
      setProfit( threeBombArr[gemCount] );
      // setWinAmount( profit * Number(betAmount) );
    }
    else if( bomb === '4' ){
      setProfit( fourBombArr[gemCount] );
      // setWinAmount( profit * Number(betAmount) );
    }
    else if( bomb === '5' ){
      setProfit( fiveBombArr[gemCount] );
      // setWinAmount( profit * Number(betAmount) );
    }
    else if( bomb === '6' ){
      setProfit( sixBombArr[gemCount] );
      // setWinAmount( profit * Number(betAmount) );
    }
    else if( bomb === '7' ){
      setProfit( sevenBombArr[gemCount] );
      // setWinAmount( profit * Number(betAmount) );
    }
    else if( bomb === '8' ){
      setProfit( eightBombArr[gemCount] );
      // setWinAmount( profit * Number(betAmount) );
    }
    else if( bomb === '9' ){
      setProfit( nineBombArr[gemCount] );
      // setWinAmount( profit * Number(betAmount) );
    }
    else if( bomb === '10' ){
      setProfit( tenBombArr[gemCount] );
      // setWinAmount( profit * Number(betAmount) );
    }
    else if( bomb === '11' ){
      setProfit( elevenBombArr[gemCount] );
      // setWinAmount( profit * Number(betAmount) );
    }
    else if( bomb === '12' ){
      setProfit( twelveBombArr[gemCount] );
      // setWinAmount( profit * Number(betAmount) );
    }
    else if( bomb === '13' ){
      setProfit( thirteenBombArr[gemCount] );
      // setWinAmount( profit * Number(betAmount) );
    }
    else if( bomb === '14' ){
      setProfit( fourteenBombArr[gemCount] );
      // setWinAmount( profit * Number(betAmount) );
    }
    else if( bomb === '15' ){
      setProfit( fifteenBombArr[gemCount] );
      // setWinAmount( profit * Number(betAmount) );
    }
    else if( bomb === '16' ){
      setProfit( sixteenBombArr[gemCount] );
      // setWinAmount( profit * Number(betAmount) );
    }
    else if( bomb === '17' ){
      setProfit( seventeenBombArr[gemCount] );
      // setWinAmount( profit * Number(betAmount) );
    }
    else if( bomb === '18' ){
      setProfit( eighteenBombArr[gemCount] );
      // setWinAmount( profit * Number(betAmount) );
    }
    else if( bomb === '19' ){
      setProfit( nineteenBombArr[gemCount] );
      // setWinAmount( profit * Number(betAmount) );
    }
    else if( bomb === '20' ){
      setProfit( twentyBombArr[gemCount] );
      // setWinAmount( profit * Number(betAmount) );
    }
    else if( bomb === '21' ){
      setProfit( twentyOneBombArr[gemCount] );
      // setWinAmount( profit * Number(betAmount) );
    }
    else if( bomb === '22' ){
      setProfit( twentyTwoBombArr[gemCount] );
      // setWinAmount( profit * Number(betAmount) );
    }
    else if( bomb === '23' ){
      setProfit( twentyThreeBombArr[gemCount] );
      // setWinAmount( profit * Number(betAmount) );
    }
    else if( bomb === '24' ){
      setProfit( twentyFourBombArr[gemCount] );
      // setWinAmount( profit * Number(betAmount) );
    }

  }

  //FUNCTION WHICH WILL WORK WHEN A MINE IS CLICKED, LOGGING TO THE CONSOLE
  const mineClicked = (index: number) => {
    console.log("Clicked index:", index);
    console.log("Bomb count array:", bombCount);
    if (bombCount.includes(index)) {
      setClickedIndices((prev) => ({ ...prev, [index]: "bomb" }));
      console.log("Bomb Clicked");
      bombSound.play();
    } else {
      setClickedIndices((prev) => ({ ...prev, [index]: "gem" }));
      console.log("Gem Clicked");
      setGemCount( prev => prev + 1 );
      gemSound.play();

      if( gemCount === gems ){
        // setMaxWin(true);
        // console.log("all gems are clicked");
        maxWinFunction();
      }

      profitMultiplier();

      // setWinAmount( profit * Number(betAmount) );
    }

    if (bombCount.includes(index)) {
      setBombClicked(true);
      setActiveBet(false);
      setProfit(0);
      console.log("bet has been set to false again");
    } 

  };

  const maxWinFunction = () => {
    setMaxWin(true);

    if( bomb === '1' ){
     const lastIndex = oneBombArr.length - 1;
    //  maxWinAmount = oneBombArr[lastIndex] * Number(betAmount);
     setMaxWinAmount(oneBombArr[lastIndex] * Number(betAmount)) 
    }
    else if( bomb === '2' ){
      const lastIndex = twoBombArr.length - 1;
    //  maxWinAmount = twoBombArr[lastIndex] * Number(betAmount); 
     setMaxWinAmount(twoBombArr[lastIndex] * Number(betAmount)) 
    }
    else if( bomb === '3' ){
      const lastIndex = threeBombArr.length - 1;
      // maxWinAmount = threeBombArr[lastIndex] * Number(betAmount); 
      setMaxWinAmount(threeBombArr[lastIndex] * Number(betAmount)) 
    }
    else if( bomb === '4' ){
      const lastIndex = fourBombArr.length - 1;
    //  maxWinAmount = fourBombArr[lastIndex] * Number(betAmount);
    setMaxWinAmount(fourBombArr[lastIndex] * Number(betAmount))  
    }
    else if( bomb === '5' ){
      const lastIndex = fiveBombArr.length - 1;
    //  maxWinAmount = fiveBombArr[lastIndex] * Number(betAmount); 
    setMaxWinAmount(fiveBombArr[lastIndex] * Number(betAmount)) 
    }
    else if( bomb === '6' ){
      const lastIndex = sixBombArr.length - 1;
      // maxWinAmount = sixBombArr[lastIndex] * Number(betAmount); 
      setMaxWinAmount(sixBombArr[lastIndex] * Number(betAmount)) 
    }
    else if( bomb === '7' ){
      const lastIndex = sevenBombArr.length - 1;
    //  maxWinAmount = sevenBombArr[lastIndex] * Number(betAmount); 
    setMaxWinAmount(sevenBombArr[lastIndex] * Number(betAmount)) 
    }
    else if( bomb === '8' ){
      const lastIndex = eightBombArr.length - 1;
    //  maxWinAmount = eightBombArr[lastIndex] * Number(betAmount); 
    setMaxWinAmount(eightBombArr[lastIndex] * Number(betAmount)) 
    }
    else if( bomb === '9' ){
      const lastIndex = nineBombArr.length - 1;
    //  maxWinAmount = nineBombArr[lastIndex] * Number(betAmount);
    setMaxWinAmount(nineBombArr[lastIndex] * Number(betAmount))  
    }
    else if( bomb === '10' ){
      const lastIndex = tenBombArr.length - 1;
    //  maxWinAmount = tenBombArr[lastIndex] * Number(betAmount);
    setMaxWinAmount(tenBombArr[lastIndex] * Number(betAmount))  
    }
    else if( bomb === '11' ){
      const lastIndex = elevenBombArr.length - 1;
    //  maxWinAmount = elevenBombArr[lastIndex] * Number(betAmount); 
    setMaxWinAmount(elevenBombArr[lastIndex] * Number(betAmount)) 
    }
    else if( bomb === '12' ){
      const lastIndex = twelveBombArr.length - 1;
    //  maxWinAmount = twelveBombArr[lastIndex] * Number(betAmount); 
    setMaxWinAmount(twelveBombArr[lastIndex] * Number(betAmount)) 
    }
    else if( bomb === '13' ){
      const lastIndex = thirteenBombArr.length - 1;
    //  maxWinAmount = thirteenBombArr[lastIndex] * Number(betAmount); 
    setMaxWinAmount(thirteenBombArr[lastIndex] * Number(betAmount)) 
    }
    else if( bomb === '14' ){
      const lastIndex = fourteenBombArr.length - 1;
    //  maxWinAmount = fourteenBombArr[lastIndex] * Number(betAmount);
    setMaxWinAmount(fourteenBombArr[lastIndex] * Number(betAmount))  
    }
    else if( bomb === '15' ){
      const lastIndex = fifteenBombArr.length - 1;
    //  maxWinAmount = fifteenBombArr[lastIndex] * Number(betAmount); 
    setMaxWinAmount(fifteenBombArr[lastIndex] * Number(betAmount)) 
    }
    else if( bomb === '16' ){
      const lastIndex = sixteenBombArr.length - 1;
    //  maxWinAmount = sixteenBombArr[lastIndex] * Number(betAmount); 
    setMaxWinAmount(sixteenBombArr[lastIndex] * Number(betAmount)) 
    }
    else if( bomb === '17' ){
      const lastIndex = seventeenBombArr.length - 1;
    //  maxWinAmount = seventeenBombArr[lastIndex] * Number(betAmount);
    setMaxWinAmount(seventeenBombArr[lastIndex] * Number(betAmount))  
    }
    else if( bomb === '18' ){
      const lastIndex = eighteenBombArr.length - 1;
    //  maxWinAmount = eighteenBombArr[lastIndex] * Number(betAmount); 
    setMaxWinAmount(eighteenBombArr[lastIndex] * Number(betAmount)) 
    }
    else if( bomb === '19' ){
      const lastIndex = nineteenBombArr.length - 1;
      // maxWinAmount = nineteenBombArr[lastIndex] * Number(betAmount); 
      setMaxWinAmount(nineteenBombArr[lastIndex] * Number(betAmount)) 
    }
    else if( bomb === '20' ){
      const lastIndex = twentyBombArr.length - 1;
    //  maxWinAmount = twentyBombArr[lastIndex] * Number(betAmount); 
    setMaxWinAmount(twentyBombArr[lastIndex] * Number(betAmount)) 
    }
    else if( bomb === '21' ){
      const lastIndex = twentyOneBombArr.length - 1;
    //  maxWinAmount = twentyOneBombArr[lastIndex] * Number(betAmount);
    setMaxWinAmount(twentyOneBombArr[lastIndex] * Number(betAmount))  
    }
    else if( bomb === '22' ){
      const lastIndex = twentyTwoBombArr.length - 1;
    //  maxWinAmount = twentyTwoBombArr[lastIndex] * Number(betAmount); 
    setMaxWinAmount(twentyTwoBombArr[lastIndex] * Number(betAmount)) 
    }
    else if( bomb === '23' ){
      const lastIndex = twentyThreeBombArr.length - 1;
      // maxWinAmount = twentyThreeBombArr[lastIndex] * Number(betAmount);
      setMaxWinAmount(twentyThreeBombArr[lastIndex] * Number(betAmount))  
    }
    else if( bomb === '24' ){
      const lastIndex = twentyFourBombArr.length - 1;
    //  maxWinAmount = twentyFourBombArr[lastIndex] * Number(betAmount); 
    setMaxWinAmount(twentyFourBombArr[lastIndex] * Number(betAmount)) 
    }
    
    setActiveBet(false);
 
    console.log("All gems are clicked"); 
  }
  
  useEffect(() => {
    if (gemCount === gems) {
      maxWinFunction();
    }
  }, [gemCount]);

  //array of length 25 to display all div boxes through loop
  const divs = Array.from({ length: 25 });
  // localStorage.clear();

  console.log(bombCount);

  const closeAlertClicked = () => {
    setBetAmountAlert(false);
    setGreaterBet(false);
  };

  const reshuffleClicked = () => {
    setReshuffling(true);

    setTimeout( () => {

      setReshuffling(false);

    }, 2000 )
  }


  return (
    <>
      <div
        className={`h-screen w-full bg-[#1A2C38] flex flex-col justify-center items-center ${
          addMoneyButton ? "blur-sm" : ""
        } ${betAmountAlert ? "blur-sm" : ""} `}
      >
        <h1 className="my-6 text-5xl text-[#a4bcd3] font-extrabold">
          {" "}
          SHINY FORTUNE{" "}
        </h1>

        {/* WALLET LAYOUT AND UI */}
        <div className="top-12 right-16 h-12 w-64 bg-[#1475E1] rounded-lg absolute flex justify-center items-center">
          <div className="flex justify-center items-center h-full w-[25%]">
            <Wallet color="#ffffff" />
          </div>
          
          <div className=" h-full w-[57%] bg-[#0f212e] text-[#a4bcd3] font-bold flex justify-center items-center overflow-hidden">
            <h1 className="px-10">{amountInWallet}</h1>
          </div>

          <div className=" h-full w-[18%] text-xl font-bold flex justify-center items-center bg-[#00E701] hover:bg-[#1FFF20] rounded-r-lg hover:cursor-pointer ">
            <button onClick={addMoneyButtonClicked}>+</button>
          </div>
        </div>

        <div className={`my-4 h-[33rem] w-[80rem] bg-[#0f212e] rounded-xl flex flex-row justify-between items-center shadow-2xl ${ reshuffling ? 'blur-sm' : '' } `}>
          {/* bet amount wala box */}
          <div className=" flex flex-col justify-center items-center ml-10 h-[26rem] w-[30rem] bg-[#213743] text-[#a4bcd3] rounded-2xl">
            {/* BET AMOUNT FIELD */}
            <div className="w-full flex flex-row justify-between items-center my-5 ">
              {/* <div className="w-1/2 "> */}
              <p className=" ml-20 text-lg font-bold">Bet Amount</p>
              {/* </div> */}

              {/* <div className="w-1/2"> */}
              <input
                type="number"
                className="mr-20 h-9 w-44 p-2 text-sm border-2 border-[#557086] rounded-md text-white font-bold bg-[#0F212E] focus:outline-none hover:cursor-pointer"
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
                className="mr-20 h-9 w-44 p-2 text-sm border-2 border-[#557086] rounded-md text-white font-bold bg-[#0F212E] focus:outline-none hover:cursor-pointer"
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

              <div className="mr-20 h-9 w-44 p-2 text-sm border-2 border-[#557086] rounded-md text-white font-bold bg-[#0F212E] hover:cursor-pointer">
                {profit}x
              </div>
            </div>

            {/* BET BUTTON */}

            {activeBet ? (
              <button
                className="h-10 w-80 my-5 bg-[#00E701] hover:bg-[#1FFF20] font-bold text-black rounded-lg"
                onClick={cashoutClicked}
              >
                CASHOUT
              </button>
            ) : (
              <button
                className={`h-10 w-80 my-5 bg-[#00E701] hover:bg-[#1FFF20] font-bold text-black rounded-lg`}
                onClick={betButtonClicked}
                disabled={activeBet}
              >
                BET
              </button>
            )}

            {/* BUTTON FOR RE SHUFFLE THE BOARD */}
            <button
              className={ `h-10 w-80 my-2 bg-[#0F212E] font-bold text-[#a4bcd3] rounded-lg ${ activeBet ? 'transition-all ease-in-out delay-50 hover:border-[0.5px]' : '' } `}
              disabled={!activeBet}
              onClick={reshuffleClicked}
            >
              Re-Shuffle Board
            </button>
          </div>

          {/* grid wala box */}
          <div
            className={`grid grid-rows-5 grid-cols-5 gap-y-7 justify-items-center items-center mr-20 h-[27rem] w-[31rem] rounded-2xl ${
              winningPopUp ? "blur-sm" : ""
            } ${bombClicked ? "blur-sm" : ""} ${maxWin ? 'blur-sm' : '' } `}
          >
            {/* LOOPING THROUGH THE DIV TO SHOW MINES */}
            { divs.map((_, index) => {
                  const isClicked = clickedIndices.hasOwnProperty(index);
                  return (
                    <div
                      key={index}
                      className={ `h-20 w-20 bg-[#2f4553] flex justify-center items-center rounded-lg hover:cursor-pointer mineField ${ isClicked ? 'mineClicked' : '' } `}
                      // onClick={() => clickingMine(index)}
                      onClick={() => {
                        if (!isClicked) {
                          clickingMine(index);
                        }
                      }}
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

      {/* MAX WIN COMPONENT */}
      { maxWin && ( <Winning winningMultiplier={profit} winningAmount= {maxWinAmount} /> ) }

      {/* WINNING COMPONENT */}
      {winningPopUp && (
        <Winning winningMultiplier={profit} winningAmount= {winAmount} />
      )}

      {/* WHEN A BOMB IS CLICKED */}
      {bombClicked && <Winning winningMultiplier="0.00" winningAmount="0.00" />}

      {betAmountAlert && <AlertBox alertTitle="No Bet Amount Set" alertDescription='Please set a bet amount (atleast 0)' closeAlertBox={closeAlertClicked} />}

      { greaterBet && < AlertBox alertTitle="Low Balance" alertDescription='Insufficient balance in the wallet' closeAlertBox={closeAlertClicked} /> }

      { reshuffling && < ReShuffle />  }
      
    </>
  );
}
