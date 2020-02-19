# chat-space DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|name|string|null: false|
### Association
- has_many :group
- has_many :message
- has_many :chat
- has_many :group, through: :group_user

##  groupテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :user
- has_many :message
- has_many :chat
- has_many :user, through: :group_user

## group_userテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belong_to :user
- belong_to :group

## chatテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- has_many :message
- belongs_to :user
- belongs_to :group

## messageテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|chat_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group
- belongs_to :chat