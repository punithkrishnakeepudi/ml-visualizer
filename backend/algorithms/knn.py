import numpy as np

def generate_steps(points, query_point=[5, 5], k=3):
    points = np.array(points)
    query_point = np.array(query_point)

    steps = []

    # Step 1: Initial State
    steps.append({
        "step_number": 1,
        "title": "Unclassified Query",
        "description": "We have a new data point (the star) and we want to determine its class based on its neighbors.",
        "chart_data": {
            "points": points.tolist(),
            "query": query_point.tolist()
        },
        "key_values": {"k": k, "query_x": float(query_point[0]), "query_y": float(query_point[1])},
        "math_formula": ""
    })

    # Step 2: Calculate distances
    distances = np.linalg.norm(points[:, :2] - query_point, axis=1)

    steps.append({
        "step_number": 2,
        "title": "Calculate Distances",
        "description": "We calculate the Euclidean distance between our query point and every other point in the dataset.",
        "chart_data": {
            "points": points.tolist(),
            "query": query_point.tolist(),
            "distances": distances.tolist()
        },
        "key_values": {"method": "Euclidean Distance"},
        "math_formula": "d(p,q) = \\sqrt{\\sum (p_i - q_i)^2}"
    })

    # Step 3: Find nearest neighbors
    nearest_indices = np.argsort(distances)[:k]
    nearest_neighbors = points[nearest_indices]

    steps.append({
        "step_number": 3,
        "title": f"Identify {k} Nearest Neighbors",
        "description": f"We sort the distances and select the {k} points that are closest to our query point.",
        "chart_data": {
            "points": points.tolist(),
            "query": query_point.tolist(),
            "neighbors": nearest_indices.tolist()
        },
        "key_values": {"found_neighbors": k},
        "math_formula": "N_k(x) = \\{y \\in D : rank(d(x,y)) \\le k\\}"
    })

    # Step 4: Voting
    neighbor_classes = points[nearest_indices, 2].astype(int)
    counts = np.bincount(neighbor_classes)
    predicted_class = np.argmax(counts)

    steps.append({
        "step_number": 4,
        "title": "Majority Vote",
        "description": "The query point is assigned the class that is most common among its nearest neighbors.",
        "chart_data": {
            "points": points.tolist(),
            "query": query_point.tolist(),
            "neighbors": nearest_indices.tolist(),
            "predicted_class": int(predicted_class)
        },
        "key_values": {
            "votes": counts.tolist(),
            "prediction": int(predicted_class)
        },
        "math_formula": "\\hat{y} = \\text{mode}(\\{y_i : x_i \\in N_k(x)\\})"
    })

    return steps
