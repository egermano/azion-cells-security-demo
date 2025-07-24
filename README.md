# Azion Cells Security Demo

This project demonstrates the security boundaries and capabilities of the Azion Edge Functions environment (Azion Cells).

## Description

The code showcases which Node.js APIs and JavaScript features are available or restricted within Azion's secure edge runtime. It runs a series of security tests to:

- Attempt access to restricted system resources (like the file system or process APIs)
- Demonstrate the sandboxed nature of the edge environment
- Highlight which web APIs (such as `fetch`, `crypto`, and sandboxed `fs`) are functional

## Purpose

The main goal is to provide a clear, practical example of how Azion's platform ensures code isolation and security at the edge, while still enabling useful application logic and integrations. This helps developers understand what is possible and what is blocked when deploying code to Azion Edge Functions.
