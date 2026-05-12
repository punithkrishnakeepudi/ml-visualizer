import numpy as np

def generate_steps(points):
    points = np.array(points)
    steps = []

    # Step 1: Initial Prediction
    steps.append({
        "step_number": 1,
        "title": "Initial Base Prediction",
        "description": "XGBoost starts with a simple base prediction (usually the mean of the targets). We then calculate the 'residuals' (errors).",
        "chart_data": {"points": points.tolist()},
        "key_values": {"base_score": 0.5},
        "math_formula": "F_0(x) = \\arg\\min_\\gamma \\sum L(y_i, \\gamma)"
    })

    # Step 2: Boosting Iteration
    steps.append({
        "step_number": 2,
        "title": "Gradient Boosting Step",
        "description": "In each step, we build a new tree to predict the *gradients* (residuals) of the previous ensemble. Each tree corrects the mistakes of the ones before it.",
        "chart_data": {
            "points": points.tolist(),
            "residual_fit": "active"
        },
        "key_values": {"learning_rate": 0.3, "iteration": 1},
        "math_formula": "F_m(x) = F_{m-1}(x) + \\eta h_m(x)"
    })

    # Step 3: Regularization
    steps.append({
        "step_number": 3,
        "title": "Apply Regularization",
        "description": "XGBoost uses L1 and L2 regularization to penalize complex trees, preventing overfitting and improving speed.",
        "chart_data": {
            "points": points.tolist(),
            "final_boundary": "complex"
        },
        "key_values": {"lambda": 1.0, "alpha": 0.0},
        "math_formula": "\\Omega(h) = \\gamma T + \\frac{1}{2} \\lambda ||w||^2"
    })

    return steps
