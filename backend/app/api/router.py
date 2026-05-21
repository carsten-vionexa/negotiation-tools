from fastapi import APIRouter

from app.api.routes import (
    argumentation_lines,
    batna_options,
    companies,
    concession_items,
    document_chunks,
    health,
    import_jobs,
    import_rows,
    knowledge_claims,
    knowledge_documents,
    negotiation_projects,
    procurement_history_items,
    request_items,
    simulation_scenarios,
    strategies,
    supplier_profiles,
    trainer_comments,
    user_profiles,
    zopa_items,
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
api_router.include_router(
    document_chunks.router,
    prefix="/document-chunks",
    tags=["document chunks"],
)
api_router.include_router(
    knowledge_claims.router,
    prefix="/knowledge-claims",
    tags=["knowledge claims"],
)
api_router.include_router(
    procurement_history_items.router,
    prefix="/procurement-history-items",
    tags=["procurement history items"],
)
api_router.include_router(import_jobs.router, prefix="/import-jobs", tags=["import jobs"])
api_router.include_router(import_rows.router, prefix="/import-rows", tags=["import rows"])
api_router.include_router(request_items.router, prefix="/request-items", tags=["request items"])
api_router.include_router(supplier_profiles.router, prefix="/supplier-profiles", tags=["supplier profiles"])
api_router.include_router(
    negotiation_projects.router,
    prefix="/negotiation-projects",
    tags=["negotiation projects"],
)
api_router.include_router(strategies.router, prefix="/strategies", tags=["strategies"])
api_router.include_router(
    simulation_scenarios.router,
    prefix="/simulation-scenarios",
    tags=["simulation scenarios"],
)
api_router.include_router(
    trainer_comments.router,
    prefix="/trainer-comments",
    tags=["trainer comments"],
)
api_router.include_router(zopa_items.router, prefix="/zopa-items", tags=["zopa items"])
api_router.include_router(batna_options.router, prefix="/batna-options", tags=["batna options"])
api_router.include_router(
    concession_items.router,
    prefix="/concession-items",
    tags=["concession items"],
)
api_router.include_router(
    argumentation_lines.router,
    prefix="/argumentation-lines",
    tags=["argumentation lines"],
)
