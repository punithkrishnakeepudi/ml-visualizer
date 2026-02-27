import React, { useEffect, useState } from 'react';
import useAppStore from '../store/useAppStore';
import AlgorithmCard from '../components/Recommendation/AlgorithmCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Recommendation = () => {
    const analysis = useAppStore(state => state.analysis);
    const selectAlgorithm = useAppStore(state => state.selectAlgorithm);
    const [recommendations, setRecommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecommendations = async () => {
            if (!analysis) return;
            setIsLoading(true);
            try {
                const response = await axios.post('http://localhost:8000/api/recommend', analysis);
                setRecommendations(response.data.recommendations);
            } catch (err) {
                console.error("Failed to fetch recommendations", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecommendations();
    }, [analysis]);

    const handleSelect = (algo) => {
        selectAlgorithm(algo);
        navigate('/visualize');
    };

    if (!analysis) return <div className="p-12 text-center text-surface-400">Load a dataset first.</div>;

    return (
        <div className="container mx-auto py-12 px-4 shadow-sm">
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4">Step 3: Choose an Algorithm</h1>
                <p className="text-surface-400 text-lg">
                    Based on your <span className="text-primary-400 font-semibold">{analysis.problem_type}</span> task
                    with <span className="text-primary-400 font-semibold">{analysis.row_count} rows</span>, we recommend these models.
                </p>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="glass h-[400px] rounded-2xl animate-pulse bg-surface-800/20 shadow-lg shadow-white/5"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recommendations.map((algo, index) => (
                        <AlgorithmCard
                            key={algo.id}
                            algo={algo}
                            isBest={index === 0}
                            onSelect={handleSelect}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Recommendation;
