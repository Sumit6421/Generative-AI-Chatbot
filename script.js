const MODEL = "gemini-flash-lite-latest";
const questionInput = document.getElementById("questionInput");
const askButton = document.getElementById("askButton");
const outputArea = document.getElementById("outputArea");
const loadingIndicator = document.getElementById("loadingIndicator");

const systemInstructionText =
     `You are a Data structure and Algorithm Instructor. You will only reply to the problem related to 
      Data structure and Algorithm. You have to solve query of user in simplest way
      If user ask any question which is not related to Data structure and Algorithm, reply him rudely
      Example: If user ask, How are you
      You will reply: You dumb ask me some sensible question, like this message you can reply anything more rudely
      cl
      You have to reply him rudely if question is not related to Data structure and Algorithm.
      Else reply him politely with simple explanation`;

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function formatText(text) {
  return text
    .split(/(```[\s\S]*?```)/g)
    .map((part) => {
      if (part.startsWith("```")) {
        const code = part.replace(/^```[^\n]*\n?/, "").replace(/```$/, "");
        return `<pre><code>${escapeHtml(code)}</code></pre>`;
      }
      return escapeHtml(part)
        .replace(/`([^`]+)`/g, "<code>$1</code>")
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    })
    .join("");
}

askButton.addEventListener("click", async () => {
  const question = questionInput.value.trim();
  if (!question) {
    outputArea.innerHTML =
      '<div class="error-message"><i class="fas fa-exclamation-circle"></i> Please enter a coding question first!</div>';
    return;
  }

  outputArea.innerHTML = "";
  loadingIndicator.style.display = "block";
  askButton.disabled = true;

  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${"AQ.Ab8RN6LkZTUk8iRg8vflXnZIHMW9E_Xf7QRYyOzwkP6L4GnWFQ"}`;

  const requestBody = {
    contents: [{ role: "user", parts: [{ text: question }] }],
    systemInstruction: { parts: [{ text: systemInstructionText }] },
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!response.ok) {
      const msg =
        data.error && data.error.message
          ? data.error.message
          : response.statusText;
      throw new Error(`API Error ${response.status}: ${msg}`);
    }

    const parts =
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts;
    if (parts && parts.length > 0) {
      const answerText = parts.map((p) => p.text || "").join("");
      outputArea.innerHTML = formatText(answerText);
    } else if (data.promptFeedback && data.promptFeedback.blockReason) {
      outputArea.innerHTML = `<div class="error-message"><i class="fas fa-ban"></i> Blocked: ${escapeHtml(data.promptFeedback.blockReason)}</div>`;
    } else {
      outputArea.innerHTML =
        '<div class="error-message"><i class="fas fa-exclamation-triangle"></i> Unexpected response from the AI.</div>';
    }
  } catch (error) {
    console.error(error);
    outputArea.innerHTML = `<div class="error-message"><i class="fas fa-bug"></i> ${escapeHtml(error.message)}</div>`;
  } finally {
    askButton.disabled = false;
    loadingIndicator.style.display = "none";
  }
});

questionInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    askButton.click();
  }
});

document.querySelectorAll(".menu-item").forEach((item) => {
  item.addEventListener("click", function () {
    document
      .querySelectorAll(".menu-item")
      .forEach((i) => i.classList.remove("active"));
    this.classList.add("active");
  });
});
