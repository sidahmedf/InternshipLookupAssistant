import http.server
import socketserver
import json
from datetime import datetime

# In-memory storage for submissions
submissions = []

# Define the port for the server
PORT = 8000

# Function to calculate internships per day
def calculate_ratio():
    if submissions:
        first_submission = datetime.strptime(submissions[0]['time'], "%Y-%m-%d %H:%M:%S")
        now = datetime.now()
        days_elapsed = (now - first_submission).days + 1
        return len(submissions) / days_elapsed
    return 0

# Define the request handler
class MyHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path == "/submit":
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)

            # Store the new submission
            time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            data['time'] = time
            submissions.append(data)

            # Calculate internships per day ratio
            internships_per_day = calculate_ratio()

            # Respond with updated count and ratio
            response = {
                "internshipsCount": len(submissions),
                "internshipsPerDay": round(internships_per_day, 2)
            }

            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(response).encode())

        else:
            super().do_POST()

# Create the server
with socketserver.TCPServer(("", PORT), MyHandler) as httpd:
    print(f"Server started at http://localhost:{PORT}")
    httpd.serve_forever()
