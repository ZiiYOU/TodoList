const todoAdd = document.querySelector(".todoAdd");
const input = document.querySelector("input");
const list = document.querySelector(".list");

// 새로고침했을 때 local storage 에 값이 있을 경우 리스트 불러오기
const savedList = JSON.parse(localStorage.getItem("save"));
if (savedList) {
  for (let j = 0; j < savedList.length; j++) {
    createTodo(savedList[j]);
  }
}

// 기능 1. 공백 체크한 후 할 일 추가하기
function createTodo(Data) {
  let todoContents = input.value;
  if (Data) {
    todoContents = Data.contents;
  }

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

    // 기능 3. 할 일 목록에서 삭제하기
    deleteBox.addEventListener("click", deleteTodo);
  }
}

// 'submit' - <form> element 에서만 작동.
todoAdd.addEventListener("submit", (event) => {
  event.preventDefault();
  createTodo();
  saveItem();
  input.value = "";
});

// 기능 3. 할 일 목록에서 삭제하기
//  - 문제 : 자꾸 모든 목록이 다 삭제된다.
//  - 해결 : todoItem 을 전역변수로 두고 삭제하니 모든 목록 삭제.
// 따라서 리스트들을 추가할 전역변수 list를 따로 만들고,
//      함수 내에서 todoItem을 지역변수로 생성하여 todoCheckbox와 deleteBox를 자식 요소로 담아주었다.
function deleteTodo(event) {
  const x = event.target.parentElement;
  x.remove();
  saveItem();
}

// 기능 4. 새로 고침해도 데이터 날라가지 않게 Local Storage 에 담아주기.
function saveItem() {
  let saveList = [];
  for (let i = 0; i < list.children.length; i++) {
    let items = list.querySelectorAll(".item");
    const todoObj = {
      contents: items[i].textContent,
      done: items[i].classList.contains("done"),
    };
    saveList.push(todoObj);
  }
  localStorage.setItem("save", JSON.stringify(saveList));
}

if (saveItem.length === 0) {
  localStorage.removeItem("save");
}
