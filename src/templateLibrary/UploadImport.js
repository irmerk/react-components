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
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto 0 0 60px;
  justify-content: flex-end;
`;

const Link = styled.a`
  font-weight: 300;
  margin: 0 0 0 16px;
  text-decoration: underline;
  font-size: 14px;
  color: #76777D;
`;

/**
 * A Template Library component that will display the filtered list of templates
 * and provide drag-and-drop functionality.
 */
class UploadImport extends React.Component {
  /**
     * Called by React when the component has been mounted into the DOM tree
     */

  /**
     * Render this React component
     * @return {*} the react component
     */
  render() {
    return (
        <Wrapper>
            {this.props.upload && <Link onClick={this.props.upload} href="javascript:void(0);" >
                Upload CTA file
            </Link>}
            {this.props.import && <Link onClick={this.props.import} href="javascript:void(0);" >
                Import from VS Code
            </Link>}
        </Wrapper>
    );
  }
}

/**
   * The property types for this component
   */
UploadImport.propTypes = {
  upload: PropTypes.func,
  import: PropTypes.func,
};

export default UploadImport;
