import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  Button,
  Checkbox,
  WelcomeMat,
  WelcomeMatProgress,
} from '../src';
import WelcomeMatContent from '../src/components/WelcomeMat/components/WelcomeMatContent';

const stories = storiesOf('WelcomeMat', module);

const title = 'The Lightning Experience is here!';
// eslint-disable-next-line max-len
const description = 'Welcome to Lightning Experience, the modern, beautiful user experience from Salesforce. With a sales-and service-centric mindset, we focused on reinventing the desktop environment to better support your business processes.';

// eslint-disable-next-line react/prop-types
const dismissRenderer = ({ id }) => (
  <Checkbox
    id={`${id}-dismiss`}
    label="Don't show again"
  />
);

const actionRenderer = () => (
  <Button flavor="brand">Learn More</Button>
);

const closeFn = action('Close');
const completeFn = action('Complete');

const baseInfo = {
  text: `\`WelcomeMat\` renders \`WelcomeMatContent\` inside a \`Modal\` wrapper. If you don't need this wrapper, use \`WelcomeMatContent\` directly.`,
  propTables: [WelcomeMat, WelcomeMatContent],
};

const getSampleSteps = completeSome => ([
  {
    id: 1,
    title: 'Welcome to Salesforce!',
    description: 'Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.',
    icon: 'animal_and_nature',
    sprite: 'utility',
    isCompleted: completeSome,
  },
  {
    id: 2,
    title: 'Learn About OpenCTI',
    description: 'Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet.',
    icon: 'call',
    sprite: 'utility',
    isCompleted: false,
  },
  {
    id: 3,
    title: 'Power Up the Utility Bar',
    description: 'Tap into case history or share notes with fellow agents—it all happens on the utility bar.',
    icon: 'upload',
    sprite: 'utility',
    isCompleted: false,
  },
  {
    id: 4,
    title: 'Customize your view',
    description: 'Tailor your cases to your team\'s workflow with custom list views.',
    icon: 'magicwand',
    sprite: 'utility',
    isCompleted: completeSome,
  },
  {
    id: 5,
    title: 'Share the Knowledge',
    description: 'Harness your team\'s collective know-how with our powerful knowledge base.',
    icon: 'knowledge_base',
    sprite: 'utility',
    isCompleted: false,
  },
]);

stories
  .add('Default', () => (
    <div className="demo-modal">
      <WelcomeMat
        id="welcome-mat-some-complete"
        isOpen
        steps={getSampleSteps(false)}
        title={title}
        onClose={closeFn}
        onCompleteStep={completeFn}
        description={description}
        renderAction={actionRenderer}
        renderDismiss={dismissRenderer}
        renderProgress={({ steps }) => (
          <WelcomeMatProgress steps={steps} />
        )}
      />
    </div>
  ), { info: baseInfo })
  .add('With Completed Steps', () => (
    <div className="demo-modal">
      <WelcomeMat
        id="welcome-mat-some-complete"
        isOpen
        steps={getSampleSteps(true)}
        title={title}
        onClose={closeFn}
        onCompleteStep={completeFn}
        description={description}
        renderAction={actionRenderer}
        renderDismiss={dismissRenderer}
        renderProgress={({ steps }) => (
          <WelcomeMatProgress steps={steps} />
        )}
      />
    </div>
  ), { info: baseInfo })
  .add('Info Only', () => (
    <div className="demo-modal">
      <WelcomeMat
        id="welcome-mat-info-only"
        isOpen
        isInfoOnly
        steps={getSampleSteps(false)}
        title={title}
        onClose={closeFn}
        description={description}
        renderAction={actionRenderer}
        renderDismiss={dismissRenderer}
      />
    </div>
  ), { info: baseInfo })
  .add('Splash', () => (
    <div className="demo-modal">
      <WelcomeMat
        id="welcome-mat-splash"
        isOpen
        title={title}
        onClose={closeFn}
        description={description}
        renderAction={actionRenderer}
        renderDismiss={dismissRenderer}
      />
    </div>
  ), { info: baseInfo });
