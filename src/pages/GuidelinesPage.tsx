import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { ShieldCheck, Lock, Heart, AlertOctagon, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const GuidelinesPage: React.FC = () => {
  return (
    <PageLayout>
      <div className="space-y-8 max-w-3xl mx-auto">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary">
            <ShieldCheck size={14} />
            <span>Community Trust & Anonymity</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            UniVerse Community Guidelines
          </h1>
          <p className="text-xs sm:text-sm theme-text-muted leading-relaxed">
            Our mission is to give university students a supportive, playful, and genuine space.
            To protect everyone, here is what is encouraged and what is strictly prohibited.
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm leading-relaxed">
          {/* Section 1 */}
          <div className="p-6 rounded-2xl theme-surface border theme-border space-y-3">
            <h2 className="text-base font-bold flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={18} />
              What We Encourage
            </h2>
            <ul className="list-disc list-inside space-y-1.5 opacity-90">
              <li>Sharing wholesome library crushes and campus encounters with kindness.</li>
              <li>Honest questions about course difficulty, professors, exams, and syllabus tips.</li>
              <li>Exchanging lecture notes, summaries, and exam prep cheatsheets.</li>
              <li>Recommending quiet study cafes, reliable Wi-Fi spaces, and budget-friendly lunches.</li>
              <li>Supporting fellow students through stressful midterm periods and deadline crunch.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="p-6 rounded-2xl theme-surface border theme-border space-y-3">
            <h2 className="text-base font-bold flex items-center gap-2 text-rose-600 dark:text-rose-400">
              <AlertOctagon size={18} />
              Zero Tolerance: What is Prohibited
            </h2>
            <ul className="list-disc list-inside space-y-1.5 opacity-90">
              <li>
                <strong>Doxxing & Personal Data Leaks:</strong> Posting real phone numbers, home addresses, private emails, or student ID numbers.
              </li>
              <li>
                <strong>Targeted Harassment & Threats:</strong> Single-target bullying, malicious rumors presented as verified facts, or violent language.
              </li>
              <li>
                <strong>Non-Consensual Imagery:</strong> Sharing unauthorized photographs of individuals in private dorms or restrooms.
              </li>
              <li>
                <strong>Hate Speech:</strong> Slurs or discrimination based on race, ethnicity, religion, disability, gender, or sexual orientation.
              </li>
              <li>
                <strong>Commercial Spam:</strong> Commercial sales pitches, crypto scams, or homework essay fraud mills.
              </li>
            </ul>
          </div>

          {/* Section 3: Anonymity Disclosure */}
          <div className="p-6 rounded-2xl theme-surface border theme-border space-y-3">
            <h2 className="text-base font-bold flex items-center gap-2 text-primary">
              <Lock size={18} />
              How Anonymity Works on UniVerse
            </h2>
            <p className="opacity-90">
              When you choose "Completely Anonymous" mode, your public post displays no name,
              no avatar, no department, and no link to your profile. Other students and ordinary
              moderators cannot see who authored an anonymous post.
            </p>
            <p className="opacity-90">
              However, no platform can guarantee absolute mathematical anonymity against legal subpoenas
              or law enforcement investigations involving criminal threats. Automated AI safety checks
              flag high-risk posts containing phone numbers or severe harassment before publication.
            </p>
          </div>

          <div className="text-center pt-4">
            <Link
              to="/universities"
              className="px-6 py-3 rounded-xl text-xs font-bold theme-btn-primary shadow-xs inline-block"
            >
              I Understand • Enter Campus Directory
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
