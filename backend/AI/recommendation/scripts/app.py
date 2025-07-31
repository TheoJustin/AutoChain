# recommendation_ai.py

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import pickle
import os
from math import radians, sin, cos, sqrt, asin

def haversine_distance(lat1, lon1, lat2, lon2):
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])

    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a))
    r = 6371
    return c * r

class CarRecommender:
    def __init__(self):
        self.df = None
        self.tfidf_vectorizer = None
        self.tfidf_matrix = None
        self.indices = None
        self.feature_cols = ['manufacturer', 'name', 'year', 'condition', 'fuel',
                             'transmission', 'type', 'price_range']

    def load_model(self, directory='saved_model'):
        print(f"Attempting to load model from '{directory}'...")
        try:
            with open(os.path.join(directory, 'tfidf_vectorizer.pkl'), 'rb') as f:
                self.tfidf_vectorizer = pickle.load(f)
            with open(os.path.join(directory, 'tfidf_matrix.pkl'), 'rb') as f:
                self.tfidf_matrix = pickle.load(f)
            with open(os.path.join(directory, 'indices.pkl'), 'rb') as f:
                self.indices = pickle.load(f)
            
            self.df = pd.read_pickle(os.path.join(directory, 'processed_df.pkl'))
            print("✅ Model loaded successfully from disk.")
            return True
        except FileNotFoundError:
            print(f"❌ Error: Could not find model files in '{directory}'.")
            return False
        except Exception as e:
            print(f"❌ An error occurred while loading the model: {e}")
            return False

    def get_recommendations_by_id(self, car_id, num_recommendations=5):
        if self.tfidf_matrix is None:
            raise Exception("Model has not been loaded yet.")
        
        idx = self.indices.get(car_id)
        if idx is None:
            return f"Car with ID {car_id} not found."
            
        query_vector = self.tfidf_matrix[idx]
        sim_scores = cosine_similarity(query_vector, self.tfidf_matrix)
        
        sim_scores = list(enumerate(sim_scores[0]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = sim_scores[1:num_recommendations + 1] 
        car_indices = [i[0] for i in sim_scores]
        return self.df.iloc[car_indices]

    def get_recommendations_by_features(self, features_dict, num_recommendations=5, user_lat=None, user_lon=None, max_distance_km=None):
        if self.tfidf_matrix is None:
            raise Exception("Model has not been loaded yet.")

        feature_string = ' '.join(str(features_dict.get(col, '')) for col in self.feature_cols)
        query_vector = self.tfidf_vectorizer.transform([feature_string])
        sim_scores = cosine_similarity(query_vector, self.tfidf_matrix)
        
        sim_scores = list(enumerate(sim_scores[0]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        top_car_indices = [i[0] for i in sim_scores[:100]] 
        
        top_cars_df = self.df.iloc[top_car_indices].copy()

        if user_lat is not None and user_lon is not None and max_distance_km is not None:
            distances = top_cars_df.apply(
                lambda row: haversine_distance(user_lat, user_lon, row['lat'], row['long']),
                axis=1
            )
            
            top_cars_df['distance_km'] = distances
            nearby_cars_df = top_cars_df[top_cars_df['distance_km'] <= max_distance_km]
            
            return nearby_cars_df.head(num_recommendations)
        
        return top_cars_df.head(num_recommendations)