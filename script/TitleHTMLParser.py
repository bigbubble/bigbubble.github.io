from html.parser import HTMLParser

class TitleHTMLParser(HTMLParser):
	def __init__ (self):
	    self.handledtags = ['title']
	    self.processing = None
	    HTMLParser.__init__(self)

	def handle_starttag(self, tag, attrs):
	    if tag in self.handledtags:
	        print(tag)
	        self.data = ''
	        self.processing = tag

	def handle_data(self, data):
	    if self.processing:
	        self.data += data

	def handle_endtag(self, tag):
	    if tag == self.processing:
	        print(tag)
	        self.processing = None