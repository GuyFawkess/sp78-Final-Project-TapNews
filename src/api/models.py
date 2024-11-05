from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.now())

    comments = db.relationship("Comment", back_populates="user")
    likes = db.relationship("Like", back_populates="user")
    saved_news = db.relationship("SavedNews", back_populates="user")
    messages = db.relationship("Message", back_populates="sender")
    friendships = db.relationship("Friendship", back_populates="user")
    comment_replies = db.relationship("CommentReply", back_populates="user")
    profile = db.relationship("Profile", uselist=False, back_populates="user")
    
class Profile(db.Model):
    __tablename__ = "profile"
    
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    user_id = db.Column(db.BigInteger, db.ForeignKey('user.id'), unique=True, nullable=False)
    img_url = db.Column(db.String, nullable=True)
    description = db.Column(db.String, nullable=True)
    birthdate = db.Column(db.DateTime, nullable=True)

    user = db.relationship("User", back_populates="profile")

class News(db.Model):
    __tablename__ = 'news'
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    title = db.Column(db.String, nullable=False)
    content = db.Column(db.String, nullable=False)
    author = db.Column(db.String)
    genre = db.Column(db.String)
    url = db.Column(db.String, nullable=False)
    source = db.Column(db.String, nullable=False)
    newspaper = db.Column(db.String)
    published_at = db.Column(db.TIMESTAMP)
    media_type = db.Column(db.String, db.CheckConstraint("media_type IN ('image', 'video')"))
    media_url = db.Column(db.String)

    comments = db.relationship("Comment", back_populates="news")
    likes = db.relationship("Like", back_populates="news")
    saved_news = db.relationship("SavedNews", back_populates="news")

class Comment(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    user_id = db.Column(db.BigInteger, db.ForeignKey('user.id'))
    news_id = db.Column(db.BigInteger, db.ForeignKey('news.id'))
    content = db.Column(db.String, nullable=False)
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.now())

    user = db.relationship("User", back_populates="comments")
    news = db.relationship("News", back_populates="comments")
    replies = db.relationship("CommentReply", back_populates="comment")

class CommentReply(db.Model):
    __tablename__ = 'comment_replies' 
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    comment_id = db.Column(db.BigInteger, db.ForeignKey('comments.id'))
    user_id = db.Column(db.BigInteger, db.ForeignKey('user.id'))
    content = db.Column(db.String, nullable=False)
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.now())

    comment = db.relationship("Comment", back_populates="replies")
    user = db.relationship("User", back_populates="comment_replies")
    
class Like(db.Model):
    __tablename__ = 'likes' 
    user_id = db.Column(db.BigInteger, db.ForeignKey('user.id'), primary_key=True)
    news_id = db.Column(db.BigInteger, db.ForeignKey('news.id'), primary_key=True)

    user = db.relationship("User", back_populates="likes")
    news = db.relationship("News", back_populates="likes")

class SavedNews(db.Model):
    __tablename__ = 'saved_news'
    user_id = db.Column(db.BigInteger, db.ForeignKey('user.id'), primary_key=True)
    news_id = db.Column(db.BigInteger, db.ForeignKey('news.id'), primary_key=True)
    
    user = db.relationship("User", back_populates="saved_news")
    news = db.relationship("News", back_populates="saved_news")

class Chat(db.Model):
    __tablename__ = 'chats'

    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    user1_id = db.Column(db.BigInteger, db.ForeignKey('user.id'))
    user2_id = db.Column(db.BigInteger, db.ForeignKey('user.id'))
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.now())

class Message(db.Model):
    __tablename__ = 'messages'
    
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    chat_id = db.Column(db.BigInteger, db.ForeignKey('chats.id'))
    sender_id = db.Column(db.BigInteger, db.ForeignKey('user.id'))
    content = db.Column(db.String, nullable=False)
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.now())

    sender = db.relationship("User", back_populates="messages")

class Friendship(db.Model):
    __tablename__ = 'friendships'
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    user_id = db.Column(db.BigInteger, db.ForeignKey('user.id'))
    friend_id = db.Column(db.BigInteger, db.ForeignKey('user.id'))
    is_active = db.Column(db.Boolean, nullable=False, default=True)
    created_at = db.Column(db.TIMESTAMP, server_default=db.func.now())

    user = db.relationship("User", back_populates="friendships")
    

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }