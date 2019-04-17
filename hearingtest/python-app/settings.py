import os
import json
from hashlib import md5
from subprocess import check_output

def git_revision():
    return check_output(['git', 'log', '-1', '--format="%H"']).replace('"', '').strip()

# Use the md5 of the git hash so we don't expose git revisions publicly
STATIC_VERSION = md5(git_revision()).hexdigest()


#######
## SERVER TYPE SETTINGS
#######

FILEPATH = os.path.dirname(os.path.abspath(__file__))
TEMPLATE_PATH = os.path.join(FILEPATH, "templates")

SERVER_TYPE = ""
DEBUG = True
LOCAL = False
STAGING = True
PROD = False
EMAILS = True
print "Starting Server as STAGING"

server_type = {
    "server_type" : SERVER_TYPE,
    "debug" : DEBUG,
    "local" : LOCAL,
    "staging" : STAGING,
    "prod" : PROD
}


#######
## GENERAL SETTINGS
#######

#APP_SECRET_KEY = 'CHANGE ME -- import os; os.urandom(24)'
APP_SECRET_KEY = 'xxx'

MAX_COOKIE = 60*60*24*31 #1 month

# for uploads - 16 MB
MAX_CONTENT_LENGTH = 16 * 1024 * 1024

# sitewide min length for random byte strings
RANDOM_BYTES_LENGTH = 256

#######
## AWS SETTINGS
#######

#S3
AWS_IAM_USERNAME = "com.audicus.staging.iam"
AWS_KEY = "xxx"
AWS_SECRET = "xxx"
AWS_REGION_DEFAULT = "us-east-1"

#SES
AWS_SES_IAM_USERNAME = AWS_IAM_USERNAME
AWS_SES_KEY = AWS_KEY
AWS_SES_SECRET = AWS_SECRET
AWS_SES_REGION_DEFAULT = AWS_REGION_DEFAULT


#######
## EMAIL SETTINGS
#######

EMAIL_DEFAULT_EXTERNAL_SENDER = "Audicus <noreply@audicus.com>"
EMAIL_DEFAULT_SITE_SENDER = "noreply@audicus.com"
EMAIL_DEFAULT_BCC = ""

EMAIL_DEFAULT_NOTIFY = ""



#####
## ERROR HANDLING
#####

ERROR_FILE = '/var/log/uwsgi/error.log'

