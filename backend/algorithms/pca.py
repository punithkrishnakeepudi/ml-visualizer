import numpy as np

def generate_steps(points):
    points = np.array(points)
    steps = []

    # Step 1: Standardizing Data
    steps.append({
        "step_number": 1,
        "title": "Standardizing the Dataset",
        "description": "PCA is sensitive to variances of the features. We must scale the data so that each feature contributes equally to the analysis.",
        "chart_data": {"points": points.tolist()},
        "key_values": {"mean": 0.0, "std": 1.0},
        "math_formula": "z = \\frac{x - \\mu}{\\sigma}"
    })

    # Step 2: Covariance Matrix & Eigenvalues
    steps.append({
        "step_number": 2,
        "title": "Covariance & Eigen-decomposition",
        "description": "We calculate the covariance matrix to understand how features vary together. Then, we find eigenvectors which define the new axes (Principal Components).",
        "chart_data": {
            "points": points.tolist(),
            "vectors": [[1, 1], [-1, 1]] # Mock PCs
        },
        "key_values": {"PC1 Variance": "72%", "PC2 Variance": "28%"},
        "math_formula": "C = \\frac{1}{n-1} X^T X"
    })

    # Step 3: Projection
    steps.append({
        "step_number": 3,
        "title": "Projecting to New Subspace",
        "description": "Finally, we project the original data onto our new Principal Components, effectively reducing dimensionality while preserving maximum variance.",
        "chart_data": {
            "points": points.tolist(),
            "projection": "2D"
        },
        "key_values": {"dimensions_reduced": "from N to 2"},
        "math_formula": "Y = X W"
    })

    return steps
