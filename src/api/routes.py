"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Profile, SavedNews, Like, Friendship, Message, Chat, News, Comment
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.models import db, User, Profile
from werkzeug.security import generate_password_hash, check_password_hash
from random import randint

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

from flask_jwt_extended import create_access_token


@api.route('/signup', methods=['POST'])
def create_user():
    request_body = request.json
    user_query = User.query.filter_by(email=request_body["email"]).first()
    if user_query is None:
        create_user = User(
            username=request_body["username"],
            email=request_body["email"],
            password=generate_password_hash(request_body["password"]),
            id=request_body["user_id"]
        )
        db.session.add(create_user)
        db.session.commit()
        
        # Crear el perfil
        new_profile = Profile(
            description="Este es el perfil de " + request_body["username"],
            user_id=create_user.id,
            id=create_user.id
        )
        db.session.add(new_profile)
        db.session.commit()

        response_body = {"msg": "Usuario creado con éxito"}
        return jsonify(response_body), 200
    else:
        response_body = {"msg": "Usuario existente"}
        return jsonify(response_body), 400


# Crea una ruta para autenticar a los usuarios y devolver el token JWT
# La función create_access_token() se utiliza para generar el JWT
@api.route("/login", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    # Consulta la base de datos por el nombre de usuario y la contraseña
    user = User.query.filter_by(email=email).first()

    if user is None or not check_password_hash(user.password, password):
        return jsonify({"msg": "Bad username or password"}), 401
    
    # Crea un nuevo token con el id de usuario dentro
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id })

@api.route("/logout", methods=["POST"])
def logout():
    return jsonify({"msg": "Logged out complete"}), 200

@api.route ('/User', methods= ['GET'] )
@jwt_required()
def get_users():
    users = User.query.all()
    result = [user.serialize() for user in users]
    current_user_id = get_jwt_identity()
    print(current_user_id)
    return jsonify({"users": result}), 200

@api.route('/user/<string:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"error": "User id doesn't exist"}), 404
    response_body = user.serialize()
    return jsonify(response_body), 200

@api.route('/user/<string:id>/friends', methods=['GET'])
def get_user_friends(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"error": "User id doesn't exist"}), 404
    friends_ids = [friendship.friend_id for friendship in user.friendships if friendship.is_active]
    friend_of = Friendship.query.filter_by(friend_id=user.id).all()
    friend_of_ids = [friendship.user_id for friendship in friend_of]
    mutual_friends = list(set(friends_ids) & set(friend_of_ids))
    return jsonify({"friends": mutual_friends}), 200

@api.route('/user/<string:id>/friends/pending', methods=['GET'])
def get_user_pending_frienships(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"error": "User id doesn't exist"}), 404
    all_friends = [friendship.friend_id for friendship in user.friendships if friendship.is_active]
    friend_of_ids = [friendship.user_id for friendship in Friendship.query.filter_by(friend_id=user.id).all()]
    pending_friends = list(set(all_friends) - set(friend_of_ids))
    return jsonify ({"pending_friends": pending_friends}), 200

@api.route('user/<string:id>/friends/incoming', methods=['GET'])
def get_user_incoming_friendships(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"error": "User id doesn't exist"}), 404
    user_friends = [friendship.friend_id for friendship in user.friendships if friendship.is_active]
    friend_of_ids = [friendship.user_id for friendship in Friendship.query.filter_by(friend_id=user.id).all()]
    incoming_friends = list(set(friend_of_ids) - set(user_friends))
    return jsonify({"incoming_friends": incoming_friends}), 200

@api.route('/profile/<string:id>', methods=['GET'])
def get_profile(id):
    profile = Profile.query.get(id)
    if not profile:
        return jsonify({"error": "This profile doesn't exist"}), 404
    response_body = profile.serialize()
    return jsonify(response_body), 200

@api.route('/profile/<string:id>', methods=['PUT'])
def modify_profile(id):
    data = request.get_json()
    profile = Profile.query.get(id)
    if not profile:
        return jsonify({"error": "This profile doesn't exist"}), 404
    img_url = data.get('image_url')
    if img_url is not None:
        profile.img_url = img_url
    description = data.get('description')
    if description is not None:
        profile.description = description
    birthdate = data.get('birthdate')
    if birthdate is not None:
        profile.birthdate = birthdate
    db.session.commit()
    return jsonify(profile.serialize()), 200
 
