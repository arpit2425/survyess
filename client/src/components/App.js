import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./Header";

const Dashboard = () => <h2>Dashboard</h2>;
const surveyNew = () => <h2>surveyNew</h2>;
const Landing = () => <h2>Landing</h2>;
function App() {
  return (
    <div className="container">
      <Router>
        <div>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/surveys" component={Dashboard} />
          <Route exact path="/surveys/new" component={surveyNew} />
        </div>
      </Router>
    </div>
  );
}

export default App;
