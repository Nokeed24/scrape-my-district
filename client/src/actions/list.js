import * as request from "superagent";
import { baseUrl } from "../constants";
import { csvToDb } from "../lib/functions";

export const CHANGE_CELL = "CHANGE_CELL";
export const FETCH_ALL_DATA = "FETCH_ALL_DATA";
export const UPDATE_CSV = "UPDATE_CSV";
export const NEW_COMPANIES = "NEW_COMPANIES";

export const updateCSV = payload => {
  return {
    type: UPDATE_CSV,
    payload: payload
  };
};

export const fetchAllData = () => (dispatch, getState) => {
  const state = getState();
  //if (!state.currentUser) return null;
  //const jwt = state.currentUser.jwt;

  //if (isExpired(jwt)) return dispatch(logout());

  request
    .get(`${baseUrl}/databases`)
    //.set("Authorization", `Bearer ${jwt}`)
    .then(response =>
      dispatch({
        type: FETCH_ALL_DATA,
        payload: response.body.databases
      })
    )

    .catch(err => alert(err));
};

export const changeCell = (databaseId, updates) => (dispatch, getState) => {
  const state = getState();
  //if (!state.currentUser) return null;
  //const jwt = state.currentUser.jwt;

  //if (isExpired(jwt)) return dispatch(logout());

  request
    .put(`${baseUrl}/databases/${databaseId}`)
    //.set("Authorization", `Bearer ${jwt}`)
    .send(updates)
    .then(response =>
      dispatch({
        type: CHANGE_CELL,
        payload: response.body.databases
      })
    );
};

export const companiesToAdd = payload => dispatch => {
  Object.keys(payload).map(company => {
    const companyToAdd = csvToDb(payload[company]);
    if(company == payload.length-1){
    request
      .post(`${baseUrl}/databases`)
      //.set("Authorization", `Bearer ${jwt}`)
      .send(companyToAdd)
      .then(response => {
        dispatch({
          type: NEW_COMPANIES,
          payload: response.body.databases
        })
      })
      .catch(err => console.log(err));
  }});
};
