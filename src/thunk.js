
const INCREMENT_COUNTER = "INCREMENT_COUNTER"

function increment(counter) {
  return {
    type: INCREMENT_COUNTER,
    counter : counter
  };
}

export  function counterAsync() {
  return (dispatch) => {
    let counter = 5;
    let timerId = setInterval(() => dispatch(increment(counter--)),1000);
    setTimeout(() => { clearInterval(timerId);}, 6000);
  };
}