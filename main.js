//유저가 값을 입력
//+ 버튼을 클릭하면, 할일 추가
//delete버튼은 할일 삭제
//check버튼은 할일이 끝나고 밑줄
//1. true -> false
//2. true이면 끝난걸로 밑줄 보여줌
//3. false면 안끝난걸로 그대로
//탭을 누르면 언더바 이동
//탭 종류에 따라 해당 아이템
//전체탭을 누르면 다시 전체탭으로

let taskInput=document.getElementById("task-input");
let addButton=document.getElementById("add-button");
let taskList=[];
let tabs = document.querySelectorAll(".task-tabs div");
let mode='all';
let filterList = [];

addButton.addEventListener("click",addTask);
for(let i=1;i<tabs.length;i++){
    tabs[i].addEventListener("click",function(event) {
        filter(event);
    });
}

function addTask(){
    let task = {
        id : randomIDGenerate(), 
        taskContent : taskInput.value,
        isComplete: false
    };
    taskList.push(task);
    render();
}

function render(){

    let list = [];
    if(mode === "all"){
        list = taskList;
    }else if(mode === "ongoing" || mode === "done"){
        list = filterList;
    }

    let resultHTML="";
    for(let i=0;i<list.length;i++){
        if(list[i].isComplete == true){
            resultHTML += `<div class="task">
            <div class="task-done">${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`;
        }else{
            resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`; 
        }

    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
}

function deleteTask(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id==id){
            taskList.splice(i,1);
            break;
        }
    }
    render();
}

function filter(event){
    console.log("fiter",event.target.id);
    mode = event.target.id;
    filterList = [];
    if(mode === "all"){
        render();
    }else if(mode === "ongoing"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i]);
            }
        }
        console.log("진행중",filterList);
        render();
    }else if(mode === "done"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i]);
            }
        }
        render();
    }
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2,9);
}