@api.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    response_body = [user.serialize() for user in users]
    return jsonify(response_body), 200

@api.route('/profiles', methods=['GET'])
def get_all_profiles():
    profiles = Profile.query.all()
    response_body = [profile.serialize() for profile in profiles]
    return jsonify(response_body), 200

@api.route('/friendship', methods=['POST'])
def add_friendship():
    data = request.get_json()
    user_id = data.get('user_id')
    friend_id = data.get('friend_id')
    if not user_id or not friend_id:
        return jsonify({"error": "user_id and friend_id are required"}), 400
    existing_friend = Friendship.query.filter_by(user_id=user_id, friend_id=friend_id).first()
    if existing_friend:
        return jsonify({"error": "This friendship already exists"}), 409
    if user_id == friend_id:
        return jsonify({"error": "User and friend can't have the same id"}), 400
    friendship = Friendship(user_id=user_id, friend_id=friend_id)
    db.session.add(friendship)
    db.session.commit()
    return jsonify(friendship.serialize()), 200

@api.route('/friendship', methods=['DELETE'])
def delete_friendship():
    data = request.get_json()
    user_id = data.get('user_id')
    friend_id = data.get('friend_id')
    if not user_id or not friend_id:
        return jsonify({"error": "user_id and friend_id are required"}), 400
    friendship = Friendship.query.filter_by(user_id=user_id, friend_id=friend_id).first()
    if not friendship:
        return jsonify({"error": "This friendship doesn't exist"}), 404
    db.session.delete(friendship)
    db.session.commit()
    return jsonify({"success": "Friendship was correctly deleted"}), 200

@api.route('/friendship', methods=['PUT'])
def update_friend():
    data = request.get_json()
    user_id = data.get('user_id')
    friend_id = data.get('friend_id')
    if not user_id or not friend_id:
        return jsonify({"error": "user_id and friend_id are required"}), 400
    friendship = Friendship.query.filter_by(user_id=user_id, friend_id=friend_id).first()
    if not friendship:
        return jsonify({"error": "This friendship doesn't exist"}), 404
    if friendship.is_active == True:
        friendship.is_active = False
    else:
        friendship.is_active = True
    db.session.commit()
    return jsonify(friendship.serialize()), 200

@api.route('/like', methods=['POST'])
def add_like():
    data = request.get_json()
    user_id = data.get('user_id')
    news_id = data.get('news_id')
    if not user_id or not news_id:
        return jsonify({"error": "user_id and news_id is required"}), 400
    existing_like = Like.query.filter_by(user_id=user_id, news_id=news_id).first()
    if existing_like:
        return jsonify({"error": "This user has already liked this news"}), 409
    like = Like(user_id=user_id, news_id=news_id)
    db.session.add(like)
    db.session.commit()
    return jsonify(like.serialize()), 200

@api.route('/like', methods=['DELETE'])
def remove_like():
    data = request.get_json()
    user_id = data.get('user_id')
    news_id = data.get('news_id')
    if not user_id or not news_id:
        return jsonify({"error": "user_id and news_id is required"}), 400
    like = Like.query.filter_by(user_id=user_id, news_id=news_id).first()
    if not like:
        return jsonify({"error": "This like doesn't exist"}), 404
    db.session.delete(like)
    db.session.commit()
    return jsonify({"succes": "Like was correctly removed"}), 200

