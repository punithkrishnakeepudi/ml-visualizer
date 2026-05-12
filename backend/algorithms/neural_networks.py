import numpy as np

def generate_steps(points):
    steps = []

    # Step 1: Forward Prop
    steps.append({
        "step_number": 1,
        "title": "Forward Propagation",
        "description": "Input data flows through the network. Each neuron calculates a weighted sum of its inputs and applies an activation function (like ReLU or Sigmoid).",
        "chart_data": {"layers": [4, 8, 8, 2], "active": "forward"},
        "key_values": {"activation": "ReLU", "params": 1250},
        "math_formula": "a^{(l)} = \\sigma(W^{(l)} a^{(l-1)} + b^{(l)})"
    })

    # Step 2: Loss Calculation
    steps.append({
        "step_number": 2,
        "title": "Compute Loss",
        "description": "At the output layer, we compare the network's prediction with the actual target using a Loss Function (like Cross-Entropy). This tells us how 'wrong' the model is.",
        "chart_data": {"loss_curve": [0.8, 0.6, 0.45, 0.3]},
        "key_values": {"loss_function": "Categorical Cross-Entropy"},
        "math_formula": "L = -\\sum y_i \\log(\\hat{y}_i)"
    })

    # Step 3: Backpropagation
    steps.append({
        "step_number": 3,
        "title": "Backpropagation & Update",
        "description": "Using the Chain Rule, we calculate the gradient of the loss with respect to every weight. We then move the weights in the opposite direction of the gradient to improve.",
        "chart_data": {"layers": [4, 8, 8, 2], "active": "backward"},
        "key_values": {"optimizer": "Adam", "lr": 0.001},
        "math_formula": "\\Delta w = -\\eta \\frac{\\partial L}{\\partial w}"
    })

    return steps
