# Default Login Template

[![Build](https://img.shields.io/badge/build-passing-%2357a9a9?style=for-the-badge)](https://github.com/default-services/icons)
[![License](https://img.shields.io/github/license/default-services/login-template?color=%2357a9a9&style=for-the-badge)](https://github.com/default-services/icons/blob/master/LICENSE)

> Default login page template, fully connected and functional login page built using the Default Component library, and equipped with a Python/Flask back-end which is connected to Firebase.
> <br><br>

<p align="center">
  <img src="https://user-images.githubusercontent.com/8584126/98965038-69106380-24be-11eb-9d09-c26cc1e29d7f.gif" />
</p>
<br>

## 🛠️ Setup
Ensure you have [Node](https://nodejs.org/en/download/) and [Python](https://www.python.org/downloads/) installed, then clone this repository. After it's cloned, navigate to the project's root directory on your computer and
run the following scrips in a terminal application *(e.g., Git Bash)*:

**Install Python dependencies:**
```bash
pip3 install -r requirements.txt
```

**Install Node dependencies:**
```bash
yarn install
```
<br>

## ⚙️ Config
The login page is located in `./src/components/login/Login.js`, if you care to make edits, but probably don't need to. Once the user is logged in, they will be redirected to `./src/components/account/Account.js`, you can plug in your account page here, configure Firebase, and call it a day.
<br><br>

## 🔥 Firebase
Firebase is authentication is configured via Python/Flask using [Pyrebase](https://github.com/thisbejim/Pyrebase). You'll need to create and add a `./resources/firebase/config.py` file which contains your Firebase configuration and should include the following snippet, though including the data from your Firebase project. The information you add to this file should not be shared, and so the file is excluded in the project's `.gitignore`, allowing the file to act as environment variables:

```python
# Firebase config object
auth_config = {
  "apiKey": "YOUR-DATA-FROM-FIREBASE",
  "authDomain": "YOUR-DATA-FROM-FIREBASE",
  "databaseURL": "YOUR-DATA-FROM-FIREBASE",
  "projectId": "YOUR-DATA-FROM-FIREBASE",
  "storageBucket": "YOUR-DATA-FROM-FIREBASE",
  "messagingSenderId": "YOUR-DATA-FROM-FIREBASE",
  "appId": "YOUR-DATA-FROM-FIREBASE",
  "measurementId": "YOUR-DATA-FROM-FIREBASE",
}

# For Firebase Database
database_config = {
  "databaseURL": "YOUR-DATA-FROM-FIREBASE",
}

# For Firebase SDK
messaging_config = {
  "type": "YOUR-DATA-FROM-FIREBASE",
  "project_id": "YOUR-DATA-FROM-FIREBASE",
  "private_key_id": "YOUR-DATA-FROM-FIREBASE",
  "private_key": "YOUR-DATA-FROM-FIREBASE",
  "client_email": "YOUR-DATA-FROM-FIREBASE",
  "client_id": "YOUR-DATA-FROM-FIREBASE",
  "auth_uri": "YOUR-DATA-FROM-FIREBASE",
  "token_uri": "YOUR-DATA-FROM-FIREBASE",
  "auth_provider_x509_cert_url": "YOUR-DATA-FROM-FIREBASE",
  "client_x509_cert_url": "YOUR-DATA-FROM-FIREBASE",
}
```
<b>`auth_config`</b>: For information on obtaining your Firebase config, see: [Firebase config](https://support.google.com/firebase/answer/7015592), if you're including `storageBucket` (optional), you'll need to enable [Firebase Cloud Storage](https://firebase.google.com/docs/storage).<br>
<b>`database_config`</b>: Your Firebase configuration from `auth_config` contains the `databaseURL`.<br>
<b>`messaging_config`</b>: For information on obtaining your service account keys, see: [Service account keys](https://cloud.google.com/iam/docs/creating-managing-service-account-keys).<br>

You will also need to enable [Firebase Authentication](https://firebase.google.com/docs/auth) and [Firebase Realtime Database](https://firebase.google.com/docs/database) in your project, if you haven't already, as well as [set the read/write permissions](https://firebase.google.com/docs/database/security/get-started#access_your_rules) for the realtime database. This is used to create, store, and delete usernames. 
<br>

You will also need to create a `.env` file at the root of your project, with a configuration similar to the configuration included below:

```bash
REACT_APP_FIREBASE_API_KEY=YOUR-DATA-FROM-FIREBASE
REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR-DATA-FROM-FIREBASE
REACT_APP_FIREBASE_DATABASE_URL=YOUR-DATA-FROM-FIREBASE
REACT_APP_FIREBASE_PROJECT_ID=YOUR-DATA-FROM-FIREBASE
REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR-DATA-FROM-FIREBASE
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR-DATA-FROM-FIREBASE
REACT_APP_FIREBASE_APP_ID=YOUR-DATA-FROM-FIREBASE
REACT_APP_FIREBASE_MEASUREMENT_ID=YOUR-DATA-FROM-FIREBASE
```
Some fields such as `REACT_APP_FIREBASE_MEASUREMENT_ID` and `REACT_APP_FIREBASE_STORAGE_BUCKET` are optional, if removing, you'll also want to update the service worker configuration in `src\serviceWorker.js`.
<br><br>

## ⚗️ Flask
The Flask server is located in `./app.py`. It comes with CORS enabled, as well as all login, sign up, and password reset routes, all preconfigured. For information on using Flask, see the [Flask documentation](https://flask.palletsprojects.com/).
<br><br>

## 🦟 Bugs
Bugs reported on the project's [issues page](https://github.com/default-services/login-template/issues) will be exterminated as quickly as possible, be sure to include steps to reproduce so they can be spotted easily.
<br><br>

## 🙏 Attribution
- SVG icons used are from [Font Awesome](https://fontawesome.com)
<br>

## 🏷️ License
MIT © [iPzard](https://github.com/default-services/login-template/blob/main/LICENSE)
