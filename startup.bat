@echo off

TITLE Custom Text Output Version 1.0

echo Made by /u/anonymous853
echo.
echo If your game directory is not at C:\Program Files(x86)\[etc...] you need to open the Data\Steam Directory txt file and change it to your CSGO directory.
echo.

cd Data\Custom Phrases

< Phrases.txt (
	set /p OneKill=
	set /p TwoKills=
	set /p ThreeKills=
	set /p FourKills=
	set /p FiveKills=
)
cd ..
cd ..

echo Current Set Phrases:
echo.
echo One Kill: %OneKill%
echo Two Kills: %TwoKills%
echo Three Kills: %ThreeKills%
echo Four Kills: %FourKills%
echo Five Kills: %FiveKills%


echo.
:: Basically just wanted to make it not case-sensitive
set /p newPhr=Set new phrases? (Y/N):
IF "%newPhr%"=="y" (
	GOTO NewPhrases
)
IF "%newPhr%"=="Y" (
	GOTO NewPhrases
)
IF "%newPhr%"=="n" (
	GOTO EndSetup
)
IF "%newPhr%"=="N" (
	GOTO EndSetup
)

:NewPhrases
set /p OneKill=Text output for when you get a 1k:
set /p TwoKills=Text output for when you get a 2k:
set /p ThreeKills=Text output for when you get a 3k:
set /p FourKills=Text output for when you get a 4k:
set /p FiveKills=Text output for when you get a 5k:

echo.
echo New Phrases:
echo.
echo One Kill: %OneKill%
echo Two Kills: %TwoKills%
echo Three Kills: %ThreeKills%
echo Four Kills: %FourKills%
echo Five Kills: %FiveKills%

cd Data\Custom Phrases
(
	echo %OneKill%
	echo %TwoKills%
	echo %ThreeKills%
	echo %FourKills%
	echo %FiveKills%
) > Phrases.txt
cd ..
cd ..
GOTO EndSetup

:EndSetup
echo.
echo Server set up correctly.
cd Server
node server.js

pause