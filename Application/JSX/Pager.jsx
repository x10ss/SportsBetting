class Pager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    var indents = [];
    var numberOfPages = Math.ceil(this.state.NumberOfItems / 10);
    for (let i = 0; i < numberOfPages; i++) {
      indents.push(
        <li
          key={"page" + i}
          onClick={() => this.getPage(i + 1)}
          className={this.state.Active == i + 1 ? "active" : null}
        >
          <a>
            {i + 1} <span className="sr-only" />
          </a>
        </li>
      );
    }

    return (
      <ul style={{ cursor: "pointer" }} className="pagination">
        <li
          className={this.state.Active == 1 ? "disabled" : null}
          onClick={
            this.state.Active == 1
              ? null
              : () => {
                  this.getPage(this.state.Active - 1);
                }
          }
        >
          <a aria-label="Previous">
            <span>&laquo;</span>
          </a>
        </li>
        {indents}
        <li
          className={this.state.Active == numberOfPages ? "disabled" : null}
          onClick={
            this.state.Active == numberOfPages
              ? null
              : () => {
                  this.getPage(this.state.Active + 1);
                }
          }
        >
          <a aria-label="Next">
            <span>&raquo;</span>
          </a>
        </li>
      </ul>
    );
  }
  componentWillMount() {
    this.getPage(1);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.refresh != prevProps.refresh)
      this.getPage(this.state.Active);
  }
  getPage(page) {
    var self = this;
    self.props.updateLoading(true);
    $.ajax({
      type: "GET",
      url: self.props.uri + "?pageNumber=" + page,
      success: function(data, status) {
        self.props.updateLoading(false);
        self.setState({
          Active: page,
          NumberOfItems: data.ItemsCount
        });
        self.props.pageUpdate(page);
        self.props.update(data.PagedItems);
      },
      error: function(data, status) {
        self.props.updateLoading(false);
      }
    });
  }
}
