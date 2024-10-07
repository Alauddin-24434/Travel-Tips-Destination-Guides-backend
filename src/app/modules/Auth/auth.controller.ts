import httpStatus from "http-status";
import config from "../../config";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const createUser = catchAsync(async (req, res) => {
    const result = await AuthServices.createUser(req.body);
    const { refreshToken, accessToken } = result;
  
    res.cookie('refreshToken', refreshToken, {
      secure: config.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: true,
    });
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created in successfully!',
      data: {
        accessToken,
        refreshToken,
      },
    });
  });

  const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);
    const { refreshToken, accessToken } = result;
  
    res.cookie('refreshToken', refreshToken, {
      secure: config.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: true,
    });
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User logged in successfully!',
      data: {
        accessToken,
        refreshToken,
      },
    });
  });
  const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await AuthServices.refreshToken(refreshToken);
  
    console.log('accessToken', result);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Access token retrieved successfully!',
      data: result,
    });
  });
  export const AuthControllers = {
    createUser,
    loginUser,
 
    refreshToken,
  };