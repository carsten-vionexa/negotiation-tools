from dataclasses import dataclass
from datetime import date, datetime
from decimal import Decimal, InvalidOperation
from typing import Any

from app.models.import_row import ImportRow
from app.services.import_row_mapper import ALLOWED_TARGET_FIELDS


class ImportRowValidationError(ValueError):
    """Mapped ImportRows cannot be evaluated as a validation batch."""


@dataclass(frozen=True)
class RowValidationResult:
    validation_status: str
    error_message: str | None
    warning_message: str | None
    error_fields: tuple[str, ...]


NUMBER_RULES = {
    "request_item": {
        "requested_quantity": (Decimal("0"), False),
        "target_price": (Decimal("0"), True),
        "rough_price_expectation": (Decimal("0"), True),
    },
    "procurement_history_item": {
        "quantity": (Decimal("0"), False),
        "unit_price": (Decimal("0"), True),
        "lead_time_weeks": (Decimal("0"), True),
    },
}
DATE_FIELDS = {
    "request_item": {"required_delivery_date"},
    "procurement_history_item": {"purchased_at"},
}


def validate_import_rows(target_entity: str, rows: list[ImportRow]) -> list[RowValidationResult]:
    if target_entity not in ALLOWED_TARGET_FIELDS:
        raise ImportRowValidationError("Unsupported target entity.")
    if not rows:
        raise ImportRowValidationError("Import job has no mapped rows to validate.")

    return [_validate_row(target_entity, row.mapped_data_json) for row in rows]


def _validate_row(target_entity: str, mapped_data_json: dict[str, Any]) -> RowValidationResult:
    errors: list[str] = []
    error_fields: list[str] = []
    if not mapped_data_json:
        _append_error(errors, error_fields, "mapped_data_json", message="Mapped data is required.")
        return _result(errors, error_fields)

    unknown_fields = sorted(set(mapped_data_json) - ALLOWED_TARGET_FIELDS[target_entity])
    if unknown_fields:
        fields = ", ".join(unknown_fields)
        _append_error(
            errors,
            error_fields,
            *unknown_fields,
            message=f"Unsupported mapped fields: {fields}.",
        )

    if target_entity == "request_item":
        if not (_has_value(mapped_data_json.get("title")) or _has_value(mapped_data_json.get("article_name"))):
            _append_error(
                errors,
                error_fields,
                "title_or_article_name",
                message="One of title or article_name is required.",
            )
    elif not _has_value(mapped_data_json.get("item_name")):
        _append_error(errors, error_fields, "item_name", message="item_name is required.")

    for field, (minimum, inclusive) in NUMBER_RULES[target_entity].items():
        value = mapped_data_json.get(field)
        if not _has_value(value):
            continue
        number = _parse_number(value)
        if number is None:
            _append_error(errors, error_fields, field, message=f"{field} must be a number.")
        elif (inclusive and number < minimum) or (not inclusive and number <= minimum):
            comparison = "greater than or equal to 0" if inclusive else "greater than 0"
            _append_error(errors, error_fields, field, message=f"{field} must be {comparison}.")

    currency = mapped_data_json.get("currency")
    if _has_value(currency) and (
        not isinstance(currency, str) or len(currency.strip()) != 3 or not currency.strip().isalpha()
    ):
        _append_error(
            errors,
            error_fields,
            "currency",
            message="currency must be a three-letter currency code.",
        )

    for field in DATE_FIELDS[target_entity]:
        value = mapped_data_json.get(field)
        if _has_value(value) and not _is_date_value(value):
            _append_error(errors, error_fields, field, message=f"{field} must be a valid date.")

    return _result(errors, error_fields)


def _has_value(value: object) -> bool:
    return value is not None and (not isinstance(value, str) or bool(value.strip()))


def _parse_number(value: object) -> Decimal | None:
    if isinstance(value, bool):
        return None
    try:
        number = Decimal(str(value).strip())
    except (InvalidOperation, ValueError):
        return None
    return number if number.is_finite() else None


def _is_date_value(value: object) -> bool:
    if isinstance(value, (date, datetime)):
        return True
    if not isinstance(value, str):
        return False
    try:
        date.fromisoformat(value.strip())
        return True
    except ValueError:
        try:
            datetime.fromisoformat(value.strip())
            return True
        except ValueError:
            return False


def _append_error(
    errors: list[str],
    error_fields: list[str],
    *fields: str,
    message: str,
) -> None:
    errors.append(message)
    error_fields.extend(fields)


def _result(errors: list[str], error_fields: list[str]) -> RowValidationResult:
    return RowValidationResult(
        validation_status="invalid" if errors else "valid",
        error_message=" ".join(errors) if errors else None,
        warning_message=None,
        error_fields=tuple(error_fields),
    )
