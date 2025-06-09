import axios from "axios";
import { useState, type ChangeEvent, type FormEvent } from "react";

interface formData {
  website: string;
  link: string;
  github?: string;
}

const CreatePage = () => {
  const [formData, setformData] = useState<formData>({
    website: "",
    link: "",
    github: "",
  });

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url); // will throw if invalid
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setformData((prevdata) => ({ ...prevdata, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidUrl(formData.link)) {
      alert("Please enter a valid Website link");
      return;
    }

    if (formData.github && !isValidUrl(formData.github)) {
      alert("Please enter a valid GitHub link");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/create",
        formData
      );
      console.log("success:", response.data);
    } catch (error) {
      console.error("submisson error", error);
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded shadow"
        style={{ minWidth: "400px" }}
      >
        <h4 className="mb-4 text-center">Submit Scholarship website Info</h4>

        <div className="mb-3">
          <label htmlFor="website" className="form-label">
            Scholarship Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="link" className="form-label">
            Link
          </label>
          <input
            type="text"
            className="form-control"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="github" className="form-label">
            GitHub Link of Scrapy parse Spider(Optional)
          </label>
          <input
            type="text"
            className="form-control"
            id="github"
            name="github"
            value={formData.github}
            onChange={handleChange}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePage;
