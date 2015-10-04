import React, {Component} from 'react';
import { SoundPlayerContainer } from 'react-soundplayer/addons';
import { PlayButton, Progress, Timer, Icons, Cover } from 'react-soundplayer/components';

import clientId from '../constants/secrets.js';
const streamUrl = 'https://api.soundcloud.com/tracks/219980056/stream';

import SoundPlayerControls from './SoundPlayerControls';

export default class Player extends Component {

  constructor(props) {
    super(props);
  }

  getProgressValue(attrs) {
    console.log('Props passed in to getProgressValue: ', attrs);
    return 50;
  }

  onTogglePlay(attrs) {
    console.log('Toggling play with this context: ', attrs);
  }

  render() {

    return (
      <div>
        <SoundPlayerContainer
          streamUrl={streamUrl}
          clientId={clientId}
        >
          <SoundPlayerControls />
        </SoundPlayerContainer>
      </div>
    )
  }
}