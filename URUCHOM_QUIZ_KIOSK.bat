@echo off
chcp 65001 >nul
title Uruchamianie Quizu Kiosk

set HTML_PATH="%~dp0index.html"
set KIOSK_PROFILE="%TEMP%\quiz_kiosk_profile"

echo ========================================================
echo   QUIZ O OGRODACH DESZCZOWYCH - TRYB KIOSK
echo ========================================================
echo.
echo Uruchamianie przeglądarki w pełnym trybie kiosk...
echo Aby wyjść z trybu kiosk, naciśnij Alt + F4 na klawiaturze.
echo.

:: Flagi trybu kiosk:
:: --autoplay-policy=no-user-gesture-required : pozwala odtwarzać dźwięk bgsound.mp3 od razu na stronie startowej bez konieczności kliknięcia
:: --user-data-dir : izolowany profil, który wymusza uwzględnienie flagi autoplay nawet gdy w tle działa już proces Edge/Chrome
:: --overscroll-history-navigation=0 : blokada gestu cofania (przeciągnięcie od krawędzi)
:: --disable-pinch : blokada gestu przybliżania
set EDGE_FLAGS=--kiosk %HTML_PATH% --edge-kiosk-type=fullscreen --no-first-run --no-default-browser-check --disable-pinch --overscroll-history-navigation=0 --disable-features=Translate --autoplay-policy=no-user-gesture-required --user-data-dir=%KIOSK_PROFILE%
set CHROME_FLAGS=--kiosk %HTML_PATH% --no-first-run --no-default-browser-check --disable-pinch --overscroll-history-navigation=0 --disable-translate --autoplay-policy=no-user-gesture-required --user-data-dir=%KIOSK_PROFILE%

:: 1. Próba uruchomienia Microsoft Edge w trybie kiosk
where msedge >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    start msedge %EDGE_FLAGS%
    exit /b
)

:: 2. Sprawdzenie typowej ścieżki Edge
if exist "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" (
    start "" "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" %EDGE_FLAGS%
    exit /b
)

:: 3. Próba uruchomienia Google Chrome w trybie kiosk
where chrome >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    start chrome %CHROME_FLAGS%
    exit /b
)

if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" %CHROME_FLAGS%
    exit /b
)

:: 4. Fallback do domyślnej przeglądarki
echo Uruchamianie w domyślnej przeglądarce...
start "" "%HTML_PATH%"
