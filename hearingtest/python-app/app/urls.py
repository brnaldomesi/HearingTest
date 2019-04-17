import endpoints

def add_urls(app):

    app.add_url_rule("/app/", "index", view_func=endpoints.index, methods=['GET','POST'])
    app.add_url_rule("/app/submit/", "form_submit", view_func=endpoints.form_submit, methods=['GET','POST'])
    app.add_url_rule("/app/lead/", "lead_email", view_func=endpoints.lead_email, methods=['GET', 'POST'])
    app.add_url_rule("/app/campaign/", "lead_campaign", view_func=endpoints.lead_campaign, methods=['GET', 'POST'])

    #todo - dont leave
    # app.add_url_rule("/app/emailtest/", "test_email", view_func=endpoints.test_email, methods=['GET', 'POST'])
    # app.add_url_rule("/app/test/lead/email/add/", "test_lead_email", view_func=endpoints.test_add_email_to_list, methods=['GET', 'POST'])
    return
