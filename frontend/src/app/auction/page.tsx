"use client";

import { useState } from 'react';

interface Detection {
  class: string;
  confidence: number;
  bbox: number[];
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [detections, setDetections] = useState<Detection[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setDetections(null);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setError("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to process image');

      const data = await response.json();
      setDetections(data.detections);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Image Classification</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Submit</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {detections && (
        <div>
          <h2>Detections:</h2>
          <ul>
            {detections.map((det, index) => (
              <li key={index}>
                Class: {det.class}, Confidence: {det.confidence.toFixed(2)}, 
                BBox: [{det.bbox.join(', ')}]
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}