@echo off
setlocal ENABLEDELAYEDEXPANSION

REM Change to the project root (folder containing package.json and backend)
cd /d "%~dp0LogisticsNow-Hackathon"

echo ==========================================
echo  Starting CIOA frontend and backend...
echo  - Frontend: http://localhost:3000
echo  - Backend : http://localhost:8000
echo ==========================================
echo.

REM Start the Python FastAPI backend in a new window
if exist "backend\venv\Scripts\activate.bat" (
  echo Starting backend using existing virtualenv...
  start "CIOA Backend" cmd /k "cd /d \"%cd%\backend\" && call venv\Scripts\activate.bat && uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"
) else (
  echo Starting backend (no venv detected)...
  start "CIOA Backend" cmd /k "cd /d \"%cd%\backend\" && uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"
)

REM Start the Next.js frontend in a new window
echo Starting frontend dev server...
start "CIOA Frontend" cmd /k "cd /d \"%cd%\" && npm run dev"

echo.
echo Both servers have been launched in separate windows.
echo You can close this window now.

endlocal
exit /b 0

