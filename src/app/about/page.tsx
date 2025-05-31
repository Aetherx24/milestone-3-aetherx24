export default function AboutPage() {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">About RevoShop</h1>
        
        <div className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Our Story</h2>
            <p className="text-gray-300 mb-4">
              RevoShop was founded with a simple mission: to provide high-quality products 
              at competitive prices while delivering exceptional customer service. Since our 
              establishment, we have been committed to revolutionizing the online shopping 
              experience.
            </p>
          </section>
  
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 mb-4">
              We strive to make online shopping accessible, enjoyable, and reliable for 
              all our customers. Our commitment to quality, transparency, and customer 
              satisfaction drives everything we do.
            </p>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Why Choose Us?</h2>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>Wide selection of quality products</li>
              <li>Competitive prices and regular deals</li>
              <li>Fast and reliable shipping</li>
              <li>Excellent customer service</li>
              <li>Secure payment options</li>
            </ul>
          </section>
        </div>
      </div>
    );
  }