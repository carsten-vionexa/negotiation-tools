import csv
from dataclasses import dataclass
from pathlib import Path


class CsvImportParserError(ValueError):
    """A stored CSV cannot be represented as lossless ImportRow raw data."""


@dataclass(frozen=True)
class ParsedCsvRow:
    row_number: int
    raw_data_json: dict[str, str]


def parse_csv_file(path: Path) -> list[ParsedCsvRow]:
    try:
        with path.open("r", encoding="utf-8-sig", newline="") as source:
            return _parse_csv_rows(csv.reader(source, strict=True))
    except UnicodeDecodeError as exc:
        raise CsvImportParserError("CSV file is not valid UTF-8.") from exc
    except csv.Error as exc:
        raise CsvImportParserError("CSV structure is invalid.") from exc
    except OSError as exc:
        raise CsvImportParserError("Stored CSV file cannot be read.") from exc


def _parse_csv_rows(reader: csv.reader) -> list[ParsedCsvRow]:
    try:
        headers = next(reader)
    except StopIteration as exc:
        raise CsvImportParserError("CSV file is empty.") from exc

    if not headers:
        raise CsvImportParserError("CSV header is missing.")
    if any(not header.strip() for header in headers):
        raise CsvImportParserError("CSV header contains an empty column name.")
    if len(headers) != len(set(headers)):
        raise CsvImportParserError("CSV header contains duplicate column names.")

    parsed_rows: list[ParsedCsvRow] = []
    while True:
        row_number = reader.line_num + 1
        try:
            values = next(reader)
        except StopIteration:
            break

        if not values or all(value == "" for value in values):
            continue
        if len(values) > len(headers):
            raise CsvImportParserError("CSV row has more values than the header.")

        padded_values = [*values, *([""] * (len(headers) - len(values)))]
        parsed_rows.append(
            ParsedCsvRow(
                row_number=row_number,
                raw_data_json=dict(zip(headers, padded_values, strict=True)),
            )
        )

    return parsed_rows
