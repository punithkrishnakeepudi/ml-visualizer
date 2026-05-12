import numpy as np

def generate_steps(points):
    points = np.array(points)
    steps = []

    # Step 1: Prior Probabilities
    steps.append({
        "step_number": 1,
        "title": "Calculate Prior Probabilities",
        "description": "First, we calculate the overall probability of each class appearing in our dataset, regardless of feature values.",
        "chart_data": {"points": points.tolist()},
        "key_values": {"P(Class 0)": 0.5, "P(Class 1)": 0.5},
        "math_formula": "P(C_k) = \\frac{n_k}{n}"
    })

    # Step 2: Likelihoods
    steps.append({
        "step_number": 2,
        "title": "Estimate Likelihoods",
        "description": "For each feature, we calculate the probability of seeing a specific value given a class. We assume features are independent (the 'Naive' part).",
        "chart_data": {
            "points": points.tolist(),
            "distributions": "gaussian"
        },
        "key_values": {"assumption": "Feature Independence"},
        "math_formula": "P(x_i | C_k)"
    })

    # Step 3: Posterior
    steps.append({
        "step_number": 3,
        "title": "Compute Posterior Probability",
        "description": "Using Bayes' Theorem, we combine the priors and likelihoods to find the probability of a class given the observed features.",
        "chart_data": {
            "points": points.tolist(),
            "prediction_map": "visible"
        },
        "key_values": {"Rule": "MAP (Maximum A Posteriori)"},
        "math_formula": "P(C_k|x) \\propto P(C_k) \\prod P(x_i|C_k)"
    })

    return steps
