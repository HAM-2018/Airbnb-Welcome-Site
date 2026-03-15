import os 
import smtplib
from email.message import EmailMessage
from app.schemas import Issue

SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USERNAME = os.getenv("SMTP_USERNAME")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
REPORT_ISSUE_TO_EMAIL = os.getenv("REPORT_ISSUE_TO_EMAIL", "hadensmith1994@gmail.com")
REPORT_ISSUE_FROM_EMAIL = os.getenv("REPORT_ISSUE_FROM_EMAIL", SMTP_USERNAME)

def send_issue_report_email(issue: Issue) -> None:
    if not SMTP_USERNAME or not SMTP_PASSWORD:
        raise RuntimeError("SMTP credentials are not configured")
    
    subject_name = issue.name.strip() if issue.name else "Guest"
    date_text = issue.date.strip() if issue.date else "Not Provided"

    body = (
        "A new issue report was submitted.\n\n"
        f"Name: {subject_name}\n"
        f"Date: {date_text}\n\n"
        "Message:\n"
        f"{issue.message.strip()}\n"
    )

    message = EmailMessage()
    message["Subject"] = f"New Airbnb Issue Report from {subject_name}"
    message["From"] = f"AirbnbGuestReporting <{REPORT_ISSUE_FROM_EMAIL}>"
    message["To"] = REPORT_ISSUE_TO_EMAIL
    message.set_content(body)

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_USERNAME, SMTP_PASSWORD)
        server.send_message(message)