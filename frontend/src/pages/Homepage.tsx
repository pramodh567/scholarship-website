import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";

interface Scholarship {
  _id: string;
  name: string;
  link: string;
  gpa: string;
  award: string;
  deadline: string;
}

const Homepage: React.FC = () => {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    const url = searchQuery
      ? `http://localhost:3000/api/details?search=${encodeURIComponent(
          searchQuery
        )}`
      : "http://localhost:3000/api/details";

    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setScholarships(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching scholarships:", err);
        setLoading(false);
      });
  }, [searchQuery]);

  return (
    <Container className="mt-4">
      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row className="g-4">
          {scholarships.map((scholarship) => (
            <Col key={scholarship._id} xs={12} sm={6} md={4}>
              <a
                href={scholarship.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-dark"
              >
                <Card className="h-100 shadow-sm p-3">
                  <Card.Body>
                    <Card.Title className="fw-bold">
                      {scholarship.name}
                    </Card.Title>
                    <Card.Text>
                      <strong>Award:</strong> {scholarship.award}
                      <br />
                      <strong>GPA:</strong> {scholarship.gpa}
                      <br />
                      <strong>Deadline:</strong> {scholarship.deadline}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </a>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Homepage;
