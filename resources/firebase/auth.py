import pyrebase, json
from resources.firebase.config import config


""" Firebase wrapper class
Sends request to firebase and returns `response`:
on success: { code: 200, data: {dict}, error: None }
on failure: { code: 400, data: None, error: str(error_message) }
"""
class Auth:
  def __init__(self):
    self.firebase = pyrebase.initialize_app(config)
    self.auth = self.firebase.auth()
    self.database = self.firebase.database().child("users")

  # Function to try/catch with Firebase auth methods
  def authenticate(self, method, *credentials):
    try:
      code = 200
      error = None
      data = getattr(self.auth, method)(*credentials)

    except Exception as exception:
      code = 400
      error = json.loads(exception.args[1])["error"]["message"]
      data = None

    response = {"code": code, "data": data, "error": error}
    return response

  # Function to create an account in Firebase
  def create_account(self, email, password, username):
    database_username = self.database.child(username).get().val()

    # If username doesn't already exist
    if database_username is None:
      response = self.authenticate(
        "create_user_with_email_and_password", email, password
      )
      user = response["data"]

      # If email doesn't already exist
      if user is not None:
        self.database.child(username).set(user["email"])
        self.auth.send_email_verification(user["idToken"])

    # If username does already exist
    else:
      response = {"code": 400, "error": "USERNAME_EXISTS", "data": None}

    return response

  # Function to check if user is logged into Firebase
  def is_logged_in(self, id_token):
    response = self.authenticate("get_account_info", id_token)

    return response

  # Function to log in using Firebase
  def log_in(self, email, password, username):

    # If username is used, get associated email from database
    user_email = email or self.database.child(username).get().val()
    response = self.authenticate(
      "sign_in_with_email_and_password", user_email, password
    )

    # Check if email has been verified
    data = response["data"]

    if data is not None:
      user_data = self.auth.get_account_info(data["idToken"])
      current_user_data = user_data["users"][0]
      is_email_verified = current_user_data["emailVerified"]
      data["isEmailVerified"] = is_email_verified

    return response

  # Function to reset password using Firebase
  def reset_password(self, email):
    response = self.authenticate("send_password_reset_email", email)

    return response
