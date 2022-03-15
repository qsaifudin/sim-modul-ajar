export default {
  INCREMENT(state, value) {
    state.percent += value;
  },
  DECREMENT(state, value) {
    state.percent -= value;
  },
  RESET_PERCENT(state) {
    state.percent = 0;
  },
  SET_VISIBLE(state, value) {
    state.visible = value;
  }
};
