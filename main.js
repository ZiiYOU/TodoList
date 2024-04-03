const todoAdd = document.querySelector(".todoAdd");
const input = document.querySelector("input");
const list = document.querySelector(".list");

// 기능 1. 공백 체크한 후 할 일 추가하기
function createTodo() {
  let todoContents = input.value;

  if (todoContents.trim() != "") {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todoItem");

    const todoCheckBox = document.createElement("div");
    todoCheckBox.classList.add("todoCheckBox");

    const checkBox = document.createElement("div");
    checkBox.classList.add("checkBox");

    const checkIcon = document.createElement("div");
    checkIcon.classList.add("checkIcon");

    const item = document.createElement("div");
    item.classList.add("item");

    const deleteBox = document.createElement("div");
    deleteBox.classList.add("deleteBox");

    checkBox.appendChild(checkIcon);
    todoCheckBox.append(checkBox, item);
    todoItem.append(todoCheckBox, deleteBox);
    list.appendChild(todoItem);

    item.textContent = todoContents;
    deleteBox.append("x");
    checkIcon.append("✔️");

    // 기능 2. 할 일 마친 후 체크하기
    checkBox.addEventListener("click", () => {
      checkIcon.classList.toggle("done");
      item.classList.toggle("done");
      saveItem();
    });
  }
}

// 'submit' - <form> element 에서만 작동.
todoAdd.addEventListener("submit", (event) => {
  event.preventDefault();
  createTodo();
  input.value = "";
});
