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
- belong_to :users
- belong_to :groups

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|content|text|null: false|
|image|string||
|user_id|integer|null: false, foreign_key: true, add_index :messages, :user_id|
|group_id|integer|null: false, foreign_key: true, add_index :messages, :group_id|
### Association
- belongs_to :users
- belongs_to :groups