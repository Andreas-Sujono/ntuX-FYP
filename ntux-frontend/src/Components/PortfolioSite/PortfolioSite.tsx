import FullPageLoadingBar, {
  LoadingBar,
} from 'common/Components/LoadingBar/FullPageLoadingBar';
import { useThunkDispatch } from 'common/hooks';
import { TEMPLATE_TYPE } from 'Models/PortfolioSite';
import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getUserPortfolio } from 'Store/Actions/auth';
import { selectAuthGeneralState, selectPortfolio } from 'Store/Selector/auth';
import DefaultTemplate from './DefaultTemplate';
import LinkedinTemplate from './LinkedinTemplate';
import PersonalTemplate from './PersonalTemplate';
import FullPageTemplate from './FullPageTemplate';
import { makePath } from 'common/utils';
import { routes } from 'Components/Routes';

const PortfolioSite: React.FC = () => {
  const dispatch = useThunkDispatch();
  const { userId } = useParams<any>();
  const [loading, setLoading] = useState(true);

  const portfolio = useSelector(selectPortfolio);
  const history = useHistory();

  const chosenTemplate: any = //TEMPLATE_TYPE.FULL_PAGE;
    portfolio.user?.portfolio?.theme || TEMPLATE_TYPE.DEFAULT;
  const hideNav = portfolio.user?.portfolio?.hideNav || false;
  const props = {
    portfolio,
    loading,
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    updateNav();
  }, [hideNav]);

  const getData = async () => {
    setLoading(true);
    await dispatch(getUserPortfolio(userId));
    setLoading(false);
  };

  const updateNav = () => {
    if (hideNav) {
      history.replace(
        makePath(
          routes.PORTFOLIO.BASE,
          {
            userId,
          },
          '',
          {
            hideNav: true,
            hideFooter: true,
          },
        ),
      );
    } else {
      history.replace(
        makePath(
          routes.PORTFOLIO.BASE,
          {
            userId,
          },
          '',
          {
            hideNav: false,
            hideFooter: false,
          },
        ),
      );
    }
  };

  if (loading) return <FullPageLoadingBar />;

  if (chosenTemplate === TEMPLATE_TYPE.DEFAULT)
    return <DefaultTemplate {...props} />;
  if (chosenTemplate === TEMPLATE_TYPE.LINKEDIN)
    return <LinkedinTemplate {...props} />;
  if (chosenTemplate === TEMPLATE_TYPE.PERSONAL)
    return <PersonalTemplate {...props} />;
  if (chosenTemplate === TEMPLATE_TYPE.FULL_PAGE)
    return <FullPageTemplate {...props} />;
  return <DefaultTemplate {...props} />;
};

export default memo(PortfolioSite);
