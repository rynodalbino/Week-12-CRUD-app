//create variables and allows them to be pulled to html
let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textArea = document.getElementById("textArea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener('submit', (e) => { //event listener for add task button
    e.preventDefault(); //does not allow browser to refresh
    formValidation(); //runs function
});

let formValidation = ()=>{ //validate proper user input
    if(textInput.value === ""){ //if the user does not put data in field it returns an error
        console.log('failure')
        msg.innerHTML = "Task cannot be blank";
    }
    else{
        console.log('success'); //if user inputs a task run the acceptData function
        msg.innerHTML = ""; //clears input field if not blank
        acceptData();
        add.setAttribute("data-dismiss", "modal") //will dismiss the modal when added
        add.click();

        (() => {
            add.setAttribute("data-dismiss", ""); //clears and closes the modal
        })();
    }
};

let data = {} //store user inputs of tasks, date and descr

let acceptData = () => { //creates data from user input
    data["text"] = textInput.value;
    data["date"] = dateInput.value;
    data["description"] = textArea.value;

    createTasks(); //calls create task function
};

let createTasks = () => { //create tasks, inputs text, date and description data.  Using (this) it will only target that line
    tasks.innerHTML += ` 
    <div>
                <span class="fw-bold">${data.text}</span> 
                <span class="small text-secondary">${data.date}</span>
                <p>${data.description}</p>

                <span class="options">
                    <i onClick ="editTask(this)" data-toggle="modal" data-target="#form" class="bi bi-pencil"></i>
                    <i onClick ="deleteTask(this)" class="bi bi-trash-fill"></i>
                </span>
            </div>
            `;

        resetForm(); //calls resetForm function
};

let deleteTask = (e) => { //delete task
    e.parentElement.parentElement.remove(); //removes the entire entry not just one child
};

let editTask = (e) => { //edit tasks
    let selectedTask = e.parentElement.parentElement; //selects the div

    textInput.value = selectedTask.children[0].innerHTML; //edit the the task
    dateInput.value = selectedTask.children[1].innerHTML; //edit the date
    textArea.value = selectedTask.children[2].innerHTML; //edit the description

    selectedTask.remove();
};

let resetForm = () => { //resets form
    textInput.value = ""; //set inputs to blank
    dateInput.value = "";
    textArea.value = "";

}