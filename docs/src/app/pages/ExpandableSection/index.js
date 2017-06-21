import React from 'react';
import { ExpandableSection } from 'react-lds';
import expandableSectionCode from '!raw!react-lds/components/ExpandableSection/ExpandableSection';

import exampleDefaultCode from '!raw!./ExampleDefault';
import ExampleNoncollapsableCode from '!raw!./ExampleNoncollapsable';
import ExampleDefault from './ExampleDefault';
import ExampleNoncollapsable from './ExampleNoncollapsable';

import CodeExample from '../../components/CodeExample';
import DecoratorList from '../../components/DecoratorList';
import HeaderIcon from '../../components/HeaderIcon';
import Masthead from '../../components/MastHead';
import PropTypeDescription from '../../components/PropTypeDescription';

const ExpandableSectionPage = () => (
  <div>
    <Masthead figure={<HeaderIcon />} title="Expandable Section" />

    <div className="slds-p-around--xx-large">
      <section className="slds-m-bottom--xx-large slds-p-top--x-large">
        <CodeExample
          title="Default Expandable Section"
          code={exampleDefaultCode}
        />
        <ExampleDefault />
        <CodeExample
          title="Noncollapsable Section"
          code={ExampleNoncollapsableCode}
        />
        <ExampleNoncollapsable />
      </section>
    </div>
    <h2 className="slds-text-heading--medium slds-p-left--xx-large slds-p-bottom--small">Expandable Section</h2>
    <DecoratorList component={ExpandableSection} />
    <PropTypeDescription code={expandableSectionCode} />
  </div>
);

export default ExpandableSectionPage;