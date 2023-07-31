import reduxConstant from "../reduxConstant";

const initialState = {
  payload: null,

  isGetPostSuccess: false,
  isGetPostFailed: false,
  getPostData: null,

  isCreatePostSuccess: false,
  isCreatePostFailed: false,
  createPostData: null,

  isGetPostDetailsFailed: false,
  isGetPostDetailsSuccess: false,
  getPostDetailsData: null,

  hasPostError: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case reduxConstant.GET_POST_SUCCESS:
      return {
        ...state,
        isGetPostSuccess: true,
        isGetPostFailed: false,
        getPostData: payload,
        hasPostError: false,
      };

    case reduxConstant.GET_POST_FAILED:
      return {
        ...state,
        isGetPostSuccess: false,
        isGetPostFailed: true,
        getPostData: payload,
        hasPostError: true,
      };

    case reduxConstant.CREATE_POST_SUCCESS:
      return {
        ...state,
        isCreatePostFailed: false,
        isCreatePostSuccess: true,
        createPostData: payload,
        hasPostError: false,
      };

    case reduxConstant.CREATE_POST_FAILED:
      return {
        ...state,
        isCreatePostSuccess: false,
        isCreatePostFailed: true,
        createPostData: payload,
        hasPostError: true,
      };

    case reduxConstant.POST_DETAILS_SUCCESS:
      return {
        ...state,
        isGetPostDetailsFailed: false,
        isGetPostDetailsSuccess: true,
        getPostDetailsData: payload,
        hasPostError: false,
      };

    case reduxConstant.POST_DETAILS_FAILED:
      return {
        ...state,
        isGetPostDetailsFailed: true,
        isGetPostDetailsSuccess: false,
        getPostDetailsData: payload,
        hasPostError: true,
      };

    case reduxConstant.REMOVE_POST_DATA_SUCCESS_FAILED:
      return {
        ...state,
        payload: null,

        isGetPostSuccess: false,
        isGetPostFailed: false,
        getPostData: null,

        isCreatePostSuccess: false,
        isCreatePostFailed: false,
        createPostData: null,

        isGetPostDetailsFailed: false,
        isGetPostDetailsSuccess: false,
        getPostDetailsData: null,

        hasPostError: false,
      };

    default:
      return state;
  }
}
