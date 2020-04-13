import React from "react";

function SurveyFormReview({ onCancel }) {
  return (
    <div>
      <h3>Confirm entries</h3>
      <button onClick={onCancel} className="yellow darken-3 btn-flat">
        Back
      </button>
    </div>
  );
}

export default SurveyFormReview;
