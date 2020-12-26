import React, { Component } from "react";
import "./style/totp.css";

var QRCode = require("qrcode.react");

class Totp extends Component {
  state = {
    totpCodePrev: "",
    totpCode: "",
    totpCodeNext: "",
    intervalId: 0,
    timerId: 0,
    timer: 30,
    email: "test123@gmail.com",
    emailValid: "False",
    secret: "JBSWY3DPEHPK3PXP",
    secretValid: "False",
    secretLength: "False",
    secretChars: "False",
    // qrCode: "/sample.svg",
  };

  constructor(props) {
    super(props);
    this.secretRef = React.createRef();
    this.emailRef = React.createRef();
  }

  setTimer = () => {
    if (this.state.timerId !== 0) {
      clearInterval(this.state.timerId);
    }

    this.setState({ timer: 30 });

    this.setState({
      timerId: setInterval(() => {
        this.setState({ timer: this.state.timer - 1 });
      }, 1000),
    });
  };

  tokenize = (s) => {
    var i = 0;
    var codeNum = 0;

    var prev = "";
    var curr = "";
    var next = "";

    while (s[i] !== "!") {
      if (s[i] === "&") {
        i++;
        codeNum++;
      }
      switch (codeNum) {
        case 0:
          prev += s[i];
          break;
        case 1:
          curr += s[i];
          break;
        case 2:
          next += s[i];
          break;
        default:
          continue;
      }
      i++;
    }

    this.setState({
      totpCodePrev: prev,
      totpCode: curr,
      totpCodeNext: next,
      timer: 30,
    });
  };

  callApi = () => {
    fetch(`/api?email=lekevin678@gmail.com&secret=${this.state.secret}`)
      .then((res) => res.text())
      .then((res) => this.tokenize(res));
  };

  getCode = () => {
    if (this.state.intervalId !== 0) {
      clearInterval(this.state.intervalId);
    }

    this.callApi();

    this.setState({
      intervalId: setInterval(() => {
        this.callApi();
      }, 30000),
    });

    this.setTimer();
  };

  checkEmail = (event) => {
    const button = document.getElementById("generateButton");
    var input = document.getElementsByClassName("emailInput")[0];

    var email = event.target.value;

    if (email.length === 0) {
      button.disabled = "disabled";
      this.setState({ emailValid: "False" });
      if (input.classList.contains("valid")) {
        input.classList.remove("valid");
      }
      input.classList.add("notValid");
      return;
    }

    this.setState({ emailValid: "True" });

    if (input.classList.contains("notValid")) {
      input.classList.remove("notValid");
    }
    input.classList.add("valid");

    this.setState({ emailValid: "True" }, () => {
      if (
        this.state.secretValid === "True" &&
        this.state.emailValid === "True"
      ) {
        button.disabled = "";
      }
    });

    return;
  };

  checkSecretLength(secret) {
    if (secret.length === 0 || secret.length % 8 !== 0) {
      return false;
    } else {
      return true;
    }
  }

  checkSecretChars(secret) {
    var asciiCode;
    if (secret.length === 0) {
      return false;
    }
    for (var i = 0; i < secret.length; i++) {
      asciiCode = secret[i].charCodeAt(0);
      if (asciiCode < 65 || asciiCode > 90) {
        if (asciiCode < 50 || asciiCode > 55) {
          return false;
        }
      }
    }

    return true;
  }

