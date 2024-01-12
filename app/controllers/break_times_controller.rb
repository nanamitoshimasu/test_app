class BreakTimesController < ApplicationController
  # POST /break_times/pause
  def pause
    @break_time = current_user.break_times.create(break_start_time: Time.current)
    render json: @break_time, status: :ok
  end

  # POST /break_times/resume
  def resume
    @break_time = current_user.break_times.last
    if @break_time.update(break_end_time: Time.current)
      render json: @break_time, status: :ok
    else
      render json: @break_time.errors, status: :unprocessable_entity
    end
  end
end
