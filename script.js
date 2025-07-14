document.addEventListener("DOMContentLoaded", ()=> {
  const storedTask = JSON.parse(localStorage.getItem("tasks"))
  
  if (storedTask) {
    storedTask.forEach((task) => tasks.push(task));
    updateTaskList();
    updateStats();
 };
});

let tasks = [];
let justLoaded = true;
const saveTasks = () =>{
  localStorage.setItem("tasks" , JSON.stringify(tasks));
};

const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();
  
  if (text) {
    tasks.push({ text: text, completed: false });
    taskInput.value="";
    updateTaskList();
    updateStats();
    saveTasks();
    
  } 
};


const toggleTaskCompleted = (index) =>{
  tasks[index].completed = !tasks[index].completed
  updateTaskList();
  updateStats();
  saveTasks();
};

const deleteTask =(index) =>{
  tasks.splice(index, 1);
  updateTaskList();
  updateStats();
  saveTasks();
};

const editTask = (index) => {
 const taskInput= document.getElementById ("taskInput");
 taskInput.value = tasks[index].text;
 tasks.splice(index, 1);
  saveTasks();
  updateTaskList ();
  updateStats();
  
};

const updateStats = () =>{
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progress = (completedTasks / totalTasks) * 100;
  const progressBar = document.getElementById("progress");
  progressBar.style.width= `${progress}%`;
  
  document.getElementById("numbers").innerText=`${completedTasks} / ${totalTasks}` ;
  
  if (totalTasks > 0 && completedTasks === totalTasks && !justLoaded) {
    blastConfetti();
  }

  justLoaded = false;
};


const updateTaskList = () => {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
          const listItem = document.createElement("li");
          
          listItem.innerHTML =   `
          <div class = "taskItem">
            <div class="task ${task.completed ? "completed" : ""}">
      <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
        <p>${task.text}</p>
      </div>
      <div class ="icons">      
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA/CAYAAABXXxDfAAAAAXNSR0IArs4c6QAAAqlJREFUaEPtmltWAyEMhkNdmLole3y0Nx89dUvOxiwesFSkDCThOmfoaxmSL38IVwEr/okVs8OAX6v6Q/mh/AojMNJ+haJr5KF8LuXfP+QTt6+3VzFxv+V+l6z86VN+aeMS2OA6BS/wXDsAbHilstzAL3iGnwQ47rfiEOpK2bxs/oIcax9ziwV/PMuDANjfOhegU1Z8wzFmcO7/kOo60A+w92UXJmhzNsnwLniKcUygMBnG9YEMfzpLaZwuPU7vwAVMKrtUluQQgQRvG+RGG6O2auOC++y5bahikOB1Zb9W9d1WkL7FQmPBTX8pgpAATMqXVN03xmP2bkNRwLR7Ec/YQKPhbadizmCNu+1CxW3OZhXlbceoYwsTDN8Y31xgstcSvgAsHj5U3EL/pYCTNjallOdUdZUBV+dvCy1OAWaN+VxpjwE3QyZUD7j+NIOngIcCwAVvlvYccOWsu6pLAW8C3wt4dfiewKvC9wZeDb4WuDnswB5yFK/2NcHNahBbCIvC1wJ3d4LN4WuCdwVfG7wb+BbgXcC3Au8CnrPFzLVk5ew6s1Z76jFXLvDmylMjnxN8UfC5wRcDXwJ8EfClwLuCV2ds6uTVPrVVt6v25SZ2CYo5+W0Orxyw7/FCTucG7wL+7urajYB10YhVFNvOto0NLnqe/6ds5FpITXs+p0u+vLDhscfYNHhzUUm8E8Oql9KOc1/Hg9dPcOLPSFJgKN9yltWkYyzjTM3HCZgAuJspbMqz4Lk7NwwItU3q6wxS2hvnfFXd3J+58zsVCNNeP05SP+v5G2cYsuCV3ei0hqHI1AY7td3PvIkO6CAIeEx9hEh24/r8jfISIzu83eHc/E4Gi3yQa73ATvvcQC36G/Atot6DzaF8Dyq08GEo3yLqPdgcyvegQgsffgBUcUxt3mdKcQAAAABJRU5ErkJggg==" alt="Edit Task" onclick="editTask (${index})" />
           <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA/CAYAAABXXxDfAAAAAXNSR0IArs4c6QAAAjBJREFUaEPtWltSwzAMlOBgtFeiwyd98cmUKzUcDMwkjTtuCLGlyMadbH+r2F7tSvJDTAv+8YKxE8AvlX0wD+YX6AHIPgfpb+9u5R5p143taKWag6lxjj53G96rvo98lIX5w8ntmXrgRqt2RAdrJ2QBfzw5d4OZqVH5YKAY/qb16wvrxhpZgDn4kHULtm5UxNRsn3mtcmQJ8McPd/Yxvt2wiXOvSqoevJe84UJzOLQVggkzoaJysATwffKzCqUk5nOULauEFRsnlnCjsv9VtmIzVvb/lFKi4FvmO4kwPV1xhfVXW8OtnDSxFv6iw9S+IAp+bI25EpDGH3MSLMBLPQ7mM5QeKQmtPWR/KdrifX+RmO/O9g90jtXdFoPfV6TY3gXzkhzhZbxo8Kkyrj7mNcwDfMLFBZivOdtD9ombIqmMpfbhRqpInQfzYJ4odg0llbHUHrLvPYCYlx4lJQmsO3wIHjKkMpbaQ/aQvfLFRiJjyB4xf+nOQJ2fKC/S7C21R7ZHti+U7cOX3ruP+RBMSpOQ5Dra26aMG15dp972zo55fw/f3R4Zd0hJttpzm59UB5u5jwUSgFO2knAaG0cPPti4/Af7Fi1qavCh9FuvamJOq4Dh3Frnq8GH72oeRAkHDHuE5sw5C/yYA65s5mhXGbSjzgF+ueo3+BXv2GJqYv02KbBMwPuJbpqXtG3mf626V5IFaD+FKfgUb9dkA/A1sVFyLWC+pLdrmgvM18RGybX8APHyy14GnESKAAAAAElFTkSuQmCC"= alt="Delete Task" onclick="deleteTask (${index})" />
      </div>
      </div>
     `;
    
   
    listItem.addEventListener("change", () => toggleTaskCompleted(index));
    taskList.append(listItem);
  });
};

document.getElementById("button").addEventListener("click", function(e) {
  e.preventDefault();
  
  addTask();
  
});


const blastConfetti = ()=> {
  const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
};