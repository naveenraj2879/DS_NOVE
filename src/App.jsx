import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { initializeDatabase } from './utils/mockData';

// Import Layouts
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ChatWidget } from './components/chat/ChatWidget';
import { PortalLayout } from './pages/Portal/PortalLayout';
import { AdminLayout } from './pages/Dashboard/AdminLayout';

// Import Pages
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { Portfolio } from './pages/Portfolio';
import { About } from './pages/About';
import { Careers } from './pages/Careers';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { Contact } from './pages/Contact';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { NotFound } from './pages/NotFound';

// Import Portal Views
import { Login } from './pages/Portal/Login';
import { Register } from './pages/Portal/Register';
import { ClientOverview } from './pages/Portal/ClientOverview';
import { Projects } from './pages/Portal/Projects';
import { Invoices } from './pages/Portal/Invoices';
import { Support } from './pages/Portal/Support';
import { Profile } from './pages/Portal/Profile';

// Import Admin Views
import { AdminLogin } from './pages/Dashboard/AdminLogin';
import { Overview } from './pages/Dashboard/Overview';
import { ServicesManager } from './pages/Dashboard/ServicesManager';
import { PortfolioManager } from './pages/Dashboard/PortfolioManager';
import { BlogManager } from './pages/Dashboard/BlogManager';
import { CareerManager } from './pages/Dashboard/CareerManager';
import { EnquiryManager } from './pages/Dashboard/EnquiryManager';
import { Settings } from './pages/Dashboard/Settings';
import { TicketMilestoneManager } from './pages/Dashboard/TicketMilestoneManager';
import { TeamManager } from './pages/Dashboard/TeamManager';
import { TestimonialManager } from './pages/Dashboard/TestimonialManager';
import { UserManager } from './pages/Dashboard/UserManager';


// Public Layout wrapper containing common header, footer and floating live chat
const PublicLayout = () => {
  return (
    <>
      <Header />
      <div style={{ minHeight: '85vh' }}>
        <Outlet />
      </div>
      <Footer />
      <ChatWidget />
    </>
  );
};

function App() {
  useEffect(() => {
    // Seed localStorage tables
    initializeDatabase();
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <HashRouter>
          <Routes>
            {/* Public Company Routes */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<Home />} />
              <Route path="services" element={<Services />} />
              <Route path="portfolio" element={<Portfolio />} />
              <Route path="about" element={<About />} />
              <Route path="careers" element={<Careers />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:id" element={<BlogPost />} />
              <Route path="contact" element={<Contact />} />
              <Route path="terms" element={<Terms />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Client Portal Login / Register (Unprotected shells) */}
            <Route path="/portal/login" element={<Login />} />
            <Route path="/portal/register" element={<Register />} />

            {/* Client Portal Routing */}
            <Route path="/portal" element={<PortalLayout />}>
              <Route index element={<ClientOverview />} />
              <Route path="projects" element={<Projects />} />
              <Route path="invoices" element={<Invoices />} />
              <Route path="support" element={<Support />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            {/* Admin Dashboard Routing */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Overview />} />
              <Route path="services" element={<ServicesManager />} />
              <Route path="portfolio" element={<PortfolioManager />} />
              <Route path="blogs" element={<BlogManager />} />
              <Route path="careers" element={<CareerManager />} />
              <Route path="team" element={<TeamManager />} />
              <Route path="testimonials" element={<TestimonialManager />} />
              <Route path="users" element={<UserManager />} />
              <Route path="enquiries" element={<EnquiryManager />} />
              <Route path="tickets" element={<TicketMilestoneManager />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </HashRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
