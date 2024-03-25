from pydantic import BaseModel


class StatisticsResponse(BaseModel):
    """The response for Dashboard page"""
    total_users: int
    active_users: int
