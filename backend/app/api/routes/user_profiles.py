from uuid import UUID

from fastapi import APIRouter, Depends, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.api.validation import apply_partial_update, ensure_reference_exists, get_or_404
from app.models.company import Company
from app.models.user_profile import UserProfile
from app.schemas.user_profile import UserProfileCreate, UserProfileRead, UserProfileUpdate

router = APIRouter()


@router.get("", response_model=list[UserProfileRead])
def list_user_profiles(
    skip: int = 0,
    limit: int = 100,
    company_id: UUID | None = None,
    role: str | None = None,
    department: str | None = None,
    db: Session = Depends(get_db),
) -> list[UserProfile]:
    query = select(UserProfile)
    if company_id:
        query = query.where(UserProfile.company_id == company_id)
    if role:
        query = query.where(UserProfile.role == role)
    if department:
        query = query.where(UserProfile.department == department)
    return list(db.scalars(query.offset(skip).limit(limit)).all())


@router.get("/{user_profile_id}", response_model=UserProfileRead)
def get_user_profile(user_profile_id: UUID, db: Session = Depends(get_db)) -> UserProfile:
    return get_or_404(db, UserProfile, user_profile_id, "User profile")


@router.post("", response_model=UserProfileRead, status_code=status.HTTP_201_CREATED)
def create_user_profile(payload: UserProfileCreate, db: Session = Depends(get_db)) -> UserProfile:
    ensure_reference_exists(db, Company, payload.company_id, "Company")

    user_profile = UserProfile(**payload.model_dump())
    db.add(user_profile)
    db.commit()
    db.refresh(user_profile)
    return user_profile


@router.patch("/{user_profile_id}", response_model=UserProfileRead)
def update_user_profile(
    user_profile_id: UUID,
    payload: UserProfileUpdate,
    db: Session = Depends(get_db),
) -> UserProfile:
    user_profile = get_or_404(db, UserProfile, user_profile_id, "User profile")
    updates = payload.model_dump(exclude_unset=True)
    if "company_id" in updates and updates["company_id"] is not None:
        ensure_reference_exists(db, Company, updates["company_id"], "Company")
    apply_partial_update(user_profile, updates, {"company_id", "display_name", "profile_data"})
    db.commit()
    db.refresh(user_profile)
    return user_profile
