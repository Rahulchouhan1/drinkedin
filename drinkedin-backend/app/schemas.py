from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from .models import UserRole, ConnectionStatus, PostCategory

class UserBase(BaseModel):
    email: EmailStr
    firstName: str
    lastName: str
    bio: Optional[str] = None
    avatarUrl: Optional[str] = None
    role: UserRole = UserRole.PROFESSIONAL

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: str
    createdAt: datetime
    updatedAt: Optional[datetime] = None

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class BusinessBase(BaseModel):
    name: str
    description: str
    address: str
    type: str

class BusinessCreate(BusinessBase):
    pass

class BusinessOut(BusinessBase):
    id: str
    ownerId: str
    createdAt: datetime
    updatedAt: Optional[datetime] = None

    class Config:
        from_attributes = True

class PostBase(BaseModel):
    content: str
    imageUrl: Optional[str] = None
    category: PostCategory = PostCategory.GENERAL

class PostCreate(PostBase):
    pass

class PostOut(PostBase):
    id: str
    authorId: str
    createdAt: datetime

    class Config:
        from_attributes = True
