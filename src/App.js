import React from 'react';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      break: 5,
      session: 25,
      timer: 1500,
      currentTimer: true,
      timerStatus: 'paused',
      interval: '',
    };

    this.handleCounter = this.handleCounter.bind(this);
    this.initialState = this.initialState.bind(this);
    this.timerCountDown = this.timerCountDown.bind(this);
    this.displayClock = this.displayClock.bind(this);
    this.settingTimer = this.settingTimer.bind(this);
  }

  handleIncrease = (value) => {
    if (this.state.break < 60 && this.state.session < 60) {
      this.setState({
        break: value === 'break' ? this.state.break + 1 : this.state.break,
        session:
          value === 'session' ? this.state.session + 1 : this.state.session,
        timer: value === 'session' ? this.state.timer + 60 : this.state.timer,
      });
    }
  };

  handleDecrease = (value) => {
    if (this.state.break > 1 && this.state.session > 1) {
      this.setState({
        break: value === 'break' ? this.state.break - 1 : this.state.break,
        session:
          value === 'session' ? this.state.session - 1 : this.state.session,
        timer: value === 'session' ? this.state.timer - 60 : this.state.timer,
      });
    }
  };

  handleCounter = () => {
    if (this.state.timerStatus === 'paused') {
      this.setState({
        interval: setInterval(() => {
          this.timerCountDown();
          this.settingTimer();
        }, 10),
        timerStatus: 'playing',
      });
    } else {
      this.setState({ timerStatus: 'paused' });
      if (this.state.interval) {
        clearInterval(this.state.interval);
      }
    }
  };

  timerCountDown = () => {
    this.setState({
      timer: this.state.timer - 1,
      currentTimer:
        this.state.timer < 1
          ? !this.state.currentTimer
          : this.state.currentTimer,
    });
  };

  settingTimer = () => {
    let timer = this.state.timer;
    this.beeping(timer);

    if (timer < 0) {
      this.setState({
        timer: this.state.currentTimer
          ? this.state.session * 60
          : this.state.break * 60,
      });
    }
  };

  beeping = (timer) => {
    if (timer === 0) {
      const audioTag = document.getElementById('beep');
      audioTag.play();
    }
  };

  initialState = () => {
    clearInterval(this.state.interval);
    this.setState({
      break: 5,
      session: 25,
      timer: 1500,
      currentTimer: true,
      interval: '',
    });
  };

  displayClock = () => {
    let minutes = Math.floor(this.state.timer / 60);
    let seconds = this.state.timer - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return minutes + ':' + seconds;
  };

  render() {
    return (
      <div className='App'>
        <h1>Pomodora Timer</h1>
        <div className='controller-panel'>
          <div className='break-controller'>
            <h2 id='break-label'>Break Length</h2>
            <div>
              <i
                className='fa fa-plus-circle'
                aria-hidden='true'
                id='break-increment'
                onClick={() => this.handleIncrease('break')}
              ></i>
              <span id='break-length'>{this.state.break}</span>
              <i
                className='fa fa-minus-circle'
                aria-hidden='true'
                onClick={() => this.handleDecrease('break')}
                id='break-decrement'
              ></i>
            </div>
          </div>

          <div className='clock-display'>
            <h2 id='timer-label'>
              {this.state.currentTimer ? 'Session' : 'Break'}
            </h2>
            <span className='timer' id='time-left'>
              {this.displayClock()}
            </span>
            <div>
              <i
                className='fa fa-play'
                aria-hidden='true'
                id='start_stop'
                onClick={() => this.handleCounter('running')}
              ></i>
              <i
                className='fa fa-pause'
                aria-hidden='true'
                onClick={() => this.handleCounter('stop')}
              ></i>
              <i
                className='fa fa-refresh'
                aria-hidden='true'
                id='reset'
                onClick={this.initialState}
              ></i>
            </div>
          </div>

          <div className='session-controller'>
            <h2 id='session-label'>Session Length</h2>
            <div>
              <i
                className='fa fa-plus-circle'
                aria-hidden='true'
                id='session-increment'
                onClick={() => this.handleIncrease('session')}
              ></i>
              <span id='session-length'>{this.state.session}</span>
              <i
                className='fa fa-minus-circle'
                aria-hidden='true'
                onClick={() => this.handleDecrease('session')}
                id='session-decrement'
              ></i>
            </div>
          </div>
        </div>
        <div>
          <audio
            id='beep'
            src='https://actions.google.com/sounds/v1/alarms/beep_short.ogg'
          ></audio>
        </div>
      </div>
    );
  }
}

export default App;
