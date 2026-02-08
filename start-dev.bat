@echo off
echo.
echo Starting development server and Electron app...
setlocal
echo Starting Valentine's Day App...
echo.

REM Detect npm
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo npm not found. Attempting to install Node.js.

    REM Prefer winget if available
    where winget >nul 2>nul
    if %ERRORLEVEL% EQU 0 (
        echo Installing Node.js via winget (may prompt for permissions)...
        winget install OpenJS.NodeJS -e --accept-source-agreements --accept-package-agreements
        set "INSTALL_EXIT=%ERRORLEVEL%"
    ) else (
        echo winget not available; downloading Node.js installer...
        powershell -Command "[Net.ServicePointManager]::SecurityProtocol = 'Tls12'; (New-Object System.Net.WebClient).DownloadFile('https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi', '%TEMP%\\node-installer.msi')"
        if exist "%TEMP%\node-installer.msi" (
            msiexec /i "%TEMP%\node-installer.msi" /qn /norestart
            set "INSTALL_EXIT=%ERRORLEVEL%"
            del "%TEMP%\node-installer.msi" >nul 2>nul
        ) else (
            echo Failed to download Node installer.
            pause
            exit /b 1
        )
    )

    if "%INSTALL_EXIT%"=="" set "INSTALL_EXIT=0"
    if %INSTALL_EXIT% NEQ 0 (
        echo Node.js installation failed (exit code %INSTALL_EXIT%). Press any key to exit.
        pause
        exit /b %INSTALL_EXIT%
    )

    REM Add common Node install paths to PATH for this session
    if exist "C:\Program Files\nodejs\node.exe" (
        set "PATH=C:\Program Files\nodejs;%PATH%"
    ) else if exist "C:\Program Files (x86)\nodejs\node.exe" (
        set "PATH=C:\Program Files (x86)\nodejs;%PATH%"
    )

    echo Node.js installed. Restarting script to pick up new PATH...
    echo.
    cmd /C "%~f0" %*
    exit /b
)

echo Installing dependencies (if needed)...
call npm install --legacy-peer-deps
if %ERRORLEVEL% NEQ 0 (
    echo "npm install" failed with exit code %ERRORLEVEL%.
    echo Please check the output above. Press any key to exit.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo Starting development server and Electron app...
call npm start
echo.
pause
endlocal
