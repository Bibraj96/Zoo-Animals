class ZooSerializer < ActiveModel::Serializer
  attributes :id, :name, :city, :state
  has_many :sightings
end
