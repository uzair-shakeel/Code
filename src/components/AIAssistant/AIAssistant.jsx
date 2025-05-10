import React, { useState, useEffect, useRef } from "react";
import { FaComment, FaPaperPlane, FaTimes } from "react-icons/fa";
import OpenAI from "openai";

// Define links from environment variables with fallbacks
const UPLOAD_DOCS_LINK =
  process.env.REACT_APP_UPLOAD_DOCS_LINK || "https://swfdocs.com?FV=1618";
const BOOKING_LINK =
  process.env.REACT_APP_BOOKING_LINK ||
  "https://outlook.office365.com/owa/calendar/RobertBSummersHomeLoanPreapproval@branch777.onmicrosoft.com/bookings/";

const AI_SYSTEM_PROMPT = `You are the OriginatorOS™ AI Assistant, a friendly, helpful digital guide trained to assist homebuyers with FHA/VA/conventional loans and direct them through the OriginatorOS™ preapproval flow. Never use legal or industry jargon. Keep it human, clear, and supportive. Use casual and empowering language.

If the user asks about PartnerUp, offer a whitepaper summary or ask them what pain point they have, and let them know we'll email them a custom excerpt.

If someone says "I'm a Realtor" or "I want to partner," guide them to book a call and mention the benefits of being a referral partner — but don't share the book directly unless they're confirmed.

Upload docs link: ${UPLOAD_DOCS_LINK}  
Booking link: ${BOOKING_LINK}

If unsure how to help, respond:  
"Great question — let me make sure I get you to the right step. You can start your preapproval or book a call, and I'll follow up if you need more help."`;

const quickReplies = [
  "What loan types do I qualify for?",
  "Can I buy with low credit?",
  "I'm self-employed — what should I do?",
];

// Initialize OpenAI client
// Note: In production, you should use environment variables for the API key
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Only for client-side use. For production, use backend proxy
});

// Development mode toggle - set to false for production
const DEV_MODE = true;

// This is just the initial value - useFallback state will be used instead
const INITIAL_FALLBACK_MODE = false;

// Log environment variable status in development mode
if (DEV_MODE) {
  console.log(
    "%c[AI Assistant] Environment Variables Check",
    "background: #2196F3; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;"
  );

  console.log(
    "REACT_APP_UPLOAD_DOCS_LINK:",
    process.env.REACT_APP_UPLOAD_DOCS_LINK ? "Defined ✓" : "Using fallback"
  );
  console.log(
    "REACT_APP_BOOKING_LINK:",
    process.env.REACT_APP_BOOKING_LINK ? "Defined ✓" : "Using fallback"
  );
  console.log(
    "REACT_APP_SHOW_ADMIN_CONTROLS:",
    process.env.REACT_APP_SHOW_ADMIN_CONTROLS === "true"
      ? "Enabled"
      : "Disabled"
  );
}

// Helper function for developers to check response sources (only in DEV_MODE)
window.checkAIResponseSources = function () {
  if (!DEV_MODE) {
    console.log("This function is only available in development mode.");
    return;
  }

  const messages = JSON.parse(
    localStorage.getItem("aiAssistantMessages") || "[]"
  );
  const assistantMessages = messages.filter((msg) => msg.role === "assistant");

  const gptCount = assistantMessages.filter(
    (msg) => msg.source === "gpt"
  ).length;
  const fallbackCount = assistantMessages.filter(
    (msg) => msg.source === "fallback"
  ).length;
  const systemCount = assistantMessages.filter(
    (msg) => msg.source === "system"
  ).length;
  const unknownCount = assistantMessages.filter((msg) => !msg.source).length;

  const total = assistantMessages.length;

  console.log(
    "%c[AI Assistant Stats]",
    "background: #2196F3; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;"
  );

  console.log(
    `Fallback Responses: ${fallbackCount} (${
      Math.round((fallbackCount / total) * 100) || 0
    }%)`
  );
  console.log(
    `System Messages: ${systemCount} (${
      Math.round((systemCount / total) * 100) || 0
    }%)`
  );
  console.log(
    `Unknown Source: ${unknownCount} (${
      Math.round((unknownCount / total) * 100) || 0
    }%)`
  );

  return {
    total,
    gpt: gptCount,
    fallback: fallbackCount,
    system: systemCount,
    unknown: unknownCount,
  };
};

