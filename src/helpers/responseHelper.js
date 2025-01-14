const responseSuccess = (res, message = 'Request successful', data = {}, status = 200) => {
    return res.status(status).json({
      success: true,
      message: message,
      data: data,
    });
  };
  
  const responseError = (res, message = 'Request failed', status = 500) => {
    return res.status(status).json({
      success: false,
      message: message,
    });
  };
  
export { responseSuccess, responseError };
  