from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from ..database import get_db
from .. import models, schemas
from .auth import get_current_user

router = APIRouter()

@router.post("/", response_model=schemas.BusinessOut)
async def create_business(
    business: schemas.BusinessCreate, 
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    new_business = models.Business(**business.model_dump(), ownerId=current_user.id)
    db.add(new_business)
    await db.commit()
    await db.refresh(new_business)
    return new_business

@router.get("/", response_model=List[schemas.BusinessOut])
async def list_businesses(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.Business))
    return result.scalars().all()
