@echo off
color 0A
echo.
echo ========================================
echo    SMTP CONTACT FORM - STATUS CHECK
echo ========================================
echo.

cd server

echo [Checking Dependencies...]
if exist "node_modules\" (
    echo [32m[OK][0m Dependencies installed
) else (
    echo [31m[X][0m Dependencies NOT installed
    echo     Run: npm install
)
echo.

echo [Checking Configuration...]
if exist ".env" (
    echo [32m[OK][0m .env file exists
) else (
    echo [31m[X][0m .env file NOT found
    echo     Run: copy .env.example .env
)
echo.

echo [Checking Server Files...]
if exist "index.js" (
    echo [32m[OK][0m server/index.js exists
) else (
    echo [31m[X][0m server/index.js NOT found
)

if exist "package.json" (
    echo [32m[OK][0m server/package.json exists
) else (
    echo [31m[X][0m server/package.json NOT found
)
echo.

cd ..

echo [Checking Frontend Files...]
if exist "contact.html" (
    echo [32m[OK][0m contact.html exists
) else (
    echo [31m[X][0m contact.html NOT found
)

if exist "js\contact.js" (
    echo [32m[OK][0m js/contact.js exists
) else (
    echo [31m[X][0m js/contact.js NOT found
)
echo.

echo [Checking Documentation...]
if exist "SMTP_QUICK_START.md" (
    echo [32m[OK][0m SMTP_QUICK_START.md
) else (
    echo [31m[X][0m SMTP_QUICK_START.md NOT found
)

if exist "SMTP_IMPLEMENTATION_GUIDE.md" (
    echo [32m[OK][0m SMTP_IMPLEMENTATION_GUIDE.md
) else (
    echo [31m[X][0m SMTP_IMPLEMENTATION_GUIDE.md NOT found
)

if exist "SMTP_COMPLETE_FLOW.md" (
    echo [32m[OK][0m SMTP_COMPLETE_FLOW.md
) else (
    echo [31m[X][0m SMTP_COMPLETE_FLOW.md NOT found
)
echo.

echo ========================================
echo.
echo [Next Steps:]
echo 1. Configure server/.env with SMTP credentials
echo 2. Run: start-smtp-server.bat
echo 3. Open contact.html in browser
echo 4. Test the contact form!
echo.
echo [Documentation:]
echo - SMTP_QUICK_START.md (Start here!)
echo - SMTP_IMPLEMENTATION_GUIDE.md (Complete guide)
echo - SMTP_COMPLETE_FLOW.md (Visual diagrams)
echo.
pause
