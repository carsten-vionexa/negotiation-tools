from fastapi import APIRouter

from app.api.routes import (
    companies,
    health,
    knowledge_documents,
    negotiation_projects,
    request_items,
    supplier_profiles,
    user_profiles,
)

api_router = APIRouter()
api_router.include_router(health.router, tags=["health"])
api_router.include_router(companies.router, prefix="/companies", tags=["companies"])
api_router.include_router(user_profiles.router, prefix="/user-profiles", tags=["user profiles"])
api_router.include_router(
    knowledge_documents.router,
    prefix="/knowledge-documents",
    tags=["knowledge documents"],
)
api_router.include_router(request_items.router, prefix="/request-items", tags=["request items"])
api_router.include_router(supplier_profiles.router, prefix="/supplier-profiles", tags=["supplier profiles"])
api_router.include_router(
    negotiation_projects.router,
    prefix="/negotiation-projects",
    tags=["negotiation projects"],
)
