class PersistentStorage {


  // Delete items from local storage
  deleteLocalItem = (item) => {
    const currentLocalData = { ...this.getLocalData() };

    // If the item exists
    if (item in currentLocalData) {

      // Remove item
      delete currentLocalData[item];

      // Update local data
      const defaultLocalData = JSON.stringify(currentLocalData);
      window.localStorage.setItem('default-local-data', defaultLocalData);
    }
  };


  // Delete items from session storage
  deleteSessionItem = (item) => {
    const currentSessionData = { ...this.getSessionData() };

    // If the item exists
    if (item in currentSessionData) {

      // Remove item
      delete currentSessionData[item];

      // Update local data
      const defaultSessionData = JSON.stringify(currentSessionData);
      window.sessionStorage.setItem('default-session-data', defaultSessionData);
    }
  };


  // Get data from local storage
  getLocalData = () => {
    const defaultLocalData = window.localStorage.getItem('default-local-data') || '{}';
    return JSON.parse(defaultLocalData);
  };


  // Get value of a key from local storage
  getLocalValue = (key) => {
    return this.getLocalData()[key];
  };


  // Get data from session storage
  getSessionData = () => {
    const defaultSessionData = window.sessionStorage.getItem('default-session-data') || '{}';
    return JSON.parse(defaultSessionData);
  };


  // Get value of a key from session storage
  getSessionValue = (key) => {
    return this.getSessionData()[key];
  };


  // Set value of a key from local storage
  setLocalValue = (key, value) => {
    const currentLocalData = { ...this.getLocalData() };
    currentLocalData[key] = value;
    const defaultLocalData = JSON.stringify(currentLocalData);

    window.localStorage.setItem('default-local-data', defaultLocalData);
  };


  // Set value of a key from session storage
  setSessionValue = (key, value) => {
    const currentSessionData = { ...this.getSessionData() };
    currentSessionData[key] = value;
    const defaultSessionData = JSON.stringify(currentSessionData);

    window.sessionStorage.setItem('default-session-data', defaultSessionData);
  };
}


export default new PersistentStorage();