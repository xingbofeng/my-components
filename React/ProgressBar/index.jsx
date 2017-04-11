import React, { PropTypes } from 'react';
import s from './style.css';

const cx = (params) => {
  let cssStr = '';
  Object.keys(params).forEach((item) => {
    if (item && params[item]) { cssStr += `${item} ` }
  })
  return cssStr.slice(0, -1);
}

class CircularProgressbar extends React.Component {

  static getPathConfig(radius) {
    return `
      M 50,50 m 0,-${radius}
      a ${radius},${radius} 0 1 1 0, ${2 * radius}
      a ${radius},${radius} 0 1 1 0, -${2 * radius}
    `
  }

  constructor(props) {
    super(props);

    this.state = {
      percentage: props.initialAnimation ? 0 : props.percentage,
      currentPercentageIndex: 0,
    };
  }

  componentDidMount() {
    if (this.props.initialAnimation) {
      this.initialTimeout = setTimeout(() => {
        this.requestAnimationFrame = window.requestAnimationFrame(() => {
          this.setState({
            percentage: this.props.percentage,
          });
        });
      }, 0);
    }

    const totalAnimateTime = 300;
    const animateInterval = (totalAnimateTime / this.props.percentage).toFixed(2);
    const interval = setInterval(() => {
      if (this.state.currentPercentageIndex === this.props.percentage) {
        clearInterval(interval)
      } else {
        this.setState({
          currentPercentageIndex: this.state.currentPercentageIndex + 1,
        })
      }
    }, animateInterval);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      percentage: nextProps.percentage,
    });
  }

  componentWillUnmount() {
    clearTimeout(this.initialTimeout);
    window.cancelAnimationFrame(this.requestAnimationFrame);
  }

  render() {
    const { showText, outerClass } = this.props;
    const radiusOuter = (50 - (this.props.strokeWidth / 2));
    const radiusInner = (50 - ((this.props.strokeWidth / 2) * 1.25));
    const pathDescriptionOuter = CircularProgressbar.getPathConfig(radiusOuter)
    const pathDescriptionInner = CircularProgressbar.getPathConfig(radiusInner)

    const diameter = Math.PI * 2 * radiusOuter;
    const progressStyle = {
      strokeDasharray: `${diameter} ${diameter}`,
      strokeDashoffset: `${(((100 - this.state.percentage) / 100) * diameter)}`,
    };

    return (
      <svg
        className={cx({
          [`${s.wapCircularProgressbar}`]: true,
          [`${outerClass}`]: true,
        })}
        viewBox="0 0 100 100"
      >
        <path
          className={s.CircularProgressbarTrail}
          d={pathDescriptionInner}
          strokeWidth={this.props.strokeWidth - 2}
          fillOpacity={0}
        />
        <path
          className={s.CircularProgressbarPath}
          d={pathDescriptionOuter}
          strokeWidth={this.props.strokeWidth}
          stroke={'url(#gra)'}
          fill={'#f7fbf9'}
          fillOpacity={0}
          style={progressStyle}
        />
        <defs>
          <linearGradient id="gra">
            <stop offset="0%" stopColor="#58FFE4" />
            <stop offset="100%" stopColor="#06E244" />
          </linearGradient>
        </defs>
        {!showText ? null :
        <g>
          <text
            className={s.percentage}
            x={(`${this.state.currentPercentageIndex}`.length === 1) ? 42 : 39}
            y={50}
          >
            {`${this.state.currentPercentageIndex}`}
          </text>
          <text
            className={s.percentage}
            x={(`${this.state.currentPercentageIndex}`.length === 1) ? 65 : 70}
            y={50}
          >
            %
          </text>
          <text
            className={s.CircularProgressbarText}
            x={50}
            y={68}
          >
            已达到100%
          </text>
        </g>}
      </svg>
    );
  }
}

CircularProgressbar.propTypes = {
  outerClass: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number,
  showText: PropTypes.bool,
  initialAnimation: PropTypes.bool,
};

CircularProgressbar.defaultProps = {
  strokeWidth: 8,
  showText: false,
  initialAnimation: false,
};

export default CircularProgressbar;
