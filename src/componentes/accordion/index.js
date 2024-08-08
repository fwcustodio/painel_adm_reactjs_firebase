import {
  Accordion as AccordionBase,
  AccordionItem as Item,
  AccordionItemProps,
} from '@szhsin/react-accordion';

import chevronDown from './chevron-down.svg';
import styles from './styles.css';

export const AccordionItem = ({header, ...rest}) => (
  <Item
    {...rest}
    header={
      <>
        {header}
        <img className={styles.chevron} src={chevronDown} alt="Chevron Down" />
      </>
    }
    className={styles.item}
    buttonProps={{
      className: ({isEnter}) =>
        `${styles.itemBtn} ${isEnter && styles.itemBtnExpanded}`,
    }}
    contentProps={{className: styles.itemContent}}
    panelProps={{className: styles.itemPanel}}
  />
);

export const Accordion = (props) => (
  <div className={styles.app}>
    <AccordionBase transition transitionTimeout={200} {...props} />
  </div>
);
