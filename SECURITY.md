# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly.

**Please use [GitHub's private vulnerability reporting](https://github.com/yteruel31/react-material-symbol-icons/security/advisories/new)** to submit your report. This ensures the issue is handled privately until a fix is available.

### What to expect

- **Acknowledgment**: Within 72 hours of your report.
- **Assessment**: We will evaluate the severity and impact.
- **Fix timeline**: We aim to release a patch within 30 days for confirmed vulnerabilities.
- **Disclosure**: We will coordinate public disclosure with you after the fix is released.

### Scope

As a UI component library that renders icons via CSS fonts, the security surface is limited. Relevant concerns include:

- Dependency vulnerabilities (transitive or direct)
- XSS via prop injection
- Supply chain integrity of published packages
