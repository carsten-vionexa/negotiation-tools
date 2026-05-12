from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.models.user_profile import UserProfile
from app.schemas.user_profile import UserProfileCreate, UserProfileRead

router = APIRouter()


@router.get("", response_model=list[UserProfileRead])
def list_user_profiles(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)) -> list[UserProfile]:
    return list(db.scalars(select(UserProfile).offset(skip).limit(limit)).all())


@router.get("/{user_profile_id}", response_model=UserProfileRead)
def get_user_profile(user_profile_id: UUID, db: Session = Depends(get_db)) -> UserProfile:
    user_profile = db.get(UserProfile, user_profile_id)
    if user_profile is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User profile not found")
    return user_profile


@router.post("", response_model=UserProfileRead, status_code=status.HTTP_201_CREATED)
def create_user_profile(payload: UserProfileCreate, db: Session = Depends(get_db)) -> UserProfile:
    user_profile = UserProfile(**payload.model_dump())
    db.add(user_profile)
    db.commit()
    db.refresh(user_profile)
    return user_profile
