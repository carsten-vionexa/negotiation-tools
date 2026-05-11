from fastapi import APIRouter

router = APIRouter()


@router.get("")
def list_projects() -> list[dict[str, str]]:
    return [
        {
            "id": "rheinwerk-robotics-mvp",
            "name": "Rheinwerk Robotics Einkauf",
            "status": "Vorbereitung",
        }
    ]
