from fetch import fetch
from processing.ml import ml
from processing.ai import ai


def combine(username, period):
  metadata = {"username": username, "period": period}
  tracks = fetch(username, period)
  df = ml(tracks)
  questions = ai(df, period)
  return_data = {"metadata": metadata, "questions": questions, "tracks": tracks}
  return return_data
