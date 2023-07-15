import { useDispatch, useSelector } from 'react-redux';
import { start, milisec, reset, selectWatch, watchState } from './features/stopwatch/watchSlice';
import { useState, Dispatch } from 'react';
import { AnyAction } from '@reduxjs/toolkit';
import './index.scss';

let interval1: NodeJS.Timer;
let interval2: NodeJS.Timer;

function App(): JSX.Element {
  const data: watchState = useSelector(selectWatch);
  const { hours, minutes, seconds, miliseconds }: watchState = data;
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const [pause, setPause] = useState<Boolean>(true);
  const [time, setTime] = useState<string>('');

  setInterval(() => {
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    const currentTime = (hours < 10 ? '0' + hours : hours) + ' : ' + (minutes < 10 ? '0' + minutes : minutes) + ' ';
    setTime(currentTime + ' ' + (hours < 12 ? 'AM' : 'PM'));
  },);

  const startTimer = (): void => {
    interval1 = setInterval(() => {
      dispatch(start());
    }, 1000);
    interval2 = setInterval(() => {
      dispatch(milisec());
    }, 5);
  };

  return (
    <div className="app">
      <div className='main'>
        <div className='header'>
          {time}
        </div>
        <div className='display'>
          <h1>
            {hours < 10 ? '0' + hours : hours}
            <span>.</span>
            {minutes < 10 ? '0' + minutes : minutes}
            <span>.</span>
            {seconds < 10 ? '0' + seconds : seconds}
            <span>.</span>
            <span>{miliseconds < 10 ? '0' + miliseconds : miliseconds}</span>
          </h1>
          <div>
            {
              pause ?
                <button onClick={() => {
                  startTimer();
                  setPause(!pause);
                }}>start</button>
                :
                <button onClick={() => {
                  clearInterval(interval1);
                  clearInterval(interval2);
                  setPause(!pause);
                }}>pause</button>
            }
            <button onClick={() => {
              clearInterval(interval1);
              clearInterval(interval2);
              dispatch(reset());
              setPause(true);
            }}>reset</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;