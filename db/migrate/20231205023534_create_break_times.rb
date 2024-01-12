class CreateBreakTimes < ActiveRecord::Migration[7.0]
  def change
    create_table :break_times do |t|
      t.references :user, null: false, foreign_key: true
      t.datetime :break_start_time, null: false
      t.datetime :break_end_time

      t.timestamps
    end
  end
end
