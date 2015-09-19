import requests
import json


def send_email(**kwargs):
    sender = kwargs.pop("sender", None)
    to = kwargs.pop("to", None)
    title = kwargs.pop("title", None)
    text = kwargs.pop("text", None)
    html = kwargs.pop("html", None)
    extra = kwargs.pop("extra", {})
    API_KEY = kwargs.pop("API_KEY", None)
    
    tracking = kwargs.pop("tracking", True)

    extra.update({"sender":sender})
    
    if html:
        return requests.\
            post(("https://api.mailgun.net/v2/sandbox9474.mailgun.org/"
                  "messages"),
                 auth=("api", API_KEY),
                 data={
                     "from": sender,
                     "to": to,
                     "subject": title,
                     "text": text,
                     "html" : html,
                     "h:X-Mailgun-Variables": json.dumps(extra),
                     "o:tracking" : tracking,
                     }
                 )
    else:
        return requests.\
            post(("https://api.mailgun.net/v2/sandbox9474.mailgun.org/"
                  "messages"),
                 auth=("api", API_KEY),
                 data={
                     "from": sender,
                     "to": to,
                     "subject": title,
                     "text": text,
                     "h:X-Mailgun-Variables": json.dumps(extra),
                     "o:tracking" : tracking,
                     }
                 )       