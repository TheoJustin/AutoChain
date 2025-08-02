

interface Car {
  id: number;
  name: string;
  manufacturer: string;
  year: string;
  type: string;
  fuel: string;
  transmission: string;
  condition: string;
  price: number;
  image_url: string;
  lat: number;
  long: number;
  features: string;
  price_range: string;
}

interface RecommendationFeatures {
  manufacturer?: string;
  name?: string;
  year?: string;
  condition?: string;
  fuel?: string;
  transmission?: string;
  type?: string;
  price_range?: string;
  user_lat?: number;
  user_lon?: number;
  max_distance_km?: number;
}

export const getRecommendationsById = async (carId: number | string): Promise<Car[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_MODEL_API_URL}/recommend/${carId}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data: { recommendations: Car[] } = await response.json();
    return data.recommendations || [];
  } catch (error) {
    console.error('Failed to fetch recommendations by ID:', error);
    throw error;
  }
};