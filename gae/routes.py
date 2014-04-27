import webapp2, core
from webapp2 import Route
from webapp2_extras.routes import HandlerPrefixRoute
from core import config

allowed_methods = webapp2.WSGIApplication.allowed_methods
new_allowed_methods = allowed_methods.union(('PATCH',))
webapp2.WSGIApplication.allowed_methods = new_allowed_methods

api = webapp2.WSGIApplication([
  HandlerPrefixRoute('api.', [

    Route('/api/ping',                      'ping'),

])], debug=config.DEV)

class Index(core.Page):
  def get(self):
    self.render('index', config.INDEX_CONTEXT)

pages = webapp2.WSGIApplication([
  ('/',         Index)
], debug=config.DEV)