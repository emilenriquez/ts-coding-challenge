import { useRef, useState, useCallback, useMemo } from "react";
import Modal from "react-modal";
import CountrySelect, { DEFAULT_COUNTRY, ICountry } from "../country/CountrySelect";
import LanguageSelect, { DEFAULT_LANGUAGE } from "../language/LanguageSelect";
import CurrencySelect, { DEFAULT_CURRENCY } from "../currency/CurrencySelect";
import  './SettingsSelector.css'


/* --- [TASK] ---
Changes on modal are only applied on SAVE

CURRENT SCENARIO
- Clicking the `SettingsSelector`-Button opens a modal dialog.
- Changes to any of the select inputs are immediately effective.
- The modal is dismissed using the **[Close]** button

DESIRED SCENARIO
- Clicking the `SettingsSelector`-Button opens a modal dialog.
- There is a **[Save]** and a **[Cancel]** button, both serving to dismiss the modal.
- Changes are taking effect only on **[Save]**
--------------- DONE _-----------------------------


FURTHER DETAILS
- Positioning of the buttons within the modal is not in the scope of this task
--- [TASK] --- */

/* --- [TASK] ---
Reduced number of unnecessary re-renders

CURRENT SCENARIO
- The `SettingsSelector`-Button re-renders too often
- It re-renders every time the modal is opened, closed, or on changing the select inputs

DESIRED SCENARIO
- The `SettingsSelector`-Button only re-renders when relevant data changes (Country, Language, Currency) : still rerenders on save without changing the data

FURTHER DETAILS
- The `SettingsSelector`-Button has a render counter that will log to the console (do not remove)
- Be aware that #1 changes some relevant behaviour for this task

--------------- DONE _-----------------------------



--- [TASK] --- */

/* --- [TASK] ---
Improved layout and styling of modal dialog (CSS)

CURRENT SCENARIO
- The modal dialog lacks intentional layout (spacings, dimensions).
- On smaller devices, the available space is not utilized effectively.

DESIRED SCENARIO
- Ensure consistent spacing, padding, and dimensions.
- Implement responsive or adaptive behavior for the modal, especially on smaller devices.

FURTHER DETAILS
- Focus on injecting and structuring CSS, using selectors and properties effectively.
- Feel free to apply your preferred spacing and dimensions; the provided designs mereley serve as examples. Just make sure it is consistent.
- Bonus points awarded for aesthetically appealing re-design of elements.
--------------- DONE _-----------------------------
--- [TASK] --- */


/* --- [TASK] ---
Improved use of TypeScript

CURRENT SCENARIO
- In `SettingsSelector`, there are individual `useState()` calls for `Country`, `Language`, and `Currency`.
- Throughout the entire project, there are several instances of type `any`.
    Example:
    ```typescript
    ... = React.useState<any>(DEFAULT_COUNTRY);
    ```
- Default values are constants that are exported by each component.
    Example:
    ```typescript
    .... { DEFAULT_COUNTRY } from "../country/CountrySelect";
    ```

DESIRED SCENARIO
- Consolidate `Country`, `Language`, and `Currency` into a single "state".
- Extract default values from the components and make them configurable from a central point.
- Eliminate any remaining instances of type `any`.

OPTIONAL BONUS
- Replace `any` in the `*.stories.tsx`  files with appropriate types.
--- [TASK] --- */

/* --- [TASK] ---
 ReactDOM.render is no longer supported

CURRENT SCENARIO
- There is an error logging in the console
    `Warning: ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot`

DESIRED SCENARIO
- The error log does not appear
- The cause of the the warning is fixed

FURTHER DETAILS
- Downgrading to React 17 is not an option 😉

---- DONE ----
--- [TASK] --- */

const modalCustomStyle = {
  content: {
    fontFamily: "'Helvetica', sans-serif",
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    transition: 'opacity .5s',
    // width: '80%',
    inset: '40px',
    border: '1px solid rgb(204, 204, 204)',
    background: 'rgb(255, 255, 255)',
    overflow: 'auto',
    outline: 'none',
    padding: '20px'
  }
}

// Component
const SettingsSelector = (): JSX.Element => {
  // States
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const [selectedSettings, setSelectedSettings] = useState({
    country: DEFAULT_COUNTRY,
    currency: DEFAULT_CURRENCY,
    language: DEFAULT_LANGUAGE,
  });

  // Render Counter
  const counter = useRef(0);

  const modalValuesRef = useRef({
    country: selectedSettings.country,
    currency: selectedSettings.currency,
    language: selectedSettings.language,
  });

  // Actions
  const handleOpen = () => {
    setModalIsOpen(true);
  };

  const handlClose = () => {
    setModalIsOpen(false);
  };

  const handleSave = useCallback(() => {
    if (
      modalValuesRef.current.country !== selectedSettings.country ||
      modalValuesRef.current.currency !== selectedSettings.currency ||
      modalValuesRef.current.language !== selectedSettings.language
    ) {
      setSelectedSettings({
        country: modalValuesRef.current.country!,
        currency: modalValuesRef.current.currency,
        language: modalValuesRef.current.language,
      });
    }
    setModalIsOpen(false);
  }, [modalValuesRef, selectedSettings, setModalIsOpen]);

  const memoizedButton = useMemo(() => {
    // Increase render count.
    counter.current++;

    // Log current render count.
    console.log("Render count of button is: " + counter.current);

    /* Button */
    return (
      <button onClick={handleOpen}>
        {selectedSettings.country.name} - ({selectedSettings.currency} - {selectedSettings.language})
      </button>
    );
  }, [selectedSettings])

  // Render
  return (
    <div>
      {memoizedButton}
      {/* Modal */}
      <Modal isOpen={modalIsOpen} style={modalCustomStyle}>
      {/* <Modal isOpen={modalIsOpen} > */}
        {/* Header */}
        <h2 className="h2">Select your region, currency and language.</h2>

        {/* Country */}
        <StyledCountrySelect value={selectedSettings.country} onChange={(value: ICountry) => modalValuesRef.current.country = value} />

        {/* Currency */}
        <CurrencySelect value={selectedSettings.currency} onChange={(value: string) => modalValuesRef.current.currency = value } />

        {/* Language */}
        <LanguageSelect language={selectedSettings.language} onChange={(value: string) => modalValuesRef.current.language = value } />


        <div className="button-container">
          {/* Save button */}
          <button onClick={handleSave} className="button button-primary">
            Save
          </button>

          {/* Cancel button */}
          <button onClick={handlClose} className="button button-secondary">
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SettingsSelector;
