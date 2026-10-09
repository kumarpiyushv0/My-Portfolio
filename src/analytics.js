import { useEffect } from 'react';
import posthog from 'posthog-js';

let isAnalyticsInitialized = false;

const reportMissingConfiguration = (variableName) => {
  if (import.meta.env.DEV) {
    console.warn(`[Analytics] ${variableName} is not set. Analytics events will be queued or skipped.`);
  }
};

export const initAnalytics = () => {
  const apiKey = import.meta.env.POSTHOG_KEY?.trim();
  const apiHost = (import.meta.env.POSTHOG_HOST || 'https://us.i.posthog.com')?.trim();

  if (!apiKey) {
    reportMissingConfiguration('POSTHOG_KEY');
    return;
  }

  if (!apiHost) {
    reportMissingConfiguration('POSTHOG_HOST');
    return;
  }

  posthog.init(apiKey, {
    api_host: apiHost,
    autocapture: true, // Captures DOM interactions, clicks, and element metadata
    capture_pageview: true,
    capture_pageleave: true,
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: null,
    },
    // Production settings
    loaded: () => {
      isAnalyticsInitialized = true;
    },
  });

  isAnalyticsInitialized = true;
};

/**
 * Core event tracking helper
 */
export const trackEvent = (eventName, properties = {}) => {
  try {
    if (isAnalyticsInitialized) {
      posthog.capture(eventName, {
        timestamp: new Date().toISOString(),
        path: window.location.pathname,
        ...properties,
      });
    }
  } catch (err) {
    console.error(`[Analytics] Failed to log event "${eventName}":`, err);
  }
};

/**
 * Track any button click with unique ID and name
 */
export const trackButtonClick = (buttonId, buttonName, properties = {}) => {
  trackEvent('button_clicked', {
    button_id: buttonId,
    button_name: buttonName,
    ...properties,
  });
};

/**
 * Track social profile navigation (LinkedIn, GitHub, Twitter)
 */
export const trackSocialClick = (platform, location, url, buttonId) => {
  trackEvent('social_profile_clicked', {
    button_id: buttonId,
    platform: platform.toLowerCase(),
    placement: location, // 'header' | 'footer'
    destination_url: url,
  });
};

/**
 * Section view tracking hook with dwell time & visibility metrics
 */
export const useSectionTracking = (sections = [
  { id: 'hero', name: 'Hero / Introduction' },
  { id: 'about', name: 'About Me' },
  { id: 'skills', name: 'Skills Showcase' },
  { id: 'projects', name: 'Featured & All Projects' },
  { id: 'contact', name: 'Contact Form' },
  { id: 'footer', name: 'Footer' },
]) => {
  useEffect(() => {
    if (!sections || sections.length === 0) return;

    const sectionTimers = {};
    const viewedSections = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id;
          const sectionMeta = sections.find((s) => (typeof s === 'string' ? s === sectionId : s.id === sectionId));
          const sectionName = typeof sectionMeta === 'object' ? sectionMeta.name : sectionId;

          if (entry.isIntersecting) {
            sectionTimers[sectionId] = Date.now();

            trackEvent('section_viewed', {
              section_id: sectionId,
              section_name: sectionName,
              first_view: !viewedSections.has(sectionId),
              intersection_ratio: Math.round(entry.intersectionRatio * 100) / 100,
            });

            viewedSections.add(sectionId);
          } else if (sectionTimers[sectionId]) {
            // User left the section: calculate dwell time in seconds
            const dwellTimeMs = Date.now() - sectionTimers[sectionId];
            delete sectionTimers[sectionId];

            if (dwellTimeMs > 800) { // Only log if visitor stayed for more than 0.8s
              trackEvent('section_dwell_time', {
                section_id: sectionId,
                section_name: sectionName,
                dwell_time_seconds: Math.round(dwellTimeMs / 100) / 10,
              });
            }
          }
        });
      },
      { threshold: 0.25 }
    );

    sections.forEach((sec) => {
      const id = typeof sec === 'string' ? sec : sec.id;
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [sections]);
};

export default posthog;
