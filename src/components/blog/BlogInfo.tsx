import styled from "@emotion/styled";
import BlogCard from "../cards/BlogCard";
import { BlogData } from "@/src/constants/dummyData";
import TopOverflow from "../common/TopOverflow";
import { Col, Row } from "react-bootstrap";
import { useGetPosts } from "@/src/hooks/usePosts";
import Loader from "../common/loader/Loader";

const StyledBlogs = styled.div`
  margin-bottom: 100px;
`;

export default function BlogInfo() {
  const { data, isLoading } = useGetPosts();
  return (
    <Loader isLoading={isLoading}>
      <TopOverflow>
        <StyledBlogs>
          <Row className="gy-4 justify-content-center">
            {data?.map((data, index) => {
              const { title, slug, imageUrl, publishedDate, body } = data;
              return (
                <Col key={index} xs={12} md={6} lg={4}>
                  <BlogCard
                    image={imageUrl}
                    title={title}
                    date={publishedDate}
                    subtitle={body ?? []}
                    slug={slug.current}
                  />
                </Col>
              );
            })}
          </Row>
        </StyledBlogs>
      </TopOverflow>
    </Loader>
  );
}
