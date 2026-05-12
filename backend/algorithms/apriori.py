import numpy as np

def generate_steps(points):
    # For Apriori, 'points' might represent transaction items
    steps = []

    # Step 1: Support Calculation
    steps.append({
        "step_number": 1,
        "title": "Generating Frequent Itemsets",
        "description": "We scan the transaction database to find items or sets of items that appear frequently (above a minimum support threshold).",
        "chart_data": {"transactions": 100},
        "key_values": {"min_support": 0.5},
        "math_formula": "supp(X) = \\frac{|\\{t \\in T; X \\subseteq t\\}|}{|T|}"
    })

    # Step 2: Rule Generation
    steps.append({
        "step_number": 2,
        "title": "Deriving Association Rules",
        "description": "From frequent itemsets, we generate rules (e.g., 'If a customer buys bread, they also buy milk'). We filter these by 'Confidence'.",
        "chart_data": {"itemsets": ["Bread", "Milk", "Butter"]},
        "key_values": {"min_confidence": 0.7},
        "math_formula": "conf(X \\Rightarrow Y) = \\frac{supp(X \\cup Y)}{supp(X)}"
    })

    # Step 3: Lift & Pruning
    steps.append({
        "step_number": 3,
        "title": "Evaluating Rule Lift",
        "description": "Lift measures how much more likely Y is bought when X is bought, compared to Y being bought alone. A lift > 1 indicates a strong positive association.",
        "chart_data": {"top_rules": 5},
        "key_values": {"highest_lift": 2.4},
        "math_formula": "lift(X \\Rightarrow Y) = \\frac{supp(X \\cup Y)}{supp(X) \\times supp(Y)}"
    })

    return steps
