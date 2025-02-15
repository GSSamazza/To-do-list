document.getElementById("task").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      addTask();
    }
  });
  
  function addTask() {
    let taskInput = document.getElementById("task");
    let taskValue = taskInput.value;
    
    if (taskValue.trim() === "") return;
    
    let li = document.createElement("li");
    let note = document.createElement("input");
    note.type = "text";
    note.placeholder = "Adicione uma anotação...";
    note.classList.add("note");
    
    li.innerHTML = `<span>${taskValue}</span>`;
    li.appendChild(note);
    
    let completeButton = document.createElement("button");
    completeButton.classList.add("delete-btn");
    completeButton.innerText = "✔";
    completeButton.onclick = function() {
      completeTask(this);
    };
    li.appendChild(completeButton);
    
    document.getElementById("taskList").appendChild(li);
    taskInput.value = "";
  }
  
  function completeTask(button) {
    let li = button.parentElement;
    button.remove();
    
    let undoButton = document.createElement("button");
    undoButton.classList.add("restore-btn");
    undoButton.innerText = "↩";
    undoButton.onclick = function() {
      undoTask(this);
    };
    li.appendChild(undoButton);
    
    document.getElementById("historyList").appendChild(li);
  }
  
  function undoTask(button) {
    let li = button.parentElement;
    button.remove();
    
    let completeButton = document.createElement("button");
    completeButton.classList.add("delete-btn");
    completeButton.innerText = "✔";
    completeButton.onclick = function() {
      completeTask(this);
    };
    li.appendChild(completeButton);
    
    document.getElementById("taskList").appendChild(li);
  }
  
  function clearHistory() {
    document.getElementById("historyList").innerHTML = "";
    hideConfirmationPopup();
  }
  
  function toggleHistory() {
    let historyList = document.getElementById("historyList");
    let historyTitle = document.getElementById("historyTitle");
    
    historyList.classList.toggle("hidden");
    
    if (historyList.classList.contains("hidden")) {
      historyTitle.innerHTML = "Histórico ✊"; // Aba fechada
    } else {
      historyTitle.innerHTML = "Histórico 👇"; // Aba aberta
    }
  }
  
  function exportHistoryTXT() {
    let taskList = document.getElementById("taskList").children;
    let historyList = document.getElementById("historyList").children;
    let exportText = "Tasks em Aberto:\n";
  
    for (let item of taskList) {
      let taskSpan = item.querySelector("span");
      let noteInput = item.querySelector(".note");
      let taskText = taskSpan ? taskSpan.innerText : "Sem título";
      let noteText = noteInput ? noteInput.value : "Sem anotação";
  
      exportText += `- ${taskText} (Anotação: ${noteText})\n`;
    }
  
    exportText += "\nTasks Encerradas:\n";
  
    for (let item of historyList) {
      let taskSpan = item.querySelector("span");
      let noteInput = item.querySelector(".note");
      let taskText = taskSpan ? taskSpan.innerText : "Sem título";
      let noteText = noteInput ? noteInput.value : "Sem anotação";
  
      exportText += `- ${taskText} (Anotação: ${noteText})\n`;
    }
  
    let blob = new Blob([exportText], { type: "text/plain" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "historico_tarefas.txt";
    a.click();
  }
  
  function exportHistoryPDF() {
    let taskList = document.getElementById("taskList").children;
    let historyList = document.getElementById("historyList").children;
    let exportText = "Tasks em Aberto:\n";
  
    for (let item of taskList) {
      let taskSpan = item.querySelector("span");
      let noteInput = item.querySelector(".note");
      let taskText = taskSpan ? taskSpan.innerText : "Sem título";
      let noteText = noteInput ? noteInput.value : "Sem anotação";
  
      exportText += `- ${taskText} (Anotação: ${noteText})\n`;
    }
  
    exportText += "\nTasks Encerradas:\n";
  
    for (let item of historyList) {
      let taskSpan = item.querySelector("span");
      let noteInput = item.querySelector(".note");
      let taskText = taskSpan ? taskSpan.innerText : "Sem título";
      let noteText = noteInput ? noteInput.value : "Sem anotação";
  
      exportText += `- ${taskText} (Anotação: ${noteText})\n`;
    }
  
    // Usando jsPDF para criar o PDF
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();
    doc.text(exportText, 10, 10);
    doc.save("historico_tarefas.pdf");
  }
  
  function exportHistoryCSV() {
    let taskList = document.getElementById("taskList").children;
    let historyList = document.getElementById("historyList").children;
    let exportText = "Tarefa,Anotação\n";
  
    for (let item of taskList) {
      let taskSpan = item.querySelector("span");
      let noteInput = item.querySelector(".note");
      let taskText = taskSpan ? taskSpan.innerText : "Sem título";
      let noteText = noteInput ? noteInput.value : "Sem anotação";
  
      exportText += `"${taskText}","${noteText}"\n`;
    }
  
    exportText += "\nTasks Encerradas:\n";
  
    for (let item of historyList) {
      let taskSpan = item.querySelector("span");
      let noteInput = item.querySelector(".note");
      let taskText = taskSpan ? taskSpan.innerText : "Sem título";
      let noteText = noteInput ? noteInput.value : "Sem anotação";
  
      exportText += `"${taskText}","${noteText}"\n`;
    }
  
    let blob = new Blob([exportText], { type: "text/csv" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "historico_tarefas.csv";
    a.click();
  }
  
  function showConfirmationPopup() {
    document.getElementById("confirmationPopup").style.display = "flex";
  }
  
  function hideConfirmationPopup() {
    document.getElementById("confirmationPopup").style.display = "none";
  }
  