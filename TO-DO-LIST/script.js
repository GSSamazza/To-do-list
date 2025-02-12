function addTask() {
    let taskInput = document.getElementById("task");
    let taskValue = taskInput.value;
    
    if (taskValue.trim() === "") return;
    
    let li = document.createElement("li");
    let note = document.createElement("input");
    note.type = "text";
    note.placeholder = "Adicione uma anotação... ✍️";
    note.classList.add("note");
    
    li.innerHTML = `<span>${taskValue}</span>`;
    li.appendChild(note);
    li.innerHTML += ' <button class="delete-btn" onclick="completeTask(this)">✔</button>';
    
    document.getElementById("taskList").appendChild(li);
    taskInput.value = "";
}

function completeTask(button) {
    let li = button.parentElement;
    document.getElementById("historyList").appendChild(li);
    button.remove();
}

function clearHistory() {
    document.getElementById("historyList").innerHTML = "";
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

function exportHistory() {
    let historyList = document.getElementById("historyList").children;
    let historyText = "Histórico de Tarefas:\n";
    
    for (let item of historyList) {
        let taskText = item.querySelector("span").innerText;
        let noteText = item.querySelector(".note") ? item.querySelector(".note").value : "";
        historyText += `- ${taskText} (Anotação: ${noteText})\n`;
    }
    
    let blob = new Blob([historyText], { type: "text/plain" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "historico_tarefas.txt";
    a.click();
}

function showConfirmationPopup() {
    document.getElementById("confirmationPopup").style.display = "flex";
  }
  
  function hideConfirmationPopup() {
    document.getElementById("confirmationPopup").style.display = "none";
  }
  
  function clearHistory() {
    document.getElementById("historyList").innerHTML = "";
    hideConfirmationPopup();
  }