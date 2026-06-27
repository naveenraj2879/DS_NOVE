import React from 'react';
import { PageTransition } from '../components/layout/PageTransition';

export const Terms = () => {
  return (
    <PageTransition>
      <div className="section-padding" style={{ background: 'var(--bg-gradient)' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 glass-panel p-4 p-md-5">
              <h1 className="fw-bold text-white mb-4">Terms and Conditions</h1>
              <p className="text-secondary" style={{ fontSize: '0.9rem' }}>Last Updated: June 26, 2026</p>
              
              <div className="text-secondary mt-4 d-flex flex-column gap-4" style={{ fontSize: '0.95rem', lineHeight: '1.7' }}>
                <section>
                  <h4 className="text-white fw-bold">1. Agreement to Terms</h4>
                  <p>By accessing or utilizing the enterprise services provided by DSNOVE Systems Inc. ("DSNOVE", "we", "us"), including our website, client portals, and application sandboxes, you agree to be bound by these Terms and Conditions.</p>
                </section>

                <section>
                  <h4 className="text-white fw-bold">2. Provision of Services</h4>
                  <p>We supply advanced technology architectures, consulting services, and code deployments. All deliveries are governed by separate master services agreements (MSA) and statement of work (SOW) documents. The website contents are provided for general reference purposes only.</p>
                </section>

                <section>
                  <h4 className="text-white fw-bold">3. Intellectual Property Rights</h4>
                  <p>Unless specified in writing, all source designs, logo assets, UI component configurations, Three.js configurations, and database schemas created by DSNOVE are the exclusive property of DSNOVE Systems Inc. and protected by copyright and intellectual property laws.</p>
                </section>

                <section>
                  <h4 className="text-white fw-bold">4. Portal Usage and Security</h4>
                  <p>If you maintain an account on our Client Portal, you are entirely responsible for protecting your credentials. Any security compromises or unauthorized transactions must be reported immediately to security@dsnove.com.</p>
                </section>

                <section>
                  <h4 className="text-white fw-bold">5. Limitation of Liability</h4>
                  <p>In no event shall DSNOVE, its executives, or partners be held liable for indirect, incidental, or consequential damages (including lost profits or server data loss) arising out of the use of our services or website.</p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
