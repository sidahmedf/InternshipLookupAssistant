
# Assistant Recherche de Stage

## Purpose

The **Assistant Recherche de Stage** project is a lightweight web application designed to manage and track small-time internship submissions during a job search session. It helps users quickly log their submissions, view statistics on their progress (such as the number of submissions and rate of submissions per day), and export the session data for later use. The goal is to provide an easy way to track internship applications and later integrate the data into a personal internship tracker or larger database.

## Features

- **Track Internship Submissions**: Log and keep track of internship applications made during a session.
- **View Session Statistics**: Displays the number of submissions and the average number of applications submitted per day.
- **Export Data**: Export the session’s internship submission data to a CSV file for future integration into a personal tracker or database.
- **Simple User Interface**: The app allows the user to manage submissions and view real-time statistics, making it easy to track progress.

## Technologies Used

- **Backend**: Python (`http.server`, `socketserver`) for serving the application and processing data.
- **Frontend**: HTML, CSS, and JavaScript for the user interface and dynamic interactions.
- **Data Format**: JSON for submission data storage and CSV for data export.

## How It Works

1. **Session-Based Tracking**:
   - The app keeps track of internship submissions for a specific session, logging each new entry with a timestamp.
   - Session statistics are updated in real-time, showing both the total number of submissions and the average submissions per day.

2. **Backend**:
   - The Python server handles all POST requests related to submitting internships and calculating statistics.
   - Submissions are stored temporarily in memory during the session (data will not persist once the server is restarted).
   
3. **Frontend**:
   - The user interface allows users to input submission details (company, city, mission, link) and view the statistics.
   - The session data can be exported to a CSV file, where the internship offer links are stripped of the server URL, making the data ready for integration into a larger personal internship tracking system.

## How to Run

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

2. Install Python (if not installed already).

3. Start the server:

   ```bash
   python3 server.py
   ```

4. Open your browser and go to:

   ```
   http://localhost:8000
   ```

   The web interface should now be accessible at this address.

## Endpoints

- **POST `/submit`**: This endpoint receives internship submission data in JSON format. Each submission includes the following fields:

  ```json
  {
    "company": "Company Name",
    "city": "City Name",
    "mission": "Main Mission Description",
    "link": "URL to Internship Offer"
  }
  ```

  The server processes this data and calculates the ratio of internships submitted per day, responding with the updated count and ratio.

## Web Interface

### Key Features:
1. **Timer**: Displays the elapsed time since the first submission.
2. **Counter**: Tracks the number of submissions made during the session.
3. **Submission Table**: Displays all logged submissions, including:
   - **Company Name**
   - **City**
   - **Mission Description**
   - **Link to Offer**
   - **Submission Date**

4. **Buttons**:
   - **Finish Session**: Ends the session and provides an option to export the data.
   - **Add Entry**: Opens a form to allow the user to submit a new internship entry.

### CSV Export

- The user can export the session’s internship data into a CSV file. The internship offer links are cleaned by removing the base server URL, making it ready for integration into a personal internship tracker or larger database.

## Folder Structure

```
/project-root
  /server.py          # Python backend server
  /index.html         # HTML frontend page
  /styles.css         # CSS styles for the frontend
  /script.js          # JavaScript for managing the frontend behavior
  /README.md          # Project documentation
```

## Contributing

Feel free to fork the repository, create an issue, or submit a pull request. Contributions are welcome!