  checkSecret = (event) => {
    const button = document.getElementById("generateButton");
    var input = document.getElementsByClassName("secretInput")[0];

    var isValid = true;
    var secret = event.target.value.toUpperCase();
    if (this.checkSecretLength(secret) === false) {
      this.setState({ secretValid: "False" });
      this.setState({ secretLength: "False" });
      isValid = false;
      button.disabled = "disabled";
      if (input.classList.contains("valid")) {
        input.classList.remove("valid");
      }
      input.classList.add("notValid");
    } else {
      this.setState({ secretLength: "True" });
    }

    console.log(secret);
    if (this.checkSecretChars(secret) === false) {
      this.setState({ secretValid: "False" });
      this.setState({ secretChars: "False" });
      isValid = false;
      button.disabled = "disabled";
      if (input.classList.contains("valid")) {
        input.classList.remove("valid");
      }
      input.classList.add("notValid");
    } else {
      this.setState({ secretChars: "True" });
    }

    if (isValid) {
      if (input.classList.contains("notValid")) {
        input.classList.remove("notValid");
      }
      input.classList.add("valid");
      this.setState({ secretValid: "True" }, () => {
        if (
          this.state.secretValid === "True" &&
          this.state.emailValid === "True"
        ) {
          button.disabled = "";
        }
      });
    }

    return;
  };

  doGenerate = () => {
    console.log("here");
    this.setState({ email: this.emailRef.current.value });

    if (this.state.secretValid === "True") {
      this.setState(
        { secret: this.secretRef.current.value.toUpperCase() },
        this.getCode
      );
    }
  };

  componentDidMount() {
    this.getCode();
    const button = document.getElementById("generateButton");
    button.disabled = "disabled";
  }
  componentWillUnmount() {
    if (this.state.timerId !== 0) {
      clearInterval(this.state.timerId);
    }
    if (this.state.intervalId !== 0) {
      clearInterval(this.state.intervalId);
    }
  }
  render() {
    let passClass1 = "";
    passClass1 =
      this.state.secretLength === "True" ? "fontValid" : "fontNotValid";
    let passClass2 = "";
    passClass2 =
      this.state.secretChars === "True" ? "fontValid" : "fontNotValid";
    return (
      <div className="totpBody">
        <a href="/">
          {" "}
          <i class="arrows fas fa-chevron-left fa-5x"></i>
        </a>
        <table className="codeTable">
          <tbody>
            <tr className="codeHeading">
              <th>PREV TOTP Code</th>
              <th>TOTP Code </th>
              <th>NEXT TOTP Code </th>
            </tr>
            <tr className="codeCode">
              <td>{this.state.totpCodePrev}</td>
              <td>{this.state.totpCode}</td>
              <td>{this.state.totpCodeNext}</td>
            </tr>
            <tr className="codeTimer">
              <td>{this.state.timer}</td>
              <td>{this.state.timer}</td>
              <td>{this.state.timer}</td>
            </tr>
          </tbody>
        </table>

        <div className="infoBody">
          <div className="infoLeft">
            <input
              ref={this.emailRef}
              onChange={this.checkEmail}
              placeholder="Email"
              className="emailInput notValid"
            ></input>{" "}
            <br></br>
            <input
              ref={this.secretRef}
              onChange={this.checkSecret}
              placeholder="Secret"
              className="secretInput notValid"
            ></input>{" "}
            <br></br>
            <div className="secretReqs">
              <div className={passClass1}>
                Secret length multiple of 8 (8,16,24...)
              </div>
              <div className={passClass2}>
                Secret only contains letters a-z and number 2-7 (INCLUSIVE){" "}
              </div>
            </div>
            <button id="generateButton" onClick={this.doGenerate}>
              {" "}
              Generate{" "}
            </button>
          </div>

          <div className="infoRight">
            <div className="currentTitle"> Current </div>
            <div className="currentInfo currentEmail">
              <div className="currentInfoTitle"> Email </div>
              <p> {this.state.email} </p>
            </div>
            <div className="currentInfo currentSecret">
              <div className="currentInfoTitle"> Secret </div>
              <p> {this.state.secret} </p>
            </div>

            <div className="qrCodeWrapper">
              <div id="qrcode">
                {" "}
                <QRCode
                  renderAs="svg"
                  height="85%"
                  width="85%"
                  x="0"
                  value={`otpauth://totp/Provider1:${this.state.email}?secret=${this.state.secret}&issuer=Provider1`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Totp;
