import os
import codecs
import json
from TitleHTMLParser import TitleHTMLParser

linkRoot = ".."

htmlRoot = "../html"

titleHtmlParser = TitleHTMLParser()

links = []

def parseHtml(f):
    link = os.path.relpath(f, linkRoot)
    print(link)
    with codecs.open(f,"r","utf-8") as f:
        content = f.read()

    titleHtmlParser.feed(content)
    title = titleHtmlParser.data
    d = {}
    d['title'] = title
    d['href'] = link
    links.append(d)

def getLinks(dir):
    dirList = os.listdir(dir)
    print(dirList)
    for x in dirList:
        path = os.path.join(dir, x)
        if os.path.isfile(path) and os.path.splitext(path)[1] == ".html":
            parseHtml(path)
        elif os.path.isdir(path):
            getLinks(path)

getLinks(htmlRoot)

json_str = json.dumps(links,ensure_ascii=False,indent=2)

with codecs.open("../js/tools.js","w", "utf-8") as catalog:
    catalog.write("var allLinks = ")
    catalog.write(json_str)

