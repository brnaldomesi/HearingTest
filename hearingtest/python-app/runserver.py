import os
from flask import Flask
import flask

import app
import settings

if __name__ == '__main__':
    application = Flask(__name__, static_folder='../static-app', static_url_path='')
else:
    application = Flask(__name__)
application.secret_key = settings.APP_SECRET_KEY

app.urls.add_urls(application)

if __name__ == '__main__':
    os.environ["WERKZEUG_DEBUG_PIN"] = "off"
    application.run("0.0.0.0", debug=True, use_reloader=True)
else:
    import logging
    #setup error file
    from logging.handlers import RotatingFileHandler
    file_handler = RotatingFileHandler(settings.ERROR_FILE, maxBytes=1024 * 1024 * 100, backupCount=20)
    file_handler.setLevel(logging.ERROR)
    formatter = logging.Formatter("\n%(asctime)s - %(name)s - %(levelname)s - %(message)s")
    file_handler.setFormatter(formatter)
    application.logger.addHandler(file_handler)
