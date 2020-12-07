import firebase_admin
from firebase_admin import credentials, messaging
from resources.firebase.config import database_config, messaging_config


""" Firebase Cloud Messaging
Used to send push notifications
"""
class Messaging:
  def __init__(self):
    firebase_admin.initialize_app(
      credentials.Certificate(messaging_config), database_config
    )

  # Push notifications (web push)
  def push_notification(self, token, title, body, icon):

    # See documentation on defining a message payload.
    message = messaging.MulticastMessage(
      data={
        "icon": icon if icon is not None else "",
        "body": body,
        "title": title,
      },
      tokens=[token],
    )

    # Send a message to the device using registration token
    try:
      messaging.send_multicast(message)
      response = 200
    except Exception as error:
      response = 401  # token likely expired
      print(error)

    return response

  # Method to subscribe to topics/username(s)
  def subscribe_to_topic(self, topic, *tokens):
    registration_tokens = [*tokens]
    response = messaging.subscribe_to_topic(registration_tokens, topic)

    return 200 if response.success_count > 0 else 400

  # Method to unsubscribe from topics/username(s)
  def unsubscribe_from_topic(self, topic, *tokens):
    registration_tokens = [*tokens]
    response = messaging.unsubscribe_from_topic(registration_tokens, topic)

    return 200 if response.success_count > 0 else 400
