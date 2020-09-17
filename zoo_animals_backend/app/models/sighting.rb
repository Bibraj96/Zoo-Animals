class Sighting < ApplicationRecord
  belongs_to :zoo

  validates :animal, presence: true
  validates :exhibit, presence: true
  validates :schedule, presence: true
  validates :date, presence: true
  validates :description, presence: true
  validates :accessibility, presence: true
end
