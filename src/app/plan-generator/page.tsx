'use client';
import { useState } from 'react';
import { FaPaperPlane, FaHeartbeat } from 'react-icons/fa';
import { generatePlan } from '../api/generate/plan-generation'; // Import plan generation API handler

const PlanGeneratorPage = () => {
  const [age, setAge] = useState<string | number>('');
  const [heartRate, setHeartRate] = useState<string | number>('');
  const [weight, setWeight] = useState<string | number>('');
  const [bp, setBp] = useState<string>('');
  const [goal, setGoal] = useState('weightLoss');
  const [input, setInput] = useState('');
  const [generatedPlan, setGeneratedPlan] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGeneratePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);

    try {
      const plan = await generatePlan(input, { age, heartRate, weight, bp, goal });
      setGeneratedPlan(plan);
    } catch (error) {
      setGeneratedPlan("Sorry, there was an error generating your plan. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0f1117] to-[#1a1c2b] py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex pt-7 items-center justify-center gap-3 mb-4">
            <FaHeartbeat className="text-4xl hidden md:flex text-red-500" />
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-purple-400 to-blue-400">
                Plan Generator
              </span>
            </h1>
          </div>
          <p className="text-gray-400">Generate your personalized health plan based on your inputs</p>
        </div>

        <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 space-y-6">
          <form onSubmit={handleGeneratePlan} className="space-y-6">
            <div className="space-y-3">
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter your age"
                className="w-full bg-white/10 text-white rounded-xl pl-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-gray-700/50"
              />
              <input
                type="number"
                value={heartRate}
                onChange={(e) => setHeartRate(e.target.value)}
                placeholder="Enter your heart rate"
                className="w-full bg-white/10 text-white rounded-xl pl-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-gray-700/50"
              />
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter your weight"
                className="w-full bg-white/10 text-white rounded-xl pl-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-gray-700/50"
              />
              <input
                type="text"
                value={bp}
                onChange={(e) => setBp(e.target.value)}
                placeholder="Enter your blood pressure (e.g., 120/80)"
                className="w-full bg-white/10 text-white rounded-xl pl-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-gray-700/50"
              />
            </div>

            <div className="space-x-4">
              <button
                type="button"
                onClick={() => setGoal('weightLoss')}
                className={`px-4 py-2 rounded-xl ${goal === 'weightLoss' ? 'bg-blue-500' : 'bg-gray-600'}`}
              >
                Weight Loss
              </button>
              <button
                type="button"
                onClick={() => setGoal('weightGain')}
                className={`px-4 py-2 rounded-xl ${goal === 'weightGain' ? 'bg-green-500' : 'bg-gray-600'}`}
              >
                Weight Gain
              </button>
              <button
                type="button"
                onClick={() => setGoal('maintenance')}
                className={`px-4 py-2 rounded-xl ${goal === 'maintenance' ? 'bg-yellow-500' : 'bg-gray-600'}`}
              >
                Maintenance
              </button>
            </div>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your needs or ask a question (e.g., diet plan)"
              className="w-full bg-white/10 text-white rounded-xl pl-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-gray-700/50"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:opacity-80 disabled:opacity-50"
            >
              {isLoading ? 'Generating Plan...' : 'Generate Plan'}
            </button>
          </form>

          {generatedPlan && (
            <div className="mt-6 bg-white/10 rounded-xl p-4">
              <h3 className="text-xl text-gray-100 mb-4">Your Generated Plan:</h3>
              <p className="text-gray-300">{generatedPlan}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PlanGeneratorPage;
