/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";
import WelcomeRPS from "./images/WelcomeRPS";
import { RPS_GAME_ADDRESS } from "@/domain/deployments";



// initial frame shows four actions, RPS and like status?
// if the player clicks status it'll grab the queue size?
// if the player hits RPS it'll play for them unless they're already in the queue



const handleRequest = frames(async (ctx) => {

  // if (!ctx?.message?.isValid) {
  //   throw new Error("Invalid Frame");
  // }

  const action = ctx.searchParams.action;
  const game = RPS_GAME_ADDRESS;
  if (!action) {

  }
  console.log("action", action);
  // console.log("game", game);

  const postURL = `/rps/frame?action=`;
  const txURL = `/rps/frame/txdata?action=`;
  const imageURL = `/rps/frame/images`;


  return {
    image: (
      getImage(action)
    ),
    buttons: [
      <Button
        action="tx"
        target={{ pathname: "/rps/frame/txdata", query: { action: "rock", game: game } }}
        post_url={{ pathname: "/rps/frame", query: { action: "scissors", game: game } }}>
        ROCK
      </Button>,
      <Button
        action="tx"
        target={{ pathname: "/rps/frame/txdata", query: { action: "paper", game: game } }}
        post_url={{ pathname: "/rps/frame", query: { action: "paper", game: game } }}>
        PAPER
      </Button>,
      <Button 
      action="post" 
      target={{ pathname: "/rps/frame", query: { action: "scissors" } }}>
        SCISSORS
      </Button>,
      <Button
        action="link" target={"https://www.playtavern.com"}>
        TAVERN
      </Button>,
    ],
  };
});

const getImage = (action: string) => {
  if (action === "rock") {
    return <WelcomeRPS
      titleFirst="you played"
      titleSecond="ROCK"
      rowOneFirst="at the"
      rowOneSecond="farcade"
      rowTwoFirst="built on-chain with the"
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
  }
  // first load
  return <WelcomeRPS
    titleFirst="come play"
    titleSecond="ROCK PAPER SCISSORS"
    rowOneFirst="at the"
    rowOneSecond="farcade"
    rowTwoFirst="built on-chain with the"
    rowTwoSecond="tavern"
  />
}

export const GET = handleRequest;
export const POST = handleRequest;