class TimeMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    var listTime = new Date(this.props.list.Time);
    var listHours =
      listTime.getHours() + (listTime.getMinutes() == 30 ? 0.5 : 0);
    var listPercentage =
      listTime.getDate() != new Date(this.props.list.Date).getDate()
        ? 100
        : listHours / 24 * 100;
    return (
      <div className="panel panel-info">
        <div className="panel-heading">
          <div className="row">
            <div className="col-md-9 col-sm-12 col-xs-12">
              <div className="progress">
                <div
                  className={
                    new Date(this.props.list.Time).getDate() !=
                    new Date(this.props.list.Date).getDate()
                      ? "progress-bar progress-bar-primary"
                      : "progress-bar progress-bar-info progress-bar-striped active"
                  }
                  role="progressbar"
                  aria-valuenow="60"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: listPercentage + "%" }}
                >
                  <span className="glyphicon glyphicon-time" />{" "}
                  {new Date(this.props.list.Time).toLocaleTimeString()}
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-12 col-xs-12">
              <div className="btn-group" style={{ width: "100%" }} role="group">
                <button
                  disabled={
                    new Date(this.props.list.Time).getDate() !=
                    new Date(this.props.list.Date).getDate()
                  }
                  style={{ width: "33%" }}
                  title="Play next event time"
                  className="btn btn-xs btn-info"
                  onClick={() => this.endEvents()}
                >
                  <span className="glyphicon glyphicon-play" />
                </button>
                <button
                  style={{ width: "33%" }}
                  title="Finish events instantly"
                  disabled={
                    new Date(this.props.list.Time).getDate() !=
                    new Date(this.props.list.Date).getDate()
                  }
                  className="btn btn-xs btn-info"
                  onClick={() => this.flashEndEvents()}
                >
                  <span className="glyphicon glyphicon-flash" />
                </button>
                <button
                  style={{ width: "33%" }}
                  title="Generate a new betting list"
                  className="btn btn-xs btn-primary"
                  onClick={() => this.generate()}
                >
                  <span className="glyphicon glyphicon-repeat" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {}

  endEvents() {
    var uri = "http://localhost:50287/end";

    var self = this;
    this.setState({ Loading: true });

    $.ajax({
      type: "GET",
      url: uri,
      success: function(data, status) {
        self.setState({ Loading: false });
        self.props.update();
      },
      error: function(data, status) {
        alert();
        self.setState({ Loading: false });
      }
    });
  }

  flashEndEvents() {
    var uri = "http://localhost:50287/flashend";

    var self = this;
    this.props.updateLoading(true);

    $.ajax({
      type: "GET",
      url: uri,
      success: function(data, status) {
        self.props.updateLoading(false);
        self.props.update();
      },
      error: function(data, status) {
        alert();
        self.props.updateLoading(false);
      }
    });
  }

  generate() {
    var uri = "http://localhost:50287/generate";

    var self = this;
    this.props.updateLoading(true);
    $.ajax({
      type: "GET",
      url: uri,
      success: function(data, status) {
        self.props.updateLoading(false);
        self.props.update();
      },
      error: function(data, status) {
        alert("error");

        self.props.updateLoading(false);
      }
    });
  }
}
