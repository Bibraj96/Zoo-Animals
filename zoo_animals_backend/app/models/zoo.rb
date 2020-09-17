class Zoo < ApplicationRecord
  has_many :sightings

  validates :name, presence: true
  validates :city, presence: true
  validates :state, presence: true
end
