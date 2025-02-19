import json
import os
from pathlib import Path

def load_users():
    data_file = Path("data/users.json")
    if not data_file.exists():
        return []
    
    with open(data_file, "r") as f:
        data = json.load(f)
        return data.get("users", [])

def login(username: str, password: str) -> dict:
    """
    Authenticate user and return user data if successful
    """
    users = load_users()
    
    for user in users:
        if user["username"] == username and user["password"] == password:
            return {
                "status": "success",
                "message": "Login successful",
                "user": {
                    "username": user["username"],
                    "email": user["email"]
                }
            }
    
    return {
        "status": "error",
        "message": "Invalid username or password"
    } 