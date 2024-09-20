
# MSc Project: Backend Dashboard Setup

## Prerequisites

### PostgreSQL and pgAdmin
1. Install PostgreSQL and pgAdmin on your system.
2. During PostgreSQL installation, set 'postgres' as the default server password.

### Python
- Ensure Python version 3.8.10 is installed on your machine.

### Node.js
- Install Node.js version v20.15.0.

## Project Setup

### Backend (Django)

1. Clone the repository to your local machine.
   
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the Django project folder named `Pont_Mbale`. 

3. Open Command Prompt in the project directory and activate the virtual environment with the following commands:

   ```bash
   cd venv/Scripts
   activate.bat
   cd ../..
   ```

4. Once the virtual environment is activated, install the necessary Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

5. After dependencies are installed, start the backend server:

   ```bash
   python manage.py runserver
   ```

   **Note:** The Command Prompt must be open in the Django backend root directory to run the server.

### Frontend (React)

1. Navigate to the React project directory `pont-admin-dashboard`.

2. Open Command Prompt in the directory and start the React development server:

   ```bash
   npm start
   ```

## Additional Notes

- Ensure that both the PostgreSQL server and Django backend are running simultaneously for the project to function correctly.
- The frontend will be served at `http://localhost:3000` and the backend at `http://localhost:8000`.
  
This is how you can clone this repository and set up the project on your local system.
