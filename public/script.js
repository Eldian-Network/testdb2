const API = "/api/reminders";

const form = document.getElementById("reminderForm");
const remindersDiv = document.getElementById("reminders");

async function loadReminders() {

  const res = await fetch(API);

  const reminders = await res.json();

  remindersDiv.innerHTML = "";

  reminders.forEach((reminder) => {

    remindersDiv.innerHTML += `
      <div class="reminder">

        <h3>${reminder.title}</h3>

        <p>${reminder.description}</p>

        <small>
          📅 ${reminder.reminderDate}
          ⏰ ${reminder.reminderTime}
        </small>

        <button
          class="delete-btn"
          onclick="deleteReminder('${reminder._id}')"
        >
          Delete
        </button>

      </div>
    `;
  });
}

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const reminder = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    reminderDate: document.getElementById("date").value,
    reminderTime: document.getElementById("time").value
  };

  await fetch(API, {
    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify(reminder)
  });

  alert("✅ Reminder Added");

  form.reset();

  loadReminders();
});

async function deleteReminder(id) {

  await fetch(`${API}?id=${id}`, {
    method: "DELETE"
  });

  loadReminders();
}

// IST Reminder Alerts
setInterval(async () => {

  const res = await fetch(API);

  const reminders = await res.json();

  const now = new Date();

  const indiaDate = now.toLocaleDateString("en-CA", {
    timeZone: "Asia/Kolkata"
  });

  const indiaTime = now.toLocaleTimeString("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });

  reminders.forEach((reminder) => {

    if (
      reminder.reminderDate === indiaDate &&
      reminder.reminderTime === indiaTime
    ) {

      alert(`⏰ Reminder: ${reminder.title}`);

    }

  });

}, 60000);

loadReminders();
