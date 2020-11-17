# Default Login Template

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
Firebase is configured and connected via Python/Flask using [Pyrebase](https://github.com/thisbejim/Pyrebase). You'll need to create and add a `./resources/firebase/config.py` file which contains your Firebase configuration and should be structured as so, and include the data from your Firebase project. The information you add to this file should not be shared, and so the file is excluded in the project's `.gitignore`, allowing the file to act as environment variables:

```python
config = {
  "apiKey": "YOUR-DATA-FROM-FIREBASE",
  "authDomain": "YOUR-DATA-FROM-FIREBASE",
  "databaseURL": "YOUR-DATA-FROM-FIREBASE",
  "projectId": "YOUR-DATA-FROM-FIREBASE",
  "storageBucket": "YOUR-DATA-FROM-FIREBASE",
  "messagingSenderId": "YOUR-DATA-FROM-FIREBASE",
  "appId": "YOUR-DATA-FROM-FIREBASE",
  "measurementId": "YOUR-DATA-FROM-FIREBASE",
}
```

You will also need to enable [Firebase Authentication](https://firebase.google.com/docs/auth) and [Firebase Realtime Database](https://firebase.google.com/docs/database) in your project, if you haven't already, as well as [set the read/write permissions](https://firebase.google.com/docs/database/security/get-started#access_your_rules) for the realtime database. This is used to create, store, and delete usernames. 
<br><br>


## ⚗️ Flask
The Flask server is located in `./app.py`. It comes with CORS enabled, as well as all login, sign up, and password reset routes, all preconfigured. For information on using Flask, see the [Flask documentation](https://flask.palletsprojects.com/).
<br><br>

## 🦟 Software bugs
Bugs reported on the project's [issues page](https://github.com/iPzard/mkvtoolnix-batch-tool/issues) will be exterminated as quickly as possible, be sure to include steps to reproduce so they can be spotted easily.
<br><br>

## 🙏 Attribution
- SVG icons used are from [Font Awesome](https://fontawesome.com)
<br>

## 🏷️ License

MIT © [iPzard](https://github.com/default-services/login-template/blob/main/LICENSE)
