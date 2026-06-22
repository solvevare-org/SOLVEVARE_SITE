@echo off
echo ========================================
echo   Solvevare SMTP Contact Form Setup
echo ========================================
echo.

cd server

echo [1/3] Checking if node_modules exists...
if exist "node_modules\" (
    echo Dependencies already installed!
) else (
    echo Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
    echo Dependencies installed successfully!
)
echo.

echo [2/3] Checking .env file...
if exist ".env" (
    echo .env file already exists!
) else (
    echo Creating .env file from template...
    copy .env.example .env
    echo.
    echo IMPORTANT: Please edit server\.env with your SMTP credentials!
    echo For Gmail:
    echo   1. Enable 2-Factor Authentication
    echo   2. Generate App Password: https://myaccount.google.com/apppasswords
    echo   3. Update SMTP_USER and SMTP_PASS in .env
    echo.
    pause
)
echo.

echo [3/3] Starting server...
echo Server will run on http://localhost:4000
echo Press Ctrl+C to stop the server
echo.
call npm run dev
