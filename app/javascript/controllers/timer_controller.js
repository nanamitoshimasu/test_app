// app/javascript/controllers/timer_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["hours", "minutes"]

  initialize() {
    this.timerInterval = null;
    this.totalSeconds = 0;
  }


  start() {
    if (this.timerInterval) return; // 既にタイマーが起動していたら何もしない
    this.timerInterval = setInterval(() => {
      this.totalSeconds += 60; // 1分ずつ加算
      const hours = Math.floor(this.totalSeconds / 3600); // 3600で割ると時間が得られる
      const minutes = Math.floor((this.totalSeconds % 3600) / 60); // 3600で割った余りを60で割ると分が得られる
      this.hoursTarget.textContent = String(hours).padStart(2, '0');
      this.minutesTarget.textContent = String(minutes).padStart(2, '0');
    }, 60000); // 1分ごとに更新
  }

  pause() {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
  }

  reset() {
    this.totalSeconds = 0;
    clearInterval(this.timerInterval);
    this.timerInterval = null;
    this.hoursTarget.textContent = '00';
    this.minutesTarget.textContent = '00';
  }
}
