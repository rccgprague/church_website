import Head from "next/head";
import { useState, useEffect } from "react";
import {
  Container, Row, Col, Card, Button, Badge,
  Table, Alert, Tabs, Tab, Modal, Form, InputGroup
} from "react-bootstrap";
import { useUser } from "@clerk/nextjs";
import styled from "@emotion/styled";
import axios from "axios";
import { GetServerSideProps } from "next";
import { loadCatalog } from "@/src/utils/lingui";
import Colors from "@/src/theme/color";
import { CommunityMember, CommunityInvite } from "@/src/types/community";

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

const InviteBox = styled.div`
  background: #f0f7ff;
  border: 1px solid #bbdefb;
  border-radius: 8px;
  padding: 16px;
  margin-top: 12px;
  font-family: monospace;
  font-size: 0.9rem;
  word-break: break-all;
  color: ${Colors.dark};
  cursor: pointer;
  user-select: all;

  &:hover {
    background: #e3f2fd;
  }
`;

export default function AdminPage() {
  const { user, isLoaded } = useUser();
  const [member, setMember] = useState<CommunityMember | null>(null);
  const [forbidden, setForbidden] = useState(false);
  const [members, setMembers] = useState<CommunityMember[]>([]);
  const [invites, setInvites] = useState<CommunityInvite[]>([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [newInvite, setNewInvite] = useState<CommunityInvite | null>(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const [creating, setCreating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [actionSuccess, setActionSuccess] = useState("");

  useEffect(() => {
    if (!isLoaded || !user) return;
    loadAdmin();
  }, [isLoaded, user]);

  const loadAdmin = async () => {
    try {
      const { data } = await axios.get("/api/community/me");
      if (data.member.role !== "admin") {
        setForbidden(true);
        return;
      }
      setMember(data.member);
      fetchMembers();
      fetchInvites();
    } catch {
      setForbidden(true);
    }
  };

  const fetchMembers = async () => {
    const { data } = await axios.get("/api/community/members");
    setMembers(data.members);
  };

  const fetchInvites = async () => {
    const { data } = await axios.get("/api/community/invites");
    setInvites(data.invites);
  };

  const handleMemberAction = async (id: string, status: string) => {
    await axios.put(`/api/community/members/${id}`, { status });
    setActionSuccess(`Member ${status}.`);
    fetchMembers();
  };

  const handleCreateInvite = async () => {
    setCreating(true);
    try {
      const { data } = await axios.post("/api/community/invites", {
        email: inviteEmail || undefined,
      });
      setNewInvite(data.invite);
      setInviteEmail("");
      fetchInvites();
    } finally {
      setCreating(false);
    }
  };

  const inviteUrl = (token: string) =>
    `${window.location.origin}/community/register?token=${token}`;

  const copyToClipboard = (token: string) => {
    navigator.clipboard.writeText(inviteUrl(token));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pendingMembers = members.filter((m) => m.status === "pending");
  const allMembers = members;

  if (!isLoaded) return null;

  if (forbidden) {
    return (
      <PageWrapper>
        <Container style={{ maxWidth: 480 }}>
          <Alert variant="danger">
            You do not have admin access to this page.
          </Alert>
        </Container>
      </PageWrapper>
    );
  }

  return (
    <>
      <Head>
        <title>Admin — RCCG Prague Community</title>
      </Head>
      <PageWrapper>
        <Container>
          <h2 style={{ fontWeight: 700, color: Colors.dark, marginBottom: 32 }}>
            Community Admin
          </h2>

          {actionSuccess && (
            <Alert variant="success" onClose={() => setActionSuccess("")} dismissible>
              {actionSuccess}
            </Alert>
          )}

          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k || "pending")}
            className="mb-4"
          >
            {/* Pending approvals */}
            <Tab
              eventKey="pending"
              title={
                <>
                  Pending Approvals{" "}
                  {pendingMembers.length > 0 && (
                    <Badge bg="danger" pill>
                      {pendingMembers.length}
                    </Badge>
                  )}
                </>
              }
            >
              <SectionCard>
                <Card.Body>
                  {pendingMembers.length === 0 ? (
                    <p style={{ color: Colors.grey }}>No pending registrations.</p>
                  ) : (
                    <Table responsive hover>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Registered</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendingMembers.map((m) => (
                          <tr key={m.id}>
                            <td>{m.full_name}</td>
                            <td>{m.email}</td>
                            <td>{m.phone || "—"}</td>
                            <td>
                              {new Date(m.created_at).toLocaleDateString()}
                            </td>
                            <td>
                              <Button
                                size="sm"
                                variant="success"
                                className="me-2"
                                onClick={() => handleMemberAction(m.id, "approved")}
                              >
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="danger"
                                onClick={() => handleMemberAction(m.id, "rejected")}
                              >
                                Reject
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </Card.Body>
              </SectionCard>
            </Tab>

            {/* All members */}
            <Tab eventKey="members" title={`All Members (${allMembers.length})`}>
              <SectionCard>
                <Card.Body>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Role</th>
                        <th>Joined</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allMembers.map((m) => (
                        <tr key={m.id}>
                          <td>{m.full_name}</td>
                          <td>{m.email}</td>
                          <td>
                            <StatusBadge status={m.status}>
                              {m.status}
                            </StatusBadge>
                          </td>
                          <td>
                            <Badge bg={m.role === "admin" ? "primary" : "secondary"}>
                              {m.role}
                            </Badge>
                          </td>
                          <td>
                            {new Date(m.created_at).toLocaleDateString()}
                          </td>
                          <td>
                            {m.status !== "approved" && (
                              <Button
                                size="sm"
                                variant="outline-success"
                                className="me-1"
                                onClick={() => handleMemberAction(m.id, "approved")}
                              >
                                Approve
                              </Button>
                            )}
                            {m.status === "approved" && (
                              <Button
                                size="sm"
                                variant="outline-danger"
                                onClick={() => handleMemberAction(m.id, "rejected")}
                              >
                                Suspend
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </SectionCard>
            </Tab>

            {/* Invite links */}
            <Tab eventKey="invites" title="Invite Links">
              <SectionCard>
                <Card.Body>
                  <h3>Create Invite Link</h3>
                  <p style={{ color: Colors.grey, fontSize: "0.9rem" }}>
                    Generate a one-time link. Anyone with this link will be
                    verified instantly upon registration.
                  </p>
                  <Row className="g-2 align-items-end mb-4">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>
                          Pre-fill email (optional)
                        </Form.Label>
                        <Form.Control
                          type="email"
                          value={inviteEmail}
                          onChange={(e) => setInviteEmail(e.target.value)}
                          placeholder="member@email.com"
                        />
                      </Form.Group>
                    </Col>
                    <Col md="auto">
                      <ActionButton onClick={handleCreateInvite} disabled={creating}>
                        {creating ? "Generating..." : "Generate Link"}
                      </ActionButton>
                    </Col>
                  </Row>

                  {newInvite && (
                    <div className="mb-4">
                      <Alert variant="success">
                        New invite link created! Share it with the member.
                      </Alert>
                      <InviteBox onClick={() => copyToClipboard(newInvite.token)}>
                        {inviteUrl(newInvite.token)}
                      </InviteBox>
                      <small style={{ color: Colors.grey }}>
                        {copied ? "✅ Copied!" : "Click to copy"} · Expires{" "}
                        {new Date(newInvite.expires_at).toLocaleDateString()} ·
                        Single use
                      </small>
                    </div>
                  )}

                  <h3>Previous Invites</h3>
                  {invites.length === 0 ? (
                    <p style={{ color: Colors.grey }}>No invites created yet.</p>
                  ) : (
                    <Table responsive hover>
                      <thead>
                        <tr>
                          <th>Email</th>
                          <th>Created</th>
                          <th>Expires</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invites.map((inv) => (
                          <tr key={inv.id}>
                            <td>{inv.email || "—"}</td>
                            <td>
                              {new Date(inv.created_at).toLocaleDateString()}
                            </td>
                            <td>
                              {new Date(inv.expires_at).toLocaleDateString()}
                            </td>
                            <td>
                              {inv.used_at ? (
                                <Badge bg="secondary">Used</Badge>
                              ) : new Date(inv.expires_at) < new Date() ? (
                                <Badge bg="danger">Expired</Badge>
                              ) : (
                                <Badge bg="success">Active</Badge>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </Card.Body>
              </SectionCard>
            </Tab>
          </Tabs>
        </Container>
      </PageWrapper>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const translation = await loadCatalog(ctx.locale!);
  return { props: { translation } };
};
