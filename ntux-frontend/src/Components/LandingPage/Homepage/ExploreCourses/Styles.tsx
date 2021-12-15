import styled from 'styled-components';
import { media } from '../../../../common/styling';
import { PageContentContainer } from '../../../shared/Shared.styles';

export const Container = styled(PageContentContainer)`
  padding: 80px 16px;
  position: relative;
  z-index: 1;
  padding-top: 0px;
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
  flex: 1 1 380px;
  max-width: 380px;
  background: #ffffff;
  border: 1px solid #d0d0d0;
  box-sizing: border-box;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 16px;
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

      strong {
        color: #c63044;
      }
    }
  }
`;
