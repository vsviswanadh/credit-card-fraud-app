@echo off
echo Setting up Credit Card Fraud Detection System...
echo.

echo Installing Backend Dependencies...
cd backend
python -m venv venv
call venv\Scripts\activate
pip install -r requirements.txt
cd ..

echo.
echo Installing Frontend Dependencies...
cd frontend
npm install
cd ..

echo.
echo Setup complete! Use start_servers.bat to run the application.
pause
