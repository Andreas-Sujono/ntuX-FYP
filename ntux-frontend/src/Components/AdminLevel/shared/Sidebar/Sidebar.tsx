import React, { memo } from 'react';
import { SidebarItem } from 'Components/AdminLevel/MainDashboard/Container/sidebarData';
import { Container, ListItem, DropdownUl } from './Styles';
import { useHistory } from 'react-router-dom';

interface Props {
  items: SidebarItem[];
  activeId: string;
}

const Sidebar: React.FC<Props> = ({ items, activeId }: Props) => {
  const history = useHistory();
  return (
    <Container>
      {items.map((item) => (
        <ListItem
          key={item.name}
          active={item.id === activeId}
          onClick={() => history.push(item.path)}
        >
          <div className="top-level">
            <img src={item.icon} className="icon" />
            {item.name}
          </div>
          {item.items && (
            <DropdownUl>
              {item.items.map((item2) => (
                <ListItem
                  key={item2.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    history.push(item2.path);
                  }}
                  active={item2.id === activeId}
                >
                  {item2.name}
                </ListItem>
              ))}
            </DropdownUl>
          )}
        </ListItem>
      ))}
    </Container>
  );
};

export default memo(Sidebar);
