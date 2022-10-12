// Javascript for Adding Question
// =============================================================================
// =============================================================================
const form = document.querySelector("#createQuestionForm");
const cont = {
  questionContainer: document.querySelector(".questions"),
  newsContainer: document.querySelector(".newsContainer"),
};
const addQuestion = document.querySelector(".addQuestion");
const two = document.getElementById("two");
addQuestion.addEventListener("click", createQuestionModal);

let submit = "";
// create form
// ===============================================================================
function createQuestionModal() {
  // remove the question and add the form HTML
  cont.questionContainer.style.display = "none";
  addQuestion.style.display = "none";
  two.style.display = "none";
  const question = `
            <div>
              <i class="fa-solid fa-chevron-left back"></i>
              <h2 class='heading'>Add Question</h2>
            </div>
            <input type="text" class="title" placeholder="Question Title">
            <textarea class="content" placeholder="Question Text"></textarea>
            <input type="submit" value="Submit" id="submit">`;
  form.innerHTML = question;

  // Back button event listener
  const back = document.querySelector(".back");
  back.addEventListener("click", () => {
    form.innerHTML = "";
    cont.questionContainer.style.display = "block";
    addQuestion.style.display = "block";
    two.style.display = "block";
  });

  // remove the Red Alert outline if triggered
  titleText = form.querySelector(".title");
  titleText.addEventListener("input", () => {
    titleText.classList.remove("redAlert");
  });

  bodyText = form.querySelector(".content");
  bodyText.addEventListener("input", () => {
    bodyText.classList.remove("redAlert");
  });

  // Add event listener to the submit button
  const submit = document.querySelector("#submit");
  submit.addEventListener("click", setQuestion);
}

// create question
// ===============================================================================
let count = 0;
function setQuestion(e) {
  // prevent submit form default response
  e.preventDefault();

  // Check if the title and boy contain text
  const titleText = form.querySelector(".title").value;
  const bodyText = form.querySelector(".content").value;

  if (titleText === "") {
    form.querySelector(".title").classList.add("redAlert");
  }
  if (bodyText === "") {
    form.querySelector(".content").classList.add("redAlert");
  } else {
    // if they contain text, then inject the questions container with the required HTML
    const questionHtml = `<div class="question" id='question${count}' draggable="true">
          <div class="title">
            <h3 class='heading'>${titleText}</h3>
            <div class="changers">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-pen-to-square edit"></i>
              <i class="fa-solid fa-trash trash"></i>
            </div>
          </div>
          <p class="content">${bodyText}</p>
        </div>`;
    cont.questionContainer.insertAdjacentHTML("beforeend", questionHtml);

    // Add event Listeners to the edit a delete buttons
    const question = document.querySelector(`#question${count}`);
    const star = question.querySelector('.fa-star')
    star.addEventListener('click', ()=> {
      star.classList.toggle('active')
    })
    const edit = question.querySelector(`.edit`);
    edit.addEventListener("click", changeQuestion);
    const trash = question.querySelector(`.trash`);
    trash.addEventListener("click", (e) => {
      addModal(e, "question");
    });

    // Reset the page to default by hiding the form and un-hiding the questions and add question button
    form.innerHTML = "";
    cont.questionContainer.style.display = "block";
    addQuestion.style.display = "block";
    two.style.display = "block";
    count++;

    // Checking if there is more than one question in the list of questions
    function questionsLength() {
      const questions = document.querySelectorAll(".question");
      if (questions.length > 1) {
        drag(".question");
      }
    }
    questionsLength();
  }
}
const modal = document.querySelector(".modalContainer");
// Delete Question
// ===============================================================================
function addModal(e, type) {
  one.style.display = "none";
  two.style.display = "none";
  let removedQuestion = e.target.parentElement.parentElement.parentElement;

  modal.innerHTML = `
  <div class='modal'>
    <div>
      <h1>Are you sure</h1>
      <div class="buttonContainer">
        <h2 class="yes">Yes</h2>
        <h2 class="no">No</h2>
      </div>
    </div>
  </div>
  `;
  const yes = document.querySelector(".yes");
  const no = document.querySelector(".no");

  yes.addEventListener("click", () => {
    remove(removedQuestion, type);
  });

  no.addEventListener("click", () => {
    modal.innerHTML = "";
    one.style.display = "block";
    two.style.display = "block";
  });
}

