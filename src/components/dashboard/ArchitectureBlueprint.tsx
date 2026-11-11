import React, { useState } from 'react';
import { Code2, Database, Layers, Copy, Check, FileCode, Shield, GitBranch, Terminal, Server, UploadCloud, CheckCircle2, ExternalLink, AlertTriangle } from 'lucide-react';

export const ArchitectureBlueprint: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'erd' | 'migrations' | 'models' | 'rbac' | 'api' | 'hostinger'>('architecture');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const LARAVEL_MIGRATION_COMMUNITIES = `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    /**
     * Run the migrations for Sudan Sustainability Hub - Communities.
     */
    public function up(): void
    {
        Schema::create('communities', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('code', 32)->unique()->index(); // e.g. KYR-R01
            $table->string('name');
            $table->string('country')->default('Uganda');
            $table->string('district');
            $table->string('settlement');
            $table->string('zone');
            $table->unsignedInteger('population_estimate')->default(0);
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->json('priority_needs')->nullable();
            $table->enum('vulnerability_level', ['Moderate', 'High', 'Severe'])->default('High');
            $table->unsignedTinyInteger('water_access_percentage')->default(0);
            $table->unsignedTinyInteger('education_access_percentage')->default(0);
            $table->unsignedTinyInteger('clean_energy_access_percentage')->default(0);
            $table->string('community_leader_contact')->nullable();
            $table->text('notes')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users');
            $table->softDeletes();
            $table->timestamps();

            $table->index(['country', 'settlement', 'zone']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('communities');
    }
};`;

  const LARAVEL_MIGRATION_BENEFICIARIES = `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    /**
     * Run the migrations for Humanitarian Beneficiary Information System.
     * Enforces Do-No-Harm and Data Minimization standards.
     */
    public function up(): void
    {
        Schema::create('beneficiaries', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('anonymized_id', 32)->unique()->index(); // e.g. KYR-BEN-8921
            $table->string('initials_encrypted'); // Encrypted with Laravel AES-256-GCM
            $table->enum('gender', ['Female', 'Male', 'Other']);
            $table->enum('age_range', ['15-18', '19-24', '25-35', '36-49', '50+']);
            $table->foreignId('community_id')->constrained('communities')->cascadeOnDelete();
            $table->foreignId('project_id')->nullable()->constrained('projects')->nullOnDelete();
            $table->string('pillar', 32); // wash, livelihoods, energy_climate, education, ssh_lab
            $table->unsignedSmallInteger('household_size')->default(1);
            $table->enum('consent_status', ['Verified Written', 'Oral Assent Witnessed', 'Pending Update']);
            $table->json('assistance_received')->nullable();
            $table->json('vulnerability_tags')->nullable();
            $table->enum('data_protection_level', ['Standard Protected', 'High Safeguarding Priority'])->default('Standard Protected');
            $table->foreignId('registered_by')->constrained('users');
            $table->date('registration_date');
            $table->softDeletes();
            $table->timestamps();

            $table->index(['community_id', 'pillar']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('beneficiaries');
    }
};`;

  const LARAVEL_MIGRATION_PROJECTS = `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    /**
     * Run the migrations for Projects & Programs Management.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('code', 32)->unique()->index(); // e.g. SSH-WASH-2025-01
            $table->string('title');
            $table->string('program_pillar', 32);
            $table->string('country')->default('Uganda');
            $table->string('settlement');
            $table->string('location_details');
            $table->foreignId('donor_id')->nullable()->constrained('donors');
            $table->foreignId('partner_id')->nullable()->constrained('partners');
            $table->date('start_date');
            $table->date('end_date');
            $table->decimal('budget_usd', 12, 2)->default(0.00);
            $table->decimal('spent_usd', 12, 2)->default(0.00);
            $table->enum('status', ['concept', 'proposal', 'approved', 'active', 'completed', 'suspended', 'closed'])->default('active');
            $table->unsignedInteger('target_beneficiaries')->default(0);
            $table->unsignedInteger('actual_beneficiaries')->default(0);
            $table->foreignId('project_manager_id')->constrained('users');
            $table->text('summary');
            $table->json('outputs')->nullable();
            $table->json('risks')->nullable();
            $table->softDeletes();
            $table->timestamps();

            $table->index(['program_pillar', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};`;

  const LARAVEL_MODEL_BENEFICIARY = `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;
use Illuminate\\Database\\Eloquent\\SoftDeletes;
use Illuminate\\Database\\Eloquent\\Relations\\BelongsTo;
use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;

class Beneficiary extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'uuid',
        'anonymized_id',
        'initials_encrypted',
        'gender',
        'age_range',
        'community_id',
        'project_id',
        'pillar',
        'household_size',
        'consent_status',
        'assistance_received',
        'vulnerability_tags',
        'data_protection_level',
        'registered_by',
        'registration_date',
    ];

    protected $casts = [
        'assistance_received' => 'array',
        'vulnerability_tags' => 'array',
        'registration_date' => 'date',
        'initials_encrypted' => 'encrypted', // Automatic AES encryption
    ];

    /**
     * Relationship to Community
     */
    public function community(): BelongsTo
    {
        return $this->belongsTo(Community::class);
    }

    /**
     * Relationship to Project
     */
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    /**
     * Relationship to Registering Field Officer
     */
    public function registerer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'registered_by');
    }

    /**
     * Scope for specific pillar
     */
    public function scopeForPillar($query, string $pillar)
    {
        return $query->where('pillar', $pillar);
    }
}`;

  return (
    <div className="space-y-6 text-stone-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Code2 className="w-5 h-5 text-amber-400" />
            <span>SSH Laravel 12 & MySQL 8 Production Architecture Blueprint</span>
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            Complete enterprise system architecture, normalized database ERD, Laravel migrations, Eloquent models, and RBAC matrix
          </p>
        </div>

        <span className="text-xs font-mono text-amber-400 bg-amber-950 px-2.5 py-1 rounded border border-amber-800">
          PHP 8.3+ · LARAVEL 12 · MYSQL 8
        </span>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-stone-800 pb-2 text-xs">
        {[
          { id: 'architecture', label: '1. System Architecture', icon: Layers },
          { id: 'erd', label: '2. Database ERD & Schema', icon: Database },
          { id: 'migrations', label: '3. Laravel Migrations', icon: FileCode },
          { id: 'models', label: '4. Eloquent Models', icon: Terminal },
          { id: 'rbac', label: '5. RBAC & Policies', icon: Shield },
          { id: 'api', label: '6. RESTful API Spec', icon: GitBranch },
          { id: 'hostinger', label: '7. Hostinger Deployment Hub', icon: Server },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-amber-400 text-stone-950 shadow-sm'
                  : 'text-stone-400 hover:text-white hover:bg-stone-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: System Architecture */}
      {activeTab === 'architecture' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-stone-900 border border-stone-800 space-y-4">
            <h3 className="text-base font-bold text-white">Three-Tier Institutional Digital Ecosystem</h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Designed as a long-term enterprise platform for the Sudan Sustainability Hub (SSH),
              bridging external public engagement, internal operational governance, and grassroots community management.
            </p>

            {/* ASCII Architecture Diagram */}
            <div className="p-4 rounded-lg bg-stone-950 border border-stone-800 font-mono text-xs text-amber-300 overflow-x-auto leading-relaxed">
              <pre>{`                    SUDAN SUSTAINABILITY HUB (SSH) DIGITAL ECOSYSTEM
                                           │
             ┌─────────────────────────────┴─────────────────────────────┐
             │                                                           │
     [ PUBLIC WEB LAYER ]                                        [ MANAGEMENT LAYER ]
   Official NGO Portal & CMS                                    Secure Admin & Executive Desk
  - Bilingual EN / AR (RTL)                                   - Executive Director Governance
  - Four Pillars Interactive                                  - Program Pipeline & Budgets
  - SSH-LAB Youth Incubator                                   - MEAL Quantitative Tracking
  - Public Transparency & Audits                              - Audit & Compliance Logging
  - Humanitarian Feedback Desk                                - CMS Global Content Control
             │                                                           │
             └─────────────────────────────┬─────────────────────────────┘
                                           │
                                    [ SSH CEM LAYER ]
                         Community & Engagement Management System
                                           │
        ┌───────────────────┬──────────────┴──────┬───────────────────┐
        │                   │                     │                   │
  [ COMMUNITIES ]    [ BENEFICIARIES ]      [ ENGAGEMENTS ]    [ ACCOUNTABILITY ]
   Settlement Hubs     Encrypted PII         Town Halls         Safeguarding Desk
   Water/Energy Idx    Consent Records       Women Circles      Service Triage
   Leaflet GIS Maps    Do-No-Harm Veiling    Youth Mediation    Audit Escalations
        │                   │                     │                   │
        └───────────────────┴──────────────┬──────┴───────────────────┘
                                           │
                              [ DATA, MEAL & REPORTING ]
                         Automated Indicator Audits & PDF/CSV`}</pre>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-5 rounded-xl bg-stone-900 border border-stone-800 space-y-2">
              <h4 className="font-bold text-white text-sm">Public Web Layer</h4>
              <p className="text-stone-400 leading-relaxed">
                SEO-optimized, responsive, WCAG AA compliant. Serves international donors, institutional partners,
                and hosts the public feedback mechanism.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-stone-900 border border-stone-800 space-y-2">
              <h4 className="font-bold text-white text-sm">Secure Management Layer</h4>
              <p className="text-stone-400 leading-relaxed">
                Role-based access control (RBAC), multi-currency project tracking, donor grant pipelines, and certified financial reporting.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-stone-900 border border-stone-800 space-y-2">
              <h4 className="font-bold text-white text-sm">CEM & Humanitarian Data Protection</h4>
              <p className="text-stone-400 leading-relaxed">
                Zero-exposure of vulnerable person data. Field officers capture informed consent and track community dialogues securely.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Database ERD */}
      {activeTab === 'erd' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-stone-900 border border-stone-800 space-y-4">
            <h3 className="text-base font-bold text-white">Relational Database ERD Specification (MySQL 8)</h3>
            <p className="text-xs text-stone-300">
              Normalized relational architecture with foreign keys, indexes, soft deletes, and field encryption.
            </p>

            <div className="p-4 rounded-lg bg-stone-950 border border-stone-800 font-mono text-xs text-emerald-400 overflow-x-auto">
              <pre>{`[users] 1 ───────────< [user_roles] >─────────── 1 [roles]
   │
   ├───────────< [audit_logs] (actor_id)
   ├───────────< [projects] (manager_id)
   ├───────────< [beneficiaries] (registered_by)
   └───────────< [feedback_cases] (assigned_officer_id)

[programs] 1 ───────────< [projects]
   │                          │
   │                          ├───────────< [beneficiaries]
   │                          └───────────< [project_activities]
   │
   └───────────< [meal_indicators]

[communities] 1 ───────< [beneficiaries]
   │
   ├───────────< [engagements]
   └───────────< [feedback_cases]

[donors] 1 ────────────< [grants] >─────────── 1 [projects]
[partners] 1 ──────────< [mous]   >─────────── 1 [projects]`}</pre>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
              <div className="p-4 rounded-lg bg-stone-950 border border-stone-800 space-y-2">
                <span className="font-bold text-white block">Key Tables & Constraints:</span>
                <ul className="space-y-1 text-stone-300">
                  <li><b className="text-amber-400">users:</b> Auth credentials, role foreign key, MFA status.</li>
                  <li><b className="text-amber-400">communities:</b> Geo-spatial coords (lat/long), water/energy indexes.</li>
                  <li><b className="text-amber-400">beneficiaries:</b> Pseudonym ID, AES-encrypted initials, consent enum.</li>
                  <li><b className="text-amber-400">projects:</b> Pillar classification, budget vs spent, target vs actual.</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-stone-950 border border-stone-800 space-y-2">
                <span className="font-bold text-white block">Integrity & Audit Safeguards:</span>
                <ul className="space-y-1 text-stone-300">
                  <li><b className="text-emerald-400">Soft Deletes:</b> Applied across beneficiaries, projects, and cases.</li>
                  <li><b className="text-emerald-400">Audit Logging:</b> Database trigger and model observer logging on all mutations.</li>
                  <li><b className="text-emerald-400">Cascade Isolation:</b> Deleting users never cascades onto humanitarian cases.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Migrations */}
      {activeTab === 'migrations' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-stone-900 border border-stone-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Production Laravel 12 Database Migrations</h3>
                <p className="text-xs text-stone-400">Run via <code className="font-mono text-amber-400">php artisan migrate</code></p>
              </div>

              <button
                onClick={() => copyToClipboard(LARAVEL_MIGRATION_BENEFICIARIES, 'mig_ben')}
                className="px-3 py-1.5 text-xs font-semibold rounded bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {copiedKey === 'mig_ben' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'mig_ben' ? 'Copied!' : 'Copy Beneficiaries Migration'}</span>
              </button>
            </div>

            <div className="p-4 rounded-lg bg-stone-950 border border-stone-800 font-mono text-xs text-stone-300 overflow-x-auto max-h-96 overflow-y-auto">
              <pre>{LARAVEL_MIGRATION_BENEFICIARIES}</pre>
            </div>

            <div className="pt-4 border-t border-stone-800 flex justify-between items-center">
              <span className="text-xs text-stone-400">Additional Migrations Included in Architecture:</span>
              <button
                onClick={() => copyToClipboard(LARAVEL_MIGRATION_COMMUNITIES, 'mig_comm')}
                className="text-xs text-amber-400 hover:underline font-mono cursor-pointer"
              >
                {copiedKey === 'mig_comm' ? 'Copied Communities Migration!' : 'Copy Communities Migration →'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Eloquent Models */}
      {activeTab === 'models' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-stone-900 border border-stone-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">App\Models\Beneficiary.php (Eloquent ORM)</h3>
                <p className="text-xs text-stone-400">Features native encryption casts and relational scopes</p>
              </div>

              <button
                onClick={() => copyToClipboard(LARAVEL_MODEL_BENEFICIARY, 'mod_ben')}
                className="px-3 py-1.5 text-xs font-semibold rounded bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {copiedKey === 'mod_ben' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'mod_ben' ? 'Copied!' : 'Copy Eloquent Model'}</span>
              </button>
            </div>

            <div className="p-4 rounded-lg bg-stone-950 border border-stone-800 font-mono text-xs text-stone-300 overflow-x-auto max-h-96 overflow-y-auto">
              <pre>{LARAVEL_MODEL_BENEFICIARY}</pre>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: RBAC */}
      {activeTab === 'rbac' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-stone-900 border border-stone-800 space-y-4">
            <h3 className="text-base font-bold text-white">Role-Based Access Control (RBAC) Matrix</h3>
            <p className="text-xs text-stone-300">
              Implemented via Laravel Gates & Policies (<code className="font-mono text-amber-400">BeneficiaryPolicy</code>, <code className="font-mono text-amber-400">ProjectPolicy</code>).
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-stone-800">
                <thead className="bg-stone-950 text-stone-400 font-mono text-[11px] uppercase border-b border-stone-800">
                  <tr>
                    <th className="p-3">Role</th>
                    <th className="p-3">Projects</th>
                    <th className="p-3">Beneficiary PII</th>
                    <th className="p-3">Feedback / PSEA</th>
                    <th className="p-3">MEAL Indicators</th>
                    <th className="p-3">CMS Content</th>
                    <th className="p-3">Audit Logs</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800 text-stone-300">
                  <tr>
                    <td className="p-3 font-bold text-white">Executive Director</td>
                    <td className="p-3 text-emerald-400">Approve / Close</td>
                    <td className="p-3 text-amber-400">Authorized Reveal</td>
                    <td className="p-3 text-red-400 font-bold">PSEA Desk Lead</td>
                    <td className="p-3 text-emerald-400">Full Access</td>
                    <td className="p-3 text-emerald-400">Publish</td>
                    <td className="p-3 text-emerald-400">Full Access</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">Program Manager</td>
                    <td className="p-3 text-emerald-400">Create / Update</td>
                    <td className="p-3 text-stone-500">Veiled Only</td>
                    <td className="p-3 text-emerald-400">Investigate</td>
                    <td className="p-3 text-emerald-400">Update Actuals</td>
                    <td className="p-3 text-stone-500">Read-Only</td>
                    <td className="p-3 text-stone-400">Self Logs</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">MEAL Officer</td>
                    <td className="p-3 text-stone-300">View / Inspect</td>
                    <td className="p-3 text-stone-500">Anonymized</td>
                    <td className="p-3 text-stone-300">Review Data</td>
                    <td className="p-3 text-emerald-400 font-bold">Verify & Audit</td>
                    <td className="p-3 text-stone-500">Read-Only</td>
                    <td className="p-3 text-emerald-400">Inspect M&E</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">Field Officer</td>
                    <td className="p-3 text-stone-400">View Assigned</td>
                    <td className="p-3 text-emerald-400">Register (Consent)</td>
                    <td className="p-3 text-emerald-400">Log Feedback</td>
                    <td className="p-3 text-stone-400">Log Baseline</td>
                    <td className="p-3 text-stone-500">No Access</td>
                    <td className="p-3 text-stone-500">No Access</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">Auditor</td>
                    <td className="p-3 text-sky-400">Read-Only</td>
                    <td className="p-3 text-stone-500">Veiled Audit</td>
                    <td className="p-3 text-sky-400">Read-Only</td>
                    <td className="p-3 text-sky-400">Read-Only</td>
                    <td className="p-3 text-sky-400">Read-Only</td>
                    <td className="p-3 text-emerald-400 font-bold">Full Audit Export</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: RESTful API Spec */}
      {activeTab === 'api' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-stone-900 border border-stone-800 space-y-4">
            <h3 className="text-base font-bold text-white">Versioned RESTful API Architecture (/api/v1/)</h3>
            <p className="text-xs text-stone-300">
              Enables secure future integrations with KoboToolbox mobile field surveys, UNHCR coordination portals, and external reporting.
            </p>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded bg-stone-950 border border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-emerald-400 font-bold mr-3">GET</span>
                  <span className="text-stone-200">/api/v1/communities</span>
                </div>
                <span className="text-stone-500 text-[11px]">List settlement profiles & geo-coordinates</span>
              </div>

              <div className="p-3 rounded bg-stone-950 border border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-amber-400 font-bold mr-3">POST</span>
                  <span className="text-stone-200">/api/v1/beneficiaries/register</span>
                </div>
                <span className="text-stone-500 text-[11px]">Register beneficiary with encrypted consent payload</span>
              </div>

              <div className="p-3 rounded bg-stone-950 border border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-amber-400 font-bold mr-3">POST</span>
                  <span className="text-stone-200">/api/v1/feedback/submit</span>
                </div>
                <span className="text-stone-500 text-[11px]">Anonymous or confidential community report intake</span>
              </div>

              <div className="p-3 rounded bg-stone-950 border border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-emerald-400 font-bold mr-3">GET</span>
                  <span className="text-stone-200">/api/v1/meal/indicators</span>
                </div>
                <span className="text-stone-500 text-[11px]">Query audited indicator targets vs achievements</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 7: Hostinger Deployment Hub */}
      {activeTab === 'hostinger' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-stone-900 border border-stone-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <Server className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Hostinger Production Deployment Hub</h3>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-900">
                100% READY FOR HOSTINGER
              </span>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              This platform has been fully optimized for <b>Hostinger Shared Hosting, Cloud Hosting, and VPS</b>.
              The root build configuration, <code className="font-mono text-amber-400">.htaccess</code> routing file,
              assets pipeline, and SEO sitemaps are pre-configured to ensure seamless deployment without 404 errors.
            </p>

            {/* Step-by-Step 3-Minute Deployment Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-lg bg-stone-950 border border-stone-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                  <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center font-mono text-[11px]">1</span>
                  <span>Build Production Files</span>
                </div>
                <p className="text-[11px] text-stone-400 leading-relaxed">
                  Run <code className="font-mono text-stone-200 bg-stone-900 px-1 py-0.5 rounded">npm run build</code>.
                  This outputs the entire production package into the <code className="font-mono text-stone-200">/dist</code> directory.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-stone-950 border border-stone-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
                  <span className="w-5 h-5 rounded-full bg-sky-400/20 text-sky-300 flex items-center justify-center font-mono text-[11px]">2</span>
                  <span>Upload to public_html</span>
                </div>
                <p className="text-[11px] text-stone-400 leading-relaxed">
                  Log into <b>Hostinger hPanel → File Manager</b>. Open <code className="font-mono text-stone-200">public_html</code> and upload all files from inside <code className="font-mono text-stone-200">/dist</code>.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-stone-950 border border-stone-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <span className="w-5 h-5 rounded-full bg-emerald-400/20 text-emerald-300 flex items-center justify-center font-mono text-[11px]">3</span>
                  <span>Verify SSL & Live Site</span>
                </div>
                <p className="text-[11px] text-stone-400 leading-relaxed">
                  In hPanel → Security → SSL, enable free Let's Encrypt SSL. The included <code className="font-mono text-stone-200">.htaccess</code> automatically forces HTTPS and prevents 404s.
                </p>
              </div>
            </div>
          </div>

          {/* Pre-Configured .htaccess Viewer & Copy Button */}
          <div className="p-6 rounded-xl bg-stone-900 border border-stone-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-amber-400" />
                  <span>Hostinger Production .htaccess (Pre-installed in /public/.htaccess)</span>
                </h4>
                <p className="text-xs text-stone-400">
                  Enforces Single Page Application (SPA) rewrite rules, HTTPS redirects, and LiteSpeed browser caching
                </p>
              </div>

              <button
                onClick={() =>
                  copyToClipboard(
`<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{HTTPS} !=on
  RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]
  RewriteRule ^ index.html [L]
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>`,
                    'htaccess'
                  )
                }
                className="px-3 py-1.5 text-xs font-semibold rounded bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {copiedKey === 'htaccess' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'htaccess' ? 'Copied .htaccess!' : 'Copy .htaccess Content'}</span>
              </button>
            </div>

            <div className="p-4 rounded-lg bg-stone-950 border border-stone-800 font-mono text-xs text-stone-300 overflow-x-auto max-h-56 overflow-y-auto">
              <pre>{`# 1. Enable URL Rewriting for Single Page Application (SPA) on Hostinger
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Enforce HTTPS Redirection on Hostinger
  RewriteCond %{HTTPS} !=on
  RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

  # Do not rewrite real files or directories
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # Route all other URLs to index.html for React SPA client-side routing
  RewriteRule ^ index.html [L]
</IfModule>

# 2. Browser Caching & Performance (LiteSpeed / Apache)
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>`}</pre>
            </div>
          </div>

          {/* Hostinger Pro-Tips Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-5 rounded-xl bg-stone-900 border border-stone-800 space-y-2">
              <span className="font-bold text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Hostinger hPanel Best Practice:</span>
              </span>
              <p className="text-stone-300 leading-relaxed">
                When using File Manager to upload, you can zip the contents of <code className="font-mono text-amber-400">/dist</code> into a single <code className="font-mono text-stone-200">dist.zip</code>, upload it to <code className="font-mono text-stone-200">public_html</code>, and click <b>Extract</b> in Hostinger. This takes less than 15 seconds!
              </p>
            </div>

            <div className="p-5 rounded-xl bg-stone-900 border border-stone-800 space-y-2">
              <span className="font-bold text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Documentation File Included:</span>
              </span>
              <p className="text-stone-300 leading-relaxed">
                A complete deployment manual has been written to <code className="font-mono text-amber-400">HOSTINGER_DEPLOYMENT_GUIDE.md</code> in the project root, covering Git CI/CD, FTP, custom domains, and DNS A/CNAME records.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
