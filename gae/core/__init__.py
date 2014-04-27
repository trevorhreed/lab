import webapp2, jinja2, json, sys, os
from google.appengine.ext import ndb

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir))
sys.path.append(os.path.join(ROOT, 'libs'))

class BaseTemplateLoader(jinja2.BaseLoader):
  def get_source(self, environment, template):
    self.load_extensions(environment)
    full_path_to_template = os.path.normpath(ROOT + '/views/' + template + '.html')
    if not os.path.exists(full_path_to_template):
      raise jinja2.TemplateNotFound("Template file not found: '" + full_path_to_template)
    mtime = os.path.getmtime(full_path_to_template)
    file = open(full_path_to_template)
    source = file.read().decode('utf-8')
    return source, full_path_to_template, lambda: mtime == os.path.getmtime(full_path_to_template)

  def load_extensions(self, environment):
    environment.globals['str'] = str
    environment.globals['len'] = len
  
class Page(webapp2.RequestHandler):
  def dispatch(self):
    self.jinja2_loader = jinja2.Environment(loader=BaseTemplateLoader())
    super(Page, self).dispatch()

  def render(self, view, context):
    template = self.jinja2_loader.get_template(view)
    self.response.out.write(template.render(context))

class Endpoint(webapp2.RequestHandler):
  def http(self, code, msg):
    self.set_status(code)
    self.response.out.write(msg)
    
  def ok(self):
    self.http(200, 'OK')
  
  def write(self, output):
    if isinstance(output, list):
      for item in list:
        self.write(item)
    elif isinstance(output, dict) or isinstance(output, ndb.Model):
      self.response.out.write(json.dumps(output))
    else:
      self.response.out.write(output)

class SecureEndpoint(Endpoint):
  pass
