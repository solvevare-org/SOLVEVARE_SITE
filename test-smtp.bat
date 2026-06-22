@echo off
echo ========================================
echo   SMTP Server Test
echo ========================================
echo.

cd server

echo [1] Starting server in background...
start /B node index.js > server.log 2>&1
timeout /t 3 /nobreak > nul

echo [2] Testing health endpoint...
curl -s http://localhost:4000/api/health
echo.
echo.

echo [3] Testing SMTP with test email...
curl -X POST -s http://localhost:4000/api/send-test
echo.
echo.

echo ========================================
echo Test complete! Check server.log for details.
echo Server is running in background.
echo To stop: taskkill /F /IM node.exe
echo ========================================
pause
