// src/components/reports/EmailReportModal.tsx

// 'use client';

// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { X, Mail, Send } from 'lucide-react';
// import { toast } from 'react-hot-toast';

// interface EmailReportModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export function EmailReportModal({ isOpen, onClose }: EmailReportModalProps) {
//   const [formData, setFormData] = useState({
//     to: '',
//     subject: 'SmartWork 360 - Productivity Report',
//     message: 'Please find the attached productivity report.'
//   });
  
//   // Add loading state
//   const [sending, setSending] = useState(false);

//   // ✅ UPDATED: Now calls the actual backend API
//   const handleSend = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.to) {
//       toast.error('Please enter recipient email');
//       return;
//     }

//     setSending(true);
//     toast.loading('Sending email...', { id: 'email' });

//     try {
//       // ✅ ACTUAL API CALL
//       const response = await fetch('http://localhost:8000/api/v1/reports/email', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('access_token')}`
//         },
//         body: JSON.stringify({
//           recipient_email: formData.to,
//           report_type: 'Productivity Report',
//           subject: formData.subject,
//           message: formData.message
//         })
//       });

//       if (response.ok) {
//         const result = await response.json();
//         toast.success(`✅ Report sent to ${formData.to}!`, { id: 'email' });
//         onClose();
//         setFormData({ 
//           to: '', 
//           subject: 'SmartWork 360 - Productivity Report',
//           message: 'Please find the attached productivity report.'
//         });
//       } else {
//         const error = await response.json();
//         toast.error(`❌ Failed: ${error.detail || 'Unknown error'}`, { id: 'email' });
//       }
//     } catch (error) {
//       console.error('Error sending email:', error);
//       toast.error('❌ Network error. Please check your backend.', { id: 'email' });
//     } finally {
//       setSending(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
//         onClick={onClose}
//       >
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.9, opacity: 0 }}
//           onClick={(e) => e.stopPropagation()}
//           className="bg-white rounded-2xl p-8 max-w-md w-full"
//         >
//           {/* Header */}
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
//                 <Mail className="w-6 h-6 text-white" />
//               </div>
//               <h2 className="text-2xl font-bold text-gray-900">Email Report</h2>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               disabled={sending}
//             >
//               <X className="w-5 h-5 text-gray-600" />
//             </button>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSend} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 To *
//               </label>
//               <input
//                 type="email"
//                 value={formData.to}
//                 onChange={(e) => setFormData({ ...formData, to: e.target.value })}
//                 className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
//                 placeholder="recipient@example.com"
//                 required
//                 disabled={sending}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Subject
//               </label>
//               <input
//                 type="text"
//                 value={formData.subject}
//                 onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
//                 className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
//                 disabled={sending}
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Message
//               </label>
//               <textarea
//                 value={formData.message}
//                 onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//                 rows={4}
//                 className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none"
//                 disabled={sending}
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={sending || !formData.to}
//               className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-shadow font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <Send className="w-5 h-5" />
//               {sending ? 'Sending...' : 'Send Report'}
//             </button>
//           </form>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// }

// src/components/reports/EmailReportModal.tsx

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Send } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface EmailReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EmailReportModal({ isOpen, onClose }: EmailReportModalProps) {
  const [formData, setFormData] = useState({
    to: '',
    subject: 'SmartWork 360 - Productivity Report',
    message: 'Please find the attached productivity report.'
  });
  
  const [sending, setSending] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.to) {
      toast.error('Please enter recipient email');
      return;
    }

    setSending(true);
    toast.loading('Sending email...', { id: 'email' });

    try {
      const response = await fetch('http://localhost:8000/api/v1/reports/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
          recipient_email: formData.to,
          report_type: 'Productivity Report',
          subject: formData.subject,
          message: formData.message
        })
      });

      if (response.ok) {
        toast.success(`✅ Report sent to ${formData.to}!`, { id: 'email' });
        onClose();
        setFormData({ 
          to: '', 
          subject: 'SmartWork 360 - Productivity Report',
          message: 'Please find the attached productivity report.'
        });
      } else {
        const error = await response.json();
        toast.error(`❌ Failed: ${error.detail || 'Unknown error'}`, { id: 'email' });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('❌ Network error', { id: 'email' });
    } finally {
      setSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl p-8 max-w-md w-full"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Email Report</h2>
            </div>
            <button
              onClick={onClose}
              disabled={sending}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSend} className="space-y-4">
            
            {/* To Field - FIX: Added text-gray-900 for visible text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To *
              </label>
              <input
                type="email"
                value={formData.to}
                onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-gray-900 placeholder-gray-400"
                placeholder="recipient@example.com"
                required
                disabled={sending}
              />
            </div>

            {/* Subject Field - FIX: Added text-gray-900 for visible text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-gray-900 placeholder-gray-400"
                placeholder="Email subject"
                disabled={sending}
              />
            </div>

            {/* Message Field - FIX: Added text-gray-900 for visible text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none text-gray-900 placeholder-gray-400"
                placeholder="Your message here..."
                disabled={sending}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={sending || !formData.to}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-shadow font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
              {sending ? 'Sending...' : 'Send Report'}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}


