from urllib2 import urlopen
from lxml import html

import cPickle

import sys
import os

from database import ComicsDB

def parse_page(id):
    page_url = "http://xkcd.com/%s/" % id
    page = html.parse(urlopen(page_url)).getroot()

    title = page.cssselect("h1")[0].text
    image_url = page.cssselect("div.s > img")[0].attrib['src']
    
    alt = page.cssselect("div.s img")[1].attrib['title']
    transcript = page.cssselect("#transcript")[0].text

    return (id, title, alt, transcript, image_url)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print "Usage: %s <filename> <startid>" % sys.argv[0]
        sys.exit()
    file_name = sys.argv[1]
    db = ComicsDB(file_name)

    id = int(sys.argv[2])
    while True:
        if id != 404: #http://xkcd.com/404 is an obvious joke.
            if not db.get(id):
                comic_data = parse_page(id)
                db.put(*comic_data)
                print "Done %d" % id
        id += 1 
