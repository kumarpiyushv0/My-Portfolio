import { useEffect } from 'react';
import posthog from 'posthog-js';

let isAnalyticsInitialized = false;

const reportMissingConfiguration = (variableName) => {
  if (import.meta.env.DEV) {
    console.error(
      new Error(`${variableName} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${variableName} is configured`)
    );
  }
};

export const initAnalytics = () => {
  const apiKey = (import.meta.env.POSTHOG_KEY || import.meta.env.VITE_POSTHOG_KEY)?.trim();
  const apiHost = (import.meta.env.POSTHOG_HOST || import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com')?.trim();

  if (!apiKey) {
    reportMissingConfiguration('POSTHOG_KEY / VITE_POSTHOG_KEY');
    return;
  }

  if (!apiHost) {
    reportMissingConfiguration('POSTHOG_HOST / VITE_POSTHOG_HOST');
    return;
  }

  posthog.init(apiKey, {
    api_host: apiHost,
    autocapture: true, // Captures all button clicks, link clicks, and interactions
    logs: {
      serviceName: 'portfolio-web',
      environment: import.meta.env.MODE,
    },
    capture_pageview: true, // Captures page visits
    capture_pageleave: true, // Captures visit duration and bounce
    capture_exceptions: {
      capture_unhandled_errors: true,
      capture_unhandled_rejections: true,
      capture_console_errors: false,
    },
    session_recording: {
      maskAllInputs: true, // Masks sensitive inputs for privacy
    },
  });

  isAnalyticsInitialized = true;
};

/**
 * Custom event tracking helper
 * @param {string} eventName
 * @param {Record<string, any>} properties
 */
export const trackEvent = (eventName, properties = {}) => {
  try {
    if (isAnalyticsInitialized) {
      posthog.capture(eventName, properties);
    }
  } catch (err) {
    console.error('Failed to log event to PostHog:', err);
  }
};

export const portfolioLogger = {
  info: (message, attributes = {}) => {
    if (isAnalyticsInitialized) {
      posthog.logger.info(message, attributes);
    }
  },
  error: (message, attributes = {}) => {
    if (isAnalyticsInitialized) {
      posthog.logger.error(message, attributes);
    }
  },
};

/**
 * React hook to automatically track when users scroll to portfolio sections
 * @param {string[]} sectionIds
 */
export const useSectionTracking = (sectionIds = ['about', 'skills', 'projects', 'contact']) => {
  useEffect(() => {
    const trackedSections = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !trackedSections.has(entry.target.id)) {
            trackedSections.add(entry.target.id);
            trackEvent('section_viewed', {
              section: entry.target.id,
              url: window.location.href,
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds]);
};

export default posthog;
