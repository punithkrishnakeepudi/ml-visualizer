import numpy as np

def generate_steps(points):
    points = np.array(points)
    steps = []

    # Step 1: Distance Matrix
    steps.append({
        "step_number": 1,
        "title": "Pairwise Distance Matrix",
        "description": "We start by treating every data point as a single cluster. We calculate the distance between every possible pair of points.",
        "chart_data": {"points": points.tolist()},
        "key_values": {"initial_clusters": len(points)},
        "math_formula": "d(a, b) = ||a - b||"
    })

    # Step 2: Linkage
    steps.append({
        "step_number": 2,
        "title": "Merging Nearest Clusters",
        "description": "We iteratively merge the two 'closest' clusters into one. This continues until only one cluster remains, or we reach a threshold.",
        "chart_data": {
            "points": points.tolist(),
            "merges": [[0, 1], [2, 3]] # Mock merges
        },
        "key_values": {"linkage_method": "Ward"},
        "math_formula": ""
    })

    # Step 3: Dendrogram
    steps.append({
        "step_number": 3,
        "title": "Visualizing the Dendrogram",
        "description": "The result is a hierarchy of clusters, usually visualized as a tree called a Dendrogram. The height of the branches shows the distance at which clusters were merged.",
        "chart_data": {
            "points": points.tolist(),
            "dendrogram": "active"
        },
        "key_values": {"optimal_clusters": 3},
        "math_formula": ""
    })

    return steps
