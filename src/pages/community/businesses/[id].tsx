import Head from "next/head";
import { Container, Row, Col, Badge, Button } from "react-bootstrap";
import { GetServerSideProps } from "next";
import styled from "@emotion/styled";
import Link from "next/link";
import { FaGlobe, FaPhone, FaEnvelope, FaMapMarkerAlt, FaArrowLeft } from "react-icons/fa";
import { loadCatalog } from "@/src/utils/lingui";
import Colors from "@/src/theme/color";
import { CommunityBusiness } from "@/src/types/community";

interface Props {
  business: CommunityBusiness;
}

const PageWrapper = styled.div`
  background: ${Colors.graybg};
  min-height: 100vh;
  padding: 60px 0;
`;

const BusinessHeader = styled.div`
  background: ${Colors.white};
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  margin-bottom: 24px;

  .category {
    font-size: 0.8rem;
    color: ${Colors.orange};
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 8px;
  }

  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: ${Colors.dark};
    margin-bottom: 12px;
  }

  .owner {
    color: ${Colors.grey};
    font-size: 0.9rem;
  }
`;

const DetailCard = styled.div`
  background: ${Colors.white};
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  height: 100%;

  h3 {
    font-size: 1rem;
    font-weight: 700;
    color: ${Colors.dark};
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 2px solid ${Colors.orange};
    display: inline-block;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;
    color: ${Colors.grey};
    font-size: 0.9rem;

    .icon {
      color: ${Colors.orange};
      font-size: 1rem;
      width: 20px;
      flex-shrink: 0;
    }

    a {
      color: ${Colors.blue};
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${Colors.grey};
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: 24px;

  &:hover {
    color: ${Colors.dark};
  }
`;

export default function BusinessDetailPage({ business }: Props) {
  return (
    <>
      <Head>
        <title>{business.name} — RCCG Prague Community</title>
        <meta name="description" content={business.description} />
      </Head>

      <PageWrapper>
        <Container>
          <BackLink href="/community">
            <FaArrowLeft /> Back to Directory
          </BackLink>

          <BusinessHeader>
            <div className="category">{business.category}</div>
            <h1>{business.name}</h1>
            <div className="owner">Listed by {business.owner_name}</div>
          </BusinessHeader>

          <Row className="g-4">
            <Col lg={8}>
              <DetailCard>
                <h3>About</h3>
                <p style={{ color: Colors.grey, lineHeight: 1.7 }}>
                  {business.description}
                </p>
              </DetailCard>
            </Col>

            <Col lg={4}>
              <DetailCard>
                <h3>Contact</h3>
                {!business.website && !business.phone && !business.email && !business.location && (
                  <p style={{ color: Colors.smoke, fontSize: "0.875rem" }}>
                    No contact details provided.
                  </p>
                )}
                {business.website && (
                  <div className="contact-item">
                    <FaGlobe className="icon" />
                    <a href={business.website} target="_blank" rel="noopener noreferrer">
                      {business.website.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                )}
                {business.phone && (
                  <div className="contact-item">
                    <FaPhone className="icon" />
                    <a href={`tel:${business.phone}`}>{business.phone}</a>
                  </div>
                )}
                {business.email && (
                  <div className="contact-item">
                    <FaEnvelope className="icon" />
                    <a href={`mailto:${business.email}`}>{business.email}</a>
                  </div>
                )}
                {business.location && (
                  <div className="contact-item">
                    <FaMapMarkerAlt className="icon" />
                    <span>{business.location}</span>
                  </div>
                )}
              </DetailCard>
            </Col>
          </Row>
        </Container>
      </PageWrapper>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params!;
  const translation = await loadCatalog(ctx.locale!);

  try {
    const sql = (await import("@/src/lib/db")).default;
    const [business] = await sql(
      `SELECT b.*, m.full_name as owner_name
       FROM community_businesses b
       JOIN community_members m ON b.owner_id = m.id
       WHERE b.id = $1 AND b.active = TRUE`,
      [id]
    );

    if (!business) return { notFound: true };

    return { props: { translation, business } };
  } catch {
    return { notFound: true };
  }
};
