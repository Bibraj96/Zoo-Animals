class SightingSerializer < ActiveModel::Serializer
  attributes :id, :animal, :exhibit, :date, :schedule, :accessibility, :description
  has_one :zoo
end
