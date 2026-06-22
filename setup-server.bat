@echo off
echo ================================
echo Solvevare Contact Server Setup
echo ================================
echo.

cd server

echo [1/3] Installing dependencies...
call npm install

echo.
echo [2/3] Creating .env file...
if not exist .env (
    copy .env.example .env
    echo .env file created! Please edit it with your SMTP credentials.
) else (
    echo .env file already exists.
)

echo.
echo [3/3] Setup complete!
echo.
echo Next steps:
echo 1. Edit server\.env with your SMTP credentials
echo 2. Run: cd server
echo 3. Run: npm run dev
echo.
echo For Gmail users:
echo - Enable 2FA on your Google account
echo - Generate App Password: https://myaccount.google.com/apppasswords
echo - Use App Password in SMTP_PASS
echo.
pause
