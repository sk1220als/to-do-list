let user = document.querySelector("#user");
let add = document.querySelector("#add");
let taskList = []; // 입력한 것을 담을 수 있는 배열

let tab = document.querySelectorAll(".tab li");
let filterList = []; // 진행 중, 종료
let mode = "all";

add.addEventListener("click", addTask);

function addTask() {
  // console.log("클릭");
  // let taskContent = user.vlaue

  let taskContent = {
    id: randomId(), // 고유번호
    taskContent: user.value, // 내용
    isComplete: false, // false 진행 중, true 종료
  };

  taskList.push(taskContent); // 입력한 값, 고유번호, 진행 여부를 taskList에 넣음
  console.log(taskList);
  user.value = "";
  render();
}

function render() {
  // console.log("화면");
  list = [];
  if (mode == "all") {
    list = taskList;
  } else if (mode == "ing" || mode == "end") {
    list = filterList;
  }

  let result = "";

  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      result += `
      <div class="task">
        <div class="task-done">${list[i].taskContent}</div>
        <div>
            <button onclick="complete(${list[i].id})">완료</button>
            <button onclick="deleteTask(${list[i].id})">삭제</button>
        </div>
      </div>
    `;
    } else {
      result += `
        <div class="task">
          <div>${list[i].taskContent}</div>
          <div>
              <button onclick="complete(${list[i].id})">완료</button>
              <button onclick="deleteTask(${list[i].id})">삭제</button>
          </div>
        </div>
      `;
    }
  }
  document.querySelector("#taskBoard").innerHTML = result;
}

function complete(id) {
  //   console.log("체크");
  //   console.log(id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
    }
  }
  // console.log(taskList);
  filter();
}

// 어떤 체크를 눌렀는지 알아야 함. 그래서 아이디가 필요함

function randomId() {
  // console.log(Date.now());
  return Date.now();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
    }
  }
  filter();
}

for (let i = 0; i < tab.length; i++) {
  tab[i].addEventListener("click", function (event) {
    for (let j = 0; j < tab.length; j++) {
      tab[j].classList.remove("on");
    }

    tab[i].classList.add("on");
    filter(event); // 이벤트가 발생한 tab
  });
}

function filter(event) {
  //   console.log("filter");
  //   console.log(event);
  if (event) {
    mode = event.target.id;
    // mode = event.target;
    // console.log(mode);
  }
  filterList = [];

  if (mode == "all") {
    console.log("all");
    render();
  } else if (mode == "ing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }

    render();
  } else if (mode == "end") {
    // console.log("end");
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }

    render();
  }
}
