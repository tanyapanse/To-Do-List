const newTask = document.getElementById("newTask");
const addBtn = document.getElementById("addBtn");
const tasks = document.querySelector(".tasks");

const today = new Date();
const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
const dayNumber = today.getDate();
const monthName = today.toLocaleDateString("en-US", { month: "long" });
document.getElementById("dayName").textContent = dayName;
document.getElementById("dayNumber").textContent = dayNumber;
document.getElementById("monthName").textContent = monthName;

addBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const taskText = newTask.value.trim();
    if (taskText !== "") {
        const task = document.createElement("div");
        task.className = "task";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", updateProgress)

        const textSpan = document.createElement("span");
        textSpan.textContent = taskText;
        textSpan.class = "taskText";

        const removeBtn = document.createElement("button");
        const removeIcon = document.createElement("img");
        removeBtn.style.backgroundColor = "transparent";
        removeBtn.style.borderStyle = "none";
        removeIcon.src = "x.png";
        removeIcon.style.width = "25px";
        removeIcon.style.height = "25px";
        removeBtn.appendChild(removeIcon);

        removeBtn.addEventListener("click", () => {
            task.remove()
            updateProgress();
        });

        task.appendChild(checkbox);
        task.appendChild(textSpan);
        task.appendChild(removeBtn);

        tasks.appendChild(task);
        newTask.value = "";
        updateProgress();
    }
});

function updateProgress() {
    const checkboxes = document.querySelectorAll('.task input[type="checkbox"]');
    const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
    const total = checkboxes.length;

    const progressPercent = total === 0 ? 0 : (checked / total) * 100;
    document.querySelector('.progress-fill').style.width = `${progressPercent}%`;

    // Update the label text
    const label = document.getElementById("progress-label");
    label.textContent = `${checked} / ${total} tasks done`;
}
