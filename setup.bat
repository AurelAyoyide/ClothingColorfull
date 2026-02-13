@echo off
setlocal enabledelayedexpansion
set "PATH=C:\laragon\bin\nodejs\node-v25;%PATH%"
cd /d "%~dp0"
call npm install
if errorlevel 1 (
    echo Installation failed. Check the npm error above.
    pause
    exit /b 1
)
echo.
echo Installation complete! Now running dev server...
echo.
call npm run dev
pause
