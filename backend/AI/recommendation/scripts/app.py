# recommendation_ai.py

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import pickle
import os

class CarRecommender:
    def __init__(self):
        self.df = None
        self.tfidf_vectorizer = None
        self.tfidf_matrix = None
        self.indices = None
        self.feature_cols = ['manufacturer', 'model', 'year', 'condition', 'fuel', 
                             'transmission', 'drive', 'type', 'paint_color']

    def load_model(self, directory='../models'):
        print(f"Attempting to load model from '{directory}'...")
        try:
            with open(os.path.join(directory, 'tfidf_vectorizer.pkl'), 'rb') as f:
                self.tfidf_vectorizer = pickle.load(f)
            # Load the TF-IDF matrix
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

    def get_recommendations_by_features(self, features_dict, num_recommendations=5):
        if self.tfidf_matrix is None:
            raise Exception("Model has not been loaded yet.")

        feature_string = ' '.join(str(features_dict.get(col, '')) for col in self.feature_cols)
        query_vector = self.tfidf_vectorizer.transform([feature_string])
        sim_scores = cosine_similarity(query_vector, self.tfidf_matrix)
        sim_scores = list(enumerate(sim_scores[0]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = sim_scores[:num_recommendations]
        car_indices = [i[0] for i in sim_scores]
        return self.df.iloc[car_indices]