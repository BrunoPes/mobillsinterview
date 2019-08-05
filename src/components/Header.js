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
  right,
  leftButtonStyle = {},
  leftIconStyle = {},
  titleStyle = {},
  icon = 'arrow-back'
}) => (
  <Header>
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
      {right &&
        {right}
      }
    </Right>
  </Header>
);

export default HeaderView;
