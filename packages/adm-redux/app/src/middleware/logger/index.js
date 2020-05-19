
const loggingMiddleware = (store) => (next) => (action) => {
  // console.log(action.type, action.payload);
  next(action);
};

export default loggingMiddleware;
