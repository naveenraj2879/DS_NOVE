import React from 'react';
import { PageTransition } from '../components/layout/PageTransition';

export const Privacy = () => {
  return (
    <PageTransition>
      <div className="section-padding" style={{ background: 'var(--bg-gradient)' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 glass-panel p-4 p-md-5">
              <h1 className="fw-bold text-white mb-4">Privacy Policy</h1>
              <p className="text-secondary" style={{ fontSize: '0.9rem' }}>Last Updated: June 26, 2026</p>
              
              <div className="text-secondary mt-4 d-flex flex-column gap-4" style={{ fontSize: '0.95rem', lineHeight: '1.7' }}>
                <section>
                  <h4 className="text-white fw-bold">1. Information We Collect</h4>
                  <p>We collect personal coordinates (name, business email, phone, company name) during contact form submissions, job applications, or Client Portal registrations. We also store session data in LocalStorage to maintain your authentication state.</p>
                </section>

                <section>
                  <h4 className="text-white fw-bold">2. How We Use Information</h4>
                  <p>Collected coordinates are utilized to verify portal sessions, execute project milestones, answer support tickets, refine marketing campaigns, and review job applications. We never distribute your personal database records to third-party brokers.</p>
                </section>

                <section>
                  <h4 className="text-white fw-bold">3. Data Security</h4>
                  <p>All database records and file attachments are stored securely. DSNOVE enforces security protocols, including transit SSL configurations, local storage encryption guidelines, and strict least-privilege administrative access policies.</p>
                </section>

                <section>
                  <h4 className="text-white fw-bold">4. User Choices and Access</h4>
                  <p>You have the right to request the download, correction, or absolute deletion of your personal account database. To execute data rights, write to security@dsnove.com.</p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
