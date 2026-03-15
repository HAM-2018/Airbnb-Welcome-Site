from pathlib import Path

from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent / ".env")

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.db import create_guestbook_entry, init_db, list_guestbook_entries
from app.mailer import send_issue_report_email
from app.schemas import GuestbookEntry, GuestbookEntryCreate, Issue


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup() -> None:
    init_db()


@app.get("/health")
def health():
    return {"ok": True}


@app.post("/report-issue")
def report_issue(issue: Issue):
    message = issue.message.strip()
    if not message:
        raise HTTPException(status_code=422, detail="Message cannot be blank.")

    cleaned_issue = Issue(
        name=issue.name.strip() if issue.name else None,
        date=issue.date.strip() if issue.date else None,
        message=message,
    )

    try:
        send_issue_report_email(cleaned_issue)
    except RuntimeError as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Could not send report email.") from exc

    return {"received": True, "message": "Thank you. Your report has been submitted."}


@app.get("/guestbook", response_model=list[GuestbookEntry])
def get_guestbook_entries(limit: int = 50):
    return list_guestbook_entries(limit=limit)


@app.post("/guestbook", response_model=GuestbookEntry, status_code=201)
def post_guestbook_entry(payload: GuestbookEntryCreate):
    name = payload.name.strip() if payload.name else None
    if name == "":
        name = None

    location = payload.location.strip() if payload.location else None
    if location == "":
        location = None

    message = payload.message.strip()
    if not message:
        raise HTTPException(status_code=422, detail="Message cannot be blank.")

    return create_guestbook_entry(name=name, location=location, message=message)
