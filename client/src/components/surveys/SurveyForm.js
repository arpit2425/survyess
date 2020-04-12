import { reduxForm, Field } from "redux-form";
import React, { Component } from "react";
import SurveyField from "./SurveyField";
import { Link } from "react-router-dom";
import _ from "lodash";
const FIELDS = [
  { label: "Survey Title", name: "title" },
  { label: "Subject Line", name: "Subject" },
  { label: "Email Body", name: "body" },
  { label: "Recipient List", name: "emails" },
];
class SurveyForm extends Component {
  renderFields() {
    return _.map(FIELDS, (field) => {
      return (
        <Field
          key={field.name}
          label={field.label}
          type="text"
          name={field.name}
          component={SurveyField}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit((values) => console.log(values))}
        >
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}
function validate(values) {
  const errors = {};
  _.each(FIELDS, ({ name }) => {
    if (!values[name]) {
      errors[name] = "Must provide a value";
    }
  });

  return errors;
}
export default reduxForm({
  validate,
  form: "surveyForm",
})(SurveyForm);
