class TimersController < ApplicationController
  before_action :set_timer, only: [:update, :destroy]

  def new ;end

  # POST /timers
  def create
    @timer = current_user.timers.create(timer_params)
    if @timer.save
      render json: @timer, status: :created, location: @timer
    else
      render json: @timer.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /timers/1
  def update
    if @timer.update(timer_params)
      render json: @timer
    else
      render json: @timer.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_timer
      @timer = Timer.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def timer_params
      params.require(:timer).permit(:start_time, :pause_time, :end_time)
    end
end
