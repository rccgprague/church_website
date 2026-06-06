import Head from "next/head";
import { useState, useEffect } from "react";
import {
  Container, Row, Col, Card, Button, Form,
  Alert, Badge, Modal, Table
} from "react-bootstrap";
import { useUser } from "@clerk/nextjs";
import styled from "@emotion/styled";
import axios from "axios";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { loadCatalog } from "@/src/utils/lingui";
import Colors from "@/src/theme/color";
import { CommunityMember, CommunityBusiness, BUSINESS_CATEGORIES } from "@/src/types/community";

const PageWrapper = styled.div`
  background: ${Colors.graybg};
  min-height: 100vh;
  padding: 60px 0;
`;

const SectionCard = styled(Card)`
  border: none;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  margin-bottom: 24px;

  .card-body {
    padding: 32px;
  }

  h3 {
    font-size: 1.1rem;
    font-weight: 700;
    color: ${Colors.dark};
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 2px solid ${Colors.orange};
    display: inline-block;
  }
`;

const StatusBadge = styled(Badge)<{ status: string }>`
  background: ${({ status }) =>
    status === "approved"
      ? "#e8f5e9"
      : status === "pending"
      ? "#fff8e1"
      : "#ffebee"} !important;
  color: ${({ status }) =>
    status === "approved"
      ? "#2e7d32"
      : status === "pending"
      ? "#f57f17"
      : "#c62828"} !important;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
`;

const ActionButton = styled(Button)`
  background: ${Colors.orange};
  border: none;
  font-weight: 600;
  border-radius: 8px;
  padding: 10px 24px;

  &:hover {
    background: #b83d34;
  }
`;

