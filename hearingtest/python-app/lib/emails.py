import boto.ses
import settings

def get_connection():
    return boto.ses.connect_to_region(settings.AWS_SES_REGION_DEFAULT, aws_access_key_id=settings.AWS_SES_KEY, aws_secret_access_key=settings.AWS_SES_SECRET)
    # incase of changes later
    if settings.STAGING or settings.PROD:
        return boto.ses.connect_to_region(settings.AWS_SES_REGION_DEFAULT)
    else:
        return boto.ses.connect_to_region(settings.AWS_SES_REGION_DEFAULT, aws_access_key_id=settings.AWS_SES_KEY, aws_secret_access_key=settings.AWS_SES_SECRET)


def send_email(sender=None, subject="", to_addresses=None, cc_addresses=None, reply_addresses=None, return_path=None, text_body=None, html_body=None, bcc_addresses=None, conn=None):
    if not sender:
        sender = settings.EMAIL_DEFAULT_SITE_SENDER

    if not conn:
        conn = get_connection()

    if html_body:
        format="html"
    else:
        format="text"

    body = None
    bcc_addresses = bcc_addresses

    r = conn.send_email(sender, subject, body, to_addresses, cc_addresses, bcc_addresses, format, reply_addresses, return_path, text_body, html_body)

    return r
