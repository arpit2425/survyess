import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import formFields from "./formFields";
import * as actions from "./../../actions";

function SurveyFormReview({ onCancel, formValues, submitSurvey }) {
  const reviewFields = _.map(formFields, (fields) => {
    return (
      <div key={fields.name}>
        <label>{fields.label}</label>
        <div>{formValues[fields.name]}</div>
      </div>
    );
  });
  return (
    <div>
      <h3>Confirm entries</h3>

      {reviewFields}
      <button
        onClick={onCancel}
        className="yellow darken-3 white-text btn-flat"
      >
        Back
      </button>
      <button
        onClick={() => submitSurvey(formValues)}
        className="green btn-flat white-text right"
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values,
  };
}
export default connect(mapStateToProps)(SurveyFormReview);
