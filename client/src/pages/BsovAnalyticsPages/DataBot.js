import React, { useState } from 'react';

// =====================================================
// DataBot
// =====================================================

// Data Phrases, Structures, Functions

let nkfAnalyticsData;
try {
    nkfAnalyticsData = require('../../data/bsovAnalytics/nkfAnalytics').nkfAnalyticsData;
} catch (error) {
    console.error('Genially Data not available', error);
}

// Databot

const helloPhrases = ["hello", "good morning", "good afternoon"];
const startPhrases = ["analysis"];
const endPhrases = ["good bye", "thanks"];

export const DataBot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState("");

  // Function to handle user input submission
  const handleSubmit = (e) => {
      e.preventDefault();
      if (userInput.trim() === "") return;

      // Add the user's input and a placeholder "..." to the chat history
      setChatHistory([...chatHistory, `You: ${userInput}`, `NKF-DataBot: ...`]);

      // Capture user input
      const userMessage = userInput.toLowerCase();

      // Clear the input field
      setUserInput("");

      // Simulate delay before showing the bot's response
      setTimeout(() => {
          // Find the correct response
          const matchedResponse = findResponse(userMessage);

          // Update the last message (which is currently "...")
          setChatHistory(prevHistory => {
              const updatedHistory = [...prevHistory];
              updatedHistory[updatedHistory.length - 1] = `NKF-DataBot: ${matchedResponse}`;
              return updatedHistory;
          });
      }, 1000); // 1 second delay
  };

  // Function to analyze data and return counts
  const findResponse = (input) => {
    // Normalize input for easier matching
    const lowerInput = input.toLowerCase();
  
    // Handle greeting phrases
    if (helloPhrases.some(phrase => lowerInput.includes(phrase))) {
        return "Welcome to the NKF BSOV Analytics ChatBot!";
    }
  
    // Handle start phrases
    if (startPhrases.some(phrase => lowerInput.includes(phrase))) {
        return "I am ready for your analytic requests!";
    }
  
    // Handle end phrases
    if (endPhrases.some(phrase => lowerInput.includes(phrase))) {
        return "Hopefully I was a help! Goodbye!";
    }
  
    // Handle requests like "how many <blank>"
    if (lowerInput.includes("how many")) {
        const blankItem = lowerInput.split("how many ")[1]?.split(" ")[0]; // Extract the variable
  
        // Handle requests like "how many <blank> during <fiscalYear>"
        if (lowerInput.includes("during")) {
            const fiscalYear = lowerInput.split("during ")[1]?.split(" ")[0]; // Extract fiscalYear
            if (blankItem && fiscalYear) {
                // Case-insensitive comparison for fiscal year
                const count = nkfAnalyticsData.filter(record =>
                    record.topic.toLowerCase().includes(blankItem) && record.fiscalYear.toLowerCase() === fiscalYear.toLowerCase()
                ).length;
                return `There are ${count} records for ${blankItem} during ${fiscalYear}.`;
            }
        }
  
        // Handle requests like "how many <blank> in <source>"
        if (lowerInput.includes("in")) {
            const source = lowerInput.split("in ")[1]?.split(" ")[0]; // Extract source
            if (blankItem && source) {
                const count = nkfAnalyticsData.filter(record =>
                    record.topic.toLowerCase().includes(blankItem) && record.source.toLowerCase() === source.toLowerCase()
                ).length;
                return `There are ${count} records for ${blankItem} in ${source}.`;
            }
        }
  
        // Single variable request (if no fiscal year or source is specified)
        if (blankItem) {
            const count = nkfAnalyticsData.filter(record =>
                record.topic.toLowerCase().includes(blankItem)
            ).length;
            return `There are ${count} records for ${blankItem}.`;
        }
    }
  
    // Default response for unrecognized queries
    return "Sorry, I don't understand that.";
  };

  return (
      <section>
          <h1>DataBot</h1>
          <p>Start typing to ask a question about the data</p>

          {/* Chat history display */}
          <div style={{ border: "1px solid #ccc", padding: "10px", height: "600px", overflowY: "scroll" }}>
              {chatHistory.map((line, index) => (
                  <p key={index}>{line}</p>
              ))}
          </div>

          {/* Input form */}
          <form onSubmit={handleSubmit}>
              <input 
                  type="text" 
                  value={userInput} 
                  onChange={(e) => setUserInput(e.target.value)} 
                  placeholder="Ask me something..." 
                  style={{ width: "80%", padding: "5px" }} 
              />
              <button type="submit" style={{ padding: "5px" }}>Send</button>
          </form>
      </section>
  );
};

export default DataBot;