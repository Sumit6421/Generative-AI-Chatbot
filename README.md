# 🤖 DSA AI Instructor

### Your personal AI-powered DSA learning assistant!

DSA can sometimes get confusing, especially when you're trying to understand a concept or figure out why a particular approach isn't working. I built this project to make learning Data Structures and Algorithms a little easier with the help of AI.

DSA AI Instructor is a simple terminal-based chatbot powered by Google's Gemini API. You can ask it questions related to Data Structures and Algorithms, and it will explain concepts in simple language rather than throwing complicated technical definitions at you.

The idea was to create an assistant that stays focused on DSA instead of answering random questions.

## ✨ Features

**DSA-Focused Responses:** The chatbot is instructed to answer questions related to Data Structures and Algorithms.
**Simple Explanations:** Concepts are explained in easy-to-understand language.
**Interactive Chat:** Ask multiple questions in the terminal without restarting the program.
**Conversation History:** Remembers previous messages during the current session, allowing you to continue the conversation.
**Gemini API Integration:** Uses Google's Gemini model to generate responses.
**Secure API Configuration:** Uses environment variables to keep the API key out of the source code.

## 🛠️ Tech Stack

* JavaScript (ES Modules)
* Node.js
* Google Gemini API
* `@google/genai`
* `dotenv`
* `readline-sync`

## 📂 Project Structure

```text
DSA-AI-Instructor/
│
├── node_modules/
├── .env
├── .gitignore
├── DSA.js
├── package.json
└── package-lock.json
```

**1. Move into the project directory**

```bash
cd DSA-AI-Instructor
```

**2. Install the dependencies**

```bash
npm install
```

**3. Create a `.env` file**

Add your Gemini API key:

```env
GEMINI_API_KEY=your_api_key
```

You can generate an API key from Google AI Studio.

**4. Start the application**

```bash
node DSA.js
```

That's it! Start asking your DSA questions.

## 💻 Example

```text
Welcome to DSA Instructor!
Type 'exit' to stop the conversation.

You: What is an array?

Gemini:
An array is a linear data structure that stores
multiple elements of the same data type.

You: What is its time complexity?

Gemini:
Accessing an element takes O(1) time,
while searching takes O(n) time.

You: exit

Goodbye!
```

## 🔮 What's Next?

I would like to extend this project further by adding features like:

* Code-based problem solving.
* Brute force and optimal approach comparisons.
* More detailed time and space complexity analysis.
* A simple web interface instead of terminal interaction.

## 👨‍💻 A Little About This Project

This is one of my small experiments with Generative AI. While working on it, I got to explore how to integrate Gemini API with JavaScript, manage environment variables, maintain conversation history, and control AI responses using system instructions.

Still learning, still building, and looking forward to improving it!

