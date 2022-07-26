window.onload = function () {
  show(0);
};

function submitform(e) {
  e.preventDefault();
  let entered_name = document.forms["welcome"]["name"].value;
  if (localStorage.getItem("username") == null) {
    localStorage.setItem("username", "[]");
  }
  var storedNames = JSON.parse(localStorage.getItem("username"));
  storedNames.push(entered_name);
  localStorage.setItem("username", JSON.stringify(storedNames));
  for (let i = 0; i < storedNames.length; i++) {
    if (entered_name == storedNames[i]) {
      alert("You have attempted the quiz");
      break;
    } else if (entered_name != storedNames[i]) {
      alert("Welcome");
      // document.querySelector(".error").style.display = "none";
      location.href = "question1.html";
      break;
    }
  }
}

let questions = [
  {
    id: 1,
    question: "Hyper Text Markup Language Stands For?",
    options: ["JQuery", "XHTML", "CSS", "HTML"],
    answer: "HTML",
  },
  {
    id: 2,
    question: "Cascading Style sheet stands for?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: "CSS",
  },
  {
    id: 3,
    question: "Which is a JavaScript Library?",
    options: ["React", "Laravel", "Django", "Sass"],
    answer: "React",
  },
  {
    id: 4,
    question: "Which is a backend language?",
    options: ["PHP", "HTML", "React", "All"],
    answer: "PHP",
  },
  {
    id: 5,
    question: "Which is best for Artificial intelligence?",
    options: ["React", "Laravel", "Python", "Sass"],
    answer: "Python",
  },
];

let question_count = 0;
let score = 0;
function next() {
  document.querySelector("#error").style.display = "block";
  let user_answer = document.querySelector("li.option.active").innerHTML;
  document.querySelector("#error").style.display = "none";

  if (user_answer == questions[question_count].answer) {
    score++;
    localStorage.setItem("scores", score);
  }

  if (question_count == questions.length - 1) {
    location.href = "exitpage.html";
  }

  question_count++;
  show(question_count);
}

function prev() {
  question_count--;
  show(question_count);
}
function skip() {
  question_count++;
  show(question_count);
}

function progress() {
  let currentQuestion = question_count + 1;
  let progressElement = document.getElementById("status");
  progressElement.innerHTML = `<p>${currentQuestion} of ${questions.length}</p>`;
}

function show(count) {
  let question = document.getElementById("questions");
  question.innerHTML = `<h3>Q${question_count + 1}.${
    questions[count].question
  }</h3>
              <ul class = "option_group">
              <li class= "option">${questions[count].options[0]}</li>
              <li class= "option">${questions[count].options[1]}</li>
              <li class= "option">${questions[count].options[2]}</li>
              <li class= "option">${questions[count].options[3]}</li>
              </ul>`;
  active_option();
  progress();
}

function active_option() {
  let option = document.querySelectorAll("li.option");
  for (let i = 0; i < option.length; i++) {
    option[i].onclick = function () {
      for (let j = 0; j < option.length; j++) {
        if (option[j].classList.contains("active")) {
          option[j].classList.remove("active");
        }
      }
      option[i].classList.add("active");
    };
  }
}
localStorage.clear("count_timer");

if (localStorage.getItem("count_timer")) {
  var count_timer = localStorage.getItem("count_timer");
} else {
  var count_timer = 60 * 10;
}
var minutes = parseInt(count_timer / 60);
var seconds = parseInt(count_timer % 60);

function countDownTimer() {
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (count_timer <= 0) {
    localStorage.clear("count_timer");
    location.href = "exitpage.html";
  } else {
    count_timer = count_timer - 1;
    document.getElementById("countdown").innerHTML = minutes + ":" + seconds;
    minutes = parseInt(count_timer / 60);
    seconds = parseInt(count_timer % 60);
    localStorage.setItem("count_timer", count_timer);
    setTimeout("countDownTimer()", 1000);
  }
}
setTimeout("countDownTimer()", 1000);
