from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from resources.firebase import auth, messaging
import requests

# Instantiating Services
Auth = auth.Auth()
Messaging = messaging.Messaging()

# Instantiating Flask and CORS
app = Flask(__name__)
cors = CORS(
  app,
  resources={
    r"/*": {
      "origins": "http://localhost*",
      "ports": "8080",
    }
  },
)

# CORS headers
app.config["CORS_HEADERS"] = "Content-Type"

# Route for creating an account
@app.route("/create_account", methods=["POST"])
def sign_up():
  email = request.json["email"] or None
  password = request.json["password"]
  token = request.json["token"] or None
  username = request.json["username"] or None
  response = Auth.create_account(email, password, token, username)

  # usage
  # Messaging.push_notification(token, "test", "testing message", None)
  return jsonify(response)


# Route for logging in
# TODO: refresh/add device token on login
@app.route("/log_in", methods=["POST"])
def log_in():
  email = request.json["email"]
  password = request.json["password"]
  username = request.json["username"]
  response = Auth.log_in(email, password, username)

  return jsonify(response)


# Route for reseting a password
@app.route("/reset_password", methods=["POST"])
def reset_password():
  email = request.json["email"]
  response = Auth.reset_password(email)

  return jsonify(response)


# Route to send notifications
@app.route("/send_push_notification", methods=["POST"])
def send_notification():
  username = request.json["username"]
  title = request.json["title"]
  message = request.json["message"]

  # Username is used to retreive saved device token
  token = Auth.get_device_token(username)

  response = Messaging.push_notification(token, title, message, None)

  return jsonify(response)


if __name__ == "__main__":
  app.run(host="0.0.0.0", port=8080)
