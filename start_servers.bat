@echo off
echo Starting Credit Card Fraud Detection System...
echo.

echo Starting Flask Backend...
cd backend
start "Backend Server" cmd /k "python app.py"
cd ..

echo Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo Starting React Frontend...
cd frontend
start "Frontend Server" cmd /k "npm start"
cd ..

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit...
pause > nul
