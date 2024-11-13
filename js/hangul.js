// Hangul encryption and decryption maps
const hangulMap = {
  A: "아니요",
  B: "안녕히 계세요",
  C: "안녕하세요",
  D: "괜찮아요",
  E: "주세요",
  F: "미안해요",
  G: "몰라요",
  H: "천만에요",
  I: "감사합니다",
  J: "시간",
  K: "나라",
  L: "영화",
  M: "여자",
  N: "이름",
  O: "사람",
  P: "가족",
  Q: "춥다",
  R: "아름다운",
  S: "대박",
  T: "헐",
  U: "닭살",
  V: "나쁜",
  W: "멀리",
  X: "친구",
  Y: "소녀",
  Z: "물",
  " ": " ",
};

const hangulMapDecrypt = Object.fromEntries(
  Object.entries(hangulMap).map(([key, value]) => [value, key])
);

function encryptText() {
  const inputText = document.getElementById("inputText").value.toUpperCase();
  let encryptedText = "";

  for (let char of inputText) {
    encryptedText += hangulMap[char] || char;
  }

  document.getElementById("encryptedText").value = encryptedText.trim();
}

function decryptText() {
  const inputText = document.getElementById("inputText").value.trim();
  let decryptedText = "";
  let temp = "";

  for (let i = 0; i < inputText.length; i++) {
    temp += inputText[i];
    if (hangulMapDecrypt[temp]) {
      decryptedText += hangulMapDecrypt[temp];
      temp = "";
    }
  }

  document.getElementById("encryptedText").value = decryptedText.trim();
}

// Theme toggle button
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.querySelector(".container").classList.toggle("dark");
  const themeIcon = document.getElementById("themeIcon");
  themeIcon.classList.toggle(
    "fa-moon",
    !document.body.classList.contains("dark")
  );
  themeIcon.classList.toggle(
    "fa-sun",
    document.body.classList.contains("dark")
  );
});

// Voice command button
const voiceCommandButton = document.getElementById("voiceCommand");
const recognition = new (window.SpeechRecognition ||
  window.webkitSpeechRecognition)();
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

voiceCommandButton.addEventListener("click", () => {
  recognition.start();
});

recognition.onresult = (event) => {
  const command = event.results[0][0].transcript.toLowerCase();
  console.log("Voice input:", command); // Debugging line

  if (command.includes("encrypt")) {
    encryptText();
  } else if (command.includes("decrypt")) {
    decryptText();
  } else {
    document.getElementById("inputText").value = command;
  }
};

recognition.onerror = (event) => {
  console.error("Voice recognition error:", event.error);
};
