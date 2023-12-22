class History extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Stats: {},
      PagedItems: [],
      Loading: false
    };
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-8">
          <TimeMachine
            update={() => {
              this.props.update();
              this.setState({ Time: new Date() });
            }}
            updateLoading={this.props.updateLoading}
            list={this.props.list}
          />
          <hr />
          {this.state.PagedItems.map((x, index) => (
            <div key={"Ticket" + index}>
              <div className="panel panel-primary">
                <div className="panel-heading">
                  <h3 className="panel-title" style={{ fontSize: "24px" }}>
                    <div className="row">
                      <div className="col-md-6 col-sm-6 col-xs-6 text-left">
                        <small
                          style={{ color: "white" }}
                          className="glyphicon glyphicon-calendar"
                        />{" "}
                        <small style={{ color: "white" }}>
                          {new Date(x.Date).toLocaleString()}
                        </small>
                      </div>
                      <div className="col-md-6 col-sm-6 col-xs-6 text-right">
                        <span className="ticket-barcode">No.:{x.TicketID}</span>
                      </div>
                    </div>
                  </h3>
                </div>
                <div className="panel-body">
                  <div>
                    <div
                      className={
                        x.Status == 0
                          ? "panel panel-info"
                          : x.Status == 1
                            ? "panel panel-success"
                            : "panel panel-danger"
                      }
                    >
                      <div className="panel-heading">
                        <span className="panel-title">
                          {x.Status == 0 ? null : x.Status == 1 ? (
                            <span className="glyphicon glyphicon-ok" />
                          ) : (
                            <span className="glyphicon glyphicon-remove" />
                          )}{" "}
                          <u>wager:</u> <b>{x.Wager.toFixed(2)}</b> &euro; |{" "}
                          <u>total odds:</u>
                          <b> {x.TotalOdds.toFixed(2)}</b> | <u>gain:</u>{" "}
                          <b>{x.Gain.toFixed(2)}</b> &euro;
                          <b style={{ float: "right" }}>
                            {x.Status == 0 ? null : x.Status == 1 ? (
                              <b>+ {x.Gain.toFixed(2)} &euro;</b>
                            ) : (
                              <b>- {x.Wager.toFixed(2)} &euro;</b>
                            )}
                          </b>
                        </span>
                      </div>
                      <div className="panel-body">
                        {x.TicketItems.map((y, tItemIndex) => (
                          <div
                            key={"ticketItem" + tItemIndex}
                            className="row"
                            style={{
                              backgroundColor:
                                index % 2 == 0 ? "Lavender" : "White"
                            }}
                          >
                            <div className="col-md-5 col-sm-4 col-xs-4">
                              {" "}
                              {y.Status == 0 ? null : y.Status == 1 ? (
                                <span className="glyphicon glyphicon-ok" />
                              ) : (
                                <span className="glyphicon glyphicon-remove" />
                              )}{" "}
                              {y.EventID}. {y.Name}{" "}
                              {y.Outcome ? <b>( {y.Outcome} )</b> : null}
                            </div>
                            <div className="col-md-1 col-sm-2 col-xs-2">
                              {new Date(y.Time)
                                .toLocaleTimeString()
                                .split(":")[0] +
                                ":" +
                                new Date(y.Time)
                                  .toLocaleTimeString()
                                  .split(":")[1]}
                            </div>
                            <div className="col-md-5 col-sm-4 col-xs-4">
                              {y.Mark} - {this.markSwitch(y.Mark)}
                            </div>

                            <div className="col-md-1 col-sm-2 col-xs-2">
                              {y.Odds.toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          ))}

          <div className="center-block" style={{ width: "fit-content" }}>
            <Pager
              refresh={this.state.Time}
              uri="http://localhost:50287/tickets"
              update={PagedItems => this.setState({ PagedItems })}
              pageUpdate={data => this.setState({ Page: data })}
              updateLoading={this.props.updateLoading}
            />
          </div>
          {this.state.Loading ? (
            <div className="loading">Loading&#8230;</div>
          ) : null}
        </div>
        <div className="col-md-4">
          <div>
            <ul className="list-group">
              {" "}
              <li className="list-group-item">
                <h3>Stats:</h3>
              </li>
              <li className="list-group-item">
                Total winnings:{" "}
                <span className="badge">
                  {this.props.stats.TotalMoneyWon
                    ? this.props.stats.TotalMoneyWon.toFixed()
                    : 0}{" "}
                  &euro;
                </span>
              </li>
              <li className="list-group-item">
                Total tickets wager:{" "}
                <span className="badge">
                  {this.props.stats ? this.props.stats.TotalMoneyLost : 0}{" "}
                  &euro;
                </span>
              </li>
              <li className="list-group-item">
                No. of tickets Played:{" "}
                <span className="badge">{this.props.stats.TicketsPlayed}</span>
              </li>
              <li className="list-group-item">
                No. of tickets Won:{" "}
                <span className="badge">{this.props.stats.TicketsWon}</span>
              </li>
              <li className="list-group-item">
                No. of tickets Lost:{" "}
                <span className="badge">{this.props.stats.TicketsLost}</span>
              </li>
              <li className="list-group-item">
                No. of waiting tickets:{" "}
                <span className="badge">
                  {this.props.stats.TicketsNotPlayed}
                </span>
              </li>
              <li className="list-group-item">
                No. of bet hits:{" "}
                <span className="badge">{this.props.stats.BetsWon}</span>
              </li>
              <li className="list-group-item">
                No. of bet misses:{" "}
                <span className="badge">{this.props.stats.BetsLost}</span>
              </li>
              <li className="list-group-item">
                No. of waiting bets:{" "}
                <span className="badge">{this.props.stats.BetsNotPlayed}</span>
              </li>
              <li className="list-group-item">
                Largest odds hit:{" "}
                <span className="badge">
                  {this.props.stats.BiggestOddsWon
                    ? this.props.stats.BiggestOddsWon.toFixed(2)
                    : null}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  markSwitch(mark) {
    switch (mark) {
      case "1":
        return "Home win";
        break;
      case "2":
        return "Away win";
        break;
      case "x":
        return "Draw";
        break;
      case "1x":
        return "Home win / Draw";
        break;
      case "x2":
        return "Draw / Away win";
        break;
      case "12":
        return "Home win / Away win";
        break;
    }
  }
}
