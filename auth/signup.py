import json
from pathlib import Path

def save_user(user_data: dict) -> dict:
    """
    Save user data to JSON file
    """
    data_file = Path("data/users.json")
    data_file.parent.mkdir(exist_ok=True)
    
    try:
        if data_file.exists():
            with open(data_file, "r") as f:
                data = json.load(f)
        else:
            data = {"users": []}
        
        # Check if username already exists
        if any(user["username"] == user_data["username"] for user in data["users"]):
            return {
                "status": "error",
                "message": "Username already exists"
            }
        
        # Add new user
        data["users"].append({
            "username": user_data["username"],
            "password": user_data["password"],
            "email": user_data["email"]
        })
        
        # Save updated data
        with open(data_file, "w") as f:
            json.dump(data, f, indent=4)
            
        return {
            "status": "success",
            "message": "User registered successfully",
            "user": {
                "username": user_data["username"],
                "email": user_data["email"]
            }
        }
        
    except Exception as e:
        return {
            "status": "error",
            "message": f"Error registering user: {str(e)}"
        }

def signup(username: str, password: str, email: str) -> dict:
    """
    Register new user
    """
    # Basic validation
    if not all([username, password, email]):
        return {
            "status": "error",
            "message": "All fields are required"
        }
    
    # Create user data
    user_data = {
        "username": username,
        "password": password,  # In production, you should hash the password
        "email": email
    }
    
    return save_user(user_data) 