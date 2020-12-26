import React, { Component } from "react";
import "./style/home.css";

class Home extends Component {
  render() {
    return (
      <div className="homeBody">
        <div className="homeMain">
          <div className="mainTitle"> Time-based One Time Password </div>
          <div className="mainInfo">
            {" "}
            This application is a two-factor authentication code generator that
            provides users a six digit code to enter. Similar to Google's
            "Google Authenticator" (GA), this application uses Time-based One
            Time Password and HMAC-based One Time Password to create the code.
            <h2>Download the GA app and compare the codes!</h2>{" "}
          </div>
        </div>
        <a href="/totp">
          <i className="arrows fas fa-chevron-right fa-5x"></i>{" "}
        </a>
        <div className="instrSection">
          <div className="instrCol">
            <i class="fas fa-key fa-3x"></i>
            <h5 className="instrHeader">Enter Email and Secret </h5>
            <p>
              {" "}
              The secret must be Base-32, meaning length must be a multiple of 8
              and only contains letters a-z and digits 2-7 (inclusive).{" "}
            </p>
          </div>

          <div className="instrCol">
            <i class="fas fa-download fa-3x"></i>
            <h5 className="instrHeader">Download the GA App </h5>
            <p>
              {" "}
              <a
                href="https://apps.apple.com/us/app/google-authenticator/id388497605"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#595959", textDecoration: "none" }}
              >
                IOS
              </a>{" "}
              <br />
              <br />
              <a
                href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en_US&gl=US"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#595959", textDecoration: "none" }}
              >
                Android
              </a>
            </p>
          </div>

          <div className="instrCol">
            <i class="fas fa-qrcode fa-3x"></i>
            <h5 className="instrHeader">Scan QR code </h5>
            <p>
              {" "}
              Scan the QR code provided by this application to get the same
              email and secret on to Google's app.
            </p>
          </div>

          <div className="instrCol">
            <i class="fas fa-equals fa-3x"></i>
            <h5 className="instrHeader">Compare Codes </h5>
            <p>
              {" "}
              Due to time syncronization issues, this application provides the
              previous, current, and next code. The code provided by Google's
              app should be the same as the one found with this application.
            </p>
          </div>
        </div>
        {/* <div>
          1.) Enter email and secret. The secret must be Base-32, meaning length
          must be a multiple of 8 and only contains letters a-z and digits 2-7
          (inclusive). 2.) Download the Google Authenticator App. IOS - Android
          3.) Scan QR code 4.) Compare. Due to syncronization issues,
          application provides the previous, current, and next code. The code
          provided by Google's app should be the same as the one found with this
          application.
        </div> */}
      </div>
    );
  }
}

export default Home;
