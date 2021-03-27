import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

const FullView = ({ id, data }) => {
  const allIssues = data.map((item) => item.issues).flat();
  const issue = allIssues.find((item) => id === item.id);

  return (
    <div className="fullView">
      <h2 className="fullViewTitle">{issue.name}</h2>
      <Link to="/" className="close" />
      <p className="fullViewPar">
        {issue.desc}
      </p>
    </div>
  );
};
export default FullView;
