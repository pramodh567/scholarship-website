import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SuggestionsPage = () => {
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("profile");
    if (stored) {
      setProfile(JSON.parse(stored));
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
      <h3>Suggestions Based on Your Profile</h3>
      <p>
        <strong>Name:</strong> {profile.name}
      </p>
      <p>
        <strong>Course:</strong> {profile.course}
      </p>
      <p>
        <strong>GPA:</strong> {profile.gpa}
      </p>
      <p>
        <strong>Minimum Award:</strong> {profile.minAward}
      </p>
      {/* You can add logic here to filter scholarships using this profile */}
    </div>
  );
};

export default SuggestionsPage;
