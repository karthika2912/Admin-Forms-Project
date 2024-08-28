import React from 'react'

const Services = () => {
  return (
   <>
    <section class="bg-white shadow-md mt-4">
    <div class="container mx-auto px-6 py-16 text-center">
      <h2 class="text-4xl font-bold mb-4">Our Services</h2>
      <p class="text-gray-700 text-lg">
        We offer a wide range of services to meet your needs. Explore what we have to offer below.
      </p>
    </div>
  </section>

  <main class="container mx-auto p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div class="mb-4">
          <svg class="w-12 h-12 text-blue-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zM12 14c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zM5 6h14M5 18h14M5 12h14"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2 text-center">Web Development</h3>
        <p class="text-gray-600 text-center">
          We build responsive and modern websites tailored to your business needs.
        </p>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div class="mb-4">
          <svg class="w-12 h-12 text-blue-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2a4 4 0 118 0v2m-8-4h8m-8-4h8m-8-4h8"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2 text-center">Digital Marketing</h3>
        <p class="text-gray-600 text-center">
          Our marketing strategies help you reach a wider audience and grow your business.
        </p>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div class="mb-4">
          <svg class="w-12 h-12 text-blue-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2 text-center">Graphic Design</h3>
        <p class="text-gray-600 text-center">
          Our creative designers craft visually stunning graphics for your brand.
        </p>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div class="mb-4">
          <svg class="w-12 h-12 text-blue-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7m-9 4h4m-4 4h4m-6-4h.01M9 11h.01"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2 text-center">Consulting</h3>
        <p class="text-gray-600 text-center">
          Our experts provide valuable insights to help you make informed business decisions.
        </p>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div class="mb-4">
          <svg class="w-12 h-12 text-blue-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a10 10 0 10-5 0v2z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2 text-center">SEO Optimization</h3>
        <p class="text-gray-600 text-center">
          Improve your website’s visibility on search engines with our SEO services.
        </p>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div class="mb-4">
          <svg class="w-12 h-12 text-blue-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2a4 4 0 118 0v2m-8-4h8m-8-4h8m-8-4h8"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2 text-center">Content Creation</h3>
        <p class="text-gray-600 text-center">
          Engage your audience with high-quality content tailored to your brand.
        </p>
      </div>
      
    </div>
  </main>

  <section class="bg-blue-600 text-white py-12">
    <div class="container mx-auto text-center">
      <h2 class="text-3xl font-bold mb-4">Ready to Grow Your Business?</h2>
      <p class="mb-6">Contact us today to learn how we can help you achieve your goals.</p>
      <a href="contact.html" class="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
        Get in Touch
      </a>
    </div>
  </section>

  <footer class="bg-blue-600 text-white p-4 mt-8">
    <div class="container mx-auto text-center">
      <p>&copy; 2024 My Awesome Website. All rights reserved.</p>
    </div>
  </footer>
   </>  
  )
}

export default Services