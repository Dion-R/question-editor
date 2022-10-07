const form = document.querySelector("#createQuestionForm");
const questions = document.querySelector(".questions");
const addQuestion = document.querySelector(".addQuestion");
addQuestion.addEventListener("click", createModal);

let submit = "";
// create Modal
// ===============================================================================
function createModal() {
  questions.style.display = "none";
  addQuestion.style.display = "none";
  const question = `
            <h2>Add a Question</h2>
            <input type="text" class="title" placeholder="Question Title">
            <textarea class="content" placeholder="Question Text"></textarea>
            <input type="submit" value="Submit" id="submit">`;
  form.insertAdjacentHTML("beforeend", question);
  const submit = document.querySelector("#submit");
  submit.addEventListener("click", setQuestion);
}

// create question
// ===============================================================================
let count = 0;
function setQuestion(e) {
  e.preventDefault();
  const titleText = form.querySelector(".title").value;
  const bodyText = form.querySelector(".content").value;

  const questionHtml = `<div class="question" id='question${count}'>
          <div class="title">
            <h3>${titleText}</h3>
            <div class="changers">
              <i class="fa-solid fa-pen-to-square edit"></i>
              <i class="fa-solid fa-trash trash"></i>
            </div>
          </div>
          <p class="content">
            ${bodyText}
          </p>
        </div>`;
  questions.insertAdjacentHTML("beforeend", questionHtml);
  const question = document.querySelector(`#question${count}`)
  const edit = question.querySelector(`.edit`);
  edit.addEventListener("click", change);
  const trash = question.querySelector(`.trash`);
  trash.addEventListener("click", remove);

  form.innerHTML = "";
  questions.style.display = "block";
  addQuestion.style.display = "block";
  console.log(count)
  count++;
  console.log(count)

  console.log(titleText);
  console.log(bodyText);
}

// Delete Question
// ===============================================================================
function remove(e) {
  // removes the question
  e.target.parentElement.parentElement.parentElement.remove();
console.log('hello')
  document.querySelectorAll(".question");
  let i = 0;

  const question = document.querySelectorAll(".question");

  question.forEach((question) => {
    question.id = `question${i}`;
    i++;
  });
  count--
}

// Edit Question
// ===============================================================================
function change(e) {
  questions.style.display = "none";
  addQuestion.style.display = "none";
  const question = `
            <h2>Edit a Question</h2>
            <input type="text" class="title" placeholder="Question Title">
            <textarea class="content" placeholder="Question Text"></textarea>
            <input type="submit" value="Edit">`;
  form.insertAdjacentHTML("beforeend", question);

  titleValue = e.target.parentElement.previousSibling.previousSibling.textContent;
  const titleInput = form.querySelector(".title");
  titleInput.value = titleValue;

  contentValue = e.target.parentElement.parentElement.nextSibling.nextSibling.textContent;
  console.log(contentValue);
  const contentInput = form.querySelector(".content");
  contentInput.value = contentValue;
}
