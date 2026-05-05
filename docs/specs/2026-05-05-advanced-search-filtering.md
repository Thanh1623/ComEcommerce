# Spec: Advanced Search & Filtering (Phase 11)

## Overview
Implement an advanced search and filtering system for the product catalog to enhance user discovery and experience.

## Features
1. **Search Bar:** Real-time (or near real-time) search functionality across product titles and descriptions.
2. **Filtering Sidebar:**
    - Filter by Category
    - Filter by Price Range (min-max)
    - Filter by Attributes (e.g., color, size - *if applicable based on current data*)
3. **Sorting:** Sort products by Price (low/high), Popularity, Newest.
4. **URL Synchronization:** Filters and search queries should be reflected in the URL for easy sharing.

## Technical Approach
- Use URLSearchParams for state management.
- Update API endpoints to support query parameters for filtering/sorting.
- Use shadcn/ui components (Checkbox, Slider, Input) for filter controls.

## Design
- Keep UI consistent with existing catalog design.
