import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { X, Copy, Check, ExternalLink, Download, Printer, QrCode, Wifi, Coffee, Sparkles } from 'lucide-react';
import { useCafe } from '../context/CafeContext';

export const TableQRModal: React.FC = () => {
  const { showQrModal, setShowQrModal, setIsTableMenuView, generalInfo, tableNumber, setTableNumber } = useCafe();
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [selectedTable, setSelectedTable] = useState(tableNumber || 'Table 1');

  // Compute the direct link that will directly open the menu
  const getDirectMenuUrl = (table: string) => {
    if (typeof window === 'undefined') return '';
    const origin = window.location.origin;
    const cleanPath = window.location.pathname;
    const tableParam = table ? `?table=${encodeURIComponent(table)}&view=menu` : `?view=menu`;
    return `${origin}${cleanPath}${tableParam}#table-menu`;
  };

  const directUrl = getDirectMenuUrl(selectedTable);

  useEffect(() => {
    if (!directUrl) return;
    QRCode.toDataURL(directUrl, {
      width: 400,
      margin: 2,
      color: {
        dark: '#1F4231', // Mingma's signature forest green
        light: '#FAF9F5'  // Off-white canvas
      }
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Error generating QR code:', err));
  }, [directUrl]);

  if (!showQrModal) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(directUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenDirectMenu = () => {
    setTableNumber(selectedTable);
    setShowQrModal(false);
    setIsTableMenuView(true);
  };

  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `mingmas-qr-${selectedTable.toLowerCase().replace(/\s+/g, '-')}.png`;
    link.click();
  };

  const handlePrintStandee = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to print table standees.');
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Mingma's Table Menu Standee - ${selectedTable}</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@400;600&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap" rel="stylesheet">
          <style>
            @page { size: A5 portrait; margin: 10mm; }
            body {
              font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
              background-color: #FAF9F5;
              color: #262522;
              margin: 0;
              padding: 24px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 90vh;
              box-sizing: border-box;
            }
            .card {
              border: 2px solid #1F4231;
              border-radius: 12px;
              padding: 32px 24px;
              text-align: center;
              max-width: 380px;
              width: 100%;
              background: #FFFFFF;
              box-shadow: 0 4px 20px rgba(0,0,0,0.06);
            }
            .badge {
              display: inline-block;
              background-color: #1F4231;
              color: #FAF9F5;
              padding: 6px 18px;
              border-radius: 4px;
              font-family: 'Fraunces', serif;
              font-size: 26px;
              margin-bottom: 8px;
            }
            .sub {
              font-size: 11px;
              letter-spacing: 2px;
              text-transform: uppercase;
              color: #666;
              margin-bottom: 20px;
              font-weight: 600;
            }
            .qr-frame {
              background: #FAF9F5;
              padding: 16px;
              border: 1px dashed #1F4231;
              border-radius: 8px;
              display: inline-block;
              margin: 10px 0 16px;
            }
            .qr-frame img {
              width: 220px;
              height: 220px;
              display: block;
            }
            .table-tag {
              font-size: 14px;
              font-weight: 700;
              color: #1F4231;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              margin-top: 4px;
            }
            .scan-instructions {
              font-size: 13px;
              color: #444;
              margin: 12px 0 18px;
              line-height: 1.4;
            }
            .wifi-box {
              background: #F4F1EA;
              border-radius: 6px;
              padding: 10px;
              font-size: 11px;
              color: #555;
              margin-top: 10px;
            }
            .wifi-box strong { color: #1F4231; }
            .footer-note {
              font-size: 10px;
              color: #888;
              margin-top: 16px;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="badge">mingma's</div>
            <div class="sub">Coffee Shop · Cafe · Bakery</div>
            <div class="table-tag">${selectedTable}</div>

            <div class="qr-frame">
              <img src="${qrDataUrl}" alt="Scan QR Menu" />
            </div>

            <div class="scan-instructions">
              <strong>Scan with your phone camera</strong><br/>
              to browse our high-altitude coffee, all-day brunch, and fresh sourdough.
            </div>

            <div class="wifi-box">
              <div><strong>Guest Wi-Fi:</strong> ${generalInfo.wifiNetwork || 'Mingmas_Sanctuary_Guest'}</div>
              <div><strong>Password:</strong> ${generalInfo.wifiPassword || 'himalayancoffee'}</div>
            </div>

            <div class="footer-note">
              Mall Road, Manali (175131) · Elevation 2,050m
            </div>
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const sampleTables = ['Table 1', 'Table 2', 'Table 3', 'Table 4', 'Table 5', 'Patio Deck', 'Window Bar'];

  return (
    <div
      className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={() => setShowQrModal(false)}
    >
      <div
        className="bg-[#FAF9F5] border border-[#E2DDD5] rounded-xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150 my-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setShowQrModal(false)}
          className="absolute right-4 top-4 p-1.5 rounded-full text-stone-400 hover:text-stone-900 hover:bg-stone-200/60 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-sm bg-[#1F4231] text-[#FAF9F5] flex items-center justify-center">
            <QrCode className="w-4 h-4" />
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#1F4231] font-semibold">
            Table QR Code Generator
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-serif text-stone-900">
          Direct Table Menu Link &amp; QR
        </h3>
        <p className="text-xs text-stone-600 font-light mt-1 leading-relaxed">
          Embed this link in a QR code standee placed on your tables. Diners who scan it will jump directly into the streamlined phone menu!
        </p>

        {/* Table selector / input */}
        <div className="mt-4 pt-3 border-t border-[#EDE8DC] space-y-2">
          <label className="block text-xs font-medium text-stone-700">
            Table Identifier / Location:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={selectedTable}
              onChange={(e) => setSelectedTable(e.target.value)}
              placeholder="e.g. Table 3, Patio 2"
              className="flex-1 p-2 bg-white border border-[#EDE8DC] rounded-sm text-xs font-medium text-stone-800 outline-none focus:border-[#1F4231]"
            />
          </div>

          {/* Quick presets */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {sampleTables.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTable(t)}
                className={`px-2 py-0.5 text-[11px] rounded-xs transition-colors cursor-pointer ${
                  selectedTable === t
                    ? 'bg-[#1F4231] text-[#FAF9F5] font-medium'
                    : 'bg-[#F4F1EA] text-stone-600 hover:bg-stone-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Scannable QR Code Box */}
        <div className="my-5 p-4 bg-white border border-[#EDE8DC] rounded-lg flex flex-col items-center justify-center text-center shadow-xs">
          <div className="p-2 bg-[#FAF9F5] border border-dashed border-[#1F4231]/40 rounded-md inline-block">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="Table QR Code"
                className="w-44 h-44 object-contain"
              />
            ) : (
              <div className="w-44 h-44 flex items-center justify-center text-xs text-stone-400 font-mono">
                Generating QR...
              </div>
            )}
          </div>

          <div className="mt-3 flex items-center gap-2">
            <span className="bg-[#1F4231] text-[#FAF9F5] text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-xs">
              {selectedTable}
            </span>
            <span className="text-xs text-stone-500 font-light">
              Direct Phone Menu Link
            </span>
          </div>

          {/* Direct URL text & Copy button */}
          <div className="mt-3 w-full flex items-center gap-1.5 bg-[#F4F1EA] p-1.5 rounded-sm border border-[#EDE8DC]">
            <input
              type="text"
              readOnly
              value={directUrl}
              className="flex-1 bg-transparent text-[11px] font-mono text-stone-700 truncate px-1.5 outline-none select-all"
            />
            <button
              onClick={handleCopyLink}
              className="px-2.5 py-1 bg-white hover:bg-stone-50 border border-stone-200 rounded-xs text-xs text-stone-700 font-medium flex items-center gap-1 cursor-pointer transition-colors shrink-0 shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-[#1F4231]" />
                  <span className="text-[#1F4231]">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-stone-500" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
          <button
            onClick={handleDownloadQr}
            className="w-full py-2.5 px-3 bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 rounded-sm font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#1F4231]" />
            <span>Download QR PNG</span>
          </button>

          <button
            onClick={handlePrintStandee}
            className="w-full py-2.5 px-3 bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 rounded-sm font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-[#1F4231]" />
            <span>Print Standee Card</span>
          </button>
        </div>

        {/* Test Open Menu View button */}
        <div className="mt-3 pt-3 border-t border-[#EDE8DC]">
          <button
            onClick={handleOpenDirectMenu}
            className="w-full py-2.5 px-4 bg-[#1F4231] hover:bg-[#153324] text-[#FAF9F5] text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Preview Direct Table Menu Now</span>
          </button>
        </div>

      </div>
    </div>
  );
};
