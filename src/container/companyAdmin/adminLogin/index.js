import React from "react";
import notifications from "../../../utils/notifications";
import SubHeader from "../../../components/subHeader";
import "./adminLogin.scss";

function CompanyLogin(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    notifications.showSuccess("Congratulation! You have successfully login");
    props.history.push("/company-dashboard");
  };
  return (
    <>
      <div className="companyAdminPage">
        <div className="admin-login-block">
          <div className="admin-login-block-form">
            <h3>Company Admin Panel</h3>
            <form onSubmit={handleSubmit}>
              <input type="text" required placeholder="Perfect IT solutions" />
              <input type="text" required placeholder="dsfajskdlfasd" />
              <input
                type="password"
                required
                placeholder="Enter company password"
              />
              <center>
                <button type="submit">Login </button>
                <p>Reset password</p>
              </center>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompanyLogin;
