class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Payement: "",
      Active: location.hash === "#ticket-history" ? 2 : 1
    };
  }
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
              aria-expanded="false"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <a className="navbar-brand">
              <i>
                <u>
                  Sports<span className="glyphicon glyphicon-star-empty" />Forecast
                </u>
              </i>
            </a>
          </div>

          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav">
              <li
                onClick={() => {
                  this.setState({ Active: 1 });
                }}
                className={this.state.Active == 1 ? "active" : null}
              >
                <a href="#betting-list">
                  <span className="glyphicon glyphicon-pencil" /> Betting
                </a>
              </li>
              <li
                onClick={() => {
                  this.setState({ Active: 2 });
                }}
                className={this.state.Active == 2 ? "active" : null}
              >
                <a href="#ticket-history">
                  <span className="glyphicon glyphicon-list-alt" /> History
                </a>
              </li>
              <li className="dropdown">
                <a
                  href="#"
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="glyphicon glyphicon-user" /> Account
                  <span className="caret" />
                </a>
                <ul className="dropdown-menu" style={{ width: "400px" }}>
                  <li>
                    <span style={{ float: "right", marginRight: "5px" }}>
                      Balance:{" "}
                      <span className="badge">
                        {Number(this.props.saldo).toFixed(2)} &euro;
                      </span>
                    </span>
                  </li>

                  <li role="separator" className="divider" />
                  <li>
                    <small style={{ marginLeft: "10px" }}>
                      Amount to deposit:
                    </small>
                  </li>
                  <li>
                    <div className="row">
                      <div className="col-md-8 col-sm-8 col-xs-8">
                        <div
                          style={{ marginLeft: "10px" }}
                          className="input-group"
                        >
                          <input
                            value={this.state.Payement}
                            onChange={ev =>
                              this.setState({ Payement: ev.target.value })
                            }
                            onBlur={() => this.formatPayement()}
                            type="text"
                            className="form-control"
                            aria-describedby="basic-addon3"
                          />
                          <span className="input-group-addon">
                            <b>&euro;</b>
                          </span>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-4 col-xs-4">
                        <button
                          disabled={
                            !this.state.Payement ||
                            this.state.Payement == "0" ||
                            isNaN(Number(this.state.Payement))
                          }
                          onClick={() => this.deposit()}
                          style={{ width: "90%", marginLeft: "7px" }}
                          className="btn btn-sm btn-info"
                        >
                          OK
                        </button>
                      </div>{" "}
                    </div>
                  </li>

                  <li role="separator" className="divider" />
                </ul>
              </li>
              {this.state.Success ? (
                <li>
                  <div
                    style={{ marginBottom: "0px", padding: "6px" }}
                    className="alert alert-success"
                    id="payement-success-alert"
                    role="alert"
                  >
                    <strong>Success!</strong> {this.state.Payement} &euro;
                    deposited.
                  </div>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
  deposit() {
    var uri = "http://localhost:50287/deposit";
    var self = this;
    var data = { Difference: this.state.Payement };

    this.props.updateLoading(true);
    this.setState({ Success: false });
    $.ajax({
      type: "POST",
      url: uri,
      data: data,
      success: function() {
        self.props.updateLoading(false);
        self.setState({ Success: true });
        self.props.update();
        $("#payement-success-alert")
          .fadeTo(2000, 500)
          .slideUp(500, function() {
            $("#payement-success-alert").slideUp(500);
          });
      },
      error: function() {
        alert("error");
        self.props.updateLoading(false);
      }
    });
  }
  formatPayement() {
    var Payement = this.state.Payement;
    Payement = isNaN(Number(Payement)) ? 0.0 : Number(Payement).toFixed(2);
    this.setState({ Payement });
  }
}
