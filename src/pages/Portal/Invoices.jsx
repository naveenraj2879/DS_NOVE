import React, { useState, useEffect } from 'react';
import { FaDownload, FaCreditCard, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

export const Invoices = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('dsnove_invoices') || '[]');
    setInvoices(saved);
  }, []);

  const handleDownload = (invId) => {
    alert(`Downloading Invoice ${invId} PDF (Simulated)...`);
  };

  const handlePay = (invId) => {
    const updated = invoices.map((inv) => {
      if (inv.id === invId) {
        return { ...inv, status: 'Paid' };
      }
      return inv;
    });
    setInvoices(updated);
    localStorage.setItem('dsnove_invoices', JSON.stringify(updated));
    alert(`Payment of Invoice ${invId} successfully validated via sandbox gateway.`);
  };

  return (
    <div className="d-flex flex-column gap-4">
      {/* Header */}
      <div>
        <h2 className="fw-bold text-white mb-1">Billing and Invoices</h2>
        <p className="text-secondary" style={{ fontSize: '0.85rem' }}>Review invoice details and complete pending payment balances.</p>
      </div>

      {/* Invoice Table */}
      <div className="glass-panel p-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-premium align-middle mb-0">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Project Scope</th>
                <th>Issue Date</th>
                <th>Total Price</th>
                <th>Invoice Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.length > 0 ? (
                invoices.map((inv) => (
                  <tr key={inv.id}>
                    <td className="fw-bold tech-font text-white">{inv.id}</td>
                    <td>{inv.project}</td>
                    <td>{inv.date}</td>
                    <td>${inv.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    <td>
                      {inv.status === 'Paid' ? (
                        <span className="badge bg-success bg-opacity-15 text-success border border-success px-2.5 py-1">
                          <FaCheckCircle size={10} className="me-1" /> Paid
                        </span>
                      ) : (
                        <span className="badge bg-warning bg-opacity-15 text-warning border border-warning px-2.5 py-1">
                          <FaExclamationTriangle size={10} className="me-1" /> Pending
                        </span>
                      )}
                    </td>
                    <td className="text-end">
                      <div className="d-flex justify-content-end gap-2">
                        {inv.status === 'Pending' && (
                          <button
                            onClick={() => handlePay(inv.id)}
                            className="btn btn-sm btn-primary py-1 px-3 d-flex align-items-center gap-1.5"
                          >
                            <FaCreditCard size={12} /> <span>Pay</span>
                          </button>
                        )}
                        <button
                          onClick={() => handleDownload(inv.id)}
                          className="btn btn-sm btn-outline-secondary py-1 px-2.5"
                          title="Download Invoice PDF"
                        >
                          <FaDownload size={12} className="text-primary" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-4">No billing logs detected.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
