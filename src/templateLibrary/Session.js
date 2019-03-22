
class Session {
  static findGetParameter(parameterName) {
    let result = null;
    const items = window.location.search.substr(1).split('&');
    items.forEach((i) => {
      const tmp = i.split('=');
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
    return result;
  }

  static setUser({ userId, userAccessToken }) {
    localStorage.setItem('userId', userId);
    localStorage.setItem('userAccessToken', userAccessToken);
  }

  static getUser() {
    return {
      userId: localStorage.getItem('userId'),
      userAccessToken: localStorage.getItem('userAccessToken'),
    };
  }

  static clearUser() {
    localStorage.removeItem('userId');
    localStorage.removeItem('userAccessToken');
    localStorage.removeItem('currentOrganization');
  }

  static setCurrentOrganization({ id }) {
    localStorage.setItem('currentOrganization', id);
  }

  static getCurrentOrganization() {
    return localStorage.getItem('currentOrganization');
  }

  static clearCurrentOrganization() {
    localStorage.removeItem('currentOrganization');
  }
}

export default Session;
