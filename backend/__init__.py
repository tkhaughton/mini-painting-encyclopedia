import os

from flask import Flask
from . import db
from . import entry

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_pyfile(os.path.join(app.instance_path, 'config.py'))
    app.config['DATABASE'] = (os.path.join(app.instance_path, 'encyclopedia.db'))
    
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass
    
    db.init_app(app)
    app.register_blueprint(entry.bp)

    return app