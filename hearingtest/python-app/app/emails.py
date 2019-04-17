from flask import render_template
import settings
from lib import emails


def send_email_from_template(to, subject, template, template_vars, body=None, cc=None, bcc=None, sender=None):
    if not settings.EMAILS:
        return None
    if not sender:
        sender = settings.EMAIL_DEFAULT_SITE_SENDER
    if not isinstance(to, list):
        to = [to]

    html = render_template(""+str(template), **template_vars)

    return emails.send_email(sender, subject, to, cc_addresses=cc, reply_addresses=None, return_path=None, text_body=body, html_body=html, bcc_addresses=bcc, conn=None)


def send_email_text(to, subject, body, cc=None, bcc=None, sender=None):
    if not settings.EMAILS:
        return None
    if not sender:
        sender = settings.EMAIL_DEFAULT_SITE_SENDER
    if not isinstance(to, list):
        to = [to]

    return emails.send_email(sender, subject, to, cc_addresses=cc, reply_addresses=None, return_path=None, text_body=body, html_body=None, bcc_addresses=bcc, conn=None)
