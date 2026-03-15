from pydantic import BaseModel, Field


class Issue(BaseModel):
    name: str | None = Field(default=None, max_length=80)
    date: str | None = Field(default=None, max_length=80)
    message: str = Field(min_length=1, max_length=2000)


class GuestbookEntryCreate(BaseModel):
    name: str | None = Field(default=None, max_length=80)
    location: str | None = Field(default=None, max_length=120)
    message: str = Field(min_length=1, max_length=500)


class GuestbookEntry(BaseModel):
    id: int
    name: str | None = None
    location: str | None = None
    message: str
    created_at: str
