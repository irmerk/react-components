import React from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';
import { Button, Message, Modal } from 'semantic-ui-react';
import styled from 'styled-components';

import CustomLoader from '../CustomLoader';
import loadTemplate from './ActionMethods';

const TemplateLanguage = styled.div`
  margin: 0 0 20px;
  padding: 0 0 20px;
  border-bottom: 1px solid #bbb;
  white-space: pre-line;
`;

export default class TemplateDetails extends React.Component {
  constructor(props) {
    super(props);
    this.initState({
      template: null,
      showGrammar: true,
      error: false,
      loading: false,
      loadingMessage: '',
      saving: false,
    });
    this.toggleGrammar = this.toggleGrammar.bind(this);
    this.onError = this.onError.bind(this);
    this.formatTemplateGrammar = this.formatTemplateGrammar.bind(this);
  }

  componentDidMount() {
    loadTemplate(this.props.templateUri);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.templateUri !== this.props.templateUri) {
      loadTemplate(this.props.templateUri);
    }
  }

  formatTemplateGrammar(grammar) {
    const parts = grammar.split(/\[\{(.*?)\}\]/g);
    for (let i = 1; i < parts.length; i += 2) {
      parts[i] = <span className="param" key={i}>{parts[i]}</span>;
    }
    return <div>{parts}</div>;
  }

  onError(error) {
    if (error.response) {
      return error.response.then((err) => {
        this.setState({
          error: err.error.message,
          loading: false,
          loadingMessage: '',
          saving: false,
        });

        return err.error.message;
      });
    }
    this.setState({
      error,
      loading: false,
      loadingMessage: '',
      saving: false,
    });

    return Promise.resolve();
  }

  get defaultState() {
    return {
      error: false,
      loading: false,
      loadingMessage: '',
      saving: false,
    };
  }

  get loader() {
    return (
      <CustomLoader active={this.state.loading} loadingMessage={this.state.loadingMessage} />
    );
  }

  initState(state) {
    this.state = this.mergeState(state); // eslint-disable-line react/no-direct-mutation-state
  }

  loaded() {
    this.setState({
      loading: false,
      loadingMessage: '',
    });
  }

  loading(msg = '') {
    this.setState({
      error: false,
      loading: true,
      loadingMessage: msg,
    });
  }

  reset() {
    this.setState(this.defaultState);
  }

  saving(msg = '') {
    this.setState({
      error: false,
      loading: true,
      loadingMessage: msg,
      saving: true,
    });
  }

  mergeState(state) {
    return Object.assign({}, this.defaultState, state);
  }

  toggleGrammar() {
    this.setState({ showGrammar: !this.state.showGrammar });
  }

  renderGrammar(template) {
    if (!template.grammar) return null;
    const grammar = this.formatTemplateGrammar(template.grammar);
    return (
      <div className="templateText">{grammar}</div>
    );
  }

  renderModel(template) {
    return (
      <div className="modelParams">
        <p className="header">Parameters</p>
        <div className="column-container">
          <div className="paramNames">
            { _.map(template.model, ((p, idx) => (<p key={idx} className="paramName">{p.name}</p>))) }
          </div>
          <div className="paramTypes">
            { _.map(template.model, ((p, idx) => (<p key={idx} className="paramType">{p.type}</p>))) }
          </div>
        </div>
      </div>
    );
  }

  renderObligations(template) {
    let { emitTypes } = template;
    emitTypes = emitTypes.filter(t => !(t.endsWith('Event')));
    if (!emitTypes.length) return null;

    let obligations;
    obligations = _.map(emitTypes, (type => (type.slice(type.lastIndexOf('.') + 1))));
    obligations = _.map(obligations, ((o) => {
      if (o === 'PaymentObligation') return 'Payment';
      return o;
    }));

    return (
      <div className="obligations">
        { _.includes(obligations, 'Payment') ? <img src="/assets/images/icons/payment_obligation.png" className="icon" alt="Payment" /> : null }
        Obligations: {obligations.join(', ')}
      </div>
    );
  }

  renderApLink() {
    if (!this.props.templateUri.startsWith('ap://')) return null;
    const apLink = this.props.templateUri.replace('ap://', 'https://templates.accordproject.org/');
    return (
      <a href={apLink} target="_blank" rel="noopener noreferrer" className="apLink">
        View in Accord Project Template Library
      </a>
    );
  }

  render() {
    let template = this.props.templates[this.props.templateUri];
    if (template === 'loading') template = null;
    if (!template) {
      return (
        <Modal
          open={this.props.open}
          onClose={this.props.onClose}
          size="small"
          style={{ height: '400px' }}
        >
          <CustomLoader active loadingMessage={'Loading template'} />
        </Modal>
      );
    }

    if (this.state.error) {
      return (
        <Message
          error
          header="Error fetching template details"
          content={this.state.error}
        />
      );
    }

    const grammarBtnText = this.state.showGrammar ? 'Example Text' : 'Parameters';
    return (
      <Modal
        open={this.props.open}
        onClose={this.props.onClose}
        size="small"
      >
        <Modal.Header>{template.template.name}</Modal.Header>
        <Modal.Content>
          <div className="templateDescription">
            {template.template.description} <br />
          </div>
          <div className="smartContents">
            <img src="/assets/images/icons/logic_true.png" className="icon" alt="Logic" />
            This Smart Clause contains logic
            { this.renderObligations(template.template) }
          </div>
          <TemplateLanguage>
            { this.state.showGrammar ? this.renderGrammar(template.template) : (
              <div className="templateText">{template.template.sample}</div>
            )}
            <a className="toggleText" onClick={this.toggleGrammar}>{grammarBtnText}</a>
          </TemplateLanguage>
          { this.renderModel(template.template) }
          <div className="templateActions">
            <h4 className="templateUriHeader">Identifier</h4>
            <p className="templateUri">{this.props.templateUri}</p>
            { this.renderApLink() }
            <Button primary className="templateBtn" onClick={() => this.props.onClick(this.props.templateUri)}>
              {this.props.btnText}
            </Button>
          </div>
        </Modal.Content>
      </Modal>
    );
  }
}

TemplateDetails.propTypes = {
  btnText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  templates: PropTypes.object.isRequired,
  templateUri: PropTypes.string.isRequired,
};
