from datetime import date, datetime
from decimal import Decimal, InvalidOperation
from typing import Any
from uuid import UUID

from app.models.procurement_history_item import ProcurementHistoryItem
from app.services.import_row_mapper import ALLOWED_TARGET_FIELDS


class ImportTargetCreationError(ValueError):
    """Validated mapped data cannot be represented as a target object."""


DECIMAL_FIELDS = {"quantity", "unit_price", "lead_time_weeks"}
STRING_FIELDS = ALLOWED_TARGET_FIELDS["procurement_history_item"] - DECIMAL_FIELDS - {"purchased_at"}


def build_procurement_history_item(
    company_id: UUID,
    mapped_data_json: dict[str, Any],
) -> ProcurementHistoryItem:
    unknown_fields = sorted(set(mapped_data_json) - ALLOWED_TARGET_FIELDS["procurement_history_item"])
    if unknown_fields:
        fields = ", ".join(unknown_fields)
        raise ImportTargetCreationError(f"Unsupported mapped fields for target creation: {fields}.")

    item_name = _optional_string(mapped_data_json.get("item_name"))
    if item_name is None:
        raise ImportTargetCreationError("item_name is required for target creation.")

    values: dict[str, Any] = {
        field: _optional_string(mapped_data_json.get(field)) for field in STRING_FIELDS if field != "item_name"
    }
    values["item_name"] = item_name
    for field in DECIMAL_FIELDS:
        values[field] = _optional_decimal(mapped_data_json.get(field), field)
    values["purchased_at"] = _optional_date(mapped_data_json.get("purchased_at"))

    return ProcurementHistoryItem(company_id=company_id, metadata_json={}, **values)


def _optional_string(value: object) -> str | None:
    if value is None:
        return None
    text = str(value).strip()
    return text or None


def _optional_decimal(value: object, field: str) -> Decimal | None:
    if value is None or (isinstance(value, str) and not value.strip()):
        return None
    if isinstance(value, bool):
        raise ImportTargetCreationError(f"{field} must be a number for target creation.")
    try:
        decimal_value = Decimal(str(value).strip())
    except (InvalidOperation, ValueError):
        raise ImportTargetCreationError(f"{field} must be a number for target creation.") from None
    if not decimal_value.is_finite():
        raise ImportTargetCreationError(f"{field} must be a finite number for target creation.")
    return decimal_value


def _optional_date(value: object) -> date | None:
    if value is None or (isinstance(value, str) and not value.strip()):
        return None
    if isinstance(value, datetime):
        return value.date()
    if isinstance(value, date):
        return value
    if isinstance(value, str):
        try:
            return date.fromisoformat(value.strip())
        except ValueError:
            try:
                return datetime.fromisoformat(value.strip()).date()
            except ValueError:
                pass
    raise ImportTargetCreationError("purchased_at must be a valid date for target creation.")
