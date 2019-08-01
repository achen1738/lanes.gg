import React, { Component } from 'react';
import './Expansion.scss';
import Overview from '../Overview';
import OptionTab from '../../components/OptionTab';
import { IconAll } from '../../../../icons/icons';
import { FiList } from 'react-icons/fi';
import { FaTools } from 'react-icons/fa';

class Expansion extends Component {
  state = {
    activeIndex: 0,
    data: [
      {
        icon: <FiList />,
        text: 'Overview',
        component: <Overview matchIndex={this.props.matchIndex} username={this.props.username} />
      },
      {
        icon: <FaTools />,
        text: 'Builds',
        component: <Overview matchIndex={this.props.matchIndex} username={this.props.username} />
      },
      {
        icon: <IconAll />,
        text: 'Laning Phases',
        component: <Overview matchIndex={this.props.matchIndex} username={this.props.username} />
      }
    ]
  };

  setActiveIndex = activeIndex => {
    this.setState({ activeIndex });
  };

  renderTabs = () => {
    return [
      <FiList />,
      <FaTools style={{ width: '13px', height: '13px' }} />,
      <IconAll style={{ width: '14px', height: '14px' }} />
    ].map((str, index) => {
      return (
        <OptionTab value={str} key={index} index={index} setActiveIndex={this.setActiveIndex} />
      );
    });
  };

  render() {
    const { data, activeIndex } = this.state;
    return (
      <div className="expansion">
        <div className="expansion__header">
          <div className="expansion__tabs">{this.renderTabs()}</div>
          <div className="expansion__tabs-description">
            <span>{data[activeIndex].text}</span>
          </div>
        </div>
        <div className="expansion__body">{data[activeIndex].component}</div>
      </div>
    );
  }
}

export default Expansion;
