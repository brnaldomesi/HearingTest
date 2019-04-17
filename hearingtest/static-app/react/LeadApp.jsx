import React from 'react';
import {render} from 'react-dom';
import Reflux from 'reflux';

// Import Components
import TestPanel from './lead/TestPanel.jsx';
import TestStatusBar from './lead/components/TestStatusBar.jsx';

// Import Store
import Store from './lead/Store.js';

// Import Actions
import Actions from './lead/Actions.js';

import { isSupported } from './lead/Helpers.js';

var App = React.createClass({

  mixins: [Reflux.connect(Store)],

  getInitialState: function() {
    return Store.getDefaultData()
  },

  componentWillMount: function() {
    if(!isSupported()) {
      Actions.showBrowserUnsupportedPage();
      return;
    }
    window.onbeforeunload = function(e) {
      return "Leaving this page will reset the test";
    };
  },

  render () {
    return (
      <div>
        <TestStatusBar settings={this.state}/>
        <TestPanel settings={this.state}/>
      </div>
   )
  }
})

render(<App/>, document.getElementById('app'))
