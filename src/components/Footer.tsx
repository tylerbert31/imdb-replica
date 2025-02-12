"use client";

export default function Footer() {
  return (
    <footer className="bg-[#121212] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-[#F5C518] text-xl font-bold mb-4">MovieDB</h3>
            <p className="text-gray-300">Your ultimate movie database</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-[#F5C518]">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/trending"
                  className="text-gray-300 hover:text-[#F5C518]"
                >
                  Trending
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-gray-300">Email: info@moviedb.com</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            &copy; {new Date().getFullYear()} MovieDB. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