// Simulate API responses for testing when API is unavailable
const simulateAIResponse = async (userMessage) => {
  return new Promise((resolve) => {
    // Wait 1-2 seconds to simulate API latency
    const delay = 1000 + Math.random() * 1000;
    setTimeout(() => {
      let response;
      const lowerMessage = userMessage.toLowerCase();

      // More specific topic matching with more detailed responses
      if (
        lowerMessage.includes("fha") ||
        (lowerMessage.includes("loan type") && lowerMessage.includes("fha"))
      ) {
        response =
          "FHA loans are great for first-time homebuyers! They require as little as 3.5% down payment and allow credit scores as low as 580. In some cases, even lower scores may qualify with a larger down payment. FHA loans also have more flexible debt-to-income requirements compared to conventional loans. Would you like to see if you qualify for an FHA loan?";
      } else if (
        lowerMessage.includes("va") ||
        (lowerMessage.includes("loan") && lowerMessage.includes("veteran"))
      ) {
        response =
          "VA loans are an excellent benefit for veterans, active duty service members, and eligible surviving spouses. They offer 0% down payment, no private mortgage insurance, competitive interest rates, and more flexible credit requirements. Do you have military service and want to explore VA loan options?";
      } else if (
        lowerMessage.includes("conventional") ||
        (lowerMessage.includes("loan") && lowerMessage.includes("traditional"))
      ) {
        response =
          "Conventional loans typically require a credit score of at least 620 and down payments starting around 3-5%. They're a good option if you have solid credit and some savings. Conventional loans with less than 20% down will require private mortgage insurance (PMI). Would you like to see what conventional loan options might work for your situation?";
      } else if (
        lowerMessage.includes("usda") ||
        (lowerMessage.includes("rural") && lowerMessage.includes("loan"))
      ) {
        response =
          "USDA loans are designed for rural and some suburban homebuyers. They offer 0% down payment options and competitive rates. Your property must be in an eligible rural area, and there are income limits that vary by location. Would you like to check if properties in your area qualify for USDA financing?";
      } else if (
        lowerMessage.includes("loan type") ||
        lowerMessage.includes("qualify") ||
        lowerMessage.includes("what loan")
      ) {
        response =
          "Based on your situation, you might qualify for several loan types. FHA loans are great for first-time buyers with credit scores of 580+ and down payments as low as 3.5%. VA loans are available for veterans with $0 down payment. Conventional loans typically require at least 620 credit score and 3-5% down. Would you like to start a prequalification to see exactly what you qualify for?";
      } else if (
        lowerMessage.includes("credit") ||
        lowerMessage.includes("score") ||
        lowerMessage.includes("fico")
      ) {
        response =
          "You have options even with less-than-perfect credit! FHA loans can go as low as 580, and sometimes even lower with a larger down payment. Every situation is unique - the best way to know what's possible is to start the preapproval process. Would you like me to help you get started?";
      } else if (
        lowerMessage.includes("self") ||
        lowerMessage.includes("employ") ||
        lowerMessage.includes("business owner") ||
        lowerMessage.includes("1099")
      ) {
        response =
          "Self-employed borrowers can absolutely get approved for home loans! You'll typically need to provide 2 years of tax returns and possibly some additional documentation to verify your income stability. Our loan officers are experienced in working with entrepreneurs and can guide you through the process. Would you like to book a call to discuss your specific situation?";
      } else if (
        lowerMessage.includes("down payment") ||
        lowerMessage.includes("downpayment") ||
        lowerMessage.includes("down")
      ) {
        response =
          "There are many low down payment options available! FHA loans require as little as 3.5% down, VA loans offer 0% down for veterans, and some conventional loan programs start at just 3% down. There are also down payment assistance programs that might be available in your area. Would you like to explore your options?";
      } else if (
        lowerMessage.includes("document") ||
        lowerMessage.includes("upload") ||
        lowerMessage.includes("paperwork") ||
        lowerMessage.includes("statements")
      ) {
        response = `You can securely upload your documents here: ${UPLOAD_DOCS_LINK}. We'll need items like pay stubs, W-2s, bank statements, and ID. Is there anything specific you're wondering about the documentation process?`;
      } else if (
        lowerMessage.includes("call") ||
        lowerMessage.includes("speak") ||
        lowerMessage.includes("talk") ||
        lowerMessage.includes("appointment") ||
        lowerMessage.includes("meeting")
      ) {
        response = `I'd be happy to help you connect with one of our loan officers! You can book a call at your convenience here: ${BOOKING_LINK}. What questions were you hoping to discuss on the call?`;
      } else if (
        lowerMessage.includes("interest") ||
        lowerMessage.includes("rate") ||
        lowerMessage.includes("apr")
      ) {
        response =
          "Interest rates fluctuate daily based on market conditions and are also personalized to your specific situation. Factors that affect your rate include credit score, down payment amount, loan type, and property type. The best way to get an accurate rate quote is to start the prequalification process. Would you like to get started?";
      } else if (
        lowerMessage.includes("debt") ||
        lowerMessage.includes("dti") ||
        lowerMessage.includes("debt-to-income") ||
        lowerMessage.includes("debt to income")
      ) {
        response =
          "Debt-to-income (DTI) ratio is an important factor in mortgage qualification. Most loans prefer a DTI under 43%, though some programs may allow higher ratios. This percentage represents how much of your monthly income goes to debt payments. Would you like to calculate your DTI ratio as part of a prequalification?";
      } else if (
        lowerMessage.includes("preapproval") ||
        lowerMessage.includes("pre-approval") ||
        lowerMessage.includes("prequalification") ||
        lowerMessage.includes("pre-qualification")
      ) {
        response =
          "Getting preapproved is a great first step in your home buying journey! It gives you a clear picture of what you can afford and shows sellers you're a serious buyer. To start the process, we'll need some basic information about your income, assets, and the type of loan you're interested in. Would you like to begin your preapproval now?";
      } else if (
        lowerMessage.includes("realtor") ||
        lowerMessage.includes("real estate agent") ||
        lowerMessage.includes("agent") ||
        lowerMessage.includes("partner")
      ) {
        response =
          "It sounds like you're a real estate professional interested in partnering with us! We offer excellent support and competitive loan products for your clients. Our referral program includes co-branded marketing materials, quick pre-approvals, and a dedicated point of contact. Would you like to book a call to discuss a potential partnership?";
      } else if (
        lowerMessage.includes("closing cost") ||
        lowerMessage.includes("fees")
      ) {
        response =
          "Closing costs typically range from 2-5% of the loan amount and include fees for services like appraisal, title search, attorney, loan origination, and more. Some loans allow these costs to be rolled into the loan or covered by seller concessions. Would you like to discuss specific closing cost estimates for your situation?";
      } else if (
        lowerMessage.includes("hello") ||
        lowerMessage.includes("hi") ||
        lowerMessage.includes("hey") ||
        lowerMessage === "hi" ||
        lowerMessage === "hello" ||
        lowerMessage === "hey"
      ) {
        response =
          "Hi there! 👋 I'm your OriginatorOS™ AI Assistant. I'm here to help with all your home loan questions and guide you through the mortgage process. What can I help you with today?";
      } else {
        response =
          "That's a great question about home loans. To give you the most accurate information tailored to your specific situation, I'd recommend either starting the preapproval process or booking a quick call with one of our mortgage experts. Which would you prefer?";
      }

      resolve(response);
    }, delay);
  });
};