@api.route('/user/<string:id>/likes', methods=['GET'])
def get_user_likes(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    likes_list = Like.query.filter_by(user_id=id).all()
    id_list = [like.news_id for like in likes_list]
    return jsonify(id_list), 200

@api.route('/saved_news', methods=['POST'])
def save_news():
    data = request.get_json()
    user_id = data.get('user_id')
    news_id = data.get('news_id')
    if not user_id or not news_id:
        return jsonify({"error": "user_id and news_id is required"}), 400
    existing_save = SavedNews.query.filter_by(user_id=user_id, news_id=news_id).first()
    if existing_save:
        return jsonify({"error": "This user has already saved this news"}), 409
    save = SavedNews(user_id=user_id, news_id=news_id)
    db.session.add(save)
    db.session.commit()
    return jsonify(save.serialize()), 200

@api.route('/saved_news', methods=['DELETE'])
def remove_saved_news():
    data = request.get_json()
    user_id = data.get('user_id')
    news_id = data.get('news_id')
    if not user_id or not news_id:
        return jsonify({"error": "user_id and news_id is required"}), 400
    save = SavedNews.query.filter_by(user_id=user_id, news_id=news_id).first()
    if not save:
        return jsonify({"error": "These news isn't saved"}), 404
    db.session.delete(save)
    db.session.commit()
    return jsonify({"succes": "News was correctly removed"}), 200

@api.route('/user/<string:id>/saved_news', methods=['GET'])
def get_user_saved_news(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    saved_news_list = SavedNews.query.filter_by(user_id=id).all()
    if not saved_news_list:
        return jsonify([]), 200
    id_list = [news.news_id for news in saved_news_list]
    news_list = News.query.filter(News.id.in_(id_list)).all()
    response_body = [news.serialize() for news in news_list]
    return jsonify(response_body), 200

@api.route('/news', methods=['POST'])
def add_news():
    data = request.get_json()
    id = data.get('uuid')
    existing_news = News.query.filter_by(id=id).first()
    if existing_news:
        return jsonify({"not processed": "News is already in database"}), 200
    title = data.get('title')
    content = data.get('snippet')
    genre = data.get('categories')
    url = data.get('url')
    newspaper = data.get('source')
    published_at = data.get('published_at')
    media_url = data.get('image_url')
    similar_news = data.get('similar')
    news = News(id=id, title=title, content=content, genre=genre, url=url, newspaper=newspaper, published_at=published_at, media_url=media_url, similar_news=similar_news)
    db.session.add(news)
    db.session.commit()
    return jsonify(news.serialize()), 200

@api.route('/news', methods=['GET'])
def get_all_news():
    all_news = News.query.all()
    response_body = [news.serialize() for news in all_news]
    return jsonify(response_body), 200

@api.route('/news/<string:id>', methods=['GET'])
def get_single_news(id):
    news = News.query.get(id)
    if not news:
        return jsonify({"error": "News id doesn't exist"}), 404
    response_body = news.serialize()
    return jsonify(response_body), 200

@api.route('/news/<string:id>/likes', methods=['GET'])
def get_news_like_count(id):
    news = News.query.get(id)
    if not news:
        return jsonify({"error": "News id doesn't exist"}), 404
    likes = len(news.likes)
    return jsonify({"like_count": likes}), 200

@api.route('/news/<string:id>/comments', methods=['POST'])
def post_comment(id):
    data = request.get_json()
    user_id = data.get('user_id')
    content = data.get('content')
    if not user_id or not content:
        return jsonify({"error": "comment must have a user_id and content"}), 400
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User doesn't exist"}), 404
    news = News.query.get(id)
    if not news:
        return jsonify({"error": "News don't exist in database"}), 404
    comment = Comment(user_id=user_id, news_id=id, content=content)
    db.session.add(comment)
    db.session.commit()
    return jsonify(comment.serialize()), 200

@api.route('/news/<string:id>/comments', methods=['GET'])
def get_news_comments(id):
    news = News.query.get(id)
    if not news:
        return jsonify({"error": "News id doesn't exist"}), 404
    comments = Comment.query.filter_by(news_id=id).all()
    user_ids = [comment.user_id for comment in comments]
    users = {user.id: user for user in User.query.filter(User.id.in_(user_ids)).all()}
    profiles = {profile.user_id: profile for profile in Profile.query.filter(Profile.user_id.in_(user_ids)).all()}
    comment_list = [{"id": comment.id,
            "user_id": comment.user_id,
            "news_id": comment.news_id,
            "content": comment.content,
            "created_at": comment.created_at.isoformat() if comment.created_at else None,
            "username": users.get(comment.user_id).username,
            "img_url": profiles.get(comment.user_id).img_url
            } 
            for comment in comments]
    return jsonify({"comments": comment_list}), 200

@api.route('/news/<string:id>/comments', methods=['DELETE'])
def delete_comment(id):
    data = request.get_json()
    user_id = data.get('user_id')
    news_id = id
    content = data.get('content')
    if not user_id or not content:
        return jsonify({"error": "User_id and comment content must be provided"}), 400
    comment = Comment.query.filter_by(user_id=user_id, news_id=news_id, content=content).first()
    if not comment:
        return jsonify({"error": "Comment not found"}), 404
    db.session.delete(comment)
    db.session.commit()
    return jsonify({"succes": "Comment was successfully removed"}), 200