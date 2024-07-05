document.getElementById("buttomSave").addEventListener("click", () => {
  const texto = document.getElementById("texto").value;
  const date = document.getElementById("date").value;
  const type = document.getElementById("type").value;

  if (!texto || !date || !type) {
    mostrarError("Please fill in both the reminder, date, and select a type.");
    return;
  }

  let borderColor = "";
  switch (type) {
    case "personal":
      borderColor = "blue";
      break;
    case "worked":
      borderColor = "yellow";
      break;
    case "other":
      borderColor = "purple";
      break;
    default:
      borderColor = "gray";
  }

  const reminderItem = `<li class="list-group-item d-flex justify-content-between align-items-center" style="border-color: ${borderColor};">
                            <div>
                              <strong>${date} (${type}):</strong> ${texto}
                            </div>
                            <div>
                              <button type="button" class="btn btn-sm btn-outline-success mr-2 complete-button">Complete</button>
                              <button type="button" class="btn btn-sm btn-outline-danger delete-button">Delete</button>
                            </div>
                          </li>`;

  document
    .getElementById("reminderList")
    .insertAdjacentHTML("beforeend", reminderItem);

  let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
  reminders = reminders.map((reminder) => ({
    ...reminder,
    completed: reminder.completed || false,
  }));
  reminders.push({ date, texto, type, completed: false });
  localStorage.setItem("reminders", JSON.stringify(reminders));

  document.getElementById("texto").value = "";
  document.getElementById("date").value = "";
  document.getElementById("type").value = "";
  clearError();
});

document.addEventListener("DOMContentLoaded", () => {
  let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
  reminders = reminders.map((reminder) => ({
    ...reminder,
    completed: reminder.completed || false,
  }));
  const reminderList = document.getElementById("reminderList");

  reminders.forEach((reminder, index) => {
    let borderColor = "";
    switch (reminder.type) {
      case "personal":
        borderColor = "blue";
        break;
      case "worked":
        borderColor = "yellow";
        break;
      case "other":
        borderColor = "purple";
        break;
      default:
        borderColor = "gray";
    }

    const reminderItem = `<li class="list-group-item d-flex justify-content-between align-items-center" style="border-color: ${borderColor};">
                              <div>
                                <strong>${reminder.date} (${
      reminder.type
    }):</strong> ${reminder.texto}
                              </div>
                              <div>
                                <button type="button" class="btn btn-sm btn-outline-success mr-2 complete-button">${
                                  reminder.completed ? "Completed" : "Complete"
                                }</button>
                                <button type="button" class="btn btn-sm btn-outline-danger delete-button">Delete</button>
                              </div>
                            </li>`;
    reminderList.insertAdjacentHTML("beforeend", reminderItem);
  });

  reminderList.addEventListener("click", (event) => {
    if (event.target.classList.contains("complete-button")) {
      const listItem = event.target.closest(".list-group-item");
      const index = Array.from(reminderList.children).indexOf(listItem);

      let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
      reminders[index].completed = !reminders[index].completed;
      localStorage.setItem("reminders", JSON.stringify(reminders));

      event.target.textContent = reminders[index].completed
        ? "Completed"
        : "Complete";
      event.target.classList.toggle("btn-outline-success");
      event.target.classList.toggle("btn-outline-secondary");
    }

    if (event.target.classList.contains("delete-button")) {
      const listItem = event.target.closest(".list-group-item");
      const index = Array.from(reminderList.children).indexOf(listItem);

      reminders.splice(index, 1);
      localStorage.setItem("reminders", JSON.stringify(reminders));

      listItem.remove();
    }
  });
});

function mostrarError(message) {
  document.getElementById(
    "error"
  ).innerHTML = `<div class="alert alert-danger">${message}</div>`;
}

function clearError() {
  document.getElementById("error").innerHTML = "";
}
