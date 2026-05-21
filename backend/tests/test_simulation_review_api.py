from uuid import uuid4

from fastapi.testclient import TestClient


def create_company(client: TestClient, name: str = "Rheinwerk Robotics") -> dict[str, object]:
    response = client.post("/api/companies", json={"name": name})
    assert response.status_code == 201
    return response.json()


def create_project(client: TestClient, company_id: str, title: str = "Robot arm sourcing") -> dict[str, object]:
    response = client.post(
        "/api/negotiation-projects",
        json={
            "company_id": company_id,
            "title": title,
        },
    )
    assert response.status_code == 201
    return response.json()


def create_strategy(
    client: TestClient,
    company_id: str,
    negotiation_project_id: str,
    title: str = "Target margin strategy",
) -> dict[str, object]:
    response = client.post(
        "/api/strategies",
        json={
            "company_id": company_id,
            "negotiation_project_id": negotiation_project_id,
            "title": title,
        },
    )
    assert response.status_code == 201
    return response.json()


def create_simulation_scenario(
    client: TestClient,
    company_id: str | None = None,
    negotiation_project_id: str | None = None,
) -> dict[str, object]:
    if company_id is None:
        company = create_company(client)
        company_id = str(company["id"])
    if negotiation_project_id is None:
        project = create_project(client, company_id)
        negotiation_project_id = str(project["id"])

    response = client.post(
        "/api/simulation-scenarios",
        json={
            "company_id": company_id,
            "negotiation_project_id": negotiation_project_id,
            "title": "Supplier pressure roleplay",
            "status": "draft",
            "scenario_type": "roleplay",
            "difficulty_level": "medium",
            "language": "de",
        },
    )
    assert response.status_code == 201
    return response.json()


def test_simulation_scenario_create_list_detail_and_patch(client: TestClient) -> None:
    company = create_company(client)
    project = create_project(client, company["id"])

    create_response = client.post(
        "/api/simulation-scenarios",
        json={
            "company_id": company["id"],
            "negotiation_project_id": project["id"],
            "title": "Supplier pressure roleplay",
            "status": "draft",
            "scenario_type": "roleplay",
            "difficulty_level": "medium",
            "language": "de",
        },
    )

    assert create_response.status_code == 201
    scenario = create_response.json()
    assert scenario["company_id"] == company["id"]
    assert scenario["negotiation_project_id"] == project["id"]

    detail_response = client.get(f"/api/simulation-scenarios/{scenario['id']}")
    assert detail_response.status_code == 200
    assert detail_response.json()["id"] == scenario["id"]

    company_list_response = client.get("/api/simulation-scenarios", params={"company_id": company["id"]})
    assert company_list_response.status_code == 200
    assert [item["id"] for item in company_list_response.json()] == [scenario["id"]]

    project_list_response = client.get(
        "/api/simulation-scenarios",
        params={"negotiation_project_id": project["id"]},
    )
    assert project_list_response.status_code == 200
    assert [item["id"] for item in project_list_response.json()] == [scenario["id"]]

    patch_response = client.patch(
        f"/api/simulation-scenarios/{scenario['id']}",
        json={"status": "ready", "difficulty_level": "hard", "language": "en"},
    )
    assert patch_response.status_code == 200
    patched_scenario = patch_response.json()
    assert patched_scenario["status"] == "ready"
    assert patched_scenario["difficulty_level"] == "hard"
    assert patched_scenario["language"] == "en"


def test_simulation_scenario_create_rejects_unknown_company(client: TestClient) -> None:
    company = create_company(client)
    project = create_project(client, company["id"])

    response = client.post(
        "/api/simulation-scenarios",
        json={
            "company_id": str(uuid4()),
            "negotiation_project_id": project["id"],
            "title": "Invalid company scenario",
        },
    )

    assert response.status_code == 400
    assert response.json()["detail"] == "Company does not exist"


def test_simulation_scenario_create_rejects_project_from_other_company(client: TestClient) -> None:
    company = create_company(client, "Rheinwerk Robotics")
    other_company = create_company(client, "Acme Components")
    other_project = create_project(client, other_company["id"])

    response = client.post(
        "/api/simulation-scenarios",
        json={
            "company_id": company["id"],
            "negotiation_project_id": other_project["id"],
            "title": "Cross-company scenario",
        },
    )

    assert response.status_code == 400
    assert response.json()["detail"] == "Negotiation project does not belong to company"


def test_simulation_scenario_create_rejects_strategy_from_other_project(client: TestClient) -> None:
    company = create_company(client)
    project = create_project(client, company["id"], "Robot arm sourcing")
    other_project = create_project(client, company["id"], "Motor sourcing")
    strategy = create_strategy(client, company["id"], other_project["id"])

    response = client.post(
        "/api/simulation-scenarios",
        json={
            "company_id": company["id"],
            "negotiation_project_id": project["id"],
            "strategy_id": strategy["id"],
            "title": "Mismatched strategy scenario",
        },
    )

    assert response.status_code == 400
    assert response.json()["detail"] == "Strategy does not belong to negotiation project"


def test_trainer_comment_create_list_detail_and_patch(client: TestClient) -> None:
    scenario = create_simulation_scenario(client)

    create_response = client.post(
        "/api/trainer-comments",
        json={
            "simulation_scenario_id": scenario["id"],
            "comment_type": "coaching_note",
            "comment_text": "Ask more open interest questions before anchoring.",
            "severity": "medium",
            "is_visible_to_trainee": True,
        },
    )

    assert create_response.status_code == 201
    comment = create_response.json()
    assert comment["simulation_scenario_id"] == scenario["id"]

    detail_response = client.get(f"/api/trainer-comments/{comment['id']}")
    assert detail_response.status_code == 200
    assert detail_response.json()["id"] == comment["id"]

    scenario_list_response = client.get("/api/trainer-comments", params={"simulation_scenario_id": scenario["id"]})
    assert scenario_list_response.status_code == 200
    assert [item["id"] for item in scenario_list_response.json()] == [comment["id"]]

    visible_list_response = client.get("/api/trainer-comments", params={"is_visible_to_trainee": "true"})
    assert visible_list_response.status_code == 200
    assert [item["id"] for item in visible_list_response.json()] == [comment["id"]]

    patch_response = client.patch(
        f"/api/trainer-comments/{comment['id']}",
        json={
            "comment_text": "Start with two more discovery questions.",
            "severity": "high",
            "is_visible_to_trainee": False,
        },
    )
    assert patch_response.status_code == 200
    patched_comment = patch_response.json()
    assert patched_comment["comment_text"] == "Start with two more discovery questions."
    assert patched_comment["severity"] == "high"
    assert patched_comment["is_visible_to_trainee"] is False


def test_trainer_comment_create_rejects_unknown_simulation_scenario(client: TestClient) -> None:
    response = client.post(
        "/api/trainer-comments",
        json={
            "simulation_scenario_id": str(uuid4()),
            "comment_text": "No scenario should mean no review anchor.",
        },
    )

    assert response.status_code == 400
    assert response.json()["detail"] == "Simulation scenario does not exist"
