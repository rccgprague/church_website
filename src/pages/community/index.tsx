import Head from "next/head";
import { useState, useEffect } from "react";
import {
  Container, Row, Col, Form, InputGroup, Button, Badge, Card,
} from "react-bootstrap";
import Link from "next/link";
import styled from "@emotion/styled";
import { FaSearch, FaBriefcase, FaUsers, FaShieldAlt } from "react-icons/fa";
import { GetServerSideProps } from "next";
import { loadCatalog } from "@/src/utils/lingui";
import Colors from "@/src/theme/color";
import { CommunityBusiness, CommunityMember, BUSINESS_CATEGORIES } from "@/src/types/community";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

interface Props {
  initialBusinesses: CommunityBusiness[];
}

/* ─── Shared hero ─────────────────────────────────────────── */
const HeroSection = styled.section`
  background: linear-gradient(135deg, ${Colors.dark} 0%, ${Colors.blue} 100%);
  padding: 100px 0 60px;
  color: ${Colors.white};
  text-align: center;

  h1 {
    font-size: 2.8rem;
    font-weight: 700;
    margin-bottom: 16px;
  }

  p {
    font-size: 1.15rem;
    opacity: 0.85;
    max-width: 560px;
    margin: 0 auto 32px;
  }
`;

/* ─── Landing (unauthenticated) ───────────────────────────── */
const LandingHero = styled.section`
  background: linear-gradient(135deg, ${Colors.dark} 0%, ${Colors.blue} 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  text-align: center;
  color: ${Colors.white};
  padding: 60px 0;

  h1 {
    font-size: 2.8rem;
    font-weight: 700;
    margin-bottom: 16px;
  }

  p {
    font-size: 1.15rem;
    opacity: 0.85;
    max-width: 520px;
    margin: 0 auto 40px;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
`;

const PrimaryBtn = styled(Link)`
  background: ${Colors.orange};
  color: ${Colors.white};
  font-weight: 700;
  padding: 14px 36px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 1rem;
  display: inline-block;

  &:hover {
    background: #b83d34;
    color: ${Colors.white};
  }
`;

const SecondaryBtn = styled(Link)`
  background: transparent;
  color: ${Colors.white};
  font-weight: 600;
  padding: 13px 36px;
  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0.6);
  text-decoration: none;
  font-size: 1rem;
  display: inline-block;

  &:hover {
    border-color: ${Colors.white};
    color: ${Colors.white};
  }
`;

/* ─── Pending state ───────────────────────────────────────── */
const PendingWrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${Colors.graybg};
  text-align: center;
  padding: 60px 0;

  .box {
    background: ${Colors.white};
    border-radius: 16px;
    padding: 48px 40px;
    max-width: 480px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  }

  h2 {
    font-weight: 700;
    color: ${Colors.dark};
    margin-bottom: 12px;
  }

  p {
    color: ${Colors.grey};
    margin-bottom: 28px;
  }
