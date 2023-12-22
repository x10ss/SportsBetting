class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Ticket: { TicketItems: [], Wager: 1, TotalOdds: 1, Gain: 1 }
    };
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-8">
          <TimeMachine
            update={() => {
              this.props.update();
            }}
            updateLoading={this.props.updateLoading}
            list={this.props.list}
          />
          <hr />

          {this.props.list.Sublists.map((sublistGroup, sublistGroupIndex) => (
            <div key={"sublistGroup" + sublistGroupIndex}>
              {sublistGroup[0].SportID == 0 ? null : (
                <h3 style={{ marginLeft: "20px" }}>
                  {sublistGroup[0].SportName.toUpperCase()}
                </h3>
              )}
              <div>
                {sublistGroup.map(sublist => (
                  <div
                    key={"sublist" + sublist.SublistID}
                    className={
                      sublist.Events.every(x => x.Outcome != null)
                        ? "panel panel-success"
                        : "panel panel-primary"
                    }
                  >
                    <div className="panel-heading">
                      <div className="row">
                        <div className="col-md-4 col-sm-10 col-xs-10">
                          <p>
                            <span
                              className={
                                sublist.Events.every(x => x.Outcome != null)
                                  ? "glyphicon glyphicon-lock"
                                  : "glyphicon glyphicon-pushpin"
                              }
                            />{" "}
                            {sublist.Name}
                          </p>
                        </div>
                        <div className="col-md-2 col-sm-2 col-xs-2">Time</div>
                        {sublistGroup[0].SportID < 4 ? (
                          <div className="text-center">
                            <div className="col-md-1 col-sm-2 col-xs-2">1</div>
                            <div className="col-md-1 col-sm-2 col-xs-2">X</div>
                            <div className="col-md-1 col-sm-2 col-xs-2">2</div>
                            <div className="col-md-1 col-sm-2 col-xs-2">1X</div>
                            <div className="col-md-1 col-sm-2 col-xs-2">X2</div>
                            <div className="col-md-1 col-sm-2 col-xs-2">12</div>
                          </div>
                        ) : (
                          <div className="text-center">
                            <div className="col-md-1 col-sm-2 col-xs-2">1</div>
                            <div className="col-md-1 col-sm-2 col-xs-2">2</div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="panel-body">
                      {sublist.Events.map((event, index) => (
                        <div
                          key={"event" + event.EventID}
                          className="row"
                          style={{
                            backgroundColor: event.Outcome
                              ? index % 2 == 0
                                ? "#bfdebf"
                                : "#dff0d8"
                              : index % 2 == 0
                                ? "Lavender"
                                : "White"
                          }}
                        >
                          <div className="col-md-4 col-sm-10 col-xs-10">
                            <small>
                              {event.Outcome ? (
                                <span className="glyphicon glyphicon-lock" />
                              ) : null}
                              {event.EventID + ". " + event.Name}
                              {event.Outcome ? (
                                <b>( {event.Outcome} )</b>
                              ) : null}
                            </small>
                          </div>
                          <div className="col-md-2 col-sm-2 col-xs-2">
                            <small>
                              {new Date(event.Time)
                                .toLocaleTimeString()
                                .split(":")[0] +
                                ":" +
                                new Date(event.Time)
                                  .toLocaleTimeString()
                                  .split(":")[1]}
                            </small>
                          </div>
                          {event.Bets.map(
                            (bet, index) =>
                              bet.Mark == 2 &&
                              index == 1 &&
                              sublist.SportID == 0 ? (
                                <div key={"bet" + bet.BetID}>
                                  <div className="col-md-1 col-sm-2 col-xs-2" />
                                  <div className="col-md-1 col-sm-2 col-xs-2">
                                    <button
                                      disabled={
                                        event.Outcome || bet.Odds < 1.05
                                      }
                                      onClick={() =>
                                        this.onBetSelected(bet, event)
                                      }
                                      className={
                                        event.Outcome
                                          ? bet.Mark == event.Outcome
                                            ? "btn btn-xs btn-bet btn-default"
                                            : "btn btn-xs btn-bet"
                                          : this.state.Ticket.TicketItems.some(
                                              x => {
                                                return x.BetID == bet.BetID;
                                              }
                                            )
                                            ? "btn btn-xs btn-bet btn-success"
                                            : "btn btn-xs btn-bet  btn-info"
                                      }
                                    >
                                      {bet.Odds < 1.05
                                        ? "-"
                                        : bet.Odds.toFixed(2)}
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  key={"bet" + bet.BetID}
                                  className="col-md-1 col-sm-2 col-xs-2"
                                >
                                  <button
                                    disabled={event.Outcome || bet.Odds < 1.05}
                                    onClick={() =>
                                      this.onBetSelected(bet, event)
                                    }
                                    className={
                                      event.Outcome
                                        ? bet.Mark == event.Outcome
                                          ? "btn btn-xs btn-bet btn-default"
                                          : "btn btn-xs btn-bet"
                                        : this.state.Ticket.TicketItems.some(
                                            x => {
                                              return x.BetID == bet.BetID;
                                            }
                                          )
                                          ? "btn btn-xs btn-bet  btn-success"
                                          : "btn btn-xs btn-bet  btn-info"
                                    }
                                  >
                                    {bet.Odds < 1.05
                                      ? "-"
                                      : bet.Odds.toFixed(2)}
                                  </button>
                                </div>
                              )
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <hr />
            </div>
          ))}
        </div>
        <div className="col-md-4">
          <div className="ticket">
            <div className="panel panel-default">
              <div className="panel-body">
                <div>
                  <h3>
                    <span className="glyphicon glyphicon-paperclip" /> Your
                    bets:
                  </h3>
                  {this.state.Ticket.TicketItems.length == 0 ? (
                    <div className="row">
                      <div className="col-md-12">
                        <i>no bets selected...</i>
                        <hr />
                      </div>
                    </div>
                  ) : (
                    <ul className="ticket-items list-group">
                      {this.state.Ticket.TicketItems.map((bet, index) => (
                        <li
                          key={"ticketItem" + index}
                          title="remove item"
                          style={{ cursor: "pointer" }}
                          className="list-group-item"
                        >
                          <div
                            className="row"
                            onClick={() => this.removeItem(bet.BetID)}
                          >
                            <div className="col-md-2 col-sm-2 col-xs-2">
                              <small>
                                <b>{bet.EventID}</b>
                              </small>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-6">
                              <small>{bet.Name}</small>
                            </div>
                            <div className="col-md-2 col-sm-2 col-xs-2">
                              <small>
                                <b>{bet.Mark.toUpperCase()}</b>
                              </small>
                            </div>
                            <div className="col-md-2 col-sm-2 col-xs-2">
                              <small>{bet.Odds.toFixed(2)}</small>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="row">
                    <div className="col-md-8 col-sm-8 col-xs-8">
                      <div className="input-group">
                        <span className="input-group-addon">
                          <b>Wager:</b>
                        </span>
                        <input
                          value={this.state.Ticket.Wager}
                          onBlur={() => this.formatWager()}
                          onChange={ev => this.onWagerChange(ev)}
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
                          this.validateSpecialBet() ||
                          !this.state.Ticket.Wager ||
                          this.state.Ticket.TicketItems.length < 1 ||
                          Number(this.state.Ticket.Wager) >
                            Number(this.props.saldo) ||
                          isNaN(Number(this.state.Ticket.Wager))
                        }
                        onClick={() => this.submitTicket()}
                        className="btn btn-info"
                      >
                        <small>SUBMIT</small>
                      </button>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-md-6">
                      Total Odds:{" "}
                      <span
                        style={{ width: "100%", backgroundColor: "#5bc0de" }}
                        className="badge"
                      >
                        {Number(this.state.Ticket.TotalOdds).toFixed(2)}
                      </span>
                    </div>
                    <div className="col-md-6">
                      Gain:{" "}
                      <span
                        style={{ width: "100%", backgroundColor: "#5bc0de" }}
                        className="badge"
                      >
                        {isNaN(Number(this.state.Ticket.Gain))
                          ? 0
                          : Number(this.state.Ticket.Gain).toFixed(2)}{" "}
                        &euro;
                      </span>
                    </div>
                  </div>
                  <hr />
                  {this.state.Success ? (
                    <div
                      className={
                        this.state.MessageType
                          ? "alert alert-success"
                          : "alert alert-danger"
                      }
                      id="success-alert"
                      role="alert"
                    >
                      {this.state.MessageType ? (
                        <span>
                          <strong>Success!</strong> Your ticket was successfully
                          submitted and stored into your history.
                        </span>
                      ) : (
                        <span>
                          <strong>Fail!</strong> Something went wrong with your
                          ticket submission.
                        </span>
                      )}
                    </div>
                  ) : null}
                  {this.validateSpecialBet() ? (
                    <div className="alert alert-danger" role="alert">
                      <strong>Special bet:</strong> you need to play 5 bets with
                      odds 1.1 and above.
                    </div>
                  ) : null}
                  {Number(this.state.Ticket.Wager) >
                  Number(this.props.saldo) ? (
                    <div className="alert alert-danger" role="alert">
                      <strong>Insufficient funds:</strong> deposit to your
                      account
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  validateSpecialBet() {
    var TicketItems = this.state.Ticket.TicketItems.slice();
    if (TicketItems.some(x => x.OriginalEventID)) {
      var normalBets = TicketItems.filter(
        x => x.OriginalEventID == null && x.Odds >= 1.1
      );
      return normalBets.length < 5;
    } else return false;
  }
  removeItem(betID) {
    var Ticket = Object.assign({}, this.state.Ticket);
    var TicketItems = Ticket.TicketItems.slice();

    TicketItems = TicketItems.filter(x => x.BetID != betID);

    this.calcGain(this.state.wager, TicketItems);
  }
  onWagerChange(ev) {
    var SelectedBets = this.state.Ticket.TicketItems.slice();

    this.calcGain(ev.target.value, SelectedBets);
  }
  formatWager() {
    var Ticket = Object.assign({}, this.state.Ticket);
    Ticket.Wager = isNaN(Number(Ticket.Wager))
      ? 0.0
      : Number(Ticket.Wager).toFixed(2);
    this.setState({ Ticket });
  }
  submitTicket() {
    var uri = "http://localhost:50287/ticket";
    var self = this;
    var data = this.state.Ticket;
    self.props.updateLoading(true);
    this.setState({ Success: false });
    $.ajax({
      type: "POST",
      url: uri,
      data: data,
      success: function(data, status) {
        self.setState({
          Ticket: { TicketItems: [], Wager: 1, TotalOdds: 1, Gain: 1 },
          Success: true,
          MessageType: true
        });

        self.props.updateLoading(false);
        self.props.updateSaldo();
        $("#success-alert")
          .fadeTo(2000, 500)
          .slideUp(500, function() {
            $("#success-alert").slideUp(500);
          });
      },
      error: function() {
        self.setState({ Success: true, MessageType: false });
        self.props.updateLoading(false);
      }
    });
  }
  onBetSelected(bet, event) {
    var Ticket = Object.assign({}, this.state.Ticket);
    var SelectedBets = Ticket.TicketItems.slice();

    if (SelectedBets.some(x => x.BetID == bet.BetID)) {
      SelectedBets = SelectedBets.filter(x => x.BetID != bet.BetID);
    } else if (
      SelectedBets.some(x => x.EventID == bet.EventID) ||
      SelectedBets.some(x => x.OriginalEventID == bet.EventID) ||
      SelectedBets.some(x => x.EventID == bet.OriginalEventID)
    ) {
      SelectedBets = SelectedBets.filter(
        x =>
          x.EventID != bet.EventID &&
          x.OriginalEventID != bet.EventID &&
          x.EventID != bet.OriginalEventID
      );
      bet.Name = event.Name;
      SelectedBets.push(bet);
    } else {
      bet.Name = event.Name;
      SelectedBets.push(bet);
    }
    if (SelectedBets.some(x => x.OriginalEventID && bet.OriginalEventID)) {
      SelectedBets = SelectedBets.filter(x => x.OriginalEventID == null);
      bet.Name = event.Name;
      SelectedBets.push(bet);
    }
    this.calcGain(Ticket.Wager, SelectedBets);
  }
  calcGain(wager, bets) {
    var self = this;
    var Ticket = Object.assign({}, self.state.Ticket);
    Ticket.Wager = wager;

    var TotalOdds = 1;
    bets.forEach(x => (TotalOdds *= x.Odds.toFixed(2)));
    Ticket.TotalOdds = TotalOdds.toFixed(2);
    Ticket.TicketItems = bets;
    Ticket.Gain = 0.95 * TotalOdds.toFixed(2) * Number(Ticket.Wager).toFixed(2);

    this.setState({ Ticket });
  }
}
