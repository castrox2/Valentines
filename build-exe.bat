@echo off
echo Building Valentine's Day App (.exe)...
echo.

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo npm is not installed. Installing Node.js...
    echo.
    
    REM Try using winget (Windows 10+)
    where winget >nul 2>nul
    if %ERRORLEVEL% EQU 0 (
        echo Using Windows Package Manager to install Node.js...
        winget install OpenJS.NodeJS -e --accept-source-agreements --accept-package-agreements
    ) else (
        echo Downloading and installing Node.js...
        REM Download Node.js LTS installer
        powershell -Command "[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12; (New-Object System.Net.WebClient).DownloadFile('https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi', '%TEMP%\node-installer.msi')"
        
        REM Run the installer
        msiexec /i "%TEMP%\node-installer.msi" /quiet /norestart
        echo.
        echo Node.js installation started. Please wait...
        timeout /t 10 /nobreak
        
        REM Clean up installer
        del "%TEMP%\node-installer.msi" >nul 2>nul
    )
    
    REM Refresh environment variables
    setlocal enabledelayedexpansion
    for /f "tokens=2*" %%A in ('reg query "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" /v PATH') do set "PATH=%%B"
    for /f "tokens=2*" %%A in ('reg query "HKCU\Environment" /v PATH') do set "PATH=%%A;!PATH!"
    echo.
    echo Node.js installation complete. Retrying build...
    echo.
)

echo This may take a few minutes...
call npm run build
echo.
echo Build complete! Your .exe installers are in the 'dist' folder
pause
