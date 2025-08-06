export default () => {
  try {
    return `${window.location.protocol}//${window.location.host}`;
  } catch (error) {
    return null;
  }
};