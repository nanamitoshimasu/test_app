class CreateTimers < ActiveRecord::Migration[7.0]
  def change
    create_table :timers do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :start_time, null: false
      t.integer :end_time

      t.timestamps
    end
  end
end
