import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions/index";
export class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }
  renderSurveys() {
    return this.props.surveys.reverse().map((su) => {
      return (
        <div class="card blue-grey darken-1 col s12 m6" key={su._id}>
          <div class="card-content white-text">
            <span class="card-title">{su.title}</span>
            <p>{su.body}</p>
            <p className="right">
              Sent On :{new Date(su.dateSend).toLocaleDateString()}
            </p>
          </div>
          <div>
            <div class="card-action">
              <a>Yes:{su.yes}</a>
              <a>No : {su.no}</a>
            </div>
          </div>
        </div>
      );
    });
  }
  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}
function mapStateToProps(state) {
  return { surveys: state.surveys };
}
const mapDispachToProps = (dispatch) => {
  return {
    fetchSurveys: () => dispatch(fetchSurveys()),
  };
};
export default connect(mapStateToProps, mapDispachToProps)(SurveyList);
