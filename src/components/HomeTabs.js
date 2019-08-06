import React, { Component } from 'react';
import { Tabs, Tab, TabHeading, Icon, Text } from 'native-base';

const TabFactory = ({ icon, text }) => (
  <TabHeading>
    {icon && <Icon name={icon}/>}
    <Text>{text}</Text>
  </TabHeading>
);

const HomeTabs = ({ generalInfoTab, receitasTab, despesasTab }) => (
  <Tabs>
    <Tab heading={TabFactory({icon: 'apps', text: 'Início'})}>
      {generalInfoTab}
    </Tab>
    <Tab heading={TabFactory({icon: 'md-add', text: 'Receitas'})}>
      {receitasTab}
    </Tab>
    <Tab heading={TabFactory({icon: 'md-remove', text: 'Despesas'})}>
      {despesasTab}
    </Tab>
  </Tabs>
);

export default HomeTabs;