// Add this after the quickReplies constant
const FALLBACK_RESPONSES = {
  default:
    "I'd be happy to help with your home loan questions! Every borrower has unique needs - the best way to get personalized guidance is to start our quick preapproval process or speak with one of our loan officers. What specific aspect of home loans are you interested in learning about?",
  loanTypes:
    "We offer FHA, VA, Conventional, and USDA loans. Each has different benefits: FHA is great for lower credit scores (580+), VA offers 0% down for veterans, Conventional is ideal with good credit (620+), and USDA provides 0% down in rural areas. Would you like to start a preapproval to see which options fit your situation?",
  lowCredit:
    "Yes, you may still qualify for a home loan with less-than-perfect credit. FHA loans can go as low as 580, sometimes lower with a larger down payment. Every situation is unique - factors like income, down payment, and debt levels also matter. The best way to know is to start our preapproval process.",
  selfEmployed:
    "Self-employed borrowers can definitely get approved for mortgages! You'll typically need 1-2 years of tax returns, proof of business stability, and possibly bank statements showing consistent income. Our team has extensive experience working with entrepreneurs and can guide you through the specific documentation needed.",
  interestRates:
    "Interest rates fluctuate daily based on market conditions and your personal financial profile. Key factors affecting your rate include credit score, down payment amount, loan type, loan term, and property type. The only way to get an accurate rate quote is through our preapproval process.",
  downPayment:
    "There are many low down payment options available today. FHA loans require just 3.5% down, VA and USDA loans offer 0% down payment options, and some conventional programs start at just 3% down. We can also help connect you with down payment assistance programs that might be available in your area.",
  closingCosts:
    "Closing costs typically range from 2-5% of your loan amount and include fees for the lender, third-party services like appraisals, title search, attorney fees, prepaid items like taxes and insurance, and more. Some loans allow these costs to be rolled into your loan or covered by seller concessions.",
};

