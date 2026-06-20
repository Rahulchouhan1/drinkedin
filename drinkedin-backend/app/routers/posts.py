from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from ..database import get_db
from .. import models, schemas
from .auth import get_current_user

router = APIRouter()

@router.post("/", response_model=schemas.PostOut)
async def create_post(
    post: schemas.PostCreate, 
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    new_post = models.Post(**post.model_dump(), authorId=current_user.id)
    db.add(new_post)
    await db.commit()
    await db.refresh(new_post)
    return new_post

@router.get("/", response_model=List[schemas.PostOut])
async def list_posts(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.Post).order_by(models.Post.createdAt.desc()))
    return result.scalars().all()
