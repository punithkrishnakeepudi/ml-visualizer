def get_recommendations(analysis):
    problem_type = analysis.get('problem_type', 'classification')
    row_count = analysis.get('row_count', 0)
    
    # Comprehensive algorithm list
    all_algorithms = [
        # --- SUPERVISED LEARNING ---
        {
            "id": "linear_regression",
            "name": "Linear Regression",
            "type": "regression",
            "suitability": 0,
            "reasons": ["Good for linear relationships", "Highly interpretable"],
            "pros": ["Simple", "Fast"],
            "cons": ["Assumes linearity"],
            "complexity": "O(n_features^2 * n_rows)",
            "code_example": "from sklearn.linear_model import LinearRegression\nmodel = LinearRegression()\nmodel.fit(X, y)"
        },
        {
            "id": "logistic_regression",
            "name": "Logistic Regression",
            "type": "classification",
            "suitability": 0,
            "reasons": ["Great for binary classification", "Probabilistic output"],
            "pros": ["Interpretable", "No tuning needed"],
            "cons": ["Cannot model non-linear boundaries"],
            "complexity": "O(n_features * n_rows)",
            "code_example": "from sklearn.linear_model import LogisticRegression\nmodel = LogisticRegression()\nmodel.fit(X, y)"
        },
        {
            "id": "decision_tree",
            "name": "Decision Tree",
            "type": "classification",
            "suitability": 0,
            "reasons": ["Handles non-linear data well", "No scaling required"],
            "pros": ["Visualizable", "Handles outliers"],
            "cons": ["Prone to overfitting"],
            "complexity": "O(n_features * n_rows * log(n_rows))",
            "code_example": "from sklearn.tree import DecisionTreeClassifier\nmodel = DecisionTreeClassifier()\nmodel.fit(X, y)"
        },
        {
            "id": "random_forest",
            "name": "Random Forest",
            "type": "classification",
            "suitability": 0,
            "reasons": ["Robust to noise", "High accuracy"],
            "pros": ["Handles missing values", "Unbiased error"],
            "cons": ["Slow to predict", "Complex to visualize"],
            "complexity": "O(n_trees * n_features * n_rows * log(n_rows))",
            "code_example": "from sklearn.ensemble import RandomForestClassifier\nmodel = RandomForestClassifier()\nmodel.fit(X, y)"
        },
        {
            "id": "svm",
            "name": "Support Vector Machines (SVM)",
            "type": "classification",
            "suitability": 0,
            "reasons": ["Effective in high dimensional spaces", "Uses kernel trick"],
            "pros": ["Memory efficient", "Versatile"],
            "cons": ["Slow on large datasets"],
            "complexity": "O(n_features * n_rows^2)",
            "code_example": "from sklearn.svm import SVC\nmodel = SVC(kernel='linear')\nmodel.fit(X, y)"
        },
        {
            "id": "knn",
            "name": "k-Nearest Neighbors (k-NN)",
            "type": "classification",
            "suitability": 0,
            "reasons": ["No explicit training phase", "Captures local patterns"],
            "pros": ["Easy to understand", "Non-parametric"],
            "cons": ["Slow on large data", "Sensitive to scale"],
            "complexity": "O(n_rows * n_features)",
            "code_example": "from sklearn.neighbors import KNeighborsClassifier\nmodel = KNeighborsClassifier(n_neighbors=3)\nmodel.fit(X, y)"
        },
        {
            "id": "naive_bayes",
            "name": "Naive Bayes",
            "type": "classification",
            "suitability": 0,
            "reasons": ["Fast and efficient", "Good for text classification"],
            "pros": ["Works well with small data", "Simple"],
            "cons": ["Strong feature independence assumption"],
            "complexity": "O(n_rows * n_features)",
            "code_example": "from sklearn.naive_bayes import GaussianNB\nmodel = GaussianNB()\nmodel.fit(X, y)"
        },
        {
            "id": "xgboost",
            "name": "XGBoost",
            "type": "classification",
            "suitability": 0,
            "reasons": ["State-of-the-art performance", "Handles missing data"],
            "pros": ["Fast", "Regularization built-in"],
            "cons": ["Harder to tune"],
            "complexity": "O(n_trees * n_rows * log(n_rows))",
            "code_example": "import xgboost as xgb\nmodel = xgb.XGBClassifier()\nmodel.fit(X, y)"
        },
        # --- UNSUPERVISED LEARNING ---
        {
            "id": "kmeans",
            "name": "K-Means",
            "type": "clustering",
            "suitability": 0,
            "reasons": ["Simple and efficient", "Standard for clustering"],
            "pros": ["Fast", "Scales well"],
            "cons": ["Must specify K", "Sensitive to outliers"],
            "complexity": "O(k * n_rows * n_features)",
            "code_example": "from sklearn.cluster import KMeans\nmodel = KMeans(n_clusters=3)\nmodel.fit(X)"
        },
        {
            "id": "pca",
            "name": "Principal Component Analysis (PCA)",
            "type": "unsupervised",
            "suitability": 0,
            "reasons": ["Dimensionality reduction", "Feature extraction"],
            "pros": ["Reduces noise", "Visualization"],
            "cons": ["Loss of interpretability"],
            "complexity": "O(n_features^2 * n_rows + n_features^3)",
            "code_example": "from sklearn.decomposition import PCA\nmodel = PCA(n_components=2)\nmodel.fit_transform(X)"
        },
        {
            "id": "apriori",
            "name": "Apriori Algorithm",
            "type": "unsupervised",
            "suitability": 0,
            "reasons": ["Market basket analysis", "Association rules"],
            "pros": ["Simple to understand", "Finds hidden patterns"],
            "cons": ["Computationally expensive"],
            "complexity": "O(2^n_items)",
            "code_example": "from mlxtend.frequent_patterns import apriori\nfrequent_itemsets = apriori(df, min_support=0.6)"
        },
        {
            "id": "hierarchical",
            "name": "Hierarchical Clustering",
            "type": "clustering",
            "suitability": 0,
            "reasons": ["No need to specify K", "Creates dendrograms"],
            "pros": ["Informative", "Handles any distance"],
            "cons": ["O(n^3) complexity"],
            "complexity": "O(n_rows^3)",
            "code_example": "from sklearn.cluster import AgglomerativeClustering\nmodel = AgglomerativeClustering()\nmodel.fit(X)"
        },
        # --- DEEP LEARNING ---
        {
            "id": "ann",
            "name": "Artificial Neural Networks (ANN)",
            "type": "deep_learning",
            "suitability": 0,
            "reasons": ["Universal function approximator", "Highly flexible"],
            "pros": ["Powerful", "Learns complex features"],
            "cons": ["Needs lots of data", "Black box"],
            "complexity": "O(n_rows * n_layers * n_neurons_per_layer)",
            "code_example": "from tensorflow.keras import Sequential, layers\nmodel = Sequential([layers.Dense(64, activation='relu'), layers.Dense(1)])"
        },
        {
            "id": "cnn",
            "name": "Convolutional Neural Networks (CNN)",
            "type": "deep_learning",
            "suitability": 0,
            "reasons": ["Image processing", "Spatial feature extraction"],
            "pros": ["Translation invariant", "Efficient for grids"],
            "cons": ["Requires GPU for training"],
            "complexity": "O(n_pixels * n_kernels)",
            "code_example": "from tensorflow.keras import layers\nmodel = Sequential([layers.Conv2D(32, 3), layers.Flatten(), layers.Dense(10)])"
        },
        {
            "id": "rnn",
            "name": "Recurrent Neural Networks (RNN)",
            "type": "deep_learning",
            "suitability": 0,
            "reasons": ["Sequence modeling", "Time series analysis"],
            "pros": ["Handles variable length", "Remembers context"],
            "cons": ["Vanishing gradients"],
            "complexity": "O(n_rows * sequence_length)",
            "code_example": "from tensorflow.keras import layers\nmodel = Sequential([layers.LSTM(64), layers.Dense(1)])"
        },
        {
            "id": "transformers",
            "name": "Transformers (BERT/GPT)",
            "type": "deep_learning",
            "suitability": 0,
            "reasons": ["Attention mechanism", "State-of-the-art NLP"],
            "pros": ["Parallelizable", "Global context"],
            "cons": ["Very large model size"],
            "complexity": "O(sequence_length^2)",
            "code_example": "from transformers import BertModel\nmodel = BertModel.from_pretrained('bert-base-uncased')"
        }
    ]
    
    # Simple scoring logic
    recommendations = []
    for algo in all_algorithms:
        score = 0
        if algo['type'] == problem_type:
            score += 70
        elif problem_type == 'clustering' and algo['type'] == 'clustering':
            score += 70
        elif problem_type == 'classification' and algo['type'] == 'deep_learning':
             score += 50 # Deep learning can be used for classification too
        else:
            # For simplicity, if problem type doesn't match exactly, we still might show it
            if algo['type'] in ['unsupervised', 'deep_learning']:
                score += 30
            else:
                continue
            
        # Adjust based on size
        if row_count < 1000:
            if algo['id'] in ['linear_regression', 'logistic_regression', 'knn', 'naive_bayes']:
                score += 20
        elif row_count > 10000:
            if algo['id'] in ['random_forest', 'xgboost', 'ann', 'cnn']:
                score += 20
                
        algo['suitability'] = min(score + (row_count % 10), 98)
        recommendations.append(algo)
        
    return sorted(recommendations, key=lambda x: x['suitability'], reverse=True)
