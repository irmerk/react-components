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
  Button,
  Card,
  Input,
} from 'semantic-ui-react';
import styled from 'styled-components';

// import '../stylesheets/index.styl';

import CustomLoader from '../CustomLoader';
import TemplateCard from './TemplateCard';

const TemplatesWrapper = styled.div`
  position: relative;
  margin: 16px 16px;
  font-family: 'IBM Plex Sans', sans-serif;
  max-width: 442px;
`;

const Header = styled.div`
  position: relative;
  font-family: 'IBM Plex Sans', sans-serif;
  max-width: 442px;
`;

const Functionality = styled.div`
  margin: 16px 0 16px 0;
  max-width: 410px;
  font-family: 'IBM Plex Sans', sans-serif;
`;

const SearchInput = styled(Input)`
  margin: 0 13px 13px 0;
  float: left;
`;

const AddClauseBtn = styled(Button)`
  max-width: 254px;
`;

const TemplateCards = styled(Card.Group)`
  margin: 20px 0 0 0;
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
      icon: '',
      loading: false,
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
        <TemplatesWrapper>
          <Header>
            SMART CLAUSES
          </Header>
          <Functionality>
        <SearchInput className="icon" fluid icon="search" placeholder="Search..." onChange={this.onQueryChange} />
        <AddClauseBtn
            content="New Smart Clause Template"
            color="blue"

            fluid
            icon="plus"
            id="addClauseBtn"
          /></Functionality>
          <CustomLoader active={this.state.loading} />
          <TemplateCards style={{ width: '100%' }}>
            <TemplateCard templates={this.state.templates} />
          </TemplateCards>
        </TemplatesWrapper>
      </div>
    );
  }
}

/**
 * The property types for this component
 */

export default TemplateLibrary;
