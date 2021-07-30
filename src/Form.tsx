import React, {Component} from 'react';
import './Form.scss';
import {
  ActionButton,
  FormLabel,
  Input,
  Modal,
  ModalHeader,
  SimpleDropdown,
  TextArea
} from './@shelf/react-basic-components/lib/index.min.js';
import {debounce, every, map, size, take, uniqBy} from 'lodash';
import {Translation} from 'react-i18next';
import {AppState, CategoryOption, WidgetProps} from './types';
import {searchInLibrary, searchInRecommendations} from './api';
import './i18n';

class Form extends Component<WidgetProps> {
  state: AppState = {
    email: '',
    name: '',
    isVisible: false,
    category: '---',
    message: '',
    suggestedArticles: [],
    loadingSuggestions: false,
    showSuccessMessage: false,
    changedLang: false
  };
  componentDidMount = () => {
    if (this.props.triggerSelector) {
      const el = document.querySelector(this.props.triggerSelector);

      if (el) {
        el.addEventListener('click', () => {
          this.setState({isVisible: true});
        });
      }
    }

    if (this.props.isVisible) {
      this.setState({isVisible: true});
    }
  };

  selectCategory = async (category: CategoryOption, onTop?: boolean) => {
    this.setState({loadingSuggestions: true});
    let suggestedArticles: any[] = [];
    try {
      if (this.props.searchOptions?.libraryIds && onTop) {
        suggestedArticles = await searchInRecommendations(
          category.text || '',
          this.props.searchOptions
        );
      }
      if (!this.props.searchOptions?.libraryIds || !onTop) {
        suggestedArticles = await searchInLibrary(
          category.text,
          this.props.searchOptions,
          category.intent,
          onTop
        );
      }
      this.setState({
        category,
        suggestedArticles: take(
          !onTop
            ? suggestedArticles
            : uniqBy([...suggestedArticles, ...this.state.suggestedArticles], 'gemId'),
          3
        )
      });
    } catch (e) {
      console.warn(e);
    }
    this.setState({loadingSuggestions: false});
  };

  closeModal = () => {
    this.setState({
      isVisible: false,
      suggestedArticles: [],
      loadingSuggestions: false,
      showSuccessMessage: false
    });
  };

  showSuccessMessage = () => {
    this.setState({showSuccessMessage: true});
    setTimeout(() => {
      this.closeModal();
    }, 5000);
  };

  renderFinalMessage(t: (translation: string) => string) {
    return (
      <div className={'SuccessMessage'}>
        <h1>{t('thanks')}</h1>
        <p>{t('submissionMessage')}</p>
      </div>
    );
  }

  onTextAreaChange = debounce(
    message => {
      this.selectCategory({label: message, text: message}, true);
      this.setState({message});
    },
    2000,
    {trailing: true}
  );

  render() {
    const {lang} = this.props;
    const isValid = every([this.state.category, this.state.email, this.state.message]);
    const invalidButtonStyles = isValid ? {} : {opacity: 0.71, cursor: 'not-allowed'};
    const hasResults = size(this.state.suggestedArticles) > 0;

    if (!this.state.isVisible) {
      return null;
    }

    return (
      <Translation>
        {(t, {i18n}) => {
          if (!this.state.changedLang && i18n.changeLanguage) {
            this.setState({changedLang: true}, () => {
              i18n.changeLanguage(lang ? lang : 'en');
            });
          }

          return (
            <Modal
              height={'610px'}
              width={hasResults ? '900px' : '460px'}
              onClose={this.closeModal}
            >
              <ModalHeader titleText={t('contact')} onClose={this.closeModal} />
              {this.state.showSuccessMessage && this.renderFinalMessage(t)}
              {!this.state.showSuccessMessage && (
                <form className={'Form'} onSubmit={() => isValid && this.showSuccessMessage()}>
                  <div className={`Form__holder ${!hasResults && 'Form__holder--single'}`}>
                    <div className={'Form__column'}>
                      <div className={'Form__row'}>
                        <FormLabel>{t('dropdown-category')}*</FormLabel>
                        <SimpleDropdown
                          options={this.props.categories}
                          width={'100%'}
                          onSelect={this.selectCategory}
                          placeholder={t('placeholder')}
                        />
                      </div>

                      <div className={'Form__row'}>
                        <FormLabel>{t('name')}</FormLabel>
                        <Input
                          placeholder={t('namePlaceholder')}
                          onChange={event => this.setState({name: event.currentTarget.value})}
                        />
                      </div>
                      <div className={'Form__row'}>
                        <FormLabel>{t('email')} *</FormLabel>
                        <Input
                          required
                          type={'email'}
                          placeholder={t('emailPlaceholder')}
                          onChange={event => this.setState({email: event.currentTarget.value})}
                        />
                      </div>
                      <div className={'Form__row Form__row--grow'}>
                        <FormLabel>{t('problem')} *</FormLabel>
                        <TextArea
                          required
                          placeholder={t('problem_placeholder')}
                          style={{height: 200}}
                          onChange={event => {
                            event.persist();
                            this.onTextAreaChange(event.currentTarget.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className={`Form__column${hasResults ? '' : '--hidden'}`}>
                      <div className={'Form__row'}>
                        {this.state.loadingSuggestions && <FormLabel>Loading…</FormLabel>}
                        {size(this.state.suggestedArticles) > 0 &&
                          !this.state.loadingSuggestions && <FormLabel>{t('articles')}</FormLabel>}
                        {map(this.state.suggestedArticles, (gem, index) => (
                          <div className={'Form__gem'} key={index}>
                            <a className={'Form__gem-grid'} href={gem.publicURL} target={'_blank'}>
                              <div className={'Form__image'} />
                              <div className={'Form__title'}>{gem.title}</div>
                              <div className={'Form__description'}>
                                <span>{gem.description}</span>
                              </div>
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className={'Form__column Form__column--last'}>
                    <div className={'Form__row Form__row--last'}>
                      <ActionButton
                        title={t('submit')}
                        button
                        buttonType={'submit'}
                        href={'#'}
                        buttonStyle={{
                          backgroundColor: '#2b5797',
                          ...invalidButtonStyles,
                          maxWidth: '118px',
                          border: 'none',
                          paddingBottom: 5
                        }}
                      />
                    </div>
                  </div>
                </form>
              )}
            </Modal>
          );
        }}
      </Translation>
    );
  }
}

export default Form;
