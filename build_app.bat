@echo off
rem Rebuilds ImmigrationTracker.exe from the source in the app\ folder and replaces the copy in this folder.
rem The previous build is moved to a _build_backup_<date> folder first, so it can be put back.
rem Double-click to run. Close Immigration Tracker before running.
setlocal
cd /d "%~dp0"
set "ROOT=%~dp0"
set "BUILD=%TEMP%\it_build"

echo.
echo === 1 of 6: Checking Python ===
where python >nul 2>nul || goto :nopython
python -c "import sys; v=sys.version_info; ok=v[:2]>=(3,11) and sys.maxsize>2**32; print('Python', sys.version.split()[0], '(64-bit)' if sys.maxsize>2**32 else '(32-bit)'); sys.exit(0 if ok else 3)"
if errorlevel 3 goto :badpython
if errorlevel 1 goto :nopython

echo.
echo === 2 of 6: Checking packages ===
python -c "import PySide6, openpyxl, pytest, PyInstaller, win32com.client, markdown" >nul 2>nul
if errorlevel 1 (
    echo Some packages are missing. Installing from app\requirements.txt ...
    python -m pip install -r app\requirements.txt || goto :pipfailed
) else (
    echo All packages are installed.
)

echo.
echo === 3 of 6: Checking the app is closed ===
if exist "ImmigrationTracker.exe" (
    2>nul (>>"ImmigrationTracker.exe" (call )) || goto :running
)
echo OK.

echo.
echo === 4 of 6: Running the checks and updating the client guide ===
pushd app
python -m pytest -q -p no:cacheprovider || (popd & goto :testsfailed)
python make_guide_html.py || echo The HTML client guide could not be updated; the build continues.

echo.
echo === 5 of 6: Building the app (takes a few minutes) ===
if exist "%BUILD%" rmdir /s /q "%BUILD%"
python -m PyInstaller ImmigrationTracker.spec --noconfirm --clean --distpath "%BUILD%\dist" --workpath "%BUILD%\work" || (popd & goto :failed)
popd
if not exist "%BUILD%\dist\ImmigrationTracker\ImmigrationTracker.exe" goto :failed

echo.
echo === 6 of 6: Replacing the app in this folder ===
for /f %%t in ('python -c "import time; print(time.strftime('%%Y-%%m-%%d_%%H%%M%%S'))"') do set "STAMP=%%t"
set "BACKUP=%ROOT%_build_backup_%STAMP%"
mkdir "%BACKUP%" || goto :failed
if exist "ImmigrationTracker.exe" move "ImmigrationTracker.exe" "%BACKUP%\" >nul || goto :movefailed
if exist "_internal" move "_internal" "%BACKUP%\" >nul || goto :movefailed
xcopy "%BUILD%\dist\ImmigrationTracker\*" "%ROOT%" /e /i /q /y >nul || goto :copyfailed
rmdir /s /q "%BUILD%" 2>nul

echo.
echo Finished. The new ImmigrationTracker.exe is in:
echo     %ROOT%
echo The previous version was moved to:
echo     %BACKUP%
pause
exit /b 0

:nopython
echo.
echo Python was not found. Install Python 3.11 or newer (64-bit) from python.org, tick "Add python.exe to PATH",
echo then run this again.
pause
exit /b 1

:badpython
echo.
echo This Python version is not supported. Install Python 3.11 or newer (64-bit) and run this again.
pause
exit /b 1

:pipfailed
echo.
echo The packages could not be downloaded. The firm network may need a proxy: ask IT, then in this window run
echo     set HTTPS_PROXY=http://proxy-address:port
echo and run build_app.bat again from the same window. Nothing was changed.
pause
exit /b 1

:running
echo.
echo Immigration Tracker is open. Close it and run this again. Nothing was changed.
pause
exit /b 1

:testsfailed
echo.
echo Some checks failed, so the app was not rebuilt and nothing was changed. Copy the messages above and ask for help.
pause
exit /b 1

:movefailed
echo.
echo The old app could not be moved to the backup folder (is it open, or is OneDrive syncing it?).
echo The new build is still in %BUILD%\dist\ImmigrationTracker - close the app and run this again.
pause
exit /b 1

:copyfailed
echo.
echo The new build could not be copied in. The previous version is in:
echo     %BACKUP%
echo Move ImmigrationTracker.exe and _internal from there back into this folder to restore it.
pause
exit /b 1

:failed
echo.
echo The build did not finish (see the messages above). The app in this folder was not changed.
pause
exit /b 1
