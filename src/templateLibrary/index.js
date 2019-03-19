/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

/**
 * A Template Library component that will display the filtered list of templates 
 * and provide drag-and-drop functionality.
 */
class TemplateLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        templates = []
    };
  }

  /**
   * Called by React when the component has been mounted into the DOM tree
   */
  componentDidMount() {
    // this.onChange();

    // this.updateMenu();
  }

  /**
   * Render this React component
   * @return {*} the react component
   */
  render() {
    const templates = this.state.templates;

    return (
      <div>
        <List>
            {templates}
        </List>
      </div>
    );
  }
}

/**
 * The property types for this component
 */
TemplateLibrary.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default TemplateLibrary;