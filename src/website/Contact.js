import React from 'react'

const Contact = () => {
  return (
    <>
    <main class="container mx-auto p-4">
    <section class="bg-white p-6 rounded-lg shadow-md mt-4">
      <h2 class="text-3xl font-bold mb-4">Contact Us</h2>
      <p class="mb-4">
        If you have any questions, comments, or inquiries, please feel free to reach out to us. We are here to help and would love to hear from you!
      </p>
      <form action="#" method="POST" class="space-y-4">
        <div>
          <label for="name" class="block text-lg font-semibold">Name</label>
          <input type="text" id="name" name="name" class="w-full p-2 border border-gray-300 rounded-lg" placeholder="Your Name" required/>
        </div>
        <div>
          <label for="email" class="block text-lg font-semibold">Email</label>
          <input type="email" id="email" name="email" class="w-full p-2 border border-gray-300 rounded-lg" placeholder="Your Email" required/>
        </div>
        <div>
          <label for="message" class="block text-lg font-semibold">Message</label>
          <textarea id="message" name="message" rows="4" class="w-full p-2 border border-gray-300 rounded-lg" placeholder="Your Message" required></textarea>
        </div>
        <div>
          <button type="submit" class="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">Send Message</button>
        </div>
      </form>
    </section>

    <section class="bg-white p-6 rounded-lg shadow-md mt-4">
      <h2 class="text-2xl font-semibold mb-4">Our Contact Information</h2>
      <p class="mb-2"><strong>Address:</strong> 123 Main Street, Anytown, USA</p>
      <p class="mb-2"><strong>Phone:</strong> (123) 456-7890</p>
      <p><strong>Email:</strong> contact@awesomewebsite.com</p>
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

export default Contact