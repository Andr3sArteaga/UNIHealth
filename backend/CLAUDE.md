# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Server Management
- Start development server: `python manage.py runserver`
- Run with virtual environment: `..\.venv\Scripts\python.exe manage.py runserver`

### Testing
- Run all tests: `python -m pytest`
- Run with virtual environment: `..\.venv\Scripts\python.exe -m pytest`
- Test configuration: pytest.ini configures Django settings and file patterns

### Database Management
- Apply migrations: `python manage.py migrate`
- Create migrations: `python manage.py makemigrations`
- Initialize app schema: `python manage.py init_app_schema`

### Data Seeding Commands
- Seed medical data: `python manage.py seed_medical`
- Seed alerts: `python manage.py seed_alerts`
- Seed scheduling: `python manage.py seed_scheduling`

## Architecture Overview

This is a Django REST API backend for UNIHealth, a healthcare management system. The project uses:

### Core Technologies
- Django 5.2.3 with Django REST Framework
- PostgreSQL database (configured via environment variables)
- Channels for WebSocket support (alerts real-time notifications)
- JWT authentication via custom `JwtAuthentication` class
- drf-spectacular for OpenAPI documentation

### Project Structure
The backend follows Django app-based architecture with domain separation:

- **config/**: Django project settings and URL routing
- **accounts/**: User authentication, roles, JWT handling
- **patients/**: Patient profiles and consent management  
- **medical/**: Medical records, vital signs, attachments
- **alerts/**: Alert system with real-time WebSocket support
- **scheduling/**: Appointment scheduling and management
- **common/**: Shared utilities and base schema initialization

### Database Architecture
- Uses existing PostgreSQL schema with `managed=False` models
- Models map to existing `app.*` tables (e.g., `app.roles`, `app.usuarios`)
- Custom authentication integrates with existing user system

### API Design
- RESTful APIs under `/api/` prefix
- JWT-based authentication with refresh tokens
- OpenAPI documentation at `/api/schema/swagger-ui/`
- WebSocket endpoint at `ws://localhost:8000/ws/alerts`

### Key Endpoints
- Auth: `/api/auth/{register,login,refresh,me}`
- Patients: `/api/me/{profile,consentimientos}`
- Medical: `/api/{records,vitals,attachments}`
- Alerts: `/api/alerts` (with WebSocket support)
- Scheduling: `/api/appointments`

## Environment Configuration

The application uses environment variables loaded from `.env` file in parent directory:
- Database credentials: `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`
- Django settings: `DJANGO_SECRET_KEY`, `DJANGO_DEBUG`, `DJANGO_ALLOWED_HOSTS`
- CORS settings: `CORS_ALLOW_ALL_ORIGINS`, `CORS_ALLOWED_ORIGINS`

## Testing Guidelines

Tests are organized by app with naming patterns: `test_*.py`, `*_tests.py`, `tests.py`
- Authentication tests in `accounts/tests/`
- Domain-specific tests in each app's `tests/` directory
- Use pytest-django for Django integration

## WebSocket Implementation

Real-time alerts use Django Channels:
- Consumer: `alerts.consumers.AlertsConsumer`
- Routing: WebSocket URLs in `alerts.routing.py`
- ASGI configuration in `config/asgi.py`
- Development uses InMemoryChannelLayer

## Documentation

Refer to existing documentation:
- API guide: `docs/README-API.md` (includes Postman collection info)
- Account endpoints: `docs/Postman-UNIHealth-Accounts.md`
- OpenAPI schema available at runtime: `/api/schema/`