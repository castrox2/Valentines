@echo off
setlocal
echo Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 exit /b %ERRORLEVEL%

echo Starting development app...
call npm start
endlocal