function remove(removedQuestion, type) {
  removedQuestion.remove();

  // Select all the remaining questions an re assign the question ID's
  const all = document.querySelectorAll(`.${type}`);
  let i = 0;

  all.forEach((unit) => {
    unit.id = `${type}${i}`;
    i++;
  });
  if (type === "question") {
    count--;
  } else {
    count2--;
  }

  one.style.display = "block";
  two.style.display = "block";
  modal.innerHTML = "";
}

// Edit Question
// ===============================================================================
function changeQuestion(e) {
  // hide the questions container and show the form
  one.style.display = "none";
  two.style.display = "none";
  const question = `
            <div>
              <i class="fa-solid fa-chevron-left back"></i>
              <h2 class='heading'>Edit Question</h2>
            </div>
            <input type="text" class="title" placeholder="Question Title">
            <textarea class="content" placeholder='Question Text'></textarea>
            <input type="submit" value="Edit" id='edit'>`;
  form.innerHTML = question;

  // setting text content for the form from the edited question
  titleValue = e.target.parentElement.previousSibling.previousSibling.innerText;
  form.querySelector(".title").value = titleValue;
  contentValue =
    e.target.parentElement.parentElement.nextSibling.nextSibling.innerText;
  form.querySelector(".content").value = contentValue;

  // if there is an input then remove the red alert class which
  titleText = form.querySelector(".title");
  titleText.addEventListener("input", () => {
    titleText.classList.remove("redAlert");
  });

  bodyText = form.querySelector(".content");
  bodyText.addEventListener("input", () => {
    bodyText.classList.remove("redAlert");
  });

  // adding listener to the back button
  const back = document.querySelector(".back");
  back.addEventListener("click", () => {
    form.innerHTML = "";
    one.style.display = "block";
    two.style.display = "block";
  });

  // recording the question id of the edited question for the event listener
  const id = e.target.parentElement.parentElement.parentElement.id;
  const edit = document.getElementById("edit");

  // Adding an event listener to the edit button
  edit.addEventListener("click", (e) => {
    // e.preventDefault;
    editValue(id, e);
  });
}

function editValue(id, e) {
  e.preventDefault();
  // Checking if the input and text area fileds contain values that arent empty
  const titleValue = form.querySelector(".title").value;
  const contentValue = form.querySelector(".content").value;
  if (titleValue === "") {
    form.querySelector(".title").classList.add("redAlert");
  }
  if (contentValue === "") {
    form.querySelector(".content").classList.add("redAlert");
  } else {
    // Assigning the edited values to the question chosen to edit.
    const outputParent = document.getElementById(id);

    outputParent.querySelector(".content").textContent = contentValue;
    outputParent.querySelector(".heading").innerText = titleValue;

    form.innerHTML = "";
    one.style.display = "block";
    two.style.display = "block";
  }
}

// Drag and drop Funcitonality
// ==========================================================================
const container = document.querySelector(".container");

// this adds two event listeners to the questions for drag start and drag end
function drag(i) {
  const value = document.querySelectorAll(i);
  value.forEach((value) => {
    value.addEventListener("dragstart", () => {
      value.classList.add("dragging");
    });
  });

  value.forEach((value) => {
    value.addEventListener("dragend", () => {
      value.classList.remove("dragging");
    });
  });
}

// this adds the event listener to the container for anything that gets dragged inside its contents
container.addEventListener("dragover", (e) => {
  e.preventDefault();

  const draggable = document.querySelector(".dragging");

  const classList = [...draggable.classList];
  const i = classList.reduce((acc, val) => {
    if (val !== "dragging") {
      acc = val;
    }
    return acc;
  }, "");

  const afterElement = getDragAfterElement(e.clientY, i);

  const container = cont[i + "Container"];
  if (afterElement == null) {
    container.appendChild(draggable);
  } else {
    container.insertBefore(draggable, afterElement);
  }
});

