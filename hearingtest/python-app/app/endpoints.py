from flask import render_template, make_response, request, session, g, redirect, url_for, abort, jsonify, redirect, send_from_directory
import emails
import createsend
import requests
import re
import json

# defines index of webserver
def index():
    return make_response("Welcome!")

# used for the fda hearing test to send results
def form_submit():
    tv = {}
    to = "mobiletest@audicus.com"
    subject = "Hearing Test Email"
    template = "emails/notify.html"
    tv["title"] = "hearing test"
    if request.method == "POST":
        d = request.get_json()
        if d is None or len(d) == 0:
            return jsonify(success=False), 400
        tv["body"] = str(d.get('user')) + d.get('report')

    emails.send_email_from_template(to, subject, template, tv)
    return jsonify(succuss=True)

# used to send lead gen email to users email as well as record them into campaign monitor
def lead_email():
    tv = {}
    subject = "Your Hearing Results"
    template = "emails/lead.html"
    # check for post request
    if request.method == "POST":
        print "value of d"
        d = request.get_json()
        if d is None or len(d) == 0:
            return jsonify(success=False), 400
        tv["results"] = d.get('results')
        tv["range"] = d.get('range')
        tv["tones"] = d.get('tones')
        # send email to user with their results
        emails.send_email_from_template(d.get('user')['email'], subject, template, tv)
        name=None
        result_step=None
        result_score=str(d.get('results'))
        result_age=d.get('user')['age']
        result_gender=d.get('user')['gender']
        result_overall=str(d.get('range'))
        result_about=str(d.get('user')['hearingEnviroments'])
        update=None
        # add user to campaign monitor
        _createsend_add_email(d.get('user')['email'], name, result_step, result_score, result_age, result_gender, result_overall, result_about, update)
    return jsonify(success=True)

# used to test email template
def test_email():
    tv = {}
    subject = "Your Hearing Results"
    template = "emails/lead.html"
    # check for post request
    if request.method == "POST":
        d = request.get_json()
        if d is None or len(d) == 0:
            return jsonify(success=False), 400
        tv["results"] = d.get('results')
        tv["range"] = d.get('range')
        tv["tones"] = d.get('tones')
        print d.get('results')
        print d.get('user')['email']
        # send email to user with their results
        emails.send_email_from_template(d.get('user')['email'], subject, template, tv)
    return jsonify(success=True)

# used to record users into campaign monitor
def lead_campaign():
    tv = {}
    if request.method == "POST":
        d = request.get_json()
        if d is None or len(d) == 0:
            return jsonify(success=False), 400
        name=None
        result_step=None
        result_score=None
        result_age=d.get('user')['age']
        result_gender=d.get('user')['gender']
        result_overall=None
        result_about=json.dumps(d.get('user')['hearingEnviroments'])
        update=None
        # add user to campaign monitor
        _createsend_add_email(d.get('user')['email'], name, result_step, result_score, result_age, result_gender, result_overall, result_about, update)
    return jsonify(success=True)

# used to send createsend user information and email
def _createsend_add_email(email, name=None, result_step=None, result_score=None, result_age=None, result_gender=None, result_overall=None, result_about=None, update=None):
    # update is not needed - api is kinda stupid
    # CREATESEND_API_CLIENT_ID = "e24bd5b1fdd3a9acfd2023bd58cfabeb"
    # CREATESEND_API_KEY = "8481418a9bbd798fa1af7a7d15664d08"
    # LEADGEN_LIST = "d7875206c917ceed3d61f446e388a55d"
    # auth_dict = {'api_key': CREATESEND_API_KEY}
    # cs = createsend.CreateSend(auth_dict)
    # clients = cs.clients()
    names = name.split(' ') if name is not None else ['']

    custom_fields = { "string--Group_LeadGenTest": 'yes' }
    if result_step:
        custom_fields["string--Group_LeadGenTest_ResultStep"] = result_step
    if result_score:
        custom_fields["string--Group_LeadGenTest_ResultScore"] = result_score
    if result_age:
        custom_fields["string--LeadGenTest_Age"] = result_age
    if result_gender:
        custom_fields["string--LeadGenTest_Gender"] = result_gender
    if result_overall:
        custom_fields["string--LeadGenTest_OverallScore"] = result_overall
    if result_about:
        custom_fields["string--LeadGenTest_About"] = result_about

    data = {
        "contact": {
            "FirstName": names[0],
            "LastName": names[-1] if len(names) > 0 else '',
            "Email": email,
            "custom": custom_fields
        }
    }

    response = requests.post(
        url="https://api2.autopilothq.com/v1/contact",
        data=json.dumps(data),
        headers={
            "autopilotapikey": "bb8ac36f8df54e26812ea3c57f140a67",
            "Content-Type": "application/json"
        }
    )

    print(response.json())
    return

# testing function - not used
def test_add_email_to_list():
    email="testLeadGenEmail@audicus.com"
    name=None
    result_step="2"
    result_score=None
    update=None
    _createsend_add_email(email, name, result_step, result_score, update)
