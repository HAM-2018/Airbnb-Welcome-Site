from __future__ import annotations

import sqlite3
from pathlib import Path
from typing import TypedDict


class GuestbookEntryRow(TypedDict):
    id: int
    name: str | None
    location: str | None
    message: str
    created_at: str


DB_PATH = Path(__file__).resolve().parents[1] / "guestbook.db"


def _connect() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    with _connect() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS guestbook_entries (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                location TEXT,
                message TEXT NOT NULL,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
            """
        )

        # One-time migration for existing DBs created before `location` existed
        columns = conn.execute("PRAGMA table_info(guestbook_entries)").fetchall()
        column_names = {col["name"] for col in columns}
        if "location" not in column_names:
            conn.execute("ALTER TABLE guestbook_entries ADD COLUMN location TEXT")

        conn.commit()


def list_guestbook_entries(limit: int = 100) -> list[GuestbookEntryRow]:
    safe_limit = min(max(limit, 1), 200)
    with _connect() as conn:
        rows = conn.execute(
            """
            SELECT id, name, location, message, created_at
            FROM guestbook_entries
            ORDER BY id DESC
            LIMIT ?
            """,
            (safe_limit,),
        ).fetchall()

    return [
        {
            "id": int(row["id"]),
            "name": row["name"],
            "location": row["location"],
            "message": row["message"],
            "created_at": row["created_at"],
        }
        for row in rows
    ]


def create_guestbook_entry(
    name: str | None,
    location: str | None,
    message: str,
) -> GuestbookEntryRow:
    with _connect() as conn:
        cursor = conn.execute(
            """
            INSERT INTO guestbook_entries (name, location, message)
            VALUES (?, ?, ?)
            """,
            (name, location, message),
        )
        entry_id = cursor.lastrowid

        row = conn.execute(
            """
            SELECT id, name, location, message, created_at
            FROM guestbook_entries
            WHERE id = ?
            """,
            (entry_id,),
        ).fetchone()
        conn.commit()

    if row is None:
        raise RuntimeError("Failed to read inserted guestbook entry")

    return {
        "id": int(row["id"]),
        "name": row["name"],
        "location": row["location"],
        "message": row["message"],
        "created_at": row["created_at"],
    }
