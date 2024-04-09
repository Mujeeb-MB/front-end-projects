const checkBoxList = document.querySelectorAll(".check-box");
const goalInputs = document.querySelectorAll(".goal-input");
const errorMsg = document.querySelector(".error-label");
const progressBar = document.querySelector(".progress-bar");
const progressBarValue = document.querySelector(".progress-value");
const progressCount = document.querySelector(".progress-count");
const labelQuote = document.querySelector(".label");
const footerQuote = document.querySelector(".quote");

const allQuotes = [
  "Raise the bar by completing your goals!",
  "Well begun is half done!",
  "Just a step away, keep going!",
  "Whoa! You just completed all the goals, time for chill",
];

const bottomQuotes = [
  "“Move one step ahead, today!”",
  "“Keep Going, You’re making great progress!”",
];

// const goals = JSON.parse(localStorage.getItem("goals")) || {
//   first: {
//     name: "",
//     completed: false,
//   },
//   second: {
//     name: "",
//     completed: false,
//   },
//   thrid: {
//     name: "",
//     completed: false,
//   },
// };

const goals = JSON.parse(localStorage.getItem("goals")) || {};

let completedGoalsCount = Object.values(goals).filter(
  (goal) => goal.completed
).length;
// console.log(completedGoalsCount);
progressBarValue.style.width = `${
  (completedGoalsCount / goalInputs.length) * 100
}%`;
progressCount.innerText = `${completedGoalsCount}/${goalInputs.length} completed`;
labelQuote.innerText = allQuotes[completedGoalsCount];

if (completedGoalsCount === 0) {
  footerQuote.innerText = bottomQuotes[0];
} else {
  footerQuote.innerText = bottomQuotes[1];
}

checkBoxList.forEach((checkBox) => {
  checkBox.addEventListener("click", (e) => {
    const allFieldsFilled = [...goalInputs].every((input) => {
      return input.value;
    });

    if (allFieldsFilled) {
      checkBox.parentElement.classList.toggle("completed");
      // progressBarValue.style.width = '33.33%'

      const inputId = checkBox.nextElementSibling.id;
      goals[inputId].completed = !goals[inputId].completed;
      completedGoalsCount = Object.values(goals).filter(
        (goal) => goal.completed
      ).length;
      progressBarValue.style.width = `${
        (completedGoalsCount / goalInputs.length) * 100
      }%`;
      progressCount.innerText = `${completedGoalsCount}/${goalInputs.length} completed`;
      labelQuote.innerText = allQuotes[completedGoalsCount];
      if (completedGoalsCount === 0) {
        footerQuote.innerText = bottomQuotes[0];
      } else {
        footerQuote.innerText = bottomQuotes[1];
      }
      localStorage.setItem("goals", JSON.stringify(goals));
    } else {
      progressBar.classList.add("show-error");
    }
  });
});

goalInputs.forEach((input) => {
  if (goals[input.id]) {
    input.value = goals[input.id].name;

    if (goals[input.id].completed) {
      input.parentElement.classList.add("completed");
    }
  }

  input.addEventListener("focus", () => {
    progressBar.classList.remove("show-error");
  });

  input.addEventListener("input", (e) => {
    if (goals[input.id] && goals[input.id].completed) {
      input.value = goals[input.id].name;
      return;
    }

    if (goals[input.id]) {
      goals[input.id].name = input.value;
    } else {
      goals[input.id] = {
        name: input.value,
        completed: false,
      };
    }

    localStorage.setItem("goals", JSON.stringify(goals));
  });
});
