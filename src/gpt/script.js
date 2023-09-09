import OpenAI from "openai";
// import { promises as fs } from "fs";
// import readline from "readline";

// const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

let messages = [];

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// export async function loadMessages() {
//   try {
//     const data = await fs.readFile("message.json", "utf8");
//     messages = JSON.parse(data);
//   } catch (error) {
//     console.error("An error occurred while reading message.json:", error);
//   }
// }

// export async function saveMessages() {
//   try {
//     await fs.writeFile("message.json", JSON.stringify(messages, null, 2));
//   } catch (error) {
//     console.error("An error occurred while writing to message.json:", error);
//   }
// }

export async function getGptResponse() {
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

export async function askUserInput() {
  try {
    // return new Promise((resolve, reject) => {
    //   rl.question("Your answer: ", (userInput) => {
    //     resolve(userInput);
    //   });
    // });
    console.log("Your answer: ");
    return;
  } catch (error) {
    console.error("An error occurred while asking user input:", error);
  }
}

// async function main() {
//   await loadMessages();

//   while (true) {
//     if (messages.length > 1) {
//       const userInput = await askUserInput();

//       if (userInput === "exit") {
//         rl.close();
//         return;
//       }

//       messages.push({ role: "user", content: userInput });
//     }

//     const response = await getGptResponse();
//     console.log(response.content);
//     messages.push(response);
//     await saveMessages();
//   }
// }

// main();
