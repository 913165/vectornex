export default function Footer() {
    return (
      <footer className="border-t">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              © {new Date().getFullYear()} Your Company. All rights reserved.
            </div>
            <div className="space-x-4">
              <a href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">Privacy</a>
              <a href="/terms" className="text-sm text-gray-600 hover:text-gray-900">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    );
  }