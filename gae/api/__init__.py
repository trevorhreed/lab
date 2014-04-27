import core

class ping(core.Endpoint):
  def get(self):
    self.write('v!')