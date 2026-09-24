"""
SANRAKSHAK - AI-Powered Industrial Hazard Prediction & Early Warning System
Main Flask Application
"""

import os
import sqlite3
from flask import Flask, jsonify
from flask_cors import CORS
from config import Config


def get_db():
    """Get SQLite database connection."""
    db_path = os.path.join(os.path.dirname(__file__), 'sanrakshak.db')
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn


def init_db(app):
    """Initialize database with schema and seed data."""
    db_path = os.path.join(os.path.dirname(__file__), 'sanrakshak.db')
    if not os.path.exists(db_path):
        conn = sqlite3.connect(db_path)
        # Check standard locations for schema & seed
        schema_candidates = [
            os.path.join(os.path.dirname(__file__), '..', 'database', 'schema.sql'),
            os.path.join(os.path.dirname(__file__), 'database', 'schema.sql'),
            os.path.join(os.path.dirname(__file__), 'schema.sql'),
        ]
        seed_candidates = [
            os.path.join(os.path.dirname(__file__), '..', 'database', 'seed.sql'),
            os.path.join(os.path.dirname(__file__), 'database', 'seed.sql'),
            os.path.join(os.path.dirname(__file__), 'seed.sql'),
        ]

        schema_path = next((p for p in schema_candidates if os.path.exists(p)), None)
        seed_path = next((p for p in seed_candidates if os.path.exists(p)), None)

        if schema_path and os.path.exists(schema_path):
            with open(schema_path, 'r', encoding='utf-8') as f:
                conn.executescript(f.read())
            print(f"[SANRAKSHAK] Schema loaded from {schema_path}")

        if seed_path and os.path.exists(seed_path):
            with open(seed_path, 'r', encoding='utf-8') as f:
                conn.executescript(f.read())
            print(f"[SANRAKSHAK] Seed data loaded from {seed_path}")

        conn.commit()
        conn.close()
        print("[SANRAKSHAK] Database initialized successfully.")
    else:
        print("[SANRAKSHAK] Database already exists.")


def create_app():
    """Flask application factory."""
    app = Flask(__name__)
    app.config.from_object(Config)

    # Enable CORS for React frontend
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Initialize database
    init_db(app)

    # Ensure ML directories exist
    os.makedirs(Config.EXPERIMENTS_DIR, exist_ok=True)
    os.makedirs(Config.RAW_DATA_DIR, exist_ok=True)
    os.makedirs(Config.SYNTHETIC_DATA_DIR, exist_ok=True)

    # Register blueprints
    from routes.auth_routes import auth_bp
    from routes.sensor_routes import sensor_bp
    from routes.prediction_routes import prediction_bp
    from routes.hazard_routes import hazard_bp
    from routes.simulation_routes import simulation_bp
    from routes.training_routes import training_bp
    from routes.gemini_routes import gemini_bp

    app.register_blueprint(auth_bp, url_prefix='/api')
    app.register_blueprint(sensor_bp, url_prefix='/api')
    app.register_blueprint(prediction_bp, url_prefix='/api')
    app.register_blueprint(hazard_bp, url_prefix='/api')
    app.register_blueprint(simulation_bp, url_prefix='/api')
    app.register_blueprint(training_bp, url_prefix='/api')
    app.register_blueprint(gemini_bp, url_prefix='/api')

    # Health check
    @app.route('/api/health')
    def health():
        return jsonify({
            'status': 'operational',
            'service': 'SANRAKSHAK',
            'version': '1.0.0',
            'components': {
                'api': 'online',
                'database': 'online',
                'ml_model': os.path.exists(Config.MODEL_PATH),
                'gemini': bool(Config.GEMINI_API_KEY)
            }
        })

    # Security response headers
    @app.after_request
    def add_security_headers(response):
        response.headers['X-Content-Type-Options'] = 'nosniff'
        response.headers['X-Frame-Options'] = 'DENY'
        response.headers['X-XSS-Protection'] = '1; mode=block'
        response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
        return response

    # Global error handlers
    @app.errorhandler(404)
    def not_found(e):
        return jsonify({'error': 'Endpoint not found'}), 404

    @app.errorhandler(500)
    def server_error(e):
        return jsonify({'error': 'Internal server error'}), 500

    return app


if __name__ == '__main__':
    app = create_app()
    port = int(os.environ.get('PORT', 5000))
    print("\n" + "=" * 60)
    print("  SANRAKSHAK - Industrial Safety Intelligence")
    print("  AI-Powered Hazard Prediction & Early Warning")
    print("=" * 60)
    print(f"  API: http://0.0.0.0:{port}/api")
    print(f"  Health: http://0.0.0.0:{port}/api/health")
    print("=" * 60 + "\n")
    app.run(host='0.0.0.0', port=port, debug=False)
