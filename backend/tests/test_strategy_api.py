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


def create_strategy(client: TestClient) -> dict[str, object]:
    company = create_company(client)
    project = create_project(client, company["id"])
    response = client.post(
        "/api/strategies",
        json={
            "company_id": company["id"],
            "negotiation_project_id": project["id"],
            "title": "Target margin strategy",
        },
    )
    assert response.status_code == 201
    return response.json()


def test_strategy_create_list_and_patch(client: TestClient) -> None:
    company = create_company(client)
    project = create_project(client, company["id"])

    create_response = client.post(
        "/api/strategies",
        json={
            "company_id": company["id"],
            "negotiation_project_id": project["id"],
            "title": "Target margin strategy",
            "status": "draft",
        },
    )

    assert create_response.status_code == 201
    strategy = create_response.json()
    assert strategy["company_id"] == company["id"]
    assert strategy["negotiation_project_id"] == project["id"]

    list_response = client.get("/api/strategies", params={"company_id": company["id"]})
    assert list_response.status_code == 200
    assert [item["id"] for item in list_response.json()] == [strategy["id"]]

    project_list_response = client.get(
        "/api/strategies",
        params={"negotiation_project_id": project["id"]},
    )
    assert project_list_response.status_code == 200
    assert [item["id"] for item in project_list_response.json()] == [strategy["id"]]

    patch_response = client.patch(
        f"/api/strategies/{strategy['id']}",
        json={"status": "ready", "notes": "Reviewed manually."},
    )
    assert patch_response.status_code == 200
    patched_strategy = patch_response.json()
    assert patched_strategy["status"] == "ready"
    assert patched_strategy["notes"] == "Reviewed manually."


def test_strategy_create_rejects_unknown_company(client: TestClient) -> None:
    company = create_company(client)
    project = create_project(client, company["id"])

    response = client.post(
        "/api/strategies",
        json={
            "company_id": str(uuid4()),
            "negotiation_project_id": project["id"],
            "title": "Invalid company strategy",
        },
    )

    assert response.status_code == 400
    assert response.json()["detail"] == "Company does not exist"


def test_strategy_create_rejects_project_from_other_company(client: TestClient) -> None:
    company = create_company(client, "Rheinwerk Robotics")
    other_company = create_company(client, "Acme Components")
    other_project = create_project(client, other_company["id"])

    response = client.post(
        "/api/strategies",
        json={
            "company_id": company["id"],
            "negotiation_project_id": other_project["id"],
            "title": "Cross-company strategy",
        },
    )

    assert response.status_code == 400
    assert response.json()["detail"] == "Negotiation project does not belong to company"


def test_zopa_item_create_list_patch_and_invalid_strategy(client: TestClient) -> None:
    strategy = create_strategy(client)

    create_response = client.post(
        "/api/zopa-items",
        json={
            "strategy_id": strategy["id"],
            "dimension": "price",
            "priority": "medium",
        },
    )

    assert create_response.status_code == 201
    zopa_item = create_response.json()
    assert zopa_item["strategy_id"] == strategy["id"]

    list_response = client.get("/api/zopa-items", params={"strategy_id": strategy["id"]})
    assert list_response.status_code == 200
    assert [item["id"] for item in list_response.json()] == [zopa_item["id"]]

    patch_response = client.patch(f"/api/zopa-items/{zopa_item['id']}", json={"priority": "high"})
    assert patch_response.status_code == 200
    assert patch_response.json()["priority"] == "high"

    invalid_response = client.post(
        "/api/zopa-items",
        json={
            "strategy_id": str(uuid4()),
            "dimension": "delivery",
        },
    )
    assert invalid_response.status_code == 400
    assert invalid_response.json()["detail"] == "Strategy does not exist"


def assert_strategy_child_endpoint(
    client: TestClient,
    endpoint: str,
    create_payload: dict[str, object],
    patch_payload: dict[str, object],
    patched_field: str,
    list_params: dict[str, object] | None = None,
) -> None:
    strategy = create_strategy(client)
    payload = {"strategy_id": strategy["id"], **create_payload}

    create_response = client.post(endpoint, json=payload)
    assert create_response.status_code == 201
    created_item = create_response.json()
    assert created_item["strategy_id"] == strategy["id"]

    params = {"strategy_id": strategy["id"], **(list_params or {})}
    list_response = client.get(endpoint, params=params)
    assert list_response.status_code == 200
    assert [item["id"] for item in list_response.json()] == [created_item["id"]]

    patch_response = client.patch(f"{endpoint}/{created_item['id']}", json=patch_payload)
    assert patch_response.status_code == 200
    assert patch_response.json()[patched_field] == patch_payload[patched_field]

    invalid_response = client.post(
        endpoint,
        json={"strategy_id": str(uuid4()), **create_payload},
    )
    assert invalid_response.status_code == 400
    assert invalid_response.json()["detail"] == "Strategy does not exist"


def test_batna_option_smoke(client: TestClient) -> None:
    assert_strategy_child_endpoint(
        client,
        "/api/batna-options",
        {"title": "Alternative supplier", "batna_type": "supplier", "ranking": 1},
        {"risk_level": "low"},
        "risk_level",
        {"option_type": "supplier"},
    )


def test_concession_item_smoke(client: TestClient) -> None:
    assert_strategy_child_endpoint(
        client,
        "/api/concession-items",
        {"title": "Payment terms", "concession_type": "commercial", "sequence_order": 1},
        {"risk_level": "medium"},
        "risk_level",
        {"concession_order": 1},
    )


def test_argumentation_line_smoke(client: TestClient) -> None:
    assert_strategy_child_endpoint(
        client,
        "/api/argumentation-lines",
        {"title": "Capacity risk", "argument_type": "risk", "priority": "medium"},
        {"priority": "high"},
        "priority",
        {"argument_type": "risk"},
    )
