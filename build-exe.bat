@echo off
setlocal
echo Building Valentine's App...
echo This may take a few minutes.
call npm run build
if %ERRORLEVEL% NEQ 0 (
    exit /b %ERRORLEVEL%
)

echo Build complete. Installers are in release\.
endlocal
