import { createSelector } from "reselect";

const selectUi = state => state.get("ui");

const makeGetLoadingStatus = () =>
  createSelector(
    selectUi,
    ui => ui.get("loading")
  );

export { makeGetLoadingStatus };
