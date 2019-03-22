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
  Icon,
} from 'semantic-ui-react';
import styled from 'styled-components';

const ActionsContainer = styled(Card.Content)`
  padding: 0 !important;
  background-color: #F9F9F9 !important;
  max-height: 30px;
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
  border-right: 1px solid #E1E5EB;
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

class TemplateActions extends Component {
  render() {
    return (
        <ActionsContainer>
        <div>
          <AddToContractBtn onClick={() => this.props.addToCont(this.props.uriKey)} >
            <Icon name="plus" />
            Add to contract
          </AddToContractBtn>
          <DetailsBtn onClick={() => this.props.handleViewDetails(this.props.uriKey)}>
            Details
          </DetailsBtn>
        </div>
      </ActionsContainer>
    );
  }
}

/**
 * The property types for this component
 */
TemplateActions.propTypes = {
  addToCont: PropTypes.func,
  handleViewDetails: PropTypes.func,
  uriKey: PropTypes.string,
};

export default TemplateActions;
