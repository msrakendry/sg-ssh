import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Heart, ShieldCheck, CheckCircle2, ArrowRight, Download } from 'lucide-react';
import { ProgramPillar } from '../../types';

export const DonateModal: React.FC = () => {
  const { isDonateModalOpen, closeDonateModal, selectedDonationPillar, addAuditLog } = useApp();

  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('monthly');
  const [currency, setCurrency] = useState<'USD' | 'UGX' | 'EUR'>('USD');
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [allocatedPillar, setAllocatedPillar] = useState<string>(
    selectedDonationPillar || 'general'
  );
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mobile_money' | 'bank_transfer' | 'paypal'>('card');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [completedReceipt, setCompletedReceipt] = useState<{
    receiptNumber: string;
    date: string;
    amount: number;
    currency: string;
    program: string;
  } | null>(null);

  if (!isDonateModalOpen) return null;

  const amounts = currency === 'USD' ? [25, 50, 100, 250, 500] : currency === 'EUR' ? [20, 45, 90, 220, 450] : [50000, 100000, 250000, 500000, 1000000];

  const handleProcessDonation = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount;
    if (!finalAmount || finalAmount <= 0) return;

    const receiptNum = `SSH-REC-${Math.floor(100000 + Math.random() * 900000)}`;
    const record = {
      receiptNumber: receiptNum,
      date: new Date().toISOString().split('T')[0],
      amount: finalAmount,
      currency,
      program: allocatedPillar,
    };

    setCompletedReceipt(record);

    addAuditLog(
      'Donation Processed',
      'Finance & Fundraising',
      receiptNum,
      `Received ${currency} ${finalAmount} (${frequency}) allocated to ${allocatedPillar} from ${donorName || 'Anonymous Donor'}`
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#05080f]/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8 text-slate-100">
        {/* Close Button */}
        <button
          onClick={closeDonateModal}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {completedReceipt ? (
          <div className="space-y-6 text-center py-4">
            <div className="w-14 h-14 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-800">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">Thank You for Standing with SSH</h3>
              <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto">
                Your contribution directly powers refugee-led resilience, water security, and youth education
                in Kiryandongo Refugee Settlement.
              </p>
            </div>

            {/* Simulated Humanitarian Tax Receipt */}
            <div className="p-5 rounded-xl bg-[#070b14] border border-slate-800 text-left font-mono text-xs space-y-2 shadow-inner">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Receipt Number:</span>
                <span className="text-amber-400 font-bold">{completedReceipt.receiptNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Date:</span>
                <span className="text-slate-200">{completedReceipt.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Amount:</span>
                <span className="text-white font-bold text-sm">
                  {completedReceipt.currency} {completedReceipt.amount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Allocated Pillar:</span>
                <span className="text-amber-300 font-bold uppercase">{completedReceipt.program}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-800 text-[11px] text-emerald-400 font-semibold">
                <span>Field Efficiency:</span>
                <span>88% Directly Deployed to Community Assets</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setCompletedReceipt(null);
                  closeDonateModal();
                }}
                className="px-6 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 rounded-lg cursor-pointer shadow"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleProcessDonation} className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-amber-400 mb-1">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span>Support Refugee-Led Resilience</span>
              </div>
              <h3 className="text-xl font-bold text-white">Donate to Sudan Sustainability Hub</h3>
              <p className="text-xs text-slate-300 mt-1">
                88% of your donation directly funds community water, solar power, and women cooperatives.
              </p>
            </div>

            {/* Frequency Toggle */}
            <div className="flex p-1 bg-[#070b14] rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setFrequency('monthly')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  frequency === 'monthly'
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Monthly Sustainer (Most Impact)
              </button>
              <button
                type="button"
                onClick={() => setFrequency('one-time')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  frequency === 'one-time'
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                One-Time Gift
              </button>
            </div>

            {/* Currency & Preset Amounts */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-slate-300">Choose Gift Amount</label>
                <div className="flex gap-1 text-[11px] font-mono">
                  {(['USD', 'EUR', 'UGX'] as const).map((curr) => (
                    <button
                      key={curr}
                      type="button"
                      onClick={() => setCurrency(curr)}
                      className={`px-2.5 py-1 rounded-md cursor-pointer transition-colors ${
                        currency === curr ? 'bg-slate-700 text-amber-400 font-bold' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {amounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amt);
                      setCustomAmount('');
                    }}
                    className={`py-2 text-xs font-mono font-bold rounded-lg border transition-colors cursor-pointer ${
                      selectedAmount === amt && !customAmount
                        ? 'bg-amber-400 text-slate-950 border-amber-400 shadow'
                        : 'bg-[#070b14] text-slate-200 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {currency === 'USD' ? `$${amt}` : currency === 'EUR' ? `€${amt}` : `${amt / 1000}k`}
                  </button>
                ))}
              </div>

              <div className="mt-2">
                <input
                  type="number"
                  placeholder="Or enter custom amount..."
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#070b14] border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>
            </div>

            {/* Targeted Program Pillar with 4 Logo Colors */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Direct Your Contribution To:
              </label>
              <select
                value={allocatedPillar}
                onChange={(e) => setAllocatedPillar(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-[#070b14] border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="general">Where Most Needed (General Resilience & Emergency)</option>
                <option value="wash">01 · WASH & Solar Water Networks (Blue)</option>
                <option value="livelihoods">02 · Women Micro-Agribusiness & VSLA Grants (Green)</option>
                <option value="energy_climate">03 · Clean Cooking Briquettes & Community Trees (Gold)</option>
                <option value="education">04 · Accelerated Bridge Schooling for Sudanese Minors (Red)</option>
                <option value="ssh_lab">05 · SSH-LAB Youth Tech & Peace Mediation (Innovation)</option>
              </select>
            </div>

            {/* Donor Information */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fatima Ali"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#070b14] border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Email (for receipt)
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@email.com"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#070b14] border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Secure Humanitarian Gateway:
              </label>
              <div className="grid grid-cols-4 gap-2 text-xs">
                {[
                  { id: 'card', label: 'Credit Card' },
                  { id: 'mobile_money', label: 'Mobile Money' },
                  { id: 'bank_transfer', label: 'Bank Wire' },
                  { id: 'paypal', label: 'PayPal' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`py-2 px-1 text-center font-medium rounded-lg border cursor-pointer transition-colors ${
                      paymentMethod === m.id
                        ? 'bg-amber-400/20 text-amber-300 border-amber-400 font-bold'
                        : 'bg-[#070b14] text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <Heart className="w-4 h-4 fill-slate-950" />
              <span>
                Complete {frequency === 'monthly' ? 'Monthly' : 'One-Time'} Donation (
                {currency} {customAmount || selectedAmount})
              </span>
            </button>

            {/* Security Assurance Footer */}
            <div className="pt-2 text-[11px] text-slate-500 text-center flex items-center justify-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>256-Bit SSL Encryption · Tax-exempt humanitarian registration</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
