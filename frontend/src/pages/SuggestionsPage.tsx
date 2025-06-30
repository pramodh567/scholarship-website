import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Scholarship {
  _id: string;
  name: string;
  link: string;
  course?: string;
  gpa?: number;
  award?: string;
  deadline: string;
}

const SuggestionsPage = () => {
  const [profile, setProfile] = useState<any>(null);
  const [, setScholarships] = useState<Scholarship[]>([]);
  const [filtered, setFiltered] = useState<Scholarship[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("profile");
    if (stored) {
      const parsed = JSON.parse(stored);
      setProfile(parsed);

      // Fetch scholarships
      fetch("http://localhost:3000/api/details")
        .then((res) => res.json())
        .then((data) => {
          setScholarships(data.data);
          const matched = data.data
            .filter((item: Scholarship) => {
              const matchGPA = item.gpa == null || parsed.gpa >= item.gpa;

              const cleanNumber = (val: string): number =>
                parseFloat(val.replace(/[^0-9.]/g, ""));

              const profileMinAward = cleanNumber(parsed.minAward);
              const scholarshipAward = cleanNumber(item.award || "");

              const matchAward =
                isNaN(profileMinAward) || isNaN(scholarshipAward)
                  ? true
                  : scholarshipAward >= profileMinAward;

              const matchCourse =
                !item.course ||
                !parsed.course ||
                item.course.toLowerCase() === parsed.course.toLowerCase();

              return matchGPA && matchAward && matchCourse;
            })
            .sort((a: Scholarship, b: Scholarship) => {
              const dateA = new Date(a.deadline).getTime() || Infinity;
              const dateB = new Date(b.deadline).getTime() || Infinity;
              return dateA - dateB;
            });

          setFiltered(matched);
        })
        .catch((err) =>
          console.error("Error fetching scholarships for suggestions:", err)
        );
    }
  }, []);

  if (!profile) {
    return (
      <div className="container mt-5 text-center">
        <h4>Profile not yet created</h4>
        <p>Please create a profile to view suggestions.</p>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/profile")}
        >
          Go to Profile Page
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3>Scholarship Suggestions for You</h3>
      {filtered.length === 0 ? (
        <p className="mt-3">No suggestions match your profile at the moment.</p>
      ) : (
        filtered.map((scholarship) => (
          <div key={scholarship._id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{scholarship.name}</h5>
              <p>
                <strong>Deadline:</strong> {scholarship.deadline || "Any"}
                <br />
                <strong>GPA:</strong>{" "}
                {scholarship.gpa != null ? scholarship.gpa : "Any"}
                <br />
                <strong>Minimum Award:</strong> {scholarship.award || "Any"}
              </p>
              <a
                href={scholarship.link}
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SuggestionsPage;
