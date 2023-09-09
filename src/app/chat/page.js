"use client";

import classes from "./chat.module.css";
import { useState, useEffect } from "react";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function Chat() {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "Create a chat bot with the following background requirements:\n\n- I want to tell a story in a conversational format.\n- Allow me to type answers in the middle of a conversation\n- Stop generating answers and wait for me to type them so I can type them in chat\n- When I enter a response, continue the story by showing me the answer.\n- Only represent Yumi's responses in format of “Yumi: “\n- Only represent Likeness in format of “Likeness: “\n- When I type the final answer, show me a romantic happy ending or a bad ending, depending on the context of the conversation.\n- After each player response, the \"Likeness Meter\" will be updated. This meter measures the level of romantic or positive connection between the main character and the love interest.\n- The meter ranges from 0 to 100, with 0 indicating a complete lack of connection and 100 indicating a strong, romantic connection.\n- However, if user tries to make a romantic connection too dramatically, it should decrease the likeness.\n- Start with 50 of likeness and show it.\n- With every dialogue exchange where the player has an opportunity to respond, the meter will be adjusted based on the tone and content of the player's response.\n- A positive or favorable response will cause the meter to go up, and a negative or unfavorable response will cause it to go down.\n- The current status of the \"Likeness Meter\" will be displayed after each player interaction to indicate the current level of connection.\n- The conversation should only end if the likenesss becomes 100.\n- The conversation should start with ‘The Game starts…:’ sentence.\n- When it generate the answer, conventionally ask the user a question again.\n- Don’t generate anything between the conversations except the likeness\n\nFor more information, please visit: =====\nGame Name:\nLost Love in Highschool Spotlight\n\nStory:\n\nYou are a shy, introverted high school student who prefers the company of books over people. It's break time, and you're navigating through the crowded hallways, clutching your backpack like a shield. As you turn a corner, you accidentally bump into someone, causing your papers to scatter across the floor.\n\nYou look up, expecting an annoyed glare, but instead, you lock eyes with Yumi—the most popular girl in school. She's the epitome of grace and confidence, with her wavy hair perfectly framing her face and her eyes sparkling like stars. To your surprise, she smiles warmly and bends down to help you pick up your papers. Your heart races as you realize this is your chance to make an impression. The \"Likeness Meter\" appears in your mind's eye, starting at 50. What will you say? How will you respond? The story of your unexpected high school romance begins here. Now she starts the conversation.",
    },
  ]);

  useEffect(() => {
    if (messages.length == 1) {
      handleGptResponse();
    }

    if (messages.length > 1 && messages[messages.length - 1].role == "user") {
      handleGptResponse();
    }
  }, [messages]);

  async function askUserInput(e) {
    try {
      setUserInput(e.target.value);
    } catch (error) {
      console.error("An error occurred while asking user input:", error);
    }
  }

  async function getGptResponse() {
    try {
      const completion = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-4",
      });
      return completion.choices[0].message;
    } catch (error) {
      console.error("An error occurred while calling the GPT API:", error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: userInput },
    ]);

    setUserInput("");
  };

  const handleGptResponse = async () => {
    const gptResponse = await getGptResponse();
    setMessages((prevMessages) => [...prevMessages, gptResponse]);
  };

  return (
    <>
      <div className={classes.container}>
        <div>
          <img src="pic4.png" />
        </div>
        <div className={classes.chatBox}>
          <div className={classes.chatContent}>
            {messages.map((message, idx) => {
              if (idx == 0) return null;

              if (message.role === "user") {
                return (
                  <div key={idx} className={classes.rightAl}>
                    <div
                      className={classes.chatUser}
                    >{`${message.content}`}</div>
                  </div>
                );
              } else {
                return (
                  <div key={idx}>
                    <div className={classes.chat}>{`${message.content}`}</div>
                  </div>
                );
              }
            })}
          </div>
          <form className={classes.inputBox} onSubmit={handleSubmit}>
            <input
              className={classes.chatInput}
              value={userInput}
              onChange={askUserInput}
            />
          </form>
        </div>
      </div>
    </>
  );
}
