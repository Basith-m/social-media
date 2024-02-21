import * as postsApi from "../api/postRequest";

export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await postsApi.getTimelinePosts(id);
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};