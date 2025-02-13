from fetch import fetch
from model import preprocess


def combine(username, period):
  metadata = {"username": username, "period": period}
  tracks = fetch(username, period)
  preprocess(tracks)
  return_data = {"metadata": metadata, "tracks": tracks}
  return return_data
