@echo off
setlocal enabledelayedexpansion
set "folder=./img/photoshop"
set "output=./js/imagePaths.js"

rem Clear the output file
echo.>"%output%"

rem Get the list of files
echo let imgSrcs = [ >"%output%"
for /f "delims=" %%f in ('dir /b /a-d "%folder%"') do (
    echo "./img/photoshop/%%f", >>"%output%"
)
echo ] >>"%output%"

echo File list saved to %output%