// this determines the element directly below the cursor when the curosor is dragging something
function getDragAfterElement(y, i) {
  const draggableElements = [
    ...document.querySelectorAll(`.${i}:not(.dragging)`),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
// Javascript for Adding News
// =============================================================================
// =============================================================================
const addNews = document.querySelector(".addNews");
const one = document.getElementById("one");
addNews.addEventListener("click", createNewsModal);

function createNewsModal() {
  // remove the question and add the form HTML
  one.style.display = "none";
  cont.newsContainer.style.display = "none";
  addNews.style.display = "none";
  const news = `
            <div>
              <i class="fa-solid fa-chevron-left back"></i>
              <h2 class='heading'>Add News</h2>
            </div>
            <input type="text" class="title" placeholder="News Title">
            <textarea class="content" placeholder="News Text"></textarea>
            <input type="submit" value="Submit" id="submit">`;
  form.innerHTML = news;

  // Back button event listener
  const back = document.querySelector(".back");
  back.addEventListener("click", () => {
    form.innerHTML = "";
    one.style.display = "block";
    cont.newsContainer.style.display = "block";
    addNews.style.display = "block";
  });

  // remove the Red Alert outline if triggered
  titleText = form.querySelector(".title");
  titleText.addEventListener("input", () => {
    titleText.classList.remove("redAlert");
  });

  bodyText = form.querySelector(".content");
  bodyText.addEventListener("input", () => {
    bodyText.classList.remove("redAlert");
  });

  // Add event listener to the submit button
  const submit = document.querySelector("#submit");
  submit.addEventListener("click", setNews);
}

// Set News
// ===============================================================================
let count2 = 0;
function setNews(e) {
  // prevent submit form default response
  e.preventDefault();

  // Check if the title and boy contain text
  const titleText = form.querySelector(".title").value;
  const bodyText = form.querySelector(".content").value;

  if (titleText === "") {
    form.querySelector(".title").classList.add("redAlert");
  }
  if (bodyText === "") {
    form.querySelector(".content").classList.add("redAlert");
  } else {
    // if they contain text, then inject the news container with the required HTML
    const questionHtml = `<div class="news" id='news${count2}' draggable="true">
          <div class="title">
            <h3 class='heading'>${titleText}</h3>
            <div class="changers">
              <i class="fa-solid fa-pen-to-square edit"></i>
              <i class="fa-solid fa-trash trash"></i>
            </div>
          </div>
          <p class="content">${bodyText}</p>
        </div>`;
    cont.newsContainer.insertAdjacentHTML("beforeend", questionHtml);

    // Add event Listeners to the edit and delete buttons
    const news = document.querySelector(`#news${count2}`);
    const edit = news.querySelector(`.edit`);
    edit.addEventListener("click", changeNews);
    const trash = news.querySelector(`.trash`);
    trash.addEventListener("click", (e) => {
      addModal(e, "news");
    });

    // Reset the page to default by hiding the form and un-hiding the questions and add question button
    form.innerHTML = "";
    one.style.display = "block";
    cont.newsContainer.style.display = "block";
    addNews.style.display = "block";
    count2++;

    // Checking if there is more than one question in the list of questions
    function newsLength() {
      const news = document.querySelectorAll(".news");
      if (news.length > 1) {
        drag(".news");
      }
    }
    newsLength();
  }
}

function changeNews(e) {
  // hide the questions container and show the form
  one.style.display = "none";
  two.style.display = "none";
  const question = `
            <div>
              <i class="fa-solid fa-chevron-left back"></i>
              <h2 class='heading'>Add News</h2>
            </div>
            <input type="text" class="title" placeholder="News Title">
            <textarea class="content" placeholder="News Text"></textarea>
            <input type="submit" value="Edit" id="edit">`;
  form.innerHTML = question;

  // setting text content for the form from the edited question
  titleValue = e.target.parentElement.previousSibling.previousSibling.innerText;
  form.querySelector(".title").value = titleValue;
  contentValue =
    e.target.parentElement.parentElement.nextSibling.nextSibling.innerText;
  form.querySelector(".content").value = contentValue;

  // if there is an input then remove the red alert class
  titleText = form.querySelector(".title");
  titleText.addEventListener("input", () => {
    titleText.classList.remove("redAlert");
  });

  bodyText = form.querySelector(".content");
  bodyText.addEventListener("input", () => {
    bodyText.classList.remove("redAlert");
  });

  // adding listener to the back button
  const back = document.querySelector(".back");
  back.addEventListener("click", () => {
    form.innerHTML = "";
    one.style.display = "block";
    two.style.display = "block";
  });

  // recording the question id of the edited question for the event listener
  const id = e.target.parentElement.parentElement.parentElement.id;

  // Adding an event listener to the edit button
  const edit = document.getElementById("edit");
  edit.addEventListener("click", (e) => {
    editValue(id, e);
  });
}
