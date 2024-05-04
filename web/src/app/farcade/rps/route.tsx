/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";
import WelcomeRPS from "./images/WelcomeRPS";

const handleRequest = frames(async (ctx) => {

  // if (!ctx?.message?.isValid) {
  //   throw new Error("Invalid Frame");
  // }
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
      <Button action="link" target={"https://docs.playtavern.com" }>
        Tavern
      </Button>,
    ],
  };
});

const getImage = (action: string) => {
  if (action === "rock") {
    return <WelcomeRPS
      rowOneFirst="string"
      rowOneSecond="string"
      rowTwoFirst="string"
      rowTwoSecond="string"
      titleFirst="you"
      titleSecond="won"
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

  return <WelcomeRPS
    rowOneFirst="Welcome to the"
    rowOneSecond="Farcade"
    rowTwoFirst="We have"
    rowTwoSecond="Rock Paper Scissors"
    titleFirst=""
    titleSecond=""
      />
}

export const GET = handleRequest;
export const POST = handleRequest;