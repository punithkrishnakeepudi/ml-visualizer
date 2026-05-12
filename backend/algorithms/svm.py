import numpy as np

def generate_steps(points):
    points = np.array(points)
    steps = []

    # Step 1: Initial Margin
    steps.append({
        "step_number": 1,
        "title": "Searching for the Hyperplane",
        "description": "SVM looks for a decision boundary (hyperplane) that separates the classes with the maximum possible margin.",
        "chart_data": {"points": points.tolist()},
        "key_values": {"kernel": "RBF", "C": 1.0},
        "math_formula": "w^T x + b = 0"
    })

    # Step 2: Support Vectors
    steps.append({
        "step_number": 2,
        "title": "Identifying Support Vectors",
        "description": "The 'Support Vectors' are the data points closest to the hyperplane. They are the most important points as they define the margin.",
        "chart_data": {
            "points": points.tolist(),
            "support_vectors": [0, 5, 8] # Indices
        },
        "key_values": {"support_vectors_count": 3},
        "math_formula": "y_i(w^T x_i + b) \\ge 1"
    })

    # Step 3: Maximizing Margin
    steps.append({
        "step_number": 3,
        "title": "Maximizing the Margin",
        "description": "The algorithm adjusts the hyperplane to ensure the gap (margin) between the classes is as wide as possible, improving generalization.",
        "chart_data": {
            "points": points.tolist(),
            "hyperplane": {"m": 1.2, "b": -0.5, "margin": 0.8}
        },
        "key_values": {"margin_width": 0.85},
        "math_formula": "\\text{maximize } \\frac{2}{||w||}"
    })

    return steps
