import React, { useState, useEffect } from 'react';
import './Expansion.scss';
import Overview from '../Overview';
import OptionTab from '../../components/OptionTab';
import { IconAll } from '../../../../icons/icons';
import { FiList } from 'react-icons/fi';
import { FaTools } from 'react-icons/fa';
import { connect } from 'react-redux';
import { getAnalysisAction } from '../../actions';
import { getMatch } from '../../selectors';

const Expansion = props => {
  useEffect(() => {
    if (!props.matches.length) {
      props.getAnalysisAction(props.gameId);
    }
  }, [props]);

  const [activeIndex, setActiveIndex] = useState(0);
  const data = [
    {
      icon: <FiList />,
      text: 'Overview',
      component: <Overview matches={props.matches} />
    },
    {
      icon: <FaTools />,
      text: 'Builds',
      component: <Overview matches={props.matches} />
    },
    {
      icon: <IconAll />,
      text: 'Laning Phases',
      component: <Overview matches={props.matches} />
    }
  ];

  const renderTabs = () => {
    return [
      <FiList />,
      <FaTools style={{ width: '13px', height: '13px' }} />,
      <IconAll style={{ width: '14px', height: '14px' }} />
    ].map((str, index) => {
      return (
        <OptionTab value={str} key={str + index} index={index} setActiveIndex={setActiveIndex} />
      );
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

const mapStateToProps = (state, props) => {
  return {
    matches: getMatch(state, props.gameId)
  };
};

export default connect(mapStateToProps, { getAnalysisAction })(Expansion);
