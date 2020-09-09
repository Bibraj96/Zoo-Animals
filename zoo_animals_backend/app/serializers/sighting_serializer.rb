class SightingSerializer < ActiveModel::Serializer
  attributes :id, :animal, :exhibit, :date, :schedule, :accessibility, :description
  belongs_to :zoo
end
