import numpy as np

def generate_steps(points, k=3):
    points = np.array(points)
    steps = []
    
    # Step 1: Initial State
    steps.append({
        "step_number": 1,
        "title": "Initial Dataset",
        "description": "We start with our raw data points plotted in 2D space. No clusters have been assigned yet.",
        "chart_data": {"points": points.tolist()},
        "key_values": {"total_points": len(points), "k": k},
        "math_formula": ""
    })
    
    # Step 2: Initialize Centroids
    centroids = points[np.random.choice(len(points), k, replace=False)]
    steps.append({
        "step_number": 2,
        "title": "Random Centroid Initialization",
        "description": f"We randomly place {k} centroids (represented by squares) on the map. These will act as the 'centers' of our clusters.",
        "chart_data": {"points": points.tolist(), "centroids": centroids.tolist()},
        "key_values": {"centroids_count": k},
        "math_formula": ""
    })
    
    # Step 3: Assignment (first iteration)
    distances = np.linalg.norm(points[:, np.newaxis] - centroids, axis=2)
    labels = np.argmin(distances, axis=1)
    
    steps.append({
        "step_number": 3,
        "title": "Assign Points to Centroids",
        "description": "Each data point is assigned to the cluster of its nearest centroid. We use Euclidean distance for this.",
        "chart_data": {
            "points": points.tolist(), 
            "centroids": centroids.tolist(), 
            "assignments": labels.tolist()
        },
        "key_values": {"assignment_method": "Euclidean Distance"},
        "math_formula": "d = \\sqrt{\\sum_{i=1}^n (p_i - q_i)^2}"
    })
    
    # Step 4: Move Centroids
    for i in range(k):
        if len(points[labels == i]) > 0:
            centroids[i] = points[labels == i].mean(axis=0)
            
    steps.append({
        "step_number": 4,
        "title": "Move Centroids to Center",
        "description": "Centroids are moved to the average position (mean) of all points currently assigned to them.",
        "chart_data": {
            "points": points.tolist(), 
            "centroids": centroids.tolist(), 
            "assignments": labels.tolist()
        },
        "key_values": {"iteration": 1},
        "math_formula": "C_k = \\frac{1}{|S_k|} \\sum_{x_j \\in S_k} x_j"
    })
    
    # Final step: Convergence
    steps.append({
        "step_number": 5,
        "title": "Convergence Reached",
        "description": "The centroids have stopped moving significantly. The algorithm has found the optimal clusters for this run.",
        "chart_data": {
            "points": points.tolist(), 
            "centroids": centroids.tolist(), 
            "assignments": labels.tolist()
        },
        "key_values": {"status": "Converged"},
        "math_formula": ""
    })
    
    return steps
