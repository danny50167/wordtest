// declaration
const currentWordCount = document.getElementById("currentWordCount");
const wordLen = document.getElementById("wordLen");
const display = document.getElementById("display");

const word_prob = document.getElementById("word_prob");

const input_word = document.getElementById("input_word");
const btn = document.getElementById("btn");

const synth = window.speechSynthesis;
const voiceSelect = speechSynthesis.getVoices();

// setup (func)
const words = JSON.parse(localStorage.getItem("words"));
const len = words.length;
let count = 1;
let correct = 0;

input_word.addEventListener("input", (e) => {
  if (e.target.value) {
    btn.hidden = false;
  } else {
    btn.hidden = true;
  }
});

const tts = (text) => {
  const utterThis = new SpeechSynthesisUtterance(text);
  const selectedOption =
    voiceSelect[0].getAttribute("data-name");
  for (let i = 0; i < voices.length; i++) {
    if (voices[i].name === selectedOption) {
      utterThis.voice = voices[i];
    }
  }
  synth.speak(utterThis);
};

// setup (display)
currentWordCount.innerHTML = count;
wordLen.innerHTML = len;
word_prob.innerHTML = words[0].word;
tts(words[0].word);

let index = 0;
btn.addEventListener("click", (e) => {
  e.preventDefault();

  // setup
  const wordPref = words[index];
  const word = wordPref.word;
  const meaning = wordPref.meaning;
  console.log(wordPref);

  // get input -> check answer -> add points -> display next word
  const user_input = input_word.value;
  if (user_input == meaning) {
    console.log("hoi");
    display.innerHTML = display.innerHTML + " ✅";
    correct++;
  } else {
    display.innerHTML = display.innerHTML + " ❌";
    console.log("WAT");
  }

  input_word.value = "";
  index++;

  if (index == len) {
    localStorage.removeItem("words");
    localStorage.setItem(
      "result",
      JSON.stringify({
        score: [correct, len],
        image: display.innerHTML,
      })
    );

    window.location.replace("/study?mode=result");
    console.log("TAFAQ");
  } else {
    word_prob.innerHTML = words[index].word;
  }

  tts(words[index].word);
});
