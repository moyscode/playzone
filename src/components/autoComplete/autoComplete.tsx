import React, { useState, useRef, useEffect } from 'react';
import styles from './autoComplete.module.css';
import useComponentVisible from './useComponentVisible';

export const AutoComplete = ({
  suggestions,
  userNameUpdate,
}: {
  suggestions: string[];
  userNameUpdate: (val: string) => void;
}) => {
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState<string>('');

  useEffect(() => {
    userNameUpdate(userInput);
  }, [userInput, userNameUpdate]);

  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(true);

  const selectRef = useRef<HTMLUListElement>(null);
  function setChange() {
    const selected = selectRef?.current?.querySelector(
      '[class*="suggestion-active"]'
    );
    if (selected) {
      selected?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  const onUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsComponentVisible(true);
    const userInput = e.currentTarget.value;

    const filteredSuggestions = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    setActiveSuggestion(0);
    setFilteredSuggestions(filteredSuggestions);
    setShowSuggestions(true);
    setUserInput(userInput);
  };

  const onUserClick = (e: React.MouseEvent) => {
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setUserInput(e.currentTarget.innerHTML);
  };

  const onUserKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setActiveSuggestion(0);
      setShowSuggestions(false);
      setUserInput(filteredSuggestions[activeSuggestion]);
    } else if (e.key === 'ArrowUp') {
      if (activeSuggestion === 0) {
        return;
      } else {
        setActiveSuggestion((currentSuggestion) => currentSuggestion - 1);
      }
      setShowSuggestions(false);
      setUserInput(filteredSuggestions[activeSuggestion]);
    } // User pressed the down arrow, increment the index
    else if (e.key === 'ArrowDown') {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      } else {
        setActiveSuggestion((currentSuggestion) => currentSuggestion + 1);
      }
    }
  };

  let suggestionsListComponent;

  if (showSuggestions && userInput) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul className={`${styles['suggestions']}`} ref={selectRef}>
          {filteredSuggestions.map((suggestion, index) => {
            setTimeout(() => {
              setChange();
            }, 100);
            return (
              <li
                className={`${
                  index === activeSuggestion ? styles['suggestion-active'] : ''
                }`}
                key={suggestion}
                onClick={onUserClick}
              >
                {suggestion}
              </li>
            );
          })}
        </ul>
      );
    } else {
      suggestionsListComponent = (
        <div className={`${styles['no-suggestions']}`}>
          <em>No suggestions available.</em>
        </div>
      );
    }
  }

  return (
    <div className={`${styles['wrapper']}`} ref={ref}>
      <input
        type='text'
        onChange={onUserInput}
        onKeyDown={onUserKeyDown}
        value={userInput}
        className={`${styles['input']}`}
      />
      {isComponentVisible && suggestionsListComponent}
    </div>
  );
};
