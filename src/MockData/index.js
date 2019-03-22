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

import TemplateLibrary from '../TemplateLibrary';

const templateOne = {
  name: 'Acceptance of Delivery',
  version: '0.9.0',
  description: 'This clause allows the receiver of goods to inspect them for a given time period after delivery.',
  icon: 'https://www.accordproject.org/static/images/footer/logo@2x.png',
};

const templateTwo = {
  name: 'Docusign Connect',
  version: '0.2.0',
  description: 'Counts events from DocuSign connect with a given envelope status.',
  icon: 'https://www.accordproject.org/static/images/footer/logo@2x.png',
};

const templateThree = {
  name: 'Fragile Goods',
  version: '0.9.1',
  description: 'This clause specifies penalties for shocks caused to a fragile package in transport.',
  icon: 'https://www.accordproject.org/static/images/footer/logo@2x.png',
};

const templateFour = {
  name: 'Full Payment Upon Demand',
  version: '0.3.0',
  description: 'This is a one-time full payment clause applicable on demand.',
  icon: 'https://www.accordproject.org/static/images/footer/logo@2x.png',
};

const templateFive = {
  name: 'IP Payment',
  version: '0.8.1',
  description: 'This clause is a payment clause for IP agreement, such as trademark or copyright licenses aggreements.',
  icon: 'https://www.accordproject.org/static/images/footer/logo@2x.png',
};

const templateArray = [templateOne, templateTwo, templateThree, templateFour, templateFive];

const mockUpload = () => { console.log('upload'); };

const mockImport = () => { console.log('import'); };

const mockSearch = () => { console.log('search'); };

const mockAddTemp = () => { console.log('addTemp'); };


class MockData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upload: mockUpload,
      import: mockImport,
      search: mockSearch,
      addTemp: mockAddTemp,
      templates: templateArray,
    };
  }

  /**
   * Render this React component
   * @return {*} the react component
   */
  render() {
    return (
        <TemplateLibrary
            templates={this.state.templates}
            upload={this.state.upload}
            import={this.state.import}
            search={this.state.search}
            addTemp={this.state.addTemp}
        />
    );
  }
}

export default MockData;
