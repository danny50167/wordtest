const input_word = document.getElementById("input_word");
const input_meaning = document.getElementById("input_meaning");

const words_counter = document.getElementById("words_num");

const div_words = document.getElementById("words");
const span_word = document.getElementsByClassName("word");

const btn = document.getElementById("add");
const btn_test = document.getElementById("test");

let words = [];
let len = 0;

btn.addEventListener("click", (e) => {
  e.preventDefault();

  if (input_word.value && input_meaning.value) {
    words.push({
      word: input_word.value,
      meaning: input_meaning.value,
    });

    const span = document.createElement("span");
    span.innerHTML = input_word.value;
    span.className = "word";

    div_words.appendChild(span);

    len++;
    words_counter.innerHTML = len;
  }

  Array.from(span_word).forEach((span) => {
    console.log("hi..?");
    span.addEventListener("click", (e) => {
      e.preventDefault();

      console.log("hoi");

      for (const index in words) {
        console.log(index);
        if (words[index].word == span.innerHTML) {
          words.splice(index, index + 1);
          len -= 1;
        }
      }

      words_counter.innerHTML = len;
      span.remove();

      if (len > 0) {
        btn_test.hidden = false;
      } else {
        btn_test.hidden = true;
      }
    });
  });
  input_word.value = "";
  input_meaning.value = "";

  if (len > 0) {
    btn_test.hidden = false;
  } else {
    btn_test.hidden = true;
  }
});

btn_test.addEventListener("click", (e) => {
  localStorage.setItem("words", `${JSON.stringify(words)}`);
  window.location.replace("/study?mode=test");
});
