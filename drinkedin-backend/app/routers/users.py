from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from ..database import get_db
from .. import models, schemas
from .auth import get_current_user

router = APIRouter()

@router.get("/me", response_model=schemas.UserOut)
async def read_users_me(current_user: models.User = Depends(get_current_user)):
    return current_user

@router.get("/{user_id}", response_model=schemas.UserOut)
async def read_user(user_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.User).filter(models.User.id == user_id))
    user = result.scalars().first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user
