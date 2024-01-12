class TimersController < ApplicationController
  # POST /timers/start
  def start
    @timer = current_user.timers.create(start_time: Time.current)
    render json: @timer, status: :ok
  end

  # POST /timers/stop
  def end 
    @timer = current_user.timers.last
    if @timer.update(end_time: Time.current)
      render json: @timer, status: :ok
    else
      render json: @timer.errors, status: :unprocessable_entity
    end
  end
end
