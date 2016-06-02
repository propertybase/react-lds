import React from 'react';
import { Icon, MediaObject } from '../../../src/main';

const MediaObjects = () => {
  const icon = <Icon category="standard" icon="opportunity" />;
  const sampleText = (
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat minus molestias reprehenderit consequuntur
    sapiente. Modi veritatis totam accusantium numquam assumenda.</p>
  );

  return (
    <div>
      <MediaObject figureLeft={icon}>{sampleText}</MediaObject>
      <MediaObject flavor="responsive" figureLeft={icon}>{sampleText}</MediaObject>
    </div>
  );
};

export default MediaObjects;
