import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ScholarshipDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3000/api/details/${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setData(res.data);
        } else {
          setError(res.message || "Not found");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(`Error fetching scholarship details ${err}`);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!data) return null;

  return (
    <div className="container mt-4">
      <h2>{data.name}</h2>
      <p>{data.description || "No description available."}</p>
      <p>
        <strong>Course:</strong> {data.course || "N/A"}
      </p>
      <p>
        <strong>Minimum GPA:</strong> {data.gpa != null ? data.gpa : "N/A"}
      </p>
      <p>
        <strong>Minimum Award:</strong> {data.award || "N/A"}
      </p>
      <a
        href={data.link}
        className="btn btn-primary"
        target="_blank"
        rel="noopener noreferrer"
      >
        Go to Website
      </a>
    </div>
  );
};

export default ScholarshipDetailsPage;
