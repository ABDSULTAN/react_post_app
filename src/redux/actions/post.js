import axios from "axios";
import reduxConstant from "../reduxConstant";

export const getAllPost = (body) => async (dispatch) => {
  axios
    .get(
      `https://jsonplaceholder.typicode.com/posts?_start=${body.start}&_limit=${body.limit}`
    )
    .then((response) => {
      if (response && response.data) {
        if (response.data.status === "fail") {
          dispatch({
            type: reduxConstant.GET_POST_FAILED,
            payload: response.data.message,
          });
        } else {
          dispatch({
            type: reduxConstant.GET_POST_SUCCESS,
            payload: response.data,
          });
        }
        removePostDataSuccessError(dispatch);
      }
    })
    .catch((error) => {
      dispatch({
        type: reduxConstant.GET_POST_FAILED,
        payload: error.response.data.message,
      });

      removePostDataSuccessError(dispatch);
    });
};

export const getPostDetails = (body) => async (dispatch) => {
  axios
    .get(`https://jsonplaceholder.typicode.com/posts/${body.postId}`)
    .then((response) => {
      if (response && response.data) {
        if (response.data.status === "fail") {
          dispatch({
            type: reduxConstant.POST_DETAILS_FAILED,
            payload: response.data.message,
          });
        } else {
          dispatch({
            type: reduxConstant.POST_DETAILS_SUCCESS,
            payload: response.data,
          });
        }
        removePostDataSuccessError(dispatch);
      }
    })
    .catch((error) => {
      dispatch({
        type: reduxConstant.POST_DETAILS_FAILED,
        payload: error.response.data.message,
      });

      removePostDataSuccessError(dispatch);
    });
};

export const createPostDetails = (body) => async (dispatch) => {
  axios
    .post("https://jsonplaceholder.typicode.com/posts", body)
    .then((response) => {
      if (response && response.data) {
        if (response.data.status === "fail") {
          dispatch({
            type: reduxConstant.CREATE_POST_FAILED,
            payload: response.data.message,
          });
        } else {
          dispatch({
            type: reduxConstant.CREATE_POST_SUCCESS,
            payload: response.data,
          });
        }
        removePostDataSuccessError(dispatch);
      }
    })
    .catch((error) => {
      dispatch({
        type: reduxConstant.CREATE_POST_FAILED,
        payload: error.response.data.message,
      });

      removePostDataSuccessError(dispatch);
    });
};

export const removePostDataSuccessError = (dispatch) => {
  setTimeout(() => {
    dispatch({
      type: reduxConstant.REMOVE_POST_DATA_SUCCESS_FAILED,
      payload: null,
    });
  }, 500);
};
