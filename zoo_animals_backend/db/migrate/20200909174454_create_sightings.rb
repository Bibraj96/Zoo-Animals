class CreateSightings < ActiveRecord::Migration[6.0]
  def change
    create_table :sightings do |t|
      t.string :animal
      t.string :exhibit
      t.string :date
      t.string :schedule
      t.string :accessibility
      t.string :description
      t.references :zoo, null: false, foreign_key: true

      t.timestamps
    end
  end
end
