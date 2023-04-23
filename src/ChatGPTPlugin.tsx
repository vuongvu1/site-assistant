import React, { useState, useEffect } from "react";

interface ChatGPTResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

async function fetchChatGPTResponse(prompt: string): Promise<string> {
  const apiUrl = "https://api.openai.com/v1/chat/completions";
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  // Define the data to be sent in the request body
  const data = {
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    max_tokens: 100,
  };

  // Send a POST request to the API endpoint
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(data),
  });

  // Parse the response as JSON
  const responseData: ChatGPTResponse = await response.json();

  console.log({ responseData });

  // Return the assistant's reply
  return responseData.choices[0]?.message?.content || "";
}

// Define a React component to use the ChatGPT API
const ChatGPTPlugin: React.FC = () => {
  const [response, setResponse] = useState("");

  useEffect(() => {
    // Call the fetchChatGPTResponse function with your prompt
    fetchChatGPTResponse("Hello?")
      .then((result) => setResponse(result))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <h1>ChatGPT Plugin</h1>
      <p>Assistant's response: {response}</p>
    </div>
  );
};

export default ChatGPTPlugin;
