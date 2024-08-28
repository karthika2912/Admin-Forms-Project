import React from 'react'

const About = () => {
  return (
   
    <>
        <main class="container mx-auto p-4">
          <section class="bg-white p-6 rounded-lg shadow-md mt-4">
            <h2 class="text-3xl font-bold mb-4">About Us</h2>
            <p class="mb-4">
              We are a dedicated team of professionals committed to delivering high-quality products and services to our customers. Our mission is to provide innovative solutions that meet the needs of our clients and exceed their expectations.
            </p>
            <p class="mb-4">
              Our team is composed of experienced individuals with diverse backgrounds and expertise. We work collaboratively to ensure that we deliver the best possible outcomes for our clients. Whether you are looking for cutting-edge technology solutions or expert advice, we are here to help.
            </p>
            <p>
              At our company, we value integrity, excellence, and customer satisfaction. We are passionate about what we do and strive to build long-lasting relationships with our clients based on trust and mutual respect.
            </p>
          </section>

            <section class="bg-white p-6 rounded-lg shadow-md mt-4">
              <h2 class="text-2xl font-semibold mb-4">Our Team</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="bg-gray-200 p-4 rounded-lg shadow-md">
                  <h3 class="text-xl font-semibold mb-2">John Doe</h3>
                  <p>CEO & Founder</p>
                  <p class="mt-2">John is the visionary behind our company, with over 20 years of experience in the industry.</p>
                </div>
                <div class="bg-gray-200 p-4 rounded-lg shadow-md">
                  <h3 class="text-xl font-semibold mb-2">Jane Smith</h3>
                  <p>Chief Technology Officer</p>
                  <p class="mt-2">Jane leads our technology team with a passion for innovation and excellence.</p>
                </div>
                <div class="bg-gray-200 p-4 rounded-lg shadow-md">
                  <h3 class="text-xl font-semibold mb-2">Emily Johnson</h3>
                  <p>Head of Marketing</p>
                  <p class="mt-2">Emily is responsible for our marketing strategies and ensuring our brand reaches the right audience.</p>
                </div>
              </div>
            </section>
      </main>

      <footer class="bg-blue-600 text-white p-4 mt-4">
        <div class="container mx-auto text-center">
          <p>&copy; 2024 My Awesome Website. All rights reserved.</p>
        </div>
      </footer>

    </>
  )
}

export default About