const form = document.getElementById("form");
const input = document.getElementsByClassName("input");
const input_id = document.getElementById("input_ID");
const warn_id = document.getElementById("warn_id");
const warning_br = document.getElementById("warning_br");
const input_pw = document.getElementById("input_PW");
const btn = document.getElementById("btn");

fetch("db/users.json")
  .then((res) => res.json())
  .then((users) => {
    document.addEventListener("keypress", (e) => {
      if (e.keyCode == 13) {
        btn.click();
      }
    });
    input_id.addEventListener("input", (e) => {
      e.preventDefault();

      if (users[input_id.value]) {
        warn_id.hidden = false;
        warning_br.hidden = false;
      } else {
        warn_id.hidden = true;
        warning_br.hidden = true;
      }
    });

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(users);

      // if (users[input_id.value]) {
      // return;
      // } else {
      let canReturn = true;
      Array.from(input).forEach((input) => {
        console.log(input.value);
        if (!input.value && canReturn == true) {
          alert(`Insert Your ${input.name}.`);
          canReturn = false;
          return;
        }
      });
      if (canReturn) {
        form.submit();
      }
      // }
    });
  });
