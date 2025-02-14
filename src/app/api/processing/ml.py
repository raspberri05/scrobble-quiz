import pandas as pd
from sklearn.cluster import KMeans
import numpy as np


def ml(data):
  df = cluster(data)
  return df


def cluster(data):
  df = pd.DataFrame(data)
  play_counts = np.array(df["playcount"]).reshape(-1, 1)
  kmeans = KMeans(n_clusters=3, random_state=42).fit(play_counts)
  df["cluster"] = kmeans.labels_
  print(df)
  return df
