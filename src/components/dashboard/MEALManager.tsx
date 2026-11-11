import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MealIndicator } from '../../types';
import { TrendingUp, CheckCircle, Edit, Target, FileText } from 'lucide-react';

export const MEALManager: React.FC = () => {
  const { mealIndicators, updateMealIndicator, activeRole } = useApp();

  const [editingIndicator, setEditingIndicator] = useState<MealIndicator | null>(null);
  const [newActual, setNewActual] = useState<string>('');

  const handleSaveActual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingIndicator) return;
    const val = parseFloat(newActual);
    if (isNaN(val)) return;

    updateMealIndicator(editingIndicator.id, val);
    setEditingIndicator(null);
  };

  return (
    <div className="space-y-6 text-stone-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <span>Monitoring, Evaluation, Accountability & Learning (MEAL)</span>
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Tracking verified quantitative indicators against targets with documented means of verification
          </p>
        </div>

        <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-900">
          LOGFRAME STATUS: VERIFIED
        </span>
      </div>

      {/* Indicators Table */}
      <div className="bg-stone-900 rounded-xl border border-stone-800 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-950 text-stone-400 font-mono text-[11px] uppercase border-b border-stone-800">
              <tr>
                <th className="p-3.5">Indicator Code</th>
                <th className="p-3.5">Pillar</th>
                <th className="p-3.5">Indicator Text & Scope</th>
                <th className="p-3.5">Target</th>
                <th className="p-3.5">Actual Achieved</th>
                <th className="p-3.5">Progress</th>
                <th className="p-3.5">Means of Verification</th>
                {activeRole !== 'auditor' && <th className="p-3.5 text-right">Action</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/80">
              {mealIndicators.map((ind) => {
                const pct = Math.min(150, Math.round((ind.actualAchieved / ind.targetValue) * 100));
                return (
                  <tr key={ind.id} className="hover:bg-stone-850 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-amber-400 whitespace-nowrap">
                      {ind.code}
                    </td>

                    <td className="p-3.5 whitespace-nowrap">
                      <span className="text-[10px] font-mono uppercase bg-stone-950 px-2 py-0.5 rounded border border-stone-800">
                        {ind.pillar}
                      </span>
                    </td>

                    <td className="p-3.5 font-medium text-stone-200 max-w-xs">
                      {ind.indicatorText}
                    </td>

                    <td className="p-3.5 font-mono text-stone-300 whitespace-nowrap">
                      {ind.targetValue} {ind.unit}
                    </td>

                    <td className="p-3.5 font-mono font-bold text-white whitespace-nowrap">
                      {ind.actualAchieved} {ind.unit}
                    </td>

                    <td className="p-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-stone-800 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              pct >= 100 ? 'bg-emerald-500' : pct >= 70 ? 'bg-amber-400' : 'bg-red-500'
                            }`}
                            style={{ width: `${Math.min(100, pct)}%` }}
                          />
                        </div>
                        <span className="font-mono text-[11px] font-semibold">{pct}%</span>
                      </div>
                    </td>

                    <td className="p-3.5 text-stone-400 text-[11px] max-w-xs">
                      {ind.meansOfVerification}
                    </td>

                    {activeRole !== 'auditor' && (
                      <td className="p-3.5 text-right whitespace-nowrap">
                        <button
                          onClick={() => {
                            setEditingIndicator(ind);
                            setNewActual(ind.actualAchieved.toString());
                          }}
                          className="px-2.5 py-1 text-xs font-semibold rounded bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 transition-colors cursor-pointer inline-flex items-center gap-1"
                        >
                          <Edit className="w-3.5 h-3.5 text-amber-400" />
                          <span>Update</span>
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingIndicator && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-xl max-w-md w-full p-6 shadow-2xl relative text-stone-100">
            <h3 className="text-base font-bold text-white mb-2">Update MEAL Actual Value</h3>
            <p className="text-xs text-stone-400 mb-4">{editingIndicator.indicatorText}</p>

            <form onSubmit={handleSaveActual} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">
                  New Achieved Value ({editingIndicator.unit})
                </label>
                <input
                  type="number"
                  step="any"
                  required
                  value={newActual}
                  onChange={(e) => setNewActual(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded text-white font-mono"
                />
              </div>

              <div className="text-[11px] text-stone-400 p-3 rounded bg-stone-950 border border-stone-800">
                Updating this indicator commits an entry to the immutable audit trail with your name and role.
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setEditingIndicator(null)}
                  className="px-4 py-2 text-xs text-stone-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded cursor-pointer"
                >
                  Commit Verified Value
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
