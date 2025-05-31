export default function FAQPage() {
    const faqs = [
      {
        question: "How do I place an order?",
        answer: "Browse our products, add items to your cart, and proceed to checkout. Follow the simple steps to complete your purchase."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept credit cards, debit cards, and various digital payment methods for your convenience."
      },
      {
        question: "How long does shipping take?",
        answer: "Shipping typically takes 3-5 business days within the country, and 7-14 days for international orders."
      },
      {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for unused items in their original packaging. Contact our customer service for return instructions."
      }
    ];
  
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h1>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-600 pb-4">
              <h2 className="text-xl font-semibold text-white mb-2">{faq.question}</h2>
              <p className="text-gray-300">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }