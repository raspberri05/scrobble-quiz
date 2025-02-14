from ai import ai
from fetch import fetch
from ml import ml


def combine(username, period):
  metadata = {"username": username, "period": period}
  tracks = fetch(username, period)
  df = ml(tracks)
  ai(df)
  return_data = {"metadata": metadata, "tracks": tracks}
  return return_data
