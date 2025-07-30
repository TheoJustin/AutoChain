import { Car } from "lucide-react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Car className="h-8 w-8 text-orange-500" />
                <span className="text-2xl font-bold">AutoChain</span>
              </div>
              <p className="text-gray-300">The future of car rental powered by AI and blockchain technology.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/cars" className="hover:text-orange-500 transition-colors">
                    Browse Cars
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-orange-500 transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/wallet" className="hover:text-orange-500 transition-colors">
                    Wallet
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/contact" className="hover:text-orange-500 transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Safety
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500 transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 AutoChain. All rights reserved.</p>
          </div>
        </div>
      </footer>
  );
}

export default Footer;