// app/javascript/controllers/timer_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["hours", "minutes", "modal", "modalTarget", "pauseResumeButton"]

  initialize() {
    this.timerInterval = null;
    this.totalSeconds = 0;
    this.isPaused = false; //タイマーの情報を追跡する変数
  }

  start() {
    if (this.timerInterval) return; //すでにタイマーが起動していたら何もしない
    // サーバーにスタート時刻を送信
    fetch('/timers/start', { 
      method: 'POST',
      credentials: 'same-origin',
      headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': window.getCsrfToken()
      },        
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('サーバーエラーが発生しました');
        }
      })
      .then(data => {
        // タイマー開始
        this._startTimer();
        this.isPaused = false;
      })
      .catch(error => {
        console.error('エラー:', error);
      });
  }

  togglePauseResume() {
    console.log("Toggle pause/resume called. Current state: ", this.isPaused);
  if (this.isPaused) {
    // タイマーが一時停止されていた場合、再開する
    // サーバーに再開時刻を送信
    fetch('/break_times/resume', { 
      method: 'POST',
      credentials: 'same-origin',
      headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': window.getCsrfToken()
      },  
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('サーバーエラーが発生しました');
        }
      })
      .then(data => {
        // タイマー再開
        this._startTimer();
        this.pauseResumeButtonTarget.textContent = 'Pause';
        this.isPaused = false;
      })
      .catch(error => {
        console.error('エラー:', error);
      });

  } else {
    // タイマーが動作していた場合、一時停止する
    // サーバーに一時停止時刻を送信
    fetch('/break_times/pause', { 
      method: 'POST',
      credentials: 'same-origin',
      headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': window.getCsrfToken()
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('サーバーエラーが発生しました');
        }
      })
      .then(data => {
        console.log("Fetched response: ", data);
        clearInterval(this.timerInterval);
        this.timerInterval = null;
        this.pauseResumeButtonTarget.textContent = 'Resume';
        this.isPaused = true;
      })
      .catch(error => {
        console.error('エラー:', error);
      });
    }
  }

  end() {
    // タイマーを停止
    clearInterval(this.timerInterval);
    this.timerInterval = null;
    // サーバーに終了時刻を送信
    fetch('/timers/end', { 
      method: 'POST',
      credentials: 'same-origin',
      headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': window.getCsrfToken()
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('サーバーエラーが発生しました');
        }
      })
      .then(data => {
        // タイマー表示をリセット
        this._resetTimer();
        // モーダルに時間を表示
        this.modalTimeTarget.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        this.modalTarget.classList.remove('hidden');
      })
      .catch(error => {
        console.error('エラー:', error);
      });
  }

 
  // プライベートメソッド
  _startTimer() {
    if (this.timerInterval) return;
    this.timerInterval = setInterval(() => {
      this.totalSeconds += 60;
      const hours = Math.floor(this.totalSeconds / 3600);
      const minutes = Math.floor((this.totalSeconds % 3600) / 60);
      this.hoursTarget.textContent = String(hours).padStart(2, '0');
      this.minutesTarget.textContent = String(minutes).padStart(2, '0');
    }, 60000);
  }

  _resetTimer() {
    this.totalSeconds = 0;
    this.hoursTarget.textContent = '00';
    this.minutesTarget.textContent = '00';
  }
}
