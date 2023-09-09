const fs = require("fs").promises; // Import the promises API from the fs module

async function init() {
  try {
    // Read system.txt
    const system = await fs.readFile("system.txt", "utf8");

    // Create the messages array
    const messages = [
      {
        role: "system",
        content: system,
      },
    ];

    // Write to message.json
    await fs.writeFile("message.json", JSON.stringify(messages, null, 2));

    console.log("Successfully written to message.json");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

init();
