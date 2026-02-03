import { useState } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Send, CheckCircle, Lightbulb } from 'lucide-react';
import { ScrollFadeIn } from '@/app/components/animations';
import { projectId, publicAnonKey } from '/utils/supabase/info';

export function Feedback() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-1bf47000/feedback`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit feedback');
      }

      setIsSuccess(true);
      setFormData({ name: '', email: '', category: 'general', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (err) {
      console.error('Error submitting feedback:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit feedback');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="max-w-4xl mx-auto px-8 py-16 md:py-24">
        <ScrollFadeIn>
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-4">
              Share Your Feedback
            </h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Help me improve by sharing your thoughts, suggestions, or reporting any issues you've encountered.
            </p>
          </div>
        </ScrollFadeIn>

        <ScrollFadeIn delay={0.1}>
          <div className="bg-white border border-neutral-200 shadow-lg rounded-lg overflow-hidden">
            {isSuccess ? (
              <motion.div 
                className="p-12 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-semibold tracking-tight mb-3">
                  Thank You!
                </h2>
                <p className="text-lg text-neutral-600 mb-8">
                  Your feedback has been submitted successfully. I really appreciate you taking the time to help improve this portfolio.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors"
                >
                  Submit Another Feedback
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                      Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="category" className="block text-sm font-medium text-neutral-700 mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 bg-white"
                  >
                    <option value="general">General Feedback</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Suggestion</option>
                    <option value="design">Design Feedback</option>
                    <option value="content">Content Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-8">
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                    Your Feedback *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={8}
                    className="w-full px-4 py-3 border border-neutral-300 rounded focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 resize-none"
                    placeholder="Share your thoughts, suggestions, or report issues..."
                  />
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
                    {error}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <p className="text-sm text-neutral-600">
                    <span className="text-red-600">*</span> Required fields
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Submit Feedback
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </ScrollFadeIn>

        {/* Info Cards */}
        <ScrollFadeIn delay={0.2}>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white border border-neutral-200 p-6 rounded-lg">
              <MessageSquare className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold mb-2">General Feedback</h3>
              <p className="text-sm text-neutral-600">
                Share your overall thoughts and impressions
              </p>
            </div>
            <div className="bg-white border border-neutral-200 p-6 rounded-lg">
              <Lightbulb className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold mb-2">Suggestions</h3>
              <p className="text-sm text-neutral-600">
                Ideas for new features or improvements
              </p>
            </div>
            <div className="bg-white border border-neutral-200 p-6 rounded-lg">
              <CheckCircle className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold mb-2">Bug Reports</h3>
              <p className="text-sm text-neutral-600">
                Report any issues or problems you've found
              </p>
            </div>
          </div>
        </ScrollFadeIn>
      </div>
    </div>
  );
}
