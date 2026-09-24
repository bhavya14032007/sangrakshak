"""
SANRAKSHAK - Python Backend Unit Test Suite
Validates:
- Flask App Creation & Database Initialization
- Security Headers & Health Check API
- Endpoint Response Formats & Error Handling
"""

import sys
import os
import unittest

# Add backend directory to system path
backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, backend_dir)

from app import create_app

class BackendSanityTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.client = self.app.test_client()

    def test_health_check(self):
        """Test health endpoint returns operational status."""
        response = self.client.get('/api/health')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertEqual(data['status'], 'operational')
        self.assertEqual(data['service'], 'SANRAKSHAK')

    def test_security_headers(self):
        """Test security response headers are present on API responses."""
        response = self.client.get('/api/health')
        self.assertEqual(response.headers.get('X-Content-Type-Options'), 'nosniff')
        self.assertEqual(response.headers.get('X-Frame-Options'), 'DENY')
        self.assertEqual(response.headers.get('X-XSS-Protection'), '1; mode=block')

    def test_404_handler(self):
        """Test 404 endpoint returns JSON error response."""
        response = self.client.get('/api/invalid-endpoint-xyz')
        self.assertEqual(response.status_code, 404)
        data = response.get_json()
        self.assertIn('error', data)

if __name__ == '__main__':
    unittest.main()
