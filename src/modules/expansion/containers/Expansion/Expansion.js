import React, { useState } from 'react';
import './Expansion.scss';
import Overview from '../Overview';
import OptionTab from '../../components/OptionTab';
import { IconAll } from '../../../../icons/icons';
import { FiList } from 'react-icons/fi';
import { FaTools } from 'react-icons/fa';

const Expansion = props => {
  const [activeIndex, setActiveIndex] = useState(0);
  const data = [
    {
      icon: <FiList />,
      text: 'Overview',
      component: <Overview matchIndex={props.matchIndex} username={props.username} />
    },
    {
      icon: <FaTools />,
      text: 'Builds',
      component: <Overview matchIndex={props.matchIndex} username={props.username} />
    },
    {
      icon: <IconAll />,
      text: 'Laning Phases',
      component: <Overview matchIndex={props.matchIndex} username={props.username} />
    }
  ];

  const renderTabs = () => {
    return [
      <FiList />,
      <FaTools style={{ width: '13px', height: '13px' }} />,
      <IconAll style={{ width: '14px', height: '14px' }} />
    ].map((str, index) => {
      return <OptionTab value={str} key={index} index={index} setActiveIndex={setActiveIndex} />;
    });
  };

  return (
    <div className="expansion">
      <div className="expansion__header">
        <div className="expansion__tabs">{renderTabs()}</div>
        <div className="expansion__tabs-description">
          <span>{data[activeIndex].text}</span>
        </div>
      </div>
      <div className="expansion__body">{data[activeIndex].component}</div>
    </div>
  );
};

export default Expansion;
