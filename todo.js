function Todo(name, state) {
  this.name = name;
  this.state = state;
}




var todos = JSON.parse(localStorage.getItem("MyTodoitems"));
if(todos === null)
  todos =[];



 

//var todos = JSON.parse(localStorage.getItem("todos"));
//if(todos === null)
 // todos =[];


//todos = JSON.parse(localStorage.getItem("MyTodoitems1"));
var states = ["active", "inactive", "done"];
var tabs = ["all"].concat(states);
var currentTab = "all";

var form = document.getElementById("new-todo-form");
var input = document.getElementById("new-todo-title");

form.onsubmit = function(event) {
	
	
  event.preventDefault();

	
  if (input.value && input.value.length) {
	  
	  todos = localStorage.getItem("MyTodoitems") ? JSON.parse(localStorage.getItem("MyTodoitems")): [];
	    todos.push(new Todo(input.value, "active"));
	 localStorage.setItem("MyTodoitems", JSON.stringify(todos));
	 // localStorage.setItem("existingItems", JSON.stringify(existingEntries));
	
	 
    input.value = "";
    renderTodos();
  }
};

var buttons = [
  { action: "done", icon: "ok" },
  { action: "active", icon: "plus" },
  { action: "inactive", icon: "minus" },
  { action: "remove", icon: "trash" },
  { action: "moveup", icon: "chevron-up" },
  { action: "movedown", icon: "chevron-down" }
];

