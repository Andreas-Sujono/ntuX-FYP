import React, { memo, useState, useEffect } from 'react';
import { get } from 'lodash';
import { matchPath, useHistory, useLocation } from 'react-router-dom';
import { routes } from '../../../Routes';
import { Container, ListItem } from './Styles';

const listData = [
  {
    id: 1,
    name: 'Questions',
    path: routes.FORUM.QUESTIONS,
  },
  {
    id: 2,
    name: 'Tags',
    path: routes.FORUM.TAGS,
  },
  {
    id: 3,
    name: 'Users',
    path: routes.FORUM.USERS,
  },
];

function SideNav(): React.ReactElement {
  const [activeId, setActiveId] = useState(1);
  const history = useHistory();
  const location = useLocation();

  const onChangeNav = (item: typeof listData[0]) => {
    history.push(item.path);
  };

  useEffect(() => {
    const currentNav = listData.filter((item) => {
      return matchPath(location.pathname, { path: item.path });
    });
    setActiveId(get(currentNav, '[0].id', 1));
  }, [location.pathname]);

  return (
    <Container>
      {listData.map((item) => (
        <ListItem
          key={item.id}
          isActive={activeId === item.id}
          onClick={() => onChangeNav(item)}
        >
          {item.name}
        </ListItem>
      ))}
    </Container>
  );
}

export default memo(SideNav);
