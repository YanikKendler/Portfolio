@echo off
setlocal enabledelayedexpansion
set "src=./img/photoshop"
set "alt=./img/photoshop/alt"
set "output=./js/imagePaths.js"

rem Clear the output file
echo.>"%output%"

rem Get the list of files
echo let imgSrcs = [ >"%output%"
for /f "delims=" %%f in ('dir /b /a-d "%src%"') do (
echo "%%f", >>"%output%"
)
echo ] >>"%output%"

rem Get the list of files from alt folder
echo. >>%output%
echo let altSrcs = [ >>"%output%"
for /f "delims=" %%f in ('dir /b /a-d "%alt%"') do (
echo "%%f", >>"%output%"
)
echo ] >>"%output%"

echo File list saved to %output%