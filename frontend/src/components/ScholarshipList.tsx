import React from "react";

interface Scholarship {
  _id: string;
  name: string;
  description?: string;
  link: string;
}

interface Props {
  paginatedResults: Scholarship[];
}

const ScholarshipList: React.FC<Props> = ({ paginatedResults }) => {
  return (
    <>
      {paginatedResults.map((item) => (
        <div key={item._id} className="card mb-2">
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <p className="card-text">
              {item.description || "No description available."}
            </p>
            <a
              href={item.link}
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              View
            </a>
          </div>
        </div>
      ))}
    </>
  );
};

export default ScholarshipList;
