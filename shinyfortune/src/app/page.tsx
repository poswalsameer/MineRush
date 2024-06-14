"use client";

import { Jersey_25 } from "next/font/google";
import { useEffect, useState } from "react";
import AddMoney from "./components/AddMoney";
import Winning from "./components/Winning";
import { Wallet } from 'lucide-react';
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
  const [negativeBet, setNegativeBet] = useState<boolean>(false);

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

  //AUDIOS USED 
  let betSound = new Audio('betButtonSound.mp3');
  let bombSound = new Audio('bombSound.mp3');
  let gemSound = new Audio('gemSound.mp3');
  let cashoutSound = new Audio('cashoutSound.mp3');

  //CALCULATING THE NUMBER OF GEMS
  const gems = 25 - Number(bomb);

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

      if( Number(betAmount) < 0 ){
        setNegativeBet(true);
      }

      else if (amountInWallet !== null && amountInWallet >= Number(betAmount)) {
      
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
        // console.log("Generated bomb array:", bombArr);
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
    setAmountInWallet((prev) => Number((prev! + Number(calculatedWinAmount)).toFixed(2)));
    setWinAmount(Number(calculatedWinAmount));

    //WHEN CASHOUT BUTTON CLICKED, THIS SOUND PLAYS
    cashoutSound.play();
  };

  const clickingMine = (index: any) => {
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
        maxWinFunction();
      }

      profitMultiplier();

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

  console.log(bombCount);

  const closeAlertClicked = () => {
    setBetAmountAlert(false);
    setGreaterBet(false);
    setNegativeBet(false);
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
        className={`h-full w-full bg-[#1A2C38] flex flex-col justify-center items-center
        
        sm:h-full sm:w-full sm:bg-[#1A2C38] sm:flex sm:flex-col sm:justify-center sm:items-center
        
        md:h-screen md:w-full md:bg-[#1A2C38] md:flex md:flex-col md:justify-center md:items-center
        
        lg:h-screen lg:w-full lg:bg-[#1A2C38] lg:flex lg:flex-col lg:justify-center lg:items-center
        
        xl:h-screen xl:w-full xl:bg-[#1A2C38] xl:flex xl:flex-col xl:justify-center xl:items-center
        
        2xl:h-screen 2xl:w-full 2xl:bg-[#1A2C38] 2xl:flex 2xl:flex-col 2xl:justify-center 2xl:items-center ${
          addMoneyButton ? "blur-sm" : ""
        } ${betAmountAlert ? "blur-sm" : ""} `}
      >

      {/* WALLET LAYOUT AND UI */}
      <div className="mt-10 h-10 w-44 rounded-lg flex justify-center items-center
              
              sm:mt-10 sm:h-12 sm:w-56 sm:rounded-lg sm:flex sm:justify-center sm:items-center
              
              md:mt-8 md:h-14 md:w-56 md:rounded-lg md:flex md:justify-center md:items-center
              
              lg:mt-3 lg:h-12 lg:w-56 lg:rounded-lg lg:flex lg:justify-center lg:items-center
              
              xl:mt-3 xl:h-12 xl:w-64 xl:rounded-lg xl:flex xl:justify-center xl:items-center
              
              2xl:mt-3 2xl:h-12 2xl:w-64 2xl:rounded-lg 2xl:flex 2xl:justify-center 2xl:items-center">

                <div className="flex justify-center items-center h-full w-[20%] bg-[#1475E1] rounded-l-lg
                
                sm:flex sm:justify-center sm:items-center sm:h-full sm:w-[20%] sm:bg-[#1475E1] sm:rounded-l-lg
                
                md:flex md:justify-center md:items-center md:h-full md:w-[20%] md:bg-[#1475E1] md:rounded-l-lg
                
                lg:flex lg:justify-center lg:items-center lg:h-full lg:w-[20%] lg:bg-[#1475E1] lg:rounded-l-lg
                
                xl:flex xl:justify-center xl:items-center xl:h-full xl:w-[20%] xl:bg-[#1475E1] xl:rounded-l-lg
                
                2xl:flex 2xl:justify-center 2xl:items-center 2xl:h-full 2xl:w-[20%] 2xl:bg-[#1475E1] 2xl:rounded-l-lg">
                  <Wallet color="#ffffff" />
                </div>
                
                <div className="h-full w-[60%] bg-[#0f212e] text-[#a4bcd3] font-bold flex justify-center items-center overflow-hidden
                
                sm:h-full sm:w-[60%] sm:bg-[#0f212e] sm:text-[#a4bcd3] sm:font-bold sm:flex sm:justify-center sm:items-center sm:overflow-hidden
                
                md:h-full md:w-[60%] md:bg-[#0f212e] md:text-[#a4bcd3] md:font-bold md:flex md:justify-center md:items-center md:overflow-hidden
                
                lg:h-full lg:w-[60%] lg:bg-[#0f212e] lg:text-[#a4bcd3] lg:font-bold lg:flex lg:justify-center lg:items-center lg:overflow-hidden 
                
                xl:h-full xl:w-[60%] xl:bg-[#0f212e] xl:text-[#a4bcd3] xl:font-bold xl:flex xl:justify-center xl:items-center xl:overflow-hidden 
                
                2xl:h-full 2xl:w-[60%] 2xl:bg-[#0f212e] 2xl:text-[#a4bcd3] 2xl:font-bold 2xl:flex 2xl:justify-center 2xl:items-center 2xl:overflow-hidden">
                  <h1 className="px-10 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-10">{amountInWallet}</h1>
                </div>

                <div className="h-full w-[20%] text-xl font-bold flex justify-center items-center bg-[#00E701] hover:bg-[#1FFF20] rounded-r-lg hover:cursor-pointer
                
                sm:h-full sm:w-[20%] sm:text-xl sm:font-bold sm:flex sm:justify-center sm:items-center sm:bg-[#00E701] sm:hover:bg-[#1FFF20] sm:rounded-r-lg sm:hover:cursor-pointer
                
                md:h-full md:w-[20%] md:text-xl md:font-bold md:flex md:justify-center md:items-center md:bg-[#00E701] md:hover:bg-[#1FFF20] md:rounded-r-lg md:hover:cursor-pointer
                
                lg:h-full lg:w-[20%] lg:text-xl lg:font-bold lg:flex lg:justify-center lg:items-center lg:bg-[#00E701] lg:hover:bg-[#1FFF20] lg:rounded-r-lg lg:hover:cursor-pointer 
                
                xl:h-full xl:w-[20%] xl:text-xl xl:font-bold xl:flex xl:justify-center xl:items-center xl:bg-[#00E701] xl:hover:bg-[#1FFF20] xl:rounded-r-lg xl:hover:cursor-pointer 
                
                2xl:h-full 2xl:w-[20%] 2xl:text-xl 2xl:font-bold 2xl:flex 2xl:justify-center 2xl:items-center 2xl:bg-[#00E701] 2xl:hover:bg-[#1FFF20] 2xl:rounded-r-lg 2xl:hover:cursor-pointer ">
                  <button className="h-full w-full" onClick={addMoneyButtonClicked}>+</button>
                </div>
              </div>


        <h1 className="mt-10 text-4xl text-[#a4bcd3] font-extrabold
        
        sm:mt-8 sm:text-5xl sm:text-[#a4bcd3] sm:font-extrabold
        
        md:mt-8 md:text-5xl md:text-[#a4bcd3] md:font-extrabold
        
        lg:mt-8 lg:text-5xl lg:text-[#a4bcd3] lg:font-extrabold
        
        xl:mt-8 xl:text-5xl xl:text-[#a4bcd3] xl:font-extrabold
        
        2xl:mt-8 2xl:text-5xl 2xl:text-[#a4bcd3] 2xl:font-extrabold">
          {" "}
          MineRush{" "}
        </h1>

        <div className={`my-8 h-[44rem] w-[20rem] bg-[#0f212e] rounded-xl flex flex-col-reverse justify-between items-center shadow-2xl
        
        sm:my-7 sm:h-[48rem] sm:w-[31rem] sm:bg-[#0f212e] sm:rounded-xl sm:flex sm:flex-col-reverse sm:justify-between sm:items-center sm:shadow-2xl
        
        md:my-5 md:h-[31rem] md:w-[44rem] md:bg-[#0f212e] md:rounded-xl md:flex md:flex-row md:justify-between md:items-center md:shadow-2xl
        
        lg:my-6 lg:h-[30rem] lg:w-[58rem] lg:bg-[#0f212e] lg:rounded-xl lg:flex lg:flex-row lg:justify-between lg:items-center lg:shadow-2xl
        
        xl:my-6 xl:h-[32rem] xl:w-[75rem] xl:bg-[#0f212e] xl:rounded-xl xl:flex xl:flex-row xl:justify-between xl:items-center xl:shadow-2xl
        
        2xl:my-6 2xl:h-[32rem] 2xl:w-[80rem] 2xl:bg-[#0f212e] 2xl:rounded-xl 2xl:flex 2xl:flex-row 2xl:justify-between 2xl:items-center 2xl:shadow-2xl ${ reshuffling ? 'blur-sm' : '' } `}>
          {/* BET AMOUNT WALA BOX*/}
          <div className="py-5 my-8 flex flex-col justify-center items-center ml-0 h-[18rem] w-[17rem] bg-[#213743] text-[#a4bcd3] rounded-xl
          
          sm:py-5 sm:my-8 sm:flex sm:flex-col sm:justify-center sm:items-center sm:ml-0 sm:h-[19rem] sm:w-[22rem] sm:bg-[#213743] sm:text-[#a4bcd3] sm:rounded-xl
          
          md:flex md:flex-col md:justify-center md:items-center md:ml-9 md:h-[21rem] md:w-[17.5rem] md:bg-[#213743] md:text-[#a4bcd3] md:rounded-xl
          
          lg:flex lg:flex-col lg:justify-center lg:items-center lg:ml-10 lg:h-[26rem] lg:w-[22rem] lg:bg-[#213743] lg:text-[#a4bcd3] lg:rounded-2xl
          
          xl:flex xl:flex-col xl:justify-center xl:items-center xl:ml-10 xl:h-[26rem] xl:w-[30rem] xl:bg-[#213743] xl:text-[#a4bcd3] xl:rounded-2xl 
          
          2xl:flex 2xl:flex-col 2xl:justify-center 2xl:items-center 2xl:ml-10 2xl:h-[26rem] 2xl:w-[30rem] 2xl:bg-[#213743] 2xl:text-[#a4bcd3] 2xl:rounded-2xl">
            {/* BET AMOUNT FIELD */}
            <div className="w-full flex flex-row justify-between items-center my-2 
            
            sm:w-full sm:flex sm:flex-row sm:justify-between sm:items-center sm:my-1 
            
            md:w-full md:flex md:flex-row md:justify-between md:items-center md:my-3 
            
            lg:w-full lg:flex lg:flex-row lg:justify-between lg:items-center lg:my-5 
            
            xl:w-full xl:flex xl:flex-row xl:justify-between xl:items-center xl:my-5 
            
            2xl:w-full 2xl:flex 2xl:flex-row 2xl:justify-between 2xl:items-center 2xl:my-5 ">
              
              <p className="ml-8 text-xs font-bold

              sm:ml-14 sm:text-sm sm:font-bold
              
              md:ml-8 md:text-sm md:font-bold
              
              lg:ml-12 lg:text-md lg:font-bold
              
              xl:ml-20 xl:text-lg xl:font-bold 
              
              2xl:ml-20 2xl:text-lg 2xl:font-bold">Bet Amount</p>
              
              <input
                type="number"
                className="mr-8 h-8 w-28 p-1 text-xs border-2 border-[#557086] rounded-sm text-white font-bold bg-[#0F212E] focus:outline-none hover:cursor-pointer
                
                sm:mr-14 sm:h-8 sm:w-28 sm:p-1 sm:text-xs sm:border-2 sm:border-[#557086] sm:rounded-sm sm:text-white sm:font-bold sm:bg-[#0F212E] sm:focus:outline-none sm:hover:cursor-pointer
                
                md:mr-10 md:h-8 md:w-28 md:p-1 md:text-xs md:border-2 md:border-[#557086] md:rounded-sm md:text-white md:font-bold md:bg-[#0F212E] md:focus:outline-none md:hover:cursor-pointer
                
                lg:mr-12 lg:h-9 lg:w-36 lg:p-2 lg:text-sm lg:border-2 lg:border-[#557086] lg:rounded-md lg:text-white lg:font-bold lg:bg-[#0F212E] lg:focus:outline-none lg:hover:cursor-pointer
                
                xl:mr-20 xl:h-9 xl:w-44 xl:p-2 xl:text-sm xl:border-2 xl:border-[#557086] xl:rounded-md xl:text-white xl:font-bold xl:bg-[#0F212E] xl:focus:outline-none xl:hover:cursor-pointer
                
                2xl:mr-20 2xl:h-9 2xl:w-44 2xl:p-2 2xl:text-sm 2xl:border-2 2xl:border-[#557086] 2xl:rounded-md 2xl:text-white 2xl:font-bold 2xl:bg-[#0F212E] 2xl:focus:outline-none 2xl:hover:cursor-pointer "
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                disabled={activeBet}
              />
              
            </div>

            {/* NUMBER OF MINES FIELD */}
            <div className="w-full flex flex-row justify-between items-center my-2
            
            sm:w-full sm:flex sm:flex-row sm:justify-between sm:items-center sm:my-1
            
            md:w-full md:flex md:flex-row md:justify-between md:items-center md:my-3
            
            lg:w-full lg:flex lg:flex-row lg:justify-between lg:items-center lg:my-5
            
            xl:w-full xl:flex xl:flex-row xl:justify-between xl:items-center xl:my-5
            
            2xl:w-full 2xl:flex 2xl:flex-row 2xl:justify-between 2xl:items-center 2xl:my-5">
              
              <p className="ml-8 text-xs font-bold
              
              sm:ml-14 sm:text-sm sm:font-bold
              
              md:ml-8 md:text-sm md:font-bold
              
              lg:ml-12 lg:text-md lg:font-bold
              
              xl:ml-20 xl:text-lg xl:font-bold
              
              2xl:ml-20 2xl:text-lg 2xl:font-bold">Mines</p>
                            
              <select
                name="mine"
                id="min"
                className="mr-8 h-8 w-28 p-1 text-xs border-2 border-[#557086] rounded-sm text-white font-bold bg-[#0F212E] 
                
                sm:mr-14 sm:h-8 sm:w-28 sm:p-1 sm:text-xs sm:border-2 sm:border-[#557086] sm:rounded-sm sm:text-white sm:font-bold sm:bg-[#0F212E] 
                
                md:mr-10 md:h-8 md:w-28 md:p-1 md:text-xs md:border-2 md:border-[#557086] md:rounded-sm md:text-white md:font-bold md:bg-[#0F212E] 
                
                lg:mr-12 lg:h-9 lg:w-36 lg:p-2 lg:text-sm lg:border-2 lg:border-[#557086] lg:rounded-md lg:text-white lg:font-bold lg:bg-[#0F212E] 
                
                xl:mr-20 xl:h-9 xl:w-44 xl:p-2 xl:text-sm xl:border-2 xl:border-[#557086] xl:rounded-md xl:text-white xl:font-bold xl:bg-[#0F212E] 
                
                2xl:mr-20 2xl:h-9 2xl:w-44 2xl:p-2 2xl:text-sm 2xl:border-2 2xl:border-[#557086] 2xl:rounded-md 2xl:text-white 2xl:font-bold 2xl:bg-[#0F212E] focus:outline-none hover:cursor-pointer "
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
              
            </div>

            {/* PROFIT BOX */}
            <div className="w-full flex flex-row justify-between items-center my-2
            
            sm:w-full sm:flex sm:flex-row sm:justify-between sm:items-center sm:my-1
            
            md:w-full md:flex md:flex-row md:justify-between md:items-center md:my-3
            
            lg:w-full lg:flex lg:flex-row lg:justify-between lg:items-center lg:my-5
            
            xl:w-full xl:flex xl:flex-row xl:justify-between xl:items-center xl:my-5
            
            2xl:w-full 2xl:flex 2xl:flex-row 2xl:justify-between 2xl:items-center 2xl:my-5 ">

              <p className="ml-8 text-xs font-bold
              
              sm:ml-14 sm:text-sm sm:font-bold
              
              md:ml-8 md:text-sm md:font-bold
              
              lg:ml-12 lg:text-md lg:font-bold 
              
              xl:ml-20 xl:text-lg xl:font-bold 
              
              2xl:ml-20 2xl:text-lg 2xl:font-bold">Profit</p>

              <div className="mr-8 h-8 w-28 p-1 text-xs border-2 border-[#557086] rounded-sm text-white font-bold bg-[#0F212E]
              
              sm:mr-14 sm:h-8 sm:w-28 sm:p-1 sm:text-xs  sm:border-2 sm:border-[#557086] sm:rounded-sm sm:text-white sm:font-bold sm:bg-[#0F212E]
              
              md:mr-10 md:h-8 md:w-28 md:p-1 md:text-xs  md:border-2 md:border-[#557086] md:rounded-sm md:text-white md:font-bold md:bg-[#0F212E]
              
              lg:mr-12 lg:h-9 lg:w-36 lg:p-2 lg:text-sm lg:border-2 lg:border-[#557086] lg:rounded-md lg:text-white lg:font-bold lg:bg-[#0F212E]
              
              xl:mr-20 xl:h-9 xl:w-44 xl:p-2 xl:text-sm xl:border-2 xl:border-[#557086] xl:rounded-md xl:text-white xl:font-bold xl:bg-[#0F212E]
              
              2xl:mr-20 2xl:h-9 2xl:w-44 2xl:p-2 2xl:text-sm 2xl:border-2 2xl:border-[#557086] 2xl:rounded-md 2xl:text-white 2xl:font-bold 2xl:bg-[#0F212E] flex items-center  hover:cursor-pointer ">
                {profit}x
              </div>
            </div>

            {/* BET BUTTON */}

            {activeBet ? (
              <button
                className="h-8 w-44 my-4 bg-[#00E701] hover:bg-[#1FFF20] font-bold text-black rounded-sm
                
                sm:h-8 sm:w-60 sm:my-4 sm:bg-[#00E701] sm:hover:bg-[#1FFF20] sm:font-bold sm:text-black sm:rounded-md
                
                md:h-9 md:w-48 md:my-5 md:bg-[#00E701] md:hover:bg-[#1FFF20] md:font-bold md:text-black md:rounded-md
                
                lg:h-10 lg:w-64 lg:my-5 lg:bg-[#00E701] lg:hover:bg-[#1FFF20] lg:font-bold lg:text-black lg:rounded-md
                
                xl:h-10 xl:w-80 xl:my-5 xl:bg-[#00E701] xl:hover:bg-[#1FFF20] xl:font-bold xl:text-black xl:rounded-md
                
                2xl:h-10 2xl:w-80 2xl:my-5 2xl:bg-[#00E701] 2xl:hover:bg-[#1FFF20] 2xl:font-bold 2xl:text-black 2xl:rounded-md shadow-sm shadow-green-950"
                onClick={cashoutClicked}
              >
                CASHOUT
              </button>
            ) : (
              <button
                className={`h-8 w-44 my-4 bg-[#00E701] hover:bg-[#1FFF20] font-bold text-black rounded-sm
                
                sm:h-8 sm:w-60 sm:my-4 sm:bg-[#00E701] sm:hover:bg-[#1FFF20] sm:font-bold sm:text-black sm:rounded-md
                
                md:h-9 md:w-48 md:my-5 md:bg-[#00E701] md:hover:bg-[#1FFF20] md:font-bold md:text-black md:rounded-md
                
                lg:h-10 lg:w-64 lg:my-5 lg:bg-[#00E701] lg:hover:bg-[#1FFF20] lg:font-bold lg:text-black lg:rounded-md
                
                xl:h-10 xl:w-80 xl:my-5 xl:bg-[#00E701] xl:hover:bg-[#1FFF20] xl:font-bold xl:text-black xl:rounded-md
                
                2xl:h-10 2xl:w-80 2xl:my-5 2xl:bg-[#00E701] 2xl:hover:bg-[#1FFF20] 2xl:font-bold 2xl:text-black 2xl:rounded-md shadow-sm shadow-green-950`}
                
                onClick={betButtonClicked}
                disabled={activeBet}
              >
                BET
              </button>
            )}

            {/* BUTTON FOR RE SHUFFLE THE BOARD */}
            <button
              className={ `h-9 w-44 my-2 bg-[#0F212E] font-bold text-xs text-[#a4bcd3] rounded-sm
              
              sm:h-9 sm:w-60 sm:my-2 sm:bg-[#0F212E] sm:font-bold sm:text-xs sm:text-[#a4bcd3] sm:rounded-md
              
              md:h-9 md:w-48 md:my-2 md:bg-[#0F212E] md:font-bold md:text-xs md:text-[#a4bcd3] md:rounded-md
              
              lg:h-10 lg:w-64 lg:my-2 lg:bg-[#0F212E] lg:font-bold lg:text-[#a4bcd3] lg:rounded-md lg:text-base
              
              xl:h-10 xl:w-80 xl:my-2 xl:bg-[#0F212E] xl:font-bold xl:text-[#a4bcd3] xl:rounded-md xl:text-base
              
              2xl:h-10 2xl:w-80 2xl:my-2 2xl:bg-[#0F212E] 2xl:font-bold 2xl:text-[#a4bcd3] 2xl:rounded-md 2xl:text-base ${ activeBet ? 'transition-all ease-in-out delay-50 hover:border-[0.5px]' : '' } `}
              disabled={!activeBet}
              onClick={reshuffleClicked}
            >
              Re-Shuffle Board
            </button>
          </div>

          {/* GRID WALA BOX */}
          <div
            className={`my-12 grid grid-rows-5 grid-cols-5 gap-y-3 justify-items-center items-center mr-0 h-[20rem] w-[17rem] rounded-2xl 
            
            sm:my-12 sm:grid sm:grid-rows-5 sm:grid-cols-5 sm:gap-y-4 sm:justify-items-center sm:items-center sm:mr-0 sm:h-[21rem] sm:w-[21rem] sm:rounded-2xl
            
            md:grid md:grid-rows-5 md:grid-cols-5 md:gap-y-2 md:justify-items-center md:items-center md:mr-8 md:h-[20rem] md:w-[20rem] md:rounded-2xl
            
            lg:grid lg:grid-rows-5 lg:grid-cols-5 lg:gap-y-3 lg:justify-items-center lg:items-center lg:mr-14 lg:h-[25rem] lg:w-[24rem] lg:rounded-2xl
            
            xl:grid xl:grid-rows-5 xl:grid-cols-5 xl:gap-y-4 xl:justify-items-center xl:items-center xl:mr-24 xl:h-[27rem] xl:w-[28rem] xl:rounded-2xl
            
            2xl:grid 2xl:grid-rows-5 2xl:grid-cols-5 2xl:gap-y-4 2xl:justify-items-center 2xl:items-center 2xl:mr-24 2xl:h-[27rem] 2xl:w-[28rem] 2xl:rounded-2xl ${
              winningPopUp ? "blur-sm" : ""
            } ${bombClicked ? "blur-sm" : ""} ${maxWin ? 'blur-sm' : '' } `}
          >
            {/* LOOPING THROUGH THE DIV TO SHOW MINES */}
            { divs.map((_, index) => {
                  const isClicked = clickedIndices.hasOwnProperty(index);
                  return (
                    <div
                      key={index}
                      className={ `h-[2.8rem] w-[2.8rem] bg-[#2f4553] flex justify-center items-center rounded-sm mineField
                      
                      sm:h-[3.4rem] sm:w-[3.4rem] sm:bg-[#2f4553] sm:flex sm:justify-center sm:items-center sm:rounded-sm sm:mineField
                      
                      md:h-[3.2rem] md:w-[3.2rem] md:bg-[#2f4553] md:flex md:justify-center md:items-center md:rounded-md md:mineField
                      
                      lg:h-[4.2rem] lg:w-[4.2rem] lg:bg-[#2f4553] lg:flex lg:justify-center lg:items-center lg:rounded-lg lg:mineField
                      
                      xl:h-[4.5rem] xl:w-[4.5rem] xl:bg-[#2f4553] xl:flex xl:justify-center xl:items-center xl:rounded-lg xl:mineField
                      
                      2xl:h-[4.5rem] 2xl:w-[4.5rem] 2xl:bg-[#2f4553] 2xl:flex 2xl:justify-center 2xl:items-center 2xl:rounded-lg hover:cursor-pointer 2xl:mineField ${ isClicked ? 'mineClicked' : '' } `}
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
                              ? "mr-1 sm:mr-1 md:mr-1 lg:mr-1 xl:mr-1 2xl:mr-1 image-size"
                              : "ml-1 sm:ml-1 md:ml-1 lg:ml-1 xl:ml-1 2xl:ml-1"
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

      { negativeBet && < AlertBox alertTitle="Negative Bet" alertDescription='Bet amount cannot be less than 0' closeAlertBox={closeAlertClicked} /> }

      { reshuffling && < ReShuffle />  }
      
    </>
  );
}
