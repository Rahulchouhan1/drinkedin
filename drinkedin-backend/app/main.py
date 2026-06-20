from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth, users, businesses, posts

app = FastAPI(title="DrinkedIn API", description="FastAPI Backend for DrinkedIn")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(businesses.router, prefix="/businesses", tags=["businesses"])
app.include_router(posts.router, prefix="/posts", tags=["posts"])

@app.get("/")
async def root():
    return {"message": "Welcome to DrinkedIn API (FastAPI)"}
