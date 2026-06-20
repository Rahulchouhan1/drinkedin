@echo off
if not exist ".venv" (
    echo Creating virtual environment...
    python -m venv .venv
)
call .venv\Scripts\activate.bat
echo Installing dependencies...
pip install -r requirements.txt
echo Starting FastAPI backend...
uvicorn app.main:app --reload --host 0.0.0.0 --port 3000
