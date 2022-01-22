import { store } from 'react-notifications-component';

const Notification = {
  type: "success",
  insert: "top",
  container: "top-right",
  animationIn: ["animated", "fadeIn"],
  animationOut: ["animated", "fadeOut"],
  click: true,
  dismiss: {
    duration: 3000,
    showIcon: true
  },
};

function showSuccess(msg) {
  store.addNotification({
    ...Notification,
    message: msg,
    type: 'success'
  })
}

function showWarning(msg) {
  store.addNotification({
    ...Notification,
    message: msg,
    type: 'warning'
  });
}
function showError(msg) {
  store.addNotification({
    ...Notification,
    message: msg || "Something Went Wrong! Try again later.",
    type: 'danger'
  });
}

function handleError(err) {
  if (err && err.data) {
    showError(err.data.msg);
  }
}

function showInfo(msg) { }

export default {
  showError,
  handleError,
  showWarning,
  showInfo,
  showSuccess,
};