const emptyForm = {
  name: "",
  category: "",
  description: "",
  website: "",
  phone: "",
  email: "",
  location: "",
};

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [member, setMember] = useState<CommunityMember | null>(null);
  const [businesses, setBusinesses] = useState<CommunityBusiness[]>([]);
  const [notRegistered, setNotRegistered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!isLoaded || !user) return;
    loadData();
  }, [isLoaded, user]);

  const loadData = async () => {
    try {
      const { data } = await axios.get("/api/community/me");
      setMember(data.member);

      if (data.member.status === "approved") {
        const biz = await axios.get("/api/community/businesses?mine=true");
        setBusinesses(biz.data.businesses);
      }
    } catch (err: any) {
      if (err.response?.status === 404) setNotRegistered(true);
    }
  };

  const openAddModal = () => {
    setForm(emptyForm);
    setEditingId(null);
    setError("");
    setShowModal(true);
  };

  const openEditModal = (biz: CommunityBusiness) => {
    setForm({
      name: biz.name,
      category: biz.category,
      description: biz.description,
      website: biz.website || "",
      phone: biz.phone || "",
      email: biz.email || "",
      location: biz.location || "",
    });
    setEditingId(biz.id);
    setError("");
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (editingId) {
        await axios.put(`/api/community/businesses/${editingId}`, form);
        setSuccess("Business updated.");
      } else {
        await axios.post("/api/community/businesses", form);
        setSuccess("Business listed successfully!");
      }
      setShowModal(false);
      loadData();
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this business listing?")) return;
    await axios.delete(`/api/community/businesses/${id}`);
    loadData();
  };

  if (!isLoaded) return null;

  if (notRegistered) {
    return (
      <PageWrapper>
        <Container style={{ maxWidth: 520 }}>
          <SectionCard>
            <Card.Body className="text-center">
              <h3>Not Registered</h3>
              <p style={{ color: Colors.grey }}>
                You have not joined the community yet.
              </p>
              <ActionButton href="/community/register">Register Now</ActionButton>
            </Card.Body>
          </SectionCard>
        </Container>
      </PageWrapper>
    );
  }

  return (
    <>
      <Head>
        <title>My Dashboard — RCCG Prague Community</title>
      </Head>
      <PageWrapper>
        <Container>
          <Row className="g-4">
            {/* Profile */}
            <Col lg={4}>
              <SectionCard>
                <Card.Body>
                  <h3>My Profile</h3>
                  {member && (
                    <>
                      <div className="mb-2">
                        <strong>{member.full_name}</strong>
                      </div>
                      <div style={{ color: Colors.grey, fontSize: "0.9rem", marginBottom: 12 }}>
                        {member.email}
                      </div>
                      <StatusBadge status={member.status}>
                        {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                      </StatusBadge>
                      {member.status === "pending" && (
                        <p style={{ color: Colors.grey, fontSize: "0.85rem", marginTop: 12 }}>
                          Your membership is pending admin approval. You will be
                          notified once approved.
                        </p>
                      )}
                      {member.role === "admin" && (
                        <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #eee" }}>
                          <Link
                            href="/community/admin"
                            style={{
                              display: "block",
                              background: Colors.dark,
                              color: "#fff",
                              textAlign: "center",
                              padding: "10px 16px",
                              borderRadius: 8,
                              fontWeight: 600,
                              textDecoration: "none",
                              fontSize: "0.9rem",
                            }}
                          >
                            Admin Panel
                          </Link>
                        </div>
                      )}
                    </>
                  )}
                </Card.Body>
              </SectionCard>
            </Col>

            {/* Business listings */}
            <Col lg={8}>
              <SectionCard>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 style={{ marginBottom: 0 }}>My Businesses</h3>
                    {member?.status === "approved" && (
                      <ActionButton size="sm" onClick={openAddModal}>
                        + Add Business
                      </ActionButton>
                    )}
                  </div>

                  {success && (
                    <Alert variant="success" onClose={() => setSuccess("")} dismissible>
                      {success}
                    </Alert>
                  )}

                  {member?.status !== "approved" ? (
                    <p style={{ color: Colors.grey, fontSize: "0.9rem" }}>
                      You can add your business once your membership is approved.
                    </p>
                  ) : businesses.length === 0 ? (
                    <p style={{ color: Colors.grey, fontSize: "0.9rem" }}>
                      No businesses listed yet. Add one to be discoverable in the
                      directory.
                    </p>
                  ) : (
                    <Table responsive hover>
                      <thead>
                        <tr>
                          <th>Business</th>
                          <th>Category</th>
                          <th>Status</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {businesses.map((biz) => (
                          <tr key={biz.id}>
                            <td>{biz.name}</td>
                            <td>
                              <Badge bg="light" text="dark">
                                {biz.category}
                              </Badge>
                            </td>
                            <td>
                              <StatusBadge status={biz.active ? "approved" : "rejected"}>
                                {biz.active ? "Active" : "Hidden"}
                              </StatusBadge>
                            </td>
                            <td>
                              <Button
                                variant="link"
                                size="sm"
                                onClick={() => openEditModal(biz)}
                                style={{ color: Colors.blue }}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="link"
                                size="sm"
                                onClick={() => handleDelete(biz.id)}
                                style={{ color: Colors.orange }}
                              >
                                Remove
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </Card.Body>
              </SectionCard>
            </Col>
          </Row>
        </Container>
      </PageWrapper>

      {/* Add/Edit Business Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? "Edit Business" : "Add Business"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSave}>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Business Name *</Form.Label>
                  <Form.Control
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Category *</Form.Label>
                  <Form.Select
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    required
                  >
                    <option value="">Select a category</option>
                    {BUSINESS_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Description *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    required
                    placeholder="What do you do? Who do you serve?"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Website</Form.Label>
                  <Form.Control
                    type="url"
                    value={form.website}
                    onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
                    placeholder="https://"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="+420 ..."
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Business Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Location / Area</Form.Label>
                  <Form.Control
                    value={form.location}
                    onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                    placeholder="e.g. Prague 2, Vinohrady"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="light" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <ActionButton type="submit" disabled={saving}>
              {saving ? "Saving..." : editingId ? "Save Changes" : "Add Listing"}
            </ActionButton>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const translation = await loadCatalog(ctx.locale!);
  return { props: { translation } };
};
