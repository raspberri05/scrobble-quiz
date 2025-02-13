import os
from dotenv import load_dotenv
import requests

load_dotenv()

API_URL = "https://ws.audioscrobbler.com/2.0/"
API_KEY = os.getenv("LASTFM_API_KEY")


def get_top(username, period):
  response = requests.get(
    "{}?method=user.gettoptracks&user={}&period={}&api_key={}&format=json".format(
      API_URL, username, period, API_KEY
    )
  )
  raw = response.json()["toptracks"]["track"]
  clean = []
  counter = 0
  for track in raw:
    if counter >= 5:
      break
    clean.append(
      {
        "id": counter,
        "name": track["name"],
        "artist": track["artist"]["name"],
        "playcount": track["playcount"],
      }
    )
    counter += 1
  return clean


def get_info(data):
  raw = []
  counter = 0
  for track in data:
    response = requests.get(
      "{}?method=track.getInfo&api_key={}&artist={}&track={}&format=json".format(
        API_URL, API_KEY, track["artist"], track["name"]
      )
    )
    if counter >= 5:
      break
    temp = response.json()

    duration = temp.get("track", {}).get("duration", "")
    listener_count = temp.get("track", {}).get("listeners", "")
    play_count = temp.get("track", {}).get("playcount", "")

    album_info = temp.get("track", {}).get("album", {})
    album_artist = album_info.get("artist", "")
    album_title = album_info.get("title", "")

    tags = temp.get("track", {}).get("toptags", {}).get("tag", [])
    tag_name = tags[0].get("name", "") if tags else ""

    raw.append(
      {
        "id": counter,
        "duration": duration,
        "listeners": listener_count,
        "playcount": play_count,
        "album": {
          "artist": album_artist,
          "title": album_title,
        },
        "tags": tag_name,
      }
    )
    counter += 1
  return raw


def fetch(username, period):
  top = get_top(username, period)
  tracks = get_info(top)
  return_data = []
  for i in range(len(top)):
    return_data.append(
      {
        "id": i,
        "name": top[i]["name"],
        "artist": top[i]["artist"],
        "playcount": top[i]["playcount"],
        "duration": tracks[i]["duration"],
        "listeners": tracks[i]["listeners"],
        "global_playcount": tracks[i]["playcount"],
        "album": tracks[i]["album"],
        "tags": tracks[i]["tags"],
      }
    )
  return return_data
