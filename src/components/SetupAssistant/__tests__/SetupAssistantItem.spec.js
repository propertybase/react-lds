import React from 'react';
import { shallow } from 'enzyme';

import SetupAssistantItem from '../SetupAssistantItem';

const getSetupAssistantItem = (props = {}) => shallow(<SetupAssistantItem title="Item" {...props} />);

describe('<SetupAssistantItem />', () => {
  it('accepts a children prop and renders it in an ol', () => {
    const mounted = getSetupAssistantItem();
    expect(mounted.find(
      'li.slds-setup-assistant__item > article.slds-setup-assistant__step > SummaryDetail'
    ).exists()).toBeTruthy();
  });
});