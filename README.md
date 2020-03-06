# chat-space DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, add_index :users, [:name, :email]|
### Association
- has_many :groups, through: :groups_users
- has_many :groups_users
- has_many :messages

##  groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :users, through: :groups_users
- has_many :groups_users
- has_many :messages

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true, add_index :groups_users, :user_id|
|group_id|integer|null: false, foreign_key: true, add_index :groups_users, :group_id|
### Association
- belong_to :user
- belong_to :group

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|content|text||
|image|string||
|user_id|integer|null: false, foreign_key: true, add_index :messages, :user_id|
|group_id|integer|null: false, foreign_key: true, add_index :messages, :group_id|
### Association
- belongs_to :user
- belongs_to :group
##########################################################
##########################################################