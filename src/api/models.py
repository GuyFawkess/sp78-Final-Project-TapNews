from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import ARRAY

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String(300), nullable=False)
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.now())

    comments = db.relationship("Comment", back_populates="user")
    likes = db.relationship("Like", back_populates="user")
    saved_news = db.relationship("SavedNews", back_populates="user")
    messages_sender = db.relationship("Message", foreign_keys='Message.sender_id', back_populates="sender") 
    messages_receiver = db.relationship("Message", foreign_keys='Message.receiver_id', back_populates="receiver")
    friendships = db.relationship("Friendship", foreign_keys='Friendship.user_id', back_populates="user")
    comment_replies = db.relationship("CommentReply", back_populates="user")
    profile = db.relationship("Profile", uselist=False, back_populates="user")
    
    def __repr__(self):
        return '<User %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
        }
    
class Profile(db.Model):
    __tablename__ = "profile"
    
    id = db.Column(db.BigInteger, primary_key=True)
    user_id = db.Column(db.BigInteger, db.ForeignKey('user.id'), unique=True, nullable=False)
    img_url = db.Column(db.String, nullable=True)
    description = db.Column(db.String, nullable=True)
    birthdate = db.Column(db.DateTime, nullable=True)

    user = db.relationship("User", back_populates="profile")

    def __repr__(self):
        return '<Profile %r>' % self.user_id

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "img_url": self.img_url,
            "description": self.description,
            "birthdate": self.birthdate.isoformat() if self.birthdate else None,
        }
    
class News(db.Model):
    __tablename__ = 'news'
    id = db.Column(db.String(300), primary_key=True)
    title = db.Column(db.String, nullable=False)
    content = db.Column(db.String, nullable=False)
    similar_news = db.Column(ARRAY(db.String))
    genre = db.Column(ARRAY(db.String))
    url = db.Column(db.String, nullable=False)
    newspaper = db.Column(db.String, nullable=False)
    published_at = db.Column(db.TIMESTAMP)
    media_url = db.Column(db.String)

    comments = db.relationship("Comment", back_populates="news")
    likes = db.relationship("Like", back_populates="news")
    saved_news = db.relationship("SavedNews", back_populates="news") 

    def __repr__(self):
        return '<News %r>' % self.title

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "similar_news": self.similar_news,
            "genre": self.genre,
            "url": self.url,
            "newspaper": self.newspaper,
            "published_at": self.published_at.isoformat() if self.published_at else None,
            "media_url": self.media_url,
        }
    
class Comment(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    user_id = db.Column(db.BigInteger, db.ForeignKey('user.id'))
    news_id = db.Column(db.String(300), db.ForeignKey('news.id'))
    content = db.Column(db.String, nullable=False)
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.now())

    user = db.relationship("User", back_populates="comments")
    news = db.relationship("News", back_populates="comments")
    replies = db.relationship("CommentReply", back_populates="comment")

    def __repr__(self):
        return '<Comment %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "news_id": self.news_id,
            "content": self.content,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }

class CommentReply(db.Model):
    __tablename__ = 'comment_replies' 
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    comment_id = db.Column(db.BigInteger, db.ForeignKey('comments.id'))
    user_id = db.Column(db.BigInteger, db.ForeignKey('user.id'))
    content = db.Column(db.String, nullable=False)
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.now())

    comment = db.relationship("Comment", back_populates="replies")
    user = db.relationship("User", back_populates="comment_replies")
    
    def __repr__(self):
        return '<CommentReply %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "comment_id": self.comment_id,
            "user_id": self.user_id,
            "content": self.content,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
class Like(db.Model):
    __tablename__ = 'likes' 
    user_id = db.Column(db.BigInteger, db.ForeignKey('user.id'), primary_key=True)
    news_id = db.Column(db.String(300), db.ForeignKey('news.id'), primary_key=True)

    user = db.relationship("User", back_populates="likes")
    news = db.relationship("News", back_populates="likes")

    def __repr__(self):
        return '<Like user_id=%r, news_id=%r>' % (self.user_id, self.news_id)

    def serialize(self):
        return {
            "user_id": self.user_id,
            "news_id": self.news_id
        }

class SavedNews(db.Model):
    __tablename__ = 'saved_news'
    user_id = db.Column(db.BigInteger, db.ForeignKey('user.id'), primary_key=True)
    news_id = db.Column(db.String(300), db.ForeignKey('news.id'), primary_key=True)
    
    user = db.relationship("User", back_populates="saved_news")
    news = db.relationship("News", back_populates="saved_news")


    def __repr__(self):
        return '<SavedNews user_id=%r, news_id=%r>' % (self.user_id, self.news_id)

    def serialize(self):
        return {
            "user_id": self.user_id,
            "news_id": self.news_id
        }
    
class Chat(db.Model):
    __tablename__ = 'chats'

    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    user1_id = db.Column(db.BigInteger, db.ForeignKey('user.id'))
    user2_id = db.Column(db.BigInteger, db.ForeignKey('user.id'))
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.now())

    def __repr__(self):
        return '<Chat id=%r, user1_id=%r, user2_id=%r>' % (self.id, self.user1_id, self.user2_id)

    def serialize(self):
        return {
            "id": self.id,
            "user1_id": self.user1_id,
            "user2_id": self.user2_id,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }

class Message(db.Model):
    __tablename__ = 'messages'
    
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    chat_id = db.Column(db.BigInteger, db.ForeignKey('chats.id'))
    sender_id = db.Column(db.BigInteger, db.ForeignKey('user.id'))
    receiver_id = db.Column(db.BigInteger, db.ForeignKey('user.id'))
    content = db.Column(db.String, nullable=False)
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.now())

    sender = db.relationship("User", foreign_keys=[sender_id], back_populates="messages_sender")
    receiver = db.relationship("User", foreign_keys=[receiver_id], back_populates="messages_receiver")

    def __repr__(self):
        return '<Message id=%r, chat_id=%r, sender_id=%r, receiver_id=%r>' % (self.id, self.chat_id, self.sender_id, self.receiver_id)

    def serialize(self):
        return {
            "id": self.id,
            "chat_id": self.chat_id,
            "sender_id": self.sender_id,
            "receiver_id": self.receiver_id,
            "content": self.content,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }
    
class Friendship(db.Model):
    __tablename__ = 'friendships'
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    user_id = db.Column(db.BigInteger, db.ForeignKey('user.id'))
    friend_id = db.Column(db.BigInteger, db.ForeignKey('user.id'))
    is_active = db.Column(db.Boolean, nullable=False, default=True)
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.now())

    user = db.relationship("User", foreign_keys=[user_id], back_populates="friendships")
    friend = db.relationship("User", foreign_keys=[friend_id])

    def __repr__(self):
        return '<Friendship id=%r, user_id=%r, friend_id=%r>' % (self.id, self.user_id, self.friend_id)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "friend_id": self.friend_id,
            "is_active": self.is_active,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }