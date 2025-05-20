
const UrlParser = {
    parseActiveUrlWithCombiner() {
      const url = window.location.hash.slice(1).toLowerCase(); // e.g. /dashboard
      const urlSegments = url.split('/');
      return `/${urlSegments[1] || ''}`; // hasil: '/', '/login', '/dashboard', dst
    },
  };
  
  export default UrlParser;
  