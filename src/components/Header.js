import React from 'react';

import {
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
} from 'native-base';

const HeaderView = ({
  title,
  onBack,
  right = null,
  leftButtonStyle = {},
  leftIconStyle = {},
  titleStyle = {},
  hasTabs = false,
  icon = 'arrow-back'
}) => (
  <Header hasTabs={hasTabs}>
    <Left style={{ flex: 0.15}}>
      {(onBack !== null && onBack !== undefined) &&
        <Button transparent onPress={() => onBack()} style={{ ...leftButtonStyle }}>
          <Icon name={icon} style={{...leftIconStyle}} />
        </Button>
      }
    </Left>
    <Body style={{ flex: 1, alignItems: 'center'}}>
      <Title style={{ ...titleStyle }}>
        {title}
      </Title>
    </Body>
    <Right style={{ flex: 0.15 }}>
      {right !== null && right}
    </Right>
  </Header>
);

export default HeaderView;
