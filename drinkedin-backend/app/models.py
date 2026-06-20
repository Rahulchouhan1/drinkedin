from sqlalchemy import Column, String, Integer, Float, ForeignKey, DateTime, Enum as SQLEnum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base
import enum
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class UserRole(enum.Enum):
    PROFESSIONAL = "PROFESSIONAL"
    BUSINESS_OWNER = "BUSINESS_OWNER"
    ADMIN = "ADMIN"

class ConnectionStatus(enum.Enum):
    PENDING = "PENDING"
    ACCEPTED = "ACCEPTED"
    BLOCKED = "BLOCKED"

class PostCategory(enum.Enum):
    GENERAL = "GENERAL"
    LUNCH = "LUNCH"
    DINNER = "DINNER"
    DRINKS = "DRINKS"
    TREKKING = "TREKKING"
    PARTY = "PARTY"

class User(Base):
    __tablename__ = "User"

    id = Column(String, primary_key=True, default=generate_uuid)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    firstName = Column(String, nullable=False)
    lastName = Column(String, nullable=False)
    bio = Column(String, nullable=True)
    avatarUrl = Column(String, nullable=True)
    role = Column(SQLEnum(UserRole, name="UserRole"), default=UserRole.PROFESSIONAL, nullable=False)
    
    createdAt = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updatedAt = Column(DateTime(timezone=True), onupdate=func.now(), nullable=True)

    posts = relationship("Post", back_populates="author")
    stories = relationship("Story", back_populates="author")
    connections = relationship("Connection", back_populates="user", foreign_keys="Connection.userId")

class Connection(Base):
    __tablename__ = "Connection"

    id = Column(String, primary_key=True, default=generate_uuid)
    userId = Column(String, ForeignKey("User.id"), nullable=False)
    connectedToId = Column(String, nullable=False)
    status = Column(SQLEnum(ConnectionStatus, name="ConnectionStatus"), default=ConnectionStatus.PENDING, nullable=False)
    createdAt = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    user = relationship("User", back_populates="connections", foreign_keys=[userId])

class Business(Base):
    __tablename__ = "Business"

    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    address = Column(String, nullable=False)
    type = Column(String, nullable=False)
    ownerId = Column(String, nullable=False)
    
    createdAt = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updatedAt = Column(DateTime(timezone=True), onupdate=func.now(), nullable=True)

    products = relationship("Product", back_populates="business")

class Product(Base):
    __tablename__ = "Product"

    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    imageUrl = Column(String, nullable=True)
    businessId = Column(String, ForeignKey("Business.id"), nullable=False)

    business = relationship("Business", back_populates="products")

class Post(Base):
    __tablename__ = "Post"

    id = Column(String, primary_key=True, default=generate_uuid)
    content = Column(String, nullable=False)
    imageUrl = Column(String, nullable=True)
    category = Column(SQLEnum(PostCategory, name="PostCategory"), default=PostCategory.GENERAL, nullable=False)
    authorId = Column(String, ForeignKey("User.id"), nullable=False)
    createdAt = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    author = relationship("User", back_populates="posts")

class Story(Base):
    __tablename__ = "Story"

    id = Column(String, primary_key=True, default=generate_uuid)
    mediaUrl = Column(String, nullable=False)
    expiresAt = Column(DateTime(timezone=True), nullable=False)
    authorId = Column(String, ForeignKey("User.id"), nullable=False)
    createdAt = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    author = relationship("User", back_populates="stories")
