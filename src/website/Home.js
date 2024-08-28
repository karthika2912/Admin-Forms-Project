import React from 'react'


const Home = () => {

  return (
   
   <div className='flex h-[100%] flex-col justify-between border'>
      <main class="container mx-auto p-4">
        <section class="bg-white p-6 rounded-lg shadow-md mt-4">
          <h2 class="text-2xl font-semibold mb-4">Welcome to Our Website!</h2>
          <p>
            We are delighted to have you here. Explore our website to learn more about the services we offer and how we can assist you.
          </p>
        </section>

        <section class="mt-4">
          <h2 class="text-xl font-semibold mb-2">Latest News</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <article class="bg-white p-4 rounded-lg shadow-md">
              <h3 class="text-lg font-semibold mb-2">News Item 1</h3>
              <p>Details about news item 1. This is a brief description of the latest updates.</p>
            </article>
            <article class="bg-white p-4 rounded-lg shadow-md">
              <h3 class="text-lg font-semibold mb-2">News Item 2</h3>
              <p>Details about news item 2. Another brief description of the latest updates.</p>
            </article>
            <article class="bg-white p-4 rounded-lg shadow-md">
              <h3 class="text-lg font-semibold mb-2">News Item 3</h3>
              <p>Details about news item 3. This is another brief description of the latest updates.</p>
            </article>
          </div>
        </section>
        <section class="mt-4">
          <h2 class="text-xl font-semibold mb-2">Latest News</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <article class="bg-white p-4 rounded-lg shadow-md">
              <h3 class="text-lg font-semibold mb-2">News Item 1</h3>
              <p>Details about news item 1. This is a brief description of the latest updates.</p>
            </article>
            <article class="bg-white p-4 rounded-lg shadow-md">
              <h3 class="text-lg font-semibold mb-2">News Item 2</h3>
              <p>Details about news item 2. Another brief description of the latest updates.</p>
            </article>
            <article class="bg-white p-4 rounded-lg shadow-md">
              <h3 class="text-lg font-semibold mb-2">News Item 3</h3>
              <p>Details about news item 3. This is another brief description of the latest updates.</p>
            </article>
          </div>
        </section>
    </main>

 
    <footer class="bg-blue-600 text-white p-4 mt-[3rem]">
      <div class="container mx-auto text-center">
        <p>&copy; 2024 My Awesome Website. All rights reserved.</p>
      </div>
    </footer>
   </div>

  )
}

export default Home