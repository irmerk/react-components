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
import {
  Card,
  Icon,
  Image,
  List,
} from 'semantic-ui-react';
import styled from 'styled-components';

const TemplateCard = styled(Card)`
  position: relative;
  text-align: left;
  box-shadow: 0 1px 9px 0 rgba(0,0,0,0.1);
`;

const TemplateLogo = styled(Image)`
  position: absolute !important;
  top: 8px;
  right: 10px;
`;

const Version = styled.span`
  margin-left: 10px;
  font-size: 12px;
  font-weight: 300;
`;

const TemplateActions = styled(Card.Content)`
  padding: 0 !important;
  background-color: #F9F9F9 !important;
`;

const TemplateBtn = styled.a`
  padding: 5px 10px;
  display: inline-block;
  color: #484848;
  font-family: "IBM Plex Sans";
  font-size: 12px;
  font-weight: bold;
`;

const AddToContractBtn = styled(TemplateBtn)`
  width: 60%;
  border-right: 1px solid #999;
  cursor: pointer;
  &:hover {
    color: #3087CB;
  }
`;

const DetailsBtn = styled(TemplateBtn)`
  float: right;
  width: 40%;
  font-size: 12px;
  font-weight: 300;
  text-align: center;
`;

/**
 * A Template Library component that will display the filtered list of templates
 * and provide drag-and-drop functionality.
 */
class TemplateLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      templates: ['NAME', ' ', 'HERE'],
    };
  }

  // renderActions() {
  //   return (
  //     <TemplateActions>
  //        <div>
  //           <AddToContractBtn>
  //             <Icon name="plus" />
  //             Add to contract
  //           </AddToContractBtn>
  //           <DetailsBtn>
  //             Details
  //           </DetailsBtn>
  //         </div>
  //     </TemplateActions>
  //   );
  // }

  /**
   * Called by React when the component has been mounted into the DOM tree
   */

  /**
   * Render this React component
   * @return {*} the react component
   */
  render() {
    return (
      <div>
        <List>
          <List.Item>
            <TemplateCard>
              <Card.Content>
                <TemplateLogo />
                <Card.Header>
                  {this.state.templates}
                  <Version>v VERSION HERE</Version>
                </Card.Header>
                <Card.Description>
                  DESCRIPTION HERE
                </Card.Description>
              </Card.Content>
              <TemplateActions>
                <div>
                  <AddToContractBtn>
                    <Icon name="plus" />
                    Add to contract
                  </AddToContractBtn>
                  <DetailsBtn>
                    Details
                  </DetailsBtn>
                </div>
              </TemplateActions>
            </TemplateCard>
          </List.Item>
        </List>
      </div>
    );
  }
}

/**
 * The property types for this component
 */

export default TemplateLibrary;
