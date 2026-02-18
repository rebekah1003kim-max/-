
import React, { useState, useEffect } from 'react';
import { Page, ProductionCase } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Cases from './pages/Cases';
import CaseDetail from './pages/CaseDetail';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import { PRODUCTION_CASES as INITIAL_CASES } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [selectedCase, setSelectedCase] = useState<ProductionCase | null>(null);
  const [cases, setCases] = useState<ProductionCase[]>([]);

  // Initialize cases from localStorage or constants
  useEffect(() => {
    const savedCases = localStorage.getItem('myungji_cases');
    if (savedCases) {
      setCases(JSON.parse(savedCases));
    } else {
      setCases(INITIAL_CASES);
      localStorage.setItem('myungji_cases', JSON.stringify(INITIAL_CASES));
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const navigateTo = (page: Page, data?: any) => {
    if (page === Page.CASE_DETAIL && data) {
      setSelectedCase(data);
    }
    setCurrentPage(page);
  };

  const updateCases = (newCases: ProductionCase[]) => {
    setCases(newCases);
    localStorage.setItem('myungji_cases', JSON.stringify(newCases));
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME:
        return <Home onNavigate={navigateTo} cases={cases} />;
      case Page.ABOUT:
        return <About onNavigate={navigateTo} />;
      case Page.CASES:
        return <Cases onNavigate={navigateTo} cases={cases} />;
      case Page.CASE_DETAIL:
        return selectedCase ? (
          <CaseDetail caseData={selectedCase} onBack={() => setCurrentPage(Page.CASES)} onNavigate={navigateTo} />
        ) : (
          <Cases onNavigate={navigateTo} cases={cases} />
        );
      case Page.CONTACT:
        return <Contact />;
      case Page.ADMIN:
        return <Admin cases={cases} onUpdateCases={updateCases} />;
      default:
        return <Home onNavigate={navigateTo} cases={cases} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentPage={currentPage} onNavigate={navigateTo} />
      <main className="flex-grow pt-16">
        {renderPage()}
      </main>
      <Footer onNavigate={navigateTo} />
    </div>
  );
};

export default App;
