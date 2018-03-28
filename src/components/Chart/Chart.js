import React from 'react';
import {LineChart, ToolTip} from 'react-easy-chart';

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    showToolTip: false,
    top: '',
    left: '',
    y: 0,
    x: ''
  };
  }
  
  mouseOverHandler(d, e) {
    console.log('D', d);
    console.log('E', e);
    this.setState(() =>  ({
      showToolTip: true,
      top: `${e.screenY - 10}px`,
      left: `${e.screenX + 10}px`,
      y: d.y,
      x: d.x}))
  }

  mouseMoveHandler(e) {
    if (this.state.showToolTip) {
      this.setState({top: `${e.y - 10}px`, left: `${e.x + 10}px`});
    }
  }

  mouseOutHandler() {
    this.setState({showToolTip: false});
  }

  // createTooltip() {
  //   if (this.state.showToolTip) {
  //     return (
  //       <ToolTip
  //         top={this.state.top}
  //         left={this.state.left}
  //       >
  //           The x value is {this.state.x} and the y value is {this.state.y}
  //       </ToolTip>
  //     );
  //   }
  //   return false;
  // }

  render() {    
    return (
      <div>
        <LineChart
            axes grid verticalGrid interpolate={'cardinal'} xType={'time'} 
             dataPoints
            margin={{top: 10, right: 10, bottom: 50, left: 50}}
            axisLabels={{x: 'My x Axis', y: 'My y Axis'}} lineColors={['green']}
            mouseOverHandler={(d, e) => this.mouseOverHandler(d, e)}
            mouseOutHandler={() => this.mouseOutHandler}
            mouseMoveHandler={(e) => this.mouseMoveHandler(e)}
            width={650} height={320} data={this.props.lineData}
          />

          { this.state.showToolTip &&
                <ToolTip top={this.state.top} left={this.state.left}>
                    The x value is {this.state.x} and the y value is {this.state.y}
                </ToolTip>
          }             
      </div>
    );
  }
}

