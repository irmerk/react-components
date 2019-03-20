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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Image,
} from 'semantic-ui-react';
import styled from 'styled-components';

import TemplateActions from './TemplateActions';

const CardContainer = styled(Card)`
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

class TemplateCard extends Component {
  render() {
    return (
        <CardContainer>
            <Card.Content>
              <TemplateLogo />
              <Card.Header>
                {this.props.templates}
                <Version>v VERSION HERE</Version>
              </Card.Header>
              <Card.Description>
                DESCRIPTION HERE
              </Card.Description>
            </Card.Content>
            <TemplateActions />
        </CardContainer>
    );
  }
}

/**
 * The property types for this component
 */
TemplateCard.propTypes = {
  templates: PropTypes.array,
};

export default TemplateCard;
