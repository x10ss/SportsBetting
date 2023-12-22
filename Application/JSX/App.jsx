class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      List: { Time: new Date(), Sublists: [] },
      Stats: {}
    };
  }
  render() {
    return (
      <div className="container">
        <Navigation
          updateLoading={isOn => this.updateLoading(isOn)}
          update={() => this.getSaldo()}
          saldo={this.state.Saldo}
        />
        <div id="app-main-component" />
        {this.state.Loading ? (
          <div className="loading">Loading&#8230;</div>
        ) : null}
        <Footer />
      </div>
    );
  }

  componentDidMount() {
    this.locationHashChanged();
    this.getList();
    this.setState({ MainLoad: true });

    window.onhashchange = () => this.locationHashChanged();
  }
  locationHashChanged() {
    var component;
    if (location.hash === "#betting-list" || location.hash === "") {
      component = (
        <List
          updateSaldo={() => this.getSaldo()}
          update={() => this.getList()}
          list={this.state.List}
          updateLoading={isOn => this.updateLoading(isOn)}
          saldo={this.state.Saldo}
        />
      );
    } else if (location.hash === "#ticket-history") {
      component = (
        <History
          update={() => this.getList()}
          stats={this.state.Stats}
          updateLoading={isOn => this.updateLoading(isOn)}
          list={this.state.List}
        />
      );
    }

    ReactDOM.render(component, document.getElementById("app-main-component"));
  }
  componentDidUpdate() {
    this.locationHashChanged();
  }
  updateLoading(isOn) {
    if (!this.state.MainLoad) this.setState({ Loading: isOn });
  }
  getList() {
    var uri = "http://localhost:50287/list";
    var self = this;
    this.setState({ Loading: true });
    $.ajax({
      type: "GET",
      url: uri,
      success: function(data, status) {
        self.setState({ List: data });
        self.getSaldo();
      },
      error: function(data, status) {
        alert();
        self.setState({ Loading: false });
      }
    });
  }
  getSaldo() {
    var self = this;
    var uri = "http://localhost:50287/saldo";
    this.setState({ Loading: true });
    $.ajax({
      type: "GET",
      url: uri,
      success: function(data, status) {
        self.setState({ Saldo: data });
        self.locationHashChanged();

        self.getStats();
      },
      error: function(data, status) {
        alert();
        self.setState({ Loading: false });
      }
    });
  }
  getStats() {
    var uri = "http://localhost:50287/stats";
    var self = this;
    this.setState({ Loading: true });
    $.ajax({
      type: "GET",
      url: uri,
      success: function(data, status) {
        self.setState({ Stats: data, Loading: false, MainLoad: false });
      },
      error: function(data, status) {
        alert();
        self.setState({ Loading: false });
      }
    });
  }
}

ReactDOM.render(<App />, document.getElementById("content"));