// Utility function to find the best fallback response
const getFallbackResponse = (message) => {
  const lowerMessage = message.toLowerCase();

  // Check for loan types
  if (
    lowerMessage.includes("loan type") ||
    lowerMessage.includes("qualify") ||
    lowerMessage.includes("fha") ||
    lowerMessage.includes("va") ||
    lowerMessage.includes("conventional") ||
    lowerMessage.includes("usda") ||
    lowerMessage.includes("what loan")
  ) {
    return FALLBACK_RESPONSES.loanTypes;
  }

  // Check for credit score questions
  else if (
    lowerMessage.includes("credit") ||
    lowerMessage.includes("score") ||
    lowerMessage.includes("low credit") ||
    lowerMessage.includes("bad credit") ||
    lowerMessage.includes("poor credit") ||
    lowerMessage.includes("fico")
  ) {
    return FALLBACK_RESPONSES.lowCredit;
  }

  // Check for self-employment questions
  else if (
    lowerMessage.includes("self") ||
    lowerMessage.includes("employ") ||
    lowerMessage.includes("business") ||
    lowerMessage.includes("1099") ||
    lowerMessage.includes("entrepreneur") ||
    lowerMessage.includes("own business")
  ) {
    return FALLBACK_RESPONSES.selfEmployed;
  }

  // Check for interest rate questions
  else if (
    lowerMessage.includes("interest") ||
    lowerMessage.includes("rate") ||
    lowerMessage.includes("apr") ||
    lowerMessage.includes("percentage") ||
    lowerMessage.includes("points")
  ) {
    return FALLBACK_RESPONSES.interestRates;
  }

  // Check for down payment questions
  else if (
    lowerMessage.includes("down") ||
    lowerMessage.includes("payment") ||
    lowerMessage.includes("down payment") ||
    lowerMessage.includes("downpayment") ||
    lowerMessage.includes("money down")
  ) {
    return FALLBACK_RESPONSES.downPayment;
  }

  // Check for closing cost questions
  else if (
    lowerMessage.includes("closing") ||
    lowerMessage.includes("cost") ||
    lowerMessage.includes("fee") ||
    lowerMessage.includes("closing cost") ||
    lowerMessage.includes("how much does it cost")
  ) {
    return FALLBACK_RESPONSES.closingCosts;
  }

  // Default response for other questions
  return FALLBACK_RESPONSES.default;
};

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [apiError, setApiError] = useState(null); // Track API errors
  const [responseSource, setResponseSource] = useState("assistant"); // "gpt" or "fallback"
  const [useFallback, setUseFallback] = useState(INITIAL_FALLBACK_MODE); // Local state for the toggle
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Load chat history from local storage
  useEffect(() => {
    const savedMessages = localStorage.getItem("aiAssistantMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Add welcome message if no history
      setMessages([
        {
          role: "assistant",
          content:
            "Hi there! I'm your OriginatorOS™ AI Assistant. How can I help with your home loan journey today?",
        },
      ]);
    }
  }, []);

  // Save messages to local storage when messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("aiAssistantMessages", JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const sendMessage = async (messageText) => {
    const userMessage = messageText || inputValue;
    if (!userMessage.trim()) return;

    // Clear input field
    setInputValue("");
    setApiError(null); // Reset error state
    setResponseSource("assistant"); // Reset response source

    // Add user message to chat
    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);

    // Show typing indicator
    setIsTyping(true);

    try {
      let aiResponse;
      let source = "fallback";

      // Check if we should use fallback or simulated responses
      if (useFallback || (DEV_MODE && !process.env.REACT_APP_OPENAI_API_KEY)) {
        if (DEV_MODE) {
          console.log(
            "%c[AI Assistant]%c Using fallback responses",
            "background: #ff9800; color: white; padding: 2px 4px; border-radius: 2px; font-weight: bold;",
            "color: #ff9800; font-weight: bold;",
            useFallback ? "(Forced by toggle)" : "(API key missing)"
          );
        }
        aiResponse = await simulateAIResponse(userMessage);
        source = "fallback";
      } else {
        // Send message to OpenAI API - add more detailed error handling
        if (DEV_MODE) {
          console.log(
            "%c[AI Assistant]%c Attempting to use OpenAI GPT",
            "background: #4CAF50; color: white; padding: 2px 4px; border-radius: 2px; font-weight: bold;",
            "color: #4CAF50; font-weight: bold;"
          );
        }

        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: AI_SYSTEM_PROMPT },
            ...newMessages.map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
          ],
          temperature: 0.7,
          max_tokens: 500,
        });

        if (DEV_MODE) {
          console.log(
            "%c[AI Assistant]%c OpenAI response received successfully",
            "background: #4CAF50; color: white; padding: 2px 4px; border-radius: 2px; font-weight: bold;",
            "color: #4CAF50; font-weight: bold;"
          );
        }

        // Extract AI response
        aiResponse = response.choices?.[0]?.message?.content;
        source = "gpt";
      }

      // Add AI response to chat
      if (aiResponse) {
        setResponseSource(source);

        // Log response source for developers
        if (DEV_MODE) {
          console.log(
            `%c[AI Assistant]%c Response from: ${source.toUpperCase()}`,
            `background: ${
              source === "gpt" ? "#4CAF50" : "#ff9800"
            }; color: white; padding: 2px 4px; border-radius: 2px; font-weight: bold;`,
            `color: ${
              source === "gpt" ? "#4CAF50" : "#ff9800"
            }; font-weight: bold;`
          );
          console.log("User question:", userMessage);
          console.log("Response:", aiResponse);
        }

        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content: aiResponse,
            source: source, // Add source property to identify response origin
          },
        ]);
      } else {
        throw new Error("No response generated");
      }
    } catch (error) {
      console.error("Error fetching response from OpenAI:", error);

      // Store error for debugging in dev mode
      if (DEV_MODE) {
        setApiError(error.message || "Unknown error");
        console.log(
          "%c[AI Assistant]%c Error occurred, using fallback response",
          "background: #F44336; color: white; padding: 2px 4px; border-radius: 2px; font-weight: bold;",
          "color: #F44336; font-weight: bold;"
        );
        console.error("Detailed error:", error);
      }

      // Use fallback responses instead of generic error
      const fallbackResponse = getFallbackResponse(userMessage);
      setResponseSource("fallback");

      // Log a more user-friendly message for model errors in dev mode
      if (DEV_MODE) {
        if (error.message && error.message.includes("model")) {
          console.warn(
            "Model error detected. Using fallback responses instead. Consider updating the model name in the code or checking your API key permissions."
          );
        }
      }

      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: fallbackResponse,
          source: "fallback", // Mark this as a fallback response
          error: error.message, // Include the error message
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleQuickReply = (reply) => {
    sendMessage(reply);
  };

  // Format message content with links
  const formatMessageContent = (content) => {
    // Replace upload docs link
    let formattedContent = content.replace(
      /(https:\/\/swfdocs\.com\?FV=1618)/g,
      '<a href="$1" target="_blank" class="text-blue-600 hover:underline">upload documents</a>'
    );

    // Replace booking link
    formattedContent = formattedContent.replace(
      /(https:\/\/outlook\.office365\.com\/owa\/calendar\/RobertBSummersHomeLoanPreapproval@branch777\.onmicrosoft\.com\/bookings\/)/g,
      '<a href="$1" target="_blank" class="text-blue-600 hover:underline">book a call</a>'
    );

    return { __html: formattedContent };
  };

  const toggleResponseMode = () => {
    setUseFallback(!useFallback);
  };

  const resetChat = () => {
    // Clear chat history from state and localStorage
    const welcomeMessage = {
      role: "assistant",
      content:
        "Hi there! I'm your OriginatorOS™ AI Assistant. How can I help with your home loan journey today?",
      source: "system",
    };
    setMessages([welcomeMessage]);
    localStorage.setItem(
      "aiAssistantMessages",
      JSON.stringify([welcomeMessage])
    );
    setApiError(null);
  };

  return (
    <div className="fixed w-[350px] bottom-5 right-5 z-50">
      {/* Chat Bubble */}
      <button
        onClick={toggleChat}
        className="bg-blue-600 bottom-0 right-0 absolute hover:bg-blue-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center"
        title="Ask OriginatorOS™"
      >
        {isOpen ? <FaTimes size={20} /> : <FaComment size={20} />}
      </button>

      {/* Tooltip */}
      {!isOpen && (
        <div className="absolute bottom-16 right-0 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md mb-2 whitespace-nowrap">
          Ask OriginatorOS™
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl overflow-hidden flex flex-col w-[350px] h-[500px] max-w-full max-h-[80vh] border border-gray-200">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h3 className="font-semibold">OriginatorOS™ AI Assistant</h3>
            <div className="flex items-center">
              {/* Only show admin controls in DEV_MODE and only if explicitly enabled */}
              {DEV_MODE &&
                process.env.REACT_APP_SHOW_ADMIN_CONTROLS === "true" && (
                  <>
                    <button
                      onClick={resetChat}
                      className="mr-2 text-xs bg-blue-700 hover:bg-blue-800 px-2 py-1 rounded text-white"
                      title="Reset chat history"
                    >
                      Reset
                    </button>
                    <button
                      onClick={toggleResponseMode}
                      className="mr-3 text-xs bg-blue-700 hover:bg-blue-800 px-2 py-1 rounded text-white"
                      title={
                        useFallback
                          ? "Switch to GPT responses"
                          : "Switch to fallback responses"
                      }
                    >
                      {useFallback ? "Use GPT" : "Use Fallback"}
                    </button>
                  </>
                )}
              <button
                onClick={toggleChat}
                className="text-white hover:text-gray-200"
              >
                <FaTimes size={16} />
              </button>
            </div>
          </div>

          {/* Error banner is now only shown if explicitly enabled */}
          {DEV_MODE &&
            process.env.REACT_APP_SHOW_ADMIN_CONTROLS === "true" &&
            apiError && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 text-xs">
                <p className="font-bold">API Error (Debug Only):</p>
                <p>{apiError}</p>
              </div>
            )}

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <div
                    dangerouslySetInnerHTML={formatMessageContent(
                      message.content
                    )}
                  />
                  {/* Remove source badges - only show in console */}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center space-x-1 text-gray-500 mb-4">
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-2">Common questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm px-3 py-1 rounded-full"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Form */}
          <form
            onSubmit={handleSubmit}
            className="p-4 border-t border-gray-200"
          >
            <div className="flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="flex-1 text-black border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ref={inputRef}
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md"
                disabled={!inputValue.trim()}
              >
                <FaPaperPlane />
              </button>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <a
                href={UPLOAD_DOCS_LINK}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                Upload Documents
              </a>
              <a
                href={BOOKING_LINK}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                Book a Call
              </a>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
