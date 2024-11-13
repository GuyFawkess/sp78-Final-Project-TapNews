"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager
from api.models import db, User, Friendship, Profile, Like, SavedNews, News


# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

app.config["JWT_SECRET_KEY"] = "super-secret"  # ¡Cambia las palabras "super-secret" por otra cosa!
jwt = JWTManager(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

@app.route('/user/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"error": "User id doesn't exist"}), 404
    response_body = user.serialize()
    return jsonify(response_body), 200

@app.route('/user/<int:id>/friends', methods=['GET'])
def get_user_friends(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"error": "User id doesn't exist"}), 404
    friends_ids = [friendship.friend_id for friendship in user.friendships if friendship.is_active]
    return jsonify({"friends": friends_ids}), 200

@app.route('/profile/<int:id>', methods=['GET'])
def get_profile(id):
    profile = Profile.query.get(id)
    if not profile:
        return jsonify({"error": "This profile doesn't exist"}), 404
    response_body = profile.serialize()
    return jsonify(response_body), 200

@app.route('/profile/<int:id>', methods=['PUT'])
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
 

@app.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    response_body = [user.serialize() for user in users]
    return jsonify(response_body), 200

@app.route('/friendship', methods=['POST'])
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

@app.route('/friendship', methods=['DELETE'])
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

@app.route('/friendship', methods=['PUT'])
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

@app.route('/like', methods=['POST'])
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

@app.route('/like', methods=['DELETE'])
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

@app.route('/saved_news', methods=['POST'])
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

@app.route('/saved_news', methods=['DELETE'])
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

@app.route('/news', methods=['POST'])
def add_news():
    data = request.get_json()
    id = data.get('uuid')
    existing_news = News.query.filter_by(id=id).first()
    if existing_news:
        return jsonify({"error": "News is already in database"}), 400
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

@app.route('/news', methods=['GET'])
def get_all_news():
    all_news = News.query.all()
    response_body = [news.serialize() for news in all_news]
    return jsonify(response_body), 200

@app.route('/news/<int:id>', methods=['GET'])
def get_single_news(id):
    news = News.query.get(id)
    if not news:
        return jsonify({"error": "News id doesn't exist"}), 404
    response_body = news.serialize()
    return jsonify(response_body), 200


@app.route('/news/<int:id>/likes', methods=['GET'])
def get_news_like_count(id):
    news = News.query.get(id)
    if not news:
        return jsonify({"error": "News id doesn't exist"}), 404
    likes = len(news.likes)
    return jsonify({"like_count": likes}), 200



# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
