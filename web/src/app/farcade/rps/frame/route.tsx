/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { CHAIN_ID, frames } from "./frames";
import WelcomeRPS from "./images/WelcomeRPS";
import { getDeployment, getGameResult, isPlayerInQueue } from "@/services/viemService";
import { Address, zeroAddress } from "viem";
import { bigIntReplacer } from "@/domain/utils";
import { RPSGameResult } from "@/domain/Domain";



// initial frame shows four actions, RPS and like status?
// if the player clicks status it'll grab the queue size?
// if the player hits RPS it'll play for them unless they're already in the queue



const handleRequest = frames(async (ctx) => {

  // if (!ctx?.message?.isValid) {
  //   throw new Error("Invalid Frame");
  // }

  const action = ctx.searchParams.action;
  if (!action) {

  }
  console.log("action", action);

  const postURL = `/rps/frame?action=`;
  const txURL = `/rps/frame/txdata?action=`;
  const imageURL = `/rps/frame/images`;

  // const userAddress = "0x2273fFEd38ED040FBcd3e45Cd807594d27ebfAE3";//ctx?.message?.connectedAddress;
  const userAddress = ctx?.message?.connectedAddress;





  const deployment = getDeployment(CHAIN_ID);
  const resultAddress = deployment.resultComponent;
  const game = deployment.rpsGame;
  // console.log('-----------')
  // console.log('game', game)
  // console.log('resultAddress', resultAddress)
  // console.log('userAddress', userAddress)
  // console.log('-----------')


  const result = await getGameResult(CHAIN_ID, resultAddress, game, userAddress as Address);
  const inQueue = await isPlayerInQueue(CHAIN_ID, game, userAddress as Address);
// console.log(JSON.stringify(result, bigIntReplacer))

  return {
    image: (
      getImage(action, userAddress, result, inQueue)
    ),
    buttons: [
      <Button
        action="tx"
        target={{ pathname: "/rps/frame/txdata", query: { action: "rock", game: game } }}
        post_url={{ pathname: "/rps/frame", query: { action: "rock", game: game } }}>
        ROCK
      </Button>,
      <Button
        action="tx"
        target={{ pathname: "/rps/frame/txdata", query: { action: "paper", game: game } }}
        post_url={{ pathname: "/rps/frame", query: { action: "paper", game: game } }}>
        PAPER
      </Button>,
      <Button
        action="tx"
        target={{ pathname: "/rps/frame/txdata", query: { action: "scissors", game: game } }}
        post_url={{ pathname: "/rps/frame", query: { action: "scissors", game: game } }}>
        SCISSORS
      </Button>,
      <Button
        action="post" 
        target={{ pathname: "/rps/frame", query: { action: "results", game: game } }}>
        RESULTS
      </Button>,
    ],
  };
});

// async function getImage(action: string, userAddress: string | undefined) {

const getImage = (action: string, userAddress: string | undefined, result: RPSGameResult, inQueue: boolean) => {

  if (action === "rock") {
    return <WelcomeRPS
      titleFirst="you played"
      titleSecond="ROCK"
      rowOneFirst="at the"
      rowOneSecond="farcade"
      rowTwoFirst="built onchain with the"
      rowTwoSecond="tavern"
    />

  } else if (action == "paper") {
    return <WelcomeRPS
      rowOneFirst="string"
      rowOneSecond="string"
      rowTwoFirst="string"
      rowTwoSecond="string"
      titleFirst="it is a"
      titleSecond="tie!"
    />
  } else if (action == "scissors") {
    return <WelcomeRPS
      rowOneFirst="string"
      rowOneSecond="string"
      rowTwoFirst=""
      rowTwoSecond=""
      titleFirst="you are in the"
      titleSecond="queue"
    />
  } else if (action == "results" && userAddress) {

    let titleFirst = "";
    let titleSecond = "";
    let rowOneFirst = "";
    let rowOneSecond = "";
    let rowTwoFirst = "";
    let rowTwoSecond = "";
    
    // states:
    // never played
    // in queue and played before
    // in queue and never played
    // not in queue and played before
    // not in queue and never played

    if (inQueue) {
      titleFirst = "you are in the";
      titleSecond = "queue";
    }

    
    let winner = "draw";
    if (result?.winner === userAddress) {
      winner = "win";
    }else {
      winner = "loss";
    }


    return <WelcomeRPS
      rowOneFirst="row one"
      rowOneSecond="one"
      rowTwoFirst="row two"
      rowTwoSecond="two "
      titleFirst="title"
      titleSecond="title"
    />
  }
  // first load
  return <WelcomeRPS
    titleFirst="come play"
    titleSecond="ROCK PAPER SCISSORS"
    rowOneFirst="at the"
    rowOneSecond="farcade"
    rowTwoFirst="built onchain with the"
    rowTwoSecond="tavern protocol"
  />
}

export const GET = handleRequest;
export const POST = handleRequest;