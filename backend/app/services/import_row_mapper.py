from typing import Any

from app.models.import_row import ImportRow


class ImportRowMappingError(ValueError):
    """Parsed ImportRows cannot be mapped with the supplied configuration."""


ALLOWED_TARGET_FIELDS = {
    "request_item": {
        "title",
        "article_name",
        "article_description",
        "category",
        "specification",
        "requested_quantity",
        "unit",
        "target_price",
        "rough_price_expectation",
        "currency",
        "required_delivery_date",
        "target_delivery_time",
        "target_region",
        "priority",
        "comment",
    },
    "procurement_history_item": {
        "supplier_name",
        "supplier_country",
        "item_name",
        "category",
        "sku",
        "quantity",
        "unit",
        "unit_price",
        "currency",
        "lead_time_weeks",
        "quality_rating",
        "price_assessment",
        "improvement_potential",
        "purchased_at",
        "source_document",
        "notes",
    },
}


def validate_mapping_configuration(target_entity: str, field_mapping: dict[str, str]) -> None:
    allowed_fields = ALLOWED_TARGET_FIELDS.get(target_entity)
    if allowed_fields is None:
        raise ImportRowMappingError("Unsupported target entity.")

    unknown_fields = sorted(set(field_mapping) - allowed_fields)
    if unknown_fields:
        fields = ", ".join(unknown_fields)
        raise ImportRowMappingError(f"Mapping contains unsupported target fields: {fields}.")


def map_import_rows(rows: list[ImportRow], field_mapping: dict[str, str]) -> list[dict[str, Any]]:
    if not rows:
        raise ImportRowMappingError("Import job has no raw rows to map.")

    source_keys = set(rows[0].raw_data_json)
    if any(set(row.raw_data_json) != source_keys for row in rows[1:]):
        raise ImportRowMappingError("Import rows contain inconsistent source columns.")

    missing_columns = sorted(set(field_mapping.values()) - source_keys)
    if missing_columns:
        columns = ", ".join(missing_columns)
        raise ImportRowMappingError(f"Mapping refers to missing source columns: {columns}.")

    return [
        {target_field: row.raw_data_json[source_column] for target_field, source_column in field_mapping.items()}
        for row in rows
    ]