`;

/* ─── Directory ───────────────────────────────────────────── */
const SearchBar = styled(InputGroup)`
  max-width: 600px;
  margin: 0 auto;

  input {
    border-radius: 8px 0 0 8px !important;
    padding: 14px 18px;
    font-size: 1rem;
    border: none;
  }

  button {
    background: ${Colors.orange};
    border: none;
    padding: 0 24px;
    border-radius: 0 8px 8px 0 !important;
    font-weight: 600;

    &:hover { background: #b83d34; }
  }
`;

const StatsSection = styled.section`
  background: ${Colors.white};
  padding: 40px 0;
  border-bottom: 1px solid #eee;
  text-align: center;

  .stat .icon {
    font-size: 2rem;
    color: ${Colors.orange};
    margin-bottom: 8px;
  }

  .stat h3 {
    font-size: 1.8rem;
    font-weight: 700;
    color: ${Colors.dark};
    margin: 0;
  }

  .stat p {
    color: ${Colors.grey};
    margin: 0;
    font-size: 0.9rem;
  }
`;

const DirectorySection = styled.section`
  background: ${Colors.graybg};
  padding: 60px 0;
`;

const CategoryBadge = styled(Badge)<{ active: boolean }>`
  cursor: pointer;
  background: ${({ active }) => (active ? Colors.orange : Colors.white)} !important;
  color: ${({ active }) => (active ? Colors.white : Colors.dark)} !important;
  border: 1px solid ${({ active }) => (active ? Colors.orange : "#ddd")};
  padding: 8px 16px;
  font-size: 0.8rem;
  font-weight: 500;
  border-radius: 20px;
  margin: 4px;
  transition: all 0.2s;

  &:hover {
    background: ${Colors.orange} !important;
    color: ${Colors.white} !important;
    border-color: ${Colors.orange};
  }
`;

const BusinessCard = styled(Card)`
  border: none;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s, box-shadow 0.2s;
  height: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  .card-body { padding: 24px; }
  .category-tag { font-size: 0.75rem; color: ${Colors.orange}; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
  .business-name { font-size: 1.15rem; font-weight: 700; color: ${Colors.dark}; margin: 6px 0 10px; }
  .description { color: ${Colors.grey}; font-size: 0.9rem; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
  .owner { font-size: 0.8rem; color: ${Colors.smoke}; margin-top: 16px; border-top: 1px solid #f0f0f0; padding-top: 12px; }
`;

const MemberBanner = styled.div`
  background: ${Colors.orange};
  padding: 20px 0;
  text-align: center;
  color: ${Colors.white};

  p { margin: 0; font-size: 0.95rem; opacity: 0.95; }

  a {
    color: ${Colors.white};
    font-weight: 700;
    text-decoration: underline;
    margin-left: 12px;
  }
`;

/* ─── Page ────────────────────────────────────────────────── */
export default function CommunityPage({ initialBusinesses }: Props) {
  const { isLoaded, isSignedIn } = useUser();
  const [member, setMember] = useState<CommunityMember | null>(null);
  const [memberChecked, setMemberChecked] = useState(false);
  const [businesses, setBusinesses] = useState(initialBusinesses);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) { setMemberChecked(true); return; }
    axios.get("/api/community/me")
      .then(({ data }) => setMember(data.member))
      .catch(() => {})
      .finally(() => setMemberChecked(true));
  }, [isLoaded, isSignedIn]);

  const fetchBusinesses = async (q: string, cat: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (q) params.set("search", q);
      if (cat) params.set("category", cat);
      const { data } = await axios.get(`/api/community/businesses?${params}`);
      setBusinesses(data.businesses);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBusinesses(search, activeCategory);
  };

  const handleCategory = (cat: string) => {
    const next = activeCategory === cat ? "" : cat;
    setActiveCategory(next);
    fetchBusinesses(search, next);
  };

  /* ── Loading ── */
  if (!isLoaded || (isSignedIn && !memberChecked)) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="spinner-border" style={{ color: Colors.orange }} />
      </div>
    );
  }

  /* ── Unauthenticated landing ── */
  if (!isSignedIn) {
    return (
      <>
        <Head>
          <title>Community Directory — RCCG Prague</title>
        </Head>
        <LandingHero>
          <Container>
            <h1>Community Business Directory</h1>
            <p>
              A members-only space to find and support businesses run by RCCG
              Prague Covenant Parish. Sign in or join to get access.
            </p>
            <ButtonRow>
              <PrimaryBtn href="/community/register?mode=signin">
                Sign In
              </PrimaryBtn>
              <SecondaryBtn href="/community/register">
                Join the Community
              </SecondaryBtn>
            </ButtonRow>
          </Container>
        </LandingHero>
      </>
    );
  }

  /* ── Signed in but not registered ── */
  if (!member) {
    return (
      <>
        <Head><title>Community Directory — RCCG Prague</title></Head>
        <PendingWrapper>
          <Container>
            <div className="box mx-auto">
              <div style={{ fontSize: "3rem", marginBottom: 16 }}>👋</div>
              <h2>You&apos;re not registered yet</h2>
              <p>
                Register as a community member to list your business and browse
                the full member directory.
              </p>
              <PrimaryBtn href="/community/register">Register Now</PrimaryBtn>
            </div>
          </Container>
        </PendingWrapper>
      </>
    );
  }

  /* ── Registered but pending approval ── */
  if (member.status === "pending") {
    return (
      <>
        <Head><title>Community Directory — RCCG Prague</title></Head>
        <PendingWrapper>
          <Container>
            <div className="box mx-auto">
              <div style={{ fontSize: "3rem", marginBottom: 16 }}>⏳</div>
              <h2>Registration Pending</h2>
              <p>
                Your membership is awaiting admin approval. You&apos;ll get full
                access to the directory once approved.
              </p>
              <PrimaryBtn href="/community/dashboard">View Dashboard</PrimaryBtn>
            </div>
          </Container>
        </PendingWrapper>
      </>
    );
  }

  /* ── Approved member — full directory ── */
  return (
    <>
      <Head>
        <title>Community Directory — RCCG Prague</title>
        <meta
          name="description"
          content="Browse and support businesses owned by RCCG Prague Covenant Parish members."
        />
      </Head>

      <MemberBanner>
        <p>
          Welcome, {member.full_name}!
          <Link href="/community/dashboard">My Dashboard →</Link>
        </p>
      </MemberBanner>

      <HeroSection>
        <Container>
          <h1>Community Business Directory</h1>
          <p>
            Find and support businesses run by members of RCCG Prague. From
            handymen to accountants — your community has you covered.
          </p>
          <form onSubmit={handleSearch}>
            <SearchBar>
              <Form.Control
                placeholder="Search businesses, services, or categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button type="submit">
                <FaSearch />
              </Button>
            </SearchBar>
          </form>
        </Container>
      </HeroSection>

      <StatsSection>
        <Container>
          <Row className="justify-content-center g-4">
            <Col xs={6} md={3}>
              <div className="stat">
                <div className="icon"><FaBriefcase /></div>
                <h3>{businesses.length}</h3>
                <p>Businesses listed</p>
              </div>
            </Col>
            <Col xs={6} md={3}>
              <div className="stat">
                <div className="icon"><FaUsers /></div>
                <h3>{BUSINESS_CATEGORIES.length}</h3>
                <p>Categories</p>
              </div>
            </Col>
            <Col xs={6} md={3}>
              <div className="stat">
                <div className="icon"><FaShieldAlt /></div>
                <h3>100%</h3>
                <p>Verified members</p>
              </div>
            </Col>
          </Row>
        </Container>
      </StatsSection>

      <DirectorySection>
        <Container>
          <div className="mb-4 text-center">
            <CategoryBadge active={activeCategory === ""} onClick={() => handleCategory("")}>
              All
            </CategoryBadge>
            {BUSINESS_CATEGORIES.map((cat) => (
              <CategoryBadge
                key={cat}
                active={activeCategory === cat}
                onClick={() => handleCategory(cat)}
              >
                {cat}
              </CategoryBadge>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border" style={{ color: Colors.orange }} />
            </div>
          ) : businesses.length === 0 ? (
            <div className="text-center py-5">
              <p style={{ color: Colors.grey }}>
                No businesses found. Try a different search or category.
              </p>
            </div>
          ) : (
            <Row className="g-4">
              {businesses.map((biz) => (
                <Col key={biz.id} xs={12} sm={6} lg={4}>
                  <Link href={`/community/businesses/${biz.id}`} style={{ textDecoration: "none" }}>
                    <BusinessCard>
                      <Card.Body>
                        <div className="category-tag">{biz.category}</div>
                        <div className="business-name">{biz.name}</div>
                        <div className="description">{biz.description}</div>
                        {biz.location && (
                          <div style={{ fontSize: "0.82rem", color: Colors.grey, marginTop: 8 }}>
                            📍 {biz.location}
                          </div>
                        )}
                        <div className="owner">Listed by {biz.owner_name}</div>
                      </Card.Body>
                    </BusinessCard>
                  </Link>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </DirectorySection>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const translation = await loadCatalog(ctx.locale!);

  let initialBusinesses: CommunityBusiness[] = [];
  try {
    const sql = (await import("@/src/lib/db")).default;
    initialBusinesses = await sql(
      `SELECT b.*, m.full_name as owner_name
       FROM community_businesses b
       JOIN community_members m ON b.owner_id = m.id
       WHERE b.active = TRUE AND m.status = 'approved'
       ORDER BY b.created_at DESC
       LIMIT 50`
    ) as CommunityBusiness[];
  } catch {
    // DB not available at build time
  }

  return { props: { translation, initialBusinesses } };
};
