import styled from 'styled-components';
import { media } from '../../../../common/styling';

export const Container = styled.div`
  width: 100%;
  padding: 60px 0;
  margin-top: 40px;

  ${media.lessThan('sm')`
    padding: 40px 0;
  `}
`;

export const Title = styled.h1`
  font-weight: bold;
  font-size: 32px;
  line-height: 140%;
  border-bottom: 2px double #ae1b1b;
  width: 300px;
  padding-bottom: 12px;
  z-index: 3;
  position: relative;
  text-align: center;
  margin: 0 auto;

  ${media.lessThan('sm')`
  font-size: 22px;
  width: 200px;
  `}
`;

export const CardsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 48px;
  flex-wrap: wrap;
`;

export const SubscriptionCard = styled.div`
  width: 30%;
  padding: 24px;
  background: #ffffff;
  border: 1px solid rgba(174, 27, 27, 0.5);
  min-width: 280px;
  /* margin: auto; */
  transition: all 0.18s;
  position: relative;

  .name {
    font-weight: bold;
    font-size: 28px;
    line-height: 32px;
  }

  img {
    display: block;
    margin: auto;
    margin-top: 16px;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    margin-top: 32px;
    li {
      margin-top: 12px;
      color: #888888;
      font-size: 16px;
    }
  }

  .price {
    font-weight: bold;
    font-size: 36px;
    line-height: 43px;
    color: #dc2d27;
    margin-top: 20px;
    text-align: center;

    span {
      font-size: 24px;
    }
  }

  &:hover {
    transform: scale(1.02, 1.02);
  }

  ${media.lessThan('sm')`
    padding: 16px;
    margin: auto;
    margin-bottom: 24px;
    .name {
        font-size: 24px;
    }
    img{
      width: 60%;
    }
    ul {
        margin-top: 24px;
        li {
            margin-top: 6px;
            font-size: 14px;
        }
    }
    .price {
        font-size: 32px;
        line-height: 38px;
        margin-top: 20px;

        span {
        font-size: 20px;
        }
    }
  `}
`;

export const BottomSection = styled.div``;

export const PopularTag = styled.div`
  position: absolute;
  width: 140px;
  top: 5%;
  right: -5%;
  padding: 6px;
  text-align: center;
  font-size: 16px;
  color: white;
  font-weight: bold;
  background: #f4c13c;
  border-radius: 8px;
`;