function renderTodos() {
	
	
	let itemsArray = localStorage.getItem('MyTodoitems') ? JSON.parse(localStorage.getItem('MyTodoitems')) : [] // shows only active items
	const data = JSON.parse(localStorage.getItem('MyTodoitems')) //active
	
  var todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";
  
  console.log(data);
  data.filter(function(todo) {
	  
      return todo.state === currentTab || currentTab === "all";
    })
    .forEach(function(todo) {
      var div1 = document.createElement("div");
      div1.className = "row";

      var div2 = document.createElement("div");
      div2.innerHTML =
        '<a class="list-group-item" href="#">' + todo.name + "</a>";
      div2.className = "col-xs-6 col-sm-9 col-md-10";

      var div3 = document.createElement("div");
      div3.className = "col-xs-6 col-sm-3 col-md-2 btn-group text-right";
      buttons.forEach(function(button) {
        var btn = document.createElement("button");
        btn.className = "btn btn-default btn-xs";
        btn.innerHTML =
          '<i class="glyphicon glyphicon-' + button.icon + '"></i>';
        div3.appendChild(btn);

        if (button.action === todo.state) {
          btn.disabled = true;
        }

        if (button.action === "remove") {
          btn.title = "Remove";
          btn.onclick = function() {
            if (
              confirm(
                "Are you sure you want to delete the item titled " + todo.name
              )
            ) {
				remove(this.name);
              todos.splice(todos.indexOf(todo), 1);
              renderTodos();
            }
          };
        }
else if(button.action === "done")
	 {
		  btn.title = "Mark as done";
		  btn.onclick = function() {
             
			todo.state =button.action;
			 

			  // todos = JSON.parse(localStorage.getItem("MyTodoitems"));
			// let nameee = todo.name;
			// console.log(todo);
			// remove(nameee);
              // todos.splice(todos.indexOf(todo), 1);
			 
	    // todos.push(new Todo(nameee, "done"));
		
		// ////localStorage.setItem("todos", JSON.stringify(todos));
		
	 // localStorage.setItem("MyTodoitems", JSON.stringify(todos));
			 let items = JSON.parse(localStorage.getItem("MyTodoitems"));
			 items.filter(x=>x.name==todo.name).forEach(y=>y.state=button.action);
			 localStorage.setItem("MyTodoitems",JSON.stringify(items));
			 
              renderTodos();
			  
			   
     //localStorage.setItem("todos",JSON.stringify(todos));
	 //  localStorage.setItem("MyTodoitems",JSON.stringify(todos));
            
          };
	 }
	 else if(button.action === "inactive")
	 {
		  btn.title = "Mark as inactive";
		  btn.onclick = function() {
			  
			  todo.state =button.action;
           let items = JSON.parse(localStorage.getItem("MyTodoitems"));
			 items.filter(x=>x.name==todo.name).forEach(y=>y.state=button.action);
			 localStorage.setItem("MyTodoitems",JSON.stringify(items));
			 
              renderTodos();
            
          };
	 }
	  else if(button.action === "moveup")
	 {
		  btn.title = "moveup";
		  btn.onclick = function() {
             todos = JSON.parse(localStorage.getItem("MyTodoitems"));
			 
			  var index = todos.findIndex(x=>x.name == todo.name);
			  
			 //  swapInArray(todos, index, index - 1);
           if(index != 0)
            {
              var temp = todos[index-1];
              todos[index-1] = todo;
              todos[index] = temp;
            }
			
			 console.log(todos);
 localStorage.setItem("MyTodoitems", JSON.stringify(todos));
			
              renderTodos();
            
          };
	 }
	  else if(button.action === "movedown")
	 {
		  btn.title = "movedown";
		  btn.onclick = function() {
             
			 todos = JSON.parse(localStorage.getItem("MyTodoitems"));
			  var index = todos.findIndex(x=>x.name==todo.name);
			  
			   //swapInArray(todos, index + 1, index);
             if(index != length-1)
             {
               var temp = todos[index+1];
               todos[index+1] = todo;
               todos[index] = temp;
             }
			   localStorage.setItem("MyTodoitems", JSON.stringify(todos));
			 
              renderTodos();
            
          };
	 }

		else {
          btn.title = "Mark as " + button.action;
          btn.onclick = function() {
           todo.state =button.action;
           let items = JSON.parse(localStorage.getItem("MyTodoitems"));
			 items.filter(x=>x.name==todo.name).forEach(y=>y.state=button.action);
			 localStorage.setItem("MyTodoitems",JSON.stringify(items));
			 
            renderTodos();
          };
        }
      });

      div1.appendChild(div2);
      div1.appendChild(div3);

      todoList.appendChild(div1);
	  let all = document.getElementsByClassName('alltax')[0];
	  let active = document.getElementsByClassName('active1')[0];
	  let inactive = document.getElementsByClassName('inactive')[0];
	  let done = document.getElementsByClassName('done')[0];
	  let items = JSON.parse(localStorage.getItem("MyTodoitems"));
	  if(all) all.innerText = items.length;
	  active.innerText = items.filter(x=>x.state=='active')?.length;
	  inactive.innerText = items.filter(x=>x.state=='inactive')?.length;
	  done.innerText = items.filter(x=>x.state=='done')?.length;
    });
}

renderTodos();

function selectTab(element) {
  var tabName = element.attributes["data-tab-name"].value;
  currentTab = tabName;
  var todoTabs = document.getElementsByClassName("todo-tab");
  for (var i = 0; i < todoTabs.length; i++) {
    todoTabs[i].classList.remove("active");
  }
  element.classList.add("active");
  renderTodos();
}

function remove(event) {
	 let todos;
  if (localStorage.getItem("MyTodoitems") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("MyTodoitems"));
  }
  const todoIndex = todos;
  todos.splice(todos.indexOf(todoIndex), 1);

    localStorage.setItem('MyTodoitems', JSON.stringify(todos))
}

function moveElement(array, sourceIndex, destinationIndex) {
    return array.map(a => a.id === sourceIndex ? array.find(a => a.id === destinationIndex): a.id === destinationIndex ? array.find(a => a.id === sourceIndex) : a )
}

function swapInArray(arr, i1, i2){
    let t = arr[i1];
    arr[i1] = arr[i2];
    arr[i2] = t;
}

function moveBefore(arr, el){
    const ind = arr.indexOf(el);
    if(ind !== -1 && ind !== 0){
        swapInArray(arr, ind, ind - 1);
    }
}
