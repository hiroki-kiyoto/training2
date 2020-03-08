class Post < ApplicationRecord
    belongs_to :user
    has_many :comments, dependent: :destroy
    has_many :likes
    has_many :liked_users, through: :likes, source: :user
    
    validates :video, presence: true
    mount_uploader :video, VideoUploader
end
