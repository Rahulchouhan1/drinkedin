@echo off
if not exist "node_modules" (
    echo Installing dependencies with Yarn...
    yarn.cmd install
)
echo Starting Expo mobile app...
yarn.cmd start
