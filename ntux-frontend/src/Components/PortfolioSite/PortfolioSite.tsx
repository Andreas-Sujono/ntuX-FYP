import FullPageLoadingBar, {
  LoadingBar,
} from 'common/Components/LoadingBar/FullPageLoadingBar';
import { useThunkDispatch } from 'common/hooks';
import { TEMPLATE_TYPE } from 'Models/PortfolioSite';
import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserPortfolio } from 'Store/Actions/auth';
import { selectAuthGeneralState, selectPortfolio } from 'Store/Selector/auth';
import DefaultTemplate from './DefaultTemplate';
import LinkedinTemplate from './LinkedinTemplate';

const PortfolioSite: React.FC = () => {
  const dispatch = useThunkDispatch();
  const { userId } = useParams<any>();
  const [loading, setLoading] = useState(true);

  const portfolio = useSelector(selectPortfolio);

  const chosenTemplate =
    portfolio.user?.portfolio?.theme || TEMPLATE_TYPE.DEFAULT;

  const props = {
    portfolio,
    loading,
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    await dispatch(getUserPortfolio(userId));
    setLoading(false);
  };

  if (loading) return <FullPageLoadingBar />;

  if (chosenTemplate === TEMPLATE_TYPE.DEFAULT)
    return <DefaultTemplate {...props} />;
  if (chosenTemplate === TEMPLATE_TYPE.LINKEDIN)
    return <LinkedinTemplate {...props} />;
  return <DefaultTemplate {...props} />;
};

export default memo(PortfolioSite);
