from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from resources.firebase import auth

# Instantiating Auth
Auth = auth.Auth()

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
  username = request.json["username"] or None
  response = Auth.create_account(email, password, username)

  return jsonify(response)


# Route for checking login status
@app.route("/is_logged_in", methods=["POST"])
def is_log_in():
  id_token = request.json["idToken"]
  response = Auth.is_logged_in(id_token)

  return jsonify(response)


# Route for logging in
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


if __name__ == "__main__":
  app.run(host="0.0.0.0", port=8080)
