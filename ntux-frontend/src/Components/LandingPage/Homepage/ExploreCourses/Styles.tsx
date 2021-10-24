import styled from 'styled-components';
import { media } from '../../../../common/styling';
import { PageContentContainer } from '../../../shared/Shared.styles';

export const Container = styled(PageContentContainer)`
  padding: 80px 16px;
  position: relative;
  z-index: 1;
  padding-top: 40px;
`;

export const Title = styled.h1`
  font-weight: bold;
  font-size: 32px;
  margin-top: 20px;
  /* border-bottom: 2px double #ae1b1b; */
  z-index: 3;
  position: relative;

  ${media.lessThan('md')`
    font-size: 22px;
  `}
`;

export const CoursesContainer = styled.div`
  display: flex;
  row-gap: 40px;
  column-gap: 40px;
  flex-wrap: wrap;
  margin-top: 50px;
`;

export const CourseCard = styled.div`
  width: 380px;
  background: #ffffff;
  border: 1px solid #d0d0d0;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  cursor: pointer;

  img {
    width: 100%;
    height: 220px;
    object-fit: cover;
  }

  .details {
    padding: 24px;
    .name {
      font-size: 24px;
      line-height: 29px;
    }
    .hours {
      color: #484747;
      margin-top: 12px;
    }
    .batch {
      font-size: 18px;
      line-height: 21px;
      margin-top: 12px;
    }
  }
`;
