/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";
import WelcomeRPS from "./images/WelcomeRPS";



// initial frame shows four actions, RPS and like status?
// if the player clicks status it'll grab the queue size?
// if the player hits RPS it'll play for them unless they're already in the queue



const handleRequest = frames(async (ctx) => {

  // if (!ctx?.message?.isValid) {
  //   throw new Error("Invalid Frame");
  // }

  const action = ctx.searchParams.value;
  if (!action) {
    
  }


  return {
    image: (
      getImage(ctx.searchParams.value)
    ),
    buttons: [
      <Button action="post" target={{ pathname: "/rps", query: { value: "rock" } }}>
        ROCK
      </Button>,
      <Button action="post" target={{ pathname: "/rps", query: { value: "paper" } }}>
        PAPER
      </Button>,
      <Button action="post" target={{ pathname: "/rps", query: { value: "scissors" } }}>
        SCISSORS
      </Button>,
      <Button action="link" target={"https://docs.playtavern.com"}>
        Status
      </Button>,
    ],
  };
});

const getImage = (action: string) => {
  if (action === "rock") {
    return <WelcomeRPS
      titleFirst="come play"
      titleSecond="ROCK PAPER SCISSORS"
      rowOneFirst="at the"
      rowOneSecond="farcade"
      rowTwoFirst="built on-chain with the"
      rowTwoSecond="tavern game engine"
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
  rowTwoSecond="tavern game engine"
  />
}

export const GET = handleRequest;
export const POST = handleRequest;