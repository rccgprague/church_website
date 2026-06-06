import Head from "next/head";
import { useState, useEffect } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { useRouter } from "next/router";
import { SignUp, SignIn, useUser } from "@clerk/nextjs";
import styled from "@emotion/styled";
import axios from "axios";
import Colors from "@/src/theme/color";
import { GetServerSideProps } from "next";
import { loadCatalog } from "@/src/utils/lingui";

const PageWrapper = styled.div`
  background: ${Colors.graybg};
  min-height: 100vh;
  padding: 80px 0;
`;

const RegisterCard = styled(Card)`
  max-width: 520px;
  margin: 0 auto;
  border: none;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);

  .card-body {
    padding: 40px;
  }

  h2 {
    font-size: 1.6rem;
    font-weight: 700;
    color: ${Colors.dark};
    margin-bottom: 8px;
  }

  .subtitle {
    color: ${Colors.grey};
    font-size: 0.9rem;
    margin-bottom: 28px;
  }
`;

const InviteBanner = styled.div`
  background: #e8f5e9;
  border: 1px solid #a5d6a7;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 20px;
  font-size: 0.875rem;
  color: #2e7d32;
  font-weight: 500;
`;

const PendingBanner = styled.div`
  background: #fff8e1;
  border: 1px solid #ffe082;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
  font-size: 0.875rem;
  color: #f57f17;
`;

const SubmitButton = styled(Button)`
  background: ${Colors.orange};
  border: none;
  width: 100%;
  padding: 14px;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 8px;
  margin-top: 8px;

  &:hover {
    background: #b83d34;
  }

  &:disabled {
    background: ${Colors.smoke};
  }
`;

export default function RegisterPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const { token, mode } = router.query;

  const [form, setForm] = useState({
    full_name: user?.fullName || "",
    email: user?.primaryEmailAddress?.emailAddress || "",
    phone: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showSignIn, setShowSignIn] = useState(mode === "signin");
  const [checkingMembership, setCheckingMembership] = useState(true);

  // If already registered, send directly to dashboard
  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) { setCheckingMembership(false); return; }
    axios.get("/api/community/me")
      .then(() => router.replace("/community/dashboard"))
      .catch(() => setCheckingMembership(false));
  }, [isLoaded, isSignedIn]);

  if (!isLoaded || (isSignedIn && checkingMembership)) return null;

  // Not signed in — show Clerk sign-in embedded
  if (!isSignedIn) {
    return (
      <PageWrapper>
        <Container>
          <div style={{ maxWidth: 480, margin: "0 auto" }}>
            <div className="text-center mb-4">
              <h2 style={{ fontWeight: 700, color: Colors.dark }}>
                {showSignIn ? "Sign In" : "Join the Community"}
              </h2>
              <p style={{ color: Colors.grey }}>
                {showSignIn
                  ? "Sign in to continue to your community registration."
                  : "Create an account to register."}
              </p>
              <button
                onClick={() => setShowSignIn((v) => !v)}
                style={{
                  background: "none",
                  border: "none",
                  color: Colors.blue,
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  textDecoration: "underline",
                }}
              >
                {showSignIn
                  ? "New here? Create an account"
                  : "Already have an account? Sign in"}
              </button>
            </div>
            {showSignIn ? (
              <SignIn
                routing="hash"
                fallbackRedirectUrl={`/community/register${token ? `?token=${token}` : ""}`}
                appearance={{ elements: { card: { boxShadow: "none", border: "none" } } }}
              />
            ) : (
              <SignUp
                routing="hash"
                fallbackRedirectUrl={`/community/register${token ? `?token=${token}` : ""}`}
                appearance={{ elements: { card: { boxShadow: "none", border: "none" } } }}
              />
            )}
          </div>
        </Container>
      </PageWrapper>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await axios.post("/api/community/register", {
        ...form,
        invite_token: token || undefined,
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    const wasInvited = !!token;
    return (
      <PageWrapper>
        <Container>
          <RegisterCard>
            <Card.Body className="text-center">
              <div style={{ fontSize: "3rem", marginBottom: 16 }}>🎉</div>
              <h2>Welcome to the Community!</h2>
              {wasInvited ? (
                <p style={{ color: Colors.grey }}>
                  Your account is verified. You can now browse the directory and
                  add your business.
                </p>
              ) : (
                <PendingBanner>
                  Your registration is pending approval from an admin. You will
                  be able to access the full directory once approved.
                </PendingBanner>
              )}
              <Button
                onClick={() => router.push("/community")}
                style={{
                  background: Colors.orange,
                  border: "none",
                  padding: "12px 32px",
                  borderRadius: 8,
                  fontWeight: 600,
                }}
              >
                Go to Directory
              </Button>
            </Card.Body>
          </RegisterCard>
        </Container>
      </PageWrapper>
    );
  }

  return (
    <>
      <Head>
        <title>Join the Community — RCCG Prague</title>
      </Head>
      <PageWrapper>
        <Container>
          <RegisterCard>
            <Card.Body>
              <h2>Join the Community</h2>
              <p className="subtitle">
                Register to list your business and access the full member
                directory.
              </p>

              {token && (
                <InviteBanner>
                  ✅ You have a valid invite link — your account will be
                  verified instantly.
                </InviteBanner>
              )}

              {!token && (
                <PendingBanner>
                  No invite link? No problem — submit your details and an admin
                  will review your registration.
                </PendingBanner>
              )}

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name *</Form.Label>
                  <Form.Control
                    type="text"
                    value={form.full_name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, full_name: e.target.value }))
                    }
                    required
                    placeholder="Your full name"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email Address *</Form.Label>
                  <Form.Control
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    required
                    placeholder="your@email.com"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Phone Number (optional)</Form.Label>
                  <Form.Control
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value }))
                    }
                    placeholder="+420 ..."
                  />
                </Form.Group>

                <SubmitButton type="submit" disabled={submitting}>
                  {submitting ? "Submitting..." : "Register"}
                </SubmitButton>
              </Form>
            </Card.Body>
          </RegisterCard>
        </Container>
      </PageWrapper>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const translation = await loadCatalog(ctx.locale!);
  return { props: { translation } };
};
