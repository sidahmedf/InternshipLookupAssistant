let startTime = new Date();

function updateTimer() {
  let now = new Date();
  let elapsed = Math.floor((now - startTime) / 1000); // Total elapsed time in seconds

  if (elapsed < 60) {
    // Display only seconds if less than 1 minute
    document.getElementById("timer").textContent = `${elapsed}s`;
  } else if (elapsed < 3600) {
    // Display minutes and seconds if less than 1 hour
    let minutes = Math.floor(elapsed / 60);
    let seconds = elapsed % 60;
    document.getElementById("timer").textContent = `${minutes}m ${seconds}s`;
  } else {
    // Display hours, minutes, and seconds if 1 hour or more
    let hours = Math.floor(elapsed / 3600);
    let minutes = Math.floor((elapsed % 3600) / 60);
    let seconds = elapsed % 60;
    document.getElementById("timer").textContent = `${hours}h ${minutes}m ${seconds}s`;
  }
}

setInterval(updateTimer, 1000);

let internshipsCount = 0;
let internshipsPerDay = 0;

// Calculate submission ratio
function updateRatio() {
  let elapsedTimeInDays = (new Date() - startTime) / (1000 * 60 * 60 * 24);
  internshipsPerDay = (elapsedTimeInDays > 0) ? (internshipsCount / elapsedTimeInDays).toFixed(2) : 0;
  document.getElementById("counter").textContent = internshipsCount;
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("counter").textContent = internshipsCount;
  document.getElementById("ratio").textContent = `${internshipsPerDay} stages/jour`;
});

function addEntry() {
  let table = document.getElementById("stats-body");
  let company = prompt("Nom de la société :");
  let city = prompt("Ville :");
  let mission = prompt("Mission principale :");
  let link = prompt("Lien de l'offre :");
  let time = new Date().toISOString().split("T")[0] + " " + new Date().toTimeString().split(" ")[0];

  if (company && city && mission && link) {
    let row = table.insertRow();
    row.innerHTML = `
      <td>${company}</td>
      <td>${city}</td>
      <td>${mission}</td>
      <td><a href='${link}' target='_blank'>Lien</a></td>
      <td>${time}</td>
    `;

    // Increment internship count and update the ratio
    internshipsCount++;
    updateRatio();  // Update the count and ratio after adding the entry
  } else {
    alert("Veuillez fournir des détails valides.");
  }
}

function finishSession() {
  // Get the elapsed time
  let elapsed = Math.floor((new Date() - startTime) / 1000); // in seconds
  let minutes = Math.floor(elapsed / 60);
  let seconds = elapsed % 60;
  let formattedTime = `${minutes}m ${seconds}s`;

  // Get the current time (end of session)
  let endTime = new Date().toISOString();

  // Get the number of internships (entries in the table)
  let totalInternships = internshipsCount;

  // Save session information to session_info.txt
  saveSessionInfo(formattedTime, totalInternships, startTime.toISOString(), endTime);

  // Save internship stats (table entries) to data.csv
  saveStatsToCSV();

  // Reset the session timer
  startTime = new Date();  // Reset start time
  internshipsCount = 0;     // Reset internships count
  document.getElementById("counter").textContent = internshipsCount;
  document.getElementById("timer").textContent = "0s"; // Reset timer display

  // Pause the timer and change the button text to "Start Session"
  document.querySelector("button[onclick='pauseResumeTimer()']").textContent = "Start Session";

  // Clear the table entries
  let table = document.getElementById("stats-body");
  table.innerHTML = "";
}

// Function to save session information to session_info.txt
function saveSessionInfo(timeSpent, totalInternships, startTime, endTime) {
  let sessionData = `Session Information:
  Start Time: ${startTime}
  End Time: ${endTime}
  Time Spent: ${timeSpent}
  Total Internships: ${totalInternships}
  --------------------------
  `;

  // Create or append session data to session_info.txt
  let blob = new Blob([sessionData], { type: 'text/plain' });
  let link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = "session_info.txt";
  link.click();
}

// Function to save stats from the table to data.csv
// Function to save stats from the table to data.csv
function saveStatsToCSV() {
  let table = document.getElementById("stats-body");
  let rows = table.rows;
  let csvContent = "Société,Ville,Mission principale,Lien vers l'offre,Date de soumission\n";

  // Get the current website's base URL (protocol + host + port if any)
  const baseUrl = window.location.protocol + "//" + window.location.host;

  for (let i = 0; i < rows.length; i++) {
    let cells = rows[i].cells;
    let rowData = [];

    for (let j = 0; j < cells.length; j++) {
      if (j === 3) {  // Assuming the "Lien" column is at index 3 (4th column)
        let link = cells[j].querySelector("a");  // Get the <a> element within the cell
        if (link) {
          let href = link.href;
          let domain = href.replace(baseUrl, ''); // Remove the base URL part (server address)
          rowData.push(domain);  // Push the domain portion only
        } else {
          rowData.push("");  // If no link is found, just leave it empty
        }
      } else {
        rowData.push(cells[j].textContent.trim());  // Extract text content from other columns
      }
    }
    csvContent += rowData.join(",") + "\n";  // Add the row data to the CSV content
  }

  let blob = new Blob([csvContent], { type: 'text/csv' });
  let link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = "data.csv";
  link.click();
}